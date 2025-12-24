"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import SpellCard from "../../component/SpellCard2";
import { supabase } from "../../lib/supabase";
import { Loader2 } from "lucide-react";

interface Spell {
  id: number;
  name: string;
  tier: number;
  type: string;
  cost: string;
  description: string;
  icon: string;
  book_id?: number;
  books?: {
    name: string;
    image: string;
  };
}

interface SpellWithBook extends Spell {
  bookName: string;
  bookImage: string;
  uid: string;
}

const categoriesMap: Record<string, string> = {
  transformation: "Трансформации",
  combat: "Боевые заклинания",
  enchantment: "Чары",
  strategic: "Стратегические заклинания",
  siege: "Осадные проекты",
};

export default function SpellsByTypePage() {
  const params = useParams();
  const type = params?.type;
  const [spells, setSpells] = useState<SpellWithBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpells = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("spells")
        .select(`
          *,
          books (
            name,
            image
          )
        `);

      if (error) {
        console.error("Error fetching spells:", error);
      } else if (data) {
        const formattedSpells: SpellWithBook[] = data.map((spell: any) => ({
          ...spell,
          bookName: spell.books?.name || "Unknown Book",
          bookImage: spell.books?.image || "",
          uid: `${spell.id}`,
        }));
        setSpells(formattedSpells);
      }
      setLoading(false);
    };

    fetchSpells();
  }, []);

  if (!type) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Error: invalid spell category.</p>
      </div>
    );
  }

  const typeStr = Array.isArray(type) ? type[0].toLowerCase() : type.toLowerCase();
  const displayTitle = categoriesMap[typeStr] || typeStr;

  const filtered = spells.filter((s) => {
    const t = s.type ? s.type.toLowerCase() : "";
    if (typeStr === 'combat') return t.includes('combat') || t.includes('боевое');
    if (typeStr === 'strategic') return t.includes('strategic') || t.includes('стратегическое');
    if (typeStr === 'enchantment') return t.includes('enchantment') || t.includes('чары');
    if (typeStr === 'transformation') return t.includes('transformation') || t.includes('трансформация');
    if (typeStr === 'siege') return t.includes('siege') || t.includes('осадный');
    return t.includes(typeStr);
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <section className="flex-1 p-6 lg:p-10 overflow-y-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
          {displayTitle}
        </h1>
        <p className="text-zinc-400 text-sm">Найдено заклинаний: {filtered.length}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((spell) => (
          <SpellCard key={spell.uid} spell={spell} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="col-span-full py-20 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed w-full">
          <p className="text-xl text-gray-400">
            Нет заклинаний в этой категории
          </p>
        </div>
      )}
    </section>
  );
}