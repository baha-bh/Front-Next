"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useSavedItems } from "../context/SavedItemsContext";
import { books } from "../lib/book";
import SpellCard from "../component/SpellCard2";
import { Camera, Loader2, Scroll, Book, Users, Shield } from "lucide-react";

type Tab = "spells" | "books" | "units";

export default function ProfilePage() {
  const { savedSpells, savedBooks, savedUnits, isLoading: isDataLoading } = useSavedItems();
  const [activeTab, setActiveTab] = useState<Tab>("spells");

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
        }
      }
      setIsAuthLoading(false);
    };
    getData();
  }, []);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
       
      const publicUrlWithCacheBust = `${publicUrl}?t=${new Date().getTime()}`;

      const updates = {
        id: user.id,
        avatar_url: publicUrlWithCacheBust,
        email: user.email,
        updated_at: new Date(),
      };

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert(updates);

      if (updateError) throw updateError;

      setProfile({ ...profile, avatar_url: publicUrlWithCacheBust });
      alert("Аватар обновлен!");

    } catch (error: any) {
      console.error(error);
      alert("Ошибка: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const allSpells = useMemo(() => {
    return books.flatMap((book) =>
      book.spells.map((spell) => ({
        ...spell,
        uniqueId: `${book.id}-${spell.id}`,
        bookName: book.name,
        bookImage: book.image,
      }))
    );
  }, []);

  const favoriteSpells = allSpells.filter((s) => savedSpells.includes(s.uniqueId));
  const favoriteBooks = books.filter((b) => savedBooks.includes(b.id.toString()));

  if (isAuthLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white gap-6">
        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center text-4xl border border-zinc-700">
          <Shield className="w-10 h-10 text-zinc-500" />
        </div>
        <h1 className="text-2xl font-bold text-amber-500">Доступ закрыт</h1>
        <p className="text-gray-400 text-center max-w-md">
          Вы должны быть авторизованы, чтобы получить доступ к своему гримуару.
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
    <main className="min-h-screen w-full bg-zinc-950 text-gray-100 font-sans pb-20">

      <div className="relative w-full bg-zinc-900 border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/bg-pattern.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-zinc-900/80 to-zinc-950" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12 flex flex-col md:flex-row items-center md:items-end gap-8">
    
          <div className="relative group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-zinc-950 shadow-2xl shadow-amber-900/30 overflow-hidden bg-zinc-800 ring-2 ring-amber-500/30">
              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                </div>
              ) : null}
              
              <Image
                src={profile?.avatar_url || "/default-avatar.png"}
                alt="avatar"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300 z-10"
              >
                <Camera className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
            />
            
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-900 border border-amber-500/30 text-amber-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Godir
            </div>
          </div>

          <div className="flex-1 text-center md:text-left mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
              {profile?.username || user.email?.split("@")[0]}
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Архимаг • {user.email}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              <StatBadge icon={<Scroll size={14} />} label="Заклинаний" value={savedSpells.length} />
              <StatBadge icon={<Book size={14} />} label="Книг" value={savedBooks.length} />
              <StatBadge icon={<Users size={14} />} label="Армия" value={savedUnits.length} />
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="w-full px-6 mt-12 max-w-7xl mx-auto">
        
        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-zinc-800 pb-1">
          <TabButton 
            active={activeTab === "spells"} 
            onClick={() => setActiveTab("spells")} 
            label="Заклинания" 
            count={savedSpells.length} 
          />
          <TabButton 
            active={activeTab === "books"} 
            onClick={() => setActiveTab("books")} 
            label="Книги Магии" 
            count={savedBooks.length} 
          />
          <TabButton 
            active={activeTab === "units"} 
            onClick={() => setActiveTab("units")} 
            label="Войска" 
            count={savedUnits.length} 
          />
        </div>

        <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isDataLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-amber-600" />
              <p>Открываем гримуар...</p>
            </div>
          ) : (
            <>
              {activeTab === "spells" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favoriteSpells.length > 0 ? (
                    favoriteSpells.map((spell) => (
                      <SpellCard key={spell.uniqueId} spell={spell} />
                    ))
                  ) : (
                    <EmptyState
                      title="Гримуар пуст"
                      desc="Вы еще не сохранили ни одного заклинания."
                      link="/spells"
                      icon={<Scroll className="w-12 h-12 text-zinc-600 mb-4" />}
                    />
                  )}
                </div>
              )}

              {activeTab === "books" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteBooks.length > 0 ? (
                    favoriteBooks.map((book) => (
                      <div
                        key={book.id}
                        className="group relative p-6 bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10"
                      >
                        <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-900/20 transition-colors">
                          <Book className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-xl text-gray-200 group-hover:text-amber-400 font-bold transition-colors">
                          {book.name}
                        </h3>
                      </div>
                    ))
                  ) : (
                    <EmptyState
                      title="Библиотека пуста"
                      desc="Древние тома еще не собраны."
                      link="/books"
                      icon={<Book className="w-12 h-12 text-zinc-600 mb-4" />}
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
                    icon={<Users className="w-12 h-12 text-zinc-600 mb-4" />}
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

function StatBadge({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-gray-300">
      <span className="text-amber-500">{icon}</span>
      <span>{label}: <span className="font-bold text-white">{value}</span></span>
    </div>
  );
}

function TabButton({ active, onClick, label, count }: { active: boolean, onClick: () => void, label: string, count: number }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-t-lg transition-all duration-300 flex items-center gap-2 group ${
        active
          ? "text-amber-400 border-b-2 border-amber-500 bg-zinc-900/30"
          : "text-gray-500 hover:text-gray-300 hover:bg-zinc-900/50 border-b-2 border-transparent"
      }`}
    >
      <span className="font-bold tracking-wide">{label}</span>
      {count > 0 && (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
          active ? "bg-amber-500/20 text-amber-400" : "bg-zinc-800 text-gray-500 group-hover:text-gray-300"
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

function EmptyState({
  title,
  desc,
  link,
  icon
}: {
  title: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
      {icon}
      <h3 className="text-xl font-bold text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm text-center">{desc}</p>
      <Link
        href={link}
        className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-lg">Исследовать</Link>
</div>
);
}