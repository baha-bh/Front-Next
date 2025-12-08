"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import SpellCard from "../../component/SpellCard2";
import { books, type Spell, type Book } from "../../lib/book";

interface SpellWithBook extends Spell {
  bookName: string;
  bookImage: string;
  uid: string;
}

const categoriesMap: Record<string, string> = {
  transformation: "Transformations",
  combat: "Combat Spells",
  enchantment: "Enchantments",
  strategic: "Strategic Spells",
  siege: "Siege Projects",
};

export default function SpellsByTypePage() {
  const params = useParams();
  const type = params?.type;

  if (!type) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Error: invalid spell category.</p>
      </div>
    );
  }

  const typeStr = Array.isArray(type) ? type[0].toLowerCase() : type.toLowerCase();
  const displayTitle = categoriesMap[typeStr] || typeStr;

  const allSpells = useMemo<SpellWithBook[]>(() => {
    return books.flatMap((b: Book) =>
      b.spells.map((spell) => ({
        ...spell,
        bookName: b.name,
        bookImage: b.image,
        uid: `${b.id}-${spell.id}`,
      }))
    );
  }, []);

  const filtered = allSpells.filter((s) =>
    s.type.toLowerCase().includes(typeStr)
  );

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