"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useSavedItems } from "../context/SavedItemsContext";
import { books } from "../lib/book";
import SpellCard from "../component/SpellCard2";

type Tab = "spells" | "books" | "units";

export default function ProfilePage() {
  const { savedSpells, savedBooks, savedUnits, isLoading: isDataLoading } = useSavedItems();
  const [activeTab, setActiveTab] = useState<Tab>("spells");

  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsAuthLoading(false);
    };
    getUser();
  }, []);

  // Генерируем плоский список всех заклинаний с уникальными ID
  const allSpells = useMemo(() => {
    return books.flatMap((book) =>
      book.spells.map((spell) => ({
        ...spell,
        // Создаем уникальный ID: ID_Книги - ID_Заклинания
        uniqueId: `${book.id}-${spell.id}`,
        bookName: book.name,
        bookImage: book.image,
      }))
    );
  }, []);

  // --- ИСПРАВЛЕНИЕ ЛОГИКИ ФИЛЬТРАЦИИ ---
  const favoriteSpells = allSpells.filter((s) => {
    // Используем ТОЛЬКО uniqueId.
    // Если использовать s.id, то при совпадении ID в разных книгах (например, id: 1),
    // будут показываться лишние карты.
    return savedSpells.includes(s.uniqueId);
  });

  const favoriteBooks = books.filter((b) => savedBooks.includes(b.id.toString()));

  if (isAuthLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-white">
        <p className="animate-pulse">Проверка магии...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white gap-6">
        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center text-4xl">
          🔒
        </div>
        <h1 className="text-2xl font-bold text-amber-500">Доступ закрыт</h1>
        <p className="text-gray-400 text-center max-w-md">
          Вы должны быть авторизованы, чтобы получить доступ к своему гримуару и
          сохраненным предметам.
        </p>
        <Link
          href="/login"
          className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-lg transition-all shadow-lg shadow-amber-600/20"
        >
          Войти в аккаунт
        </Link>
      </div>
    );
  }

  return (
    // min-h-screen обеспечивает высоту, w-full - ширину
    <main className="min-h-screen w-full bg-zinc-950 text-gray-100 font-sans pb-20">
      
      {/* --- HEADER --- */}
      <div className="relative w-full h-72 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="absolute inset-0 opacity-20 bg-[url('/bg-pattern.png')] bg-cover bg-center" />

        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <div className="relative w-32 h-32 rounded-full border-4 border-zinc-950 shadow-2xl shadow-amber-900/20 overflow-hidden bg-zinc-800">
            <Image
              src={user.user_metadata?.avatar_url || "/default-avatar.png"}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white drop-shadow-md">
            {user.user_metadata?.full_name || user.email?.split("@")[0]}
          </h1>
          <p className="text-amber-500 font-semibold tracking-widest text-xs uppercase mt-1">
            Godir
          </p>
        </div>
      </div>

      {/* --- CONTENT --- */}
      {/* ИСПРАВЛЕНО: Убрал max-w-7xl, добавил w-full для растягивания на всю ширину */}
      <div className="w-full px-6 mt-28">
        
        {/* TABS */}
        <div className="flex justify-center gap-2 mb-12">
          {[
            { id: "spells", label: "Spells", count: savedSpells.length },
            { id: "books", label: "Books", count: savedBooks.length },
            { id: "units", label: "Units", count: savedUnits.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`relative px-8 py-3 rounded-xl transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-zinc-800 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  : "bg-zinc-900/50 border-transparent text-gray-500 hover:text-gray-300 hover:bg-zinc-800"
              }`}
            >
              <span className="font-bold tracking-wide">{tab.label}</span>
              {tab.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="min-h-[400px]">
          {isDataLoading ? (
            <div className="text-center text-gray-500 py-20">
              Загружаем вашу коллекцию...
            </div>
          ) : (
            <>
              {activeTab === "spells" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {favoriteSpells.length > 0 ? (
                    favoriteSpells.map((spell) => (
                      // @ts-ignore
                      <SpellCard
                        key={spell.uniqueId}
                        spell={spell}
                      />
                    ))
                  ) : (
                    <EmptyState
                      title="Гримуар пуст"
                      desc="Вы еще не сохранили ни одного заклинания."
                      link="/spells"
                    />
                  )}
                </div>
              )}

              {activeTab === "books" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favoriteBooks.length > 0 ? (
                    favoriteBooks.map((book) => (
                      <div
                        key={book.id}
                        className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-center"
                      >
                        <h3 className="text-xl text-amber-500 font-bold">
                          {book.name}
                        </h3>
                      </div>
                    ))
                  ) : (
                    <EmptyState
                      title="Библиотека пуста"
                      desc="Древние тома еще не собраны."
                      link="/books"
                    />
                  )}
                </div>
              )}

              {activeTab === "units" && (
                <div className="flex justify-center">
                  <EmptyState
                    title="Казармы пусты"
                    desc="Воины еще не собраны."
                    link="/warriors"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function EmptyState({
  title,
  desc,
  link,
}: {
  title: string;
  desc: string;
  link: string;
}) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
      <h3 className="text-xl font-bold text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{desc}</p>
      <Link
        href={link}
        className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-lg">Исследовать</Link>
</div>
);
}