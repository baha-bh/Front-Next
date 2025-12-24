"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "../../../lib/supabase";
import SpellCard from "../../../component/SpellCard";
import { Loader2, Heart } from "lucide-react";
import { useSavedItems } from "@/context/SavedItemsContext";

type Spell = {
  id: number;
  name: string;
  tier: number;
  type: string;
  cost: string;
  description: string;
  icon: string;
};

type BookWithSpells = {
  id: number;
  name: string;
  aspect: string;
  description: string;
  image: string;
  bonus: string;
  tier: number;
  spells: Spell[];
};

export default function BookPage() {
  const params = useParams();
  const id = params.id; 

  const [book, setBook] = useState<BookWithSpells | null>(null);
  const [loading, setLoading] = useState(true);
  const { savedBooks, toggleBook } = useSavedItems();

  useEffect(() => {
    const fetchBookData = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("books")
        .select(`
          *,
          spells (*)
        `)
        .eq("id", id)
        .single(); 

      if (error) {
        console.error("Ошибка загрузки книги:", error);
      } else {
        if (data.spells) {
          data.spells.sort((a: Spell, b: Spell) => a.tier - b.tier);
        }
        setBook(data);
      }
      setLoading(false);
    };

    fetchBookData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500 bg-zinc-950">
        <h1 className="text-2xl">Книга не найдена</h1>
      </div>
    );
  }

  return (
    <section className="w-full h-full overflow-y-auto bg-zinc-950 p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-gray-100 text-center uppercase tracking-wider">
          {book.name}{" "}
          <span className="text-zinc-600 text-xl align-top ml-2">
            Tier {book.tier}
          </span>
        </h1>
        
        <button
          onClick={() => toggleBook(book.name)}
          className={`p-2 rounded-full transition-all ${
            savedBooks.includes(book.name)
              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" 
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
          }`}
        >
          <Heart className={`w-6 h-6 ${savedBooks.includes(book.name) ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="relative w-full h-auto min-h-[300px] p-8 rounded-2xl border border-gray-800 shadow-lg flex flex-col md:flex-row items-start gap-8 overflow-hidden bg-zinc-900">
        {/* Фоновая картинка */}
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url(/Background_Unitpanel.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0" />

        <div className="relative flex flex-col md:flex-row items-start gap-8 w-full z-10">
          <div className="w-[160px] h-[160px] flex-shrink-0 mx-auto md:mx-0 shadow-2xl relative group">
            <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
            {book.image ? (
              <Image
                src={book.image}
                alt={book.name}
                width={160}
                height={160}
                unoptimized
                className="rounded-xl object-cover border border-zinc-600 relative z-10"
              />
            ) : (
              <div className="w-[160px] h-[160px] bg-zinc-800 rounded-xl border border-zinc-600 flex items-center justify-center relative z-10">
                <span className="text-zinc-500 text-xs">Нет изображения</span>
              </div>
            )}
          </div>

          <div className="flex-1 text-gray-100 flex flex-col justify-between h-full">
            <div>
              <div className="mb-4 inline-block px-3 py-1 bg-zinc-800 rounded-full text-xs font-bold text-zinc-400 border border-zinc-700">
                {book.aspect} Aspect
              </div>
              <p className="text-gray-200 leading-relaxed italic text-lg">
                &quot;{book.description}&quot;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-yellow-500 font-bold text-lg">
                Бонус:{" "}
                <span className="text-gray-200 font-normal">{book.bonus}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center border-b border-zinc-800 pb-4">
          Заклинания книги
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
          {book.spells && book.spells.length > 0 ? (
            book.spells.map((spell) => (
              <SpellCard key={spell.id} spell={spell} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-4">
              Нет заклинаний в этой книге.
            </div>
          )}
        </div>
      </section>
    </section>
  );
}