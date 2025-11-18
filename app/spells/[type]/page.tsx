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

export default function SpellsByTypePage() {
  const params = useParams();
  const type = params?.type;

  if (!type) {
    return (
      <main className="w-screen h-screen flex items-center justify-center text-gray-200">
        <p>Error: invalid spell category.</p>
      </main>
    );
  }

  const typeStr = Array.isArray(type) ? type[0].toLowerCase() : type.toLowerCase();

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
    <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8">
      
      <h1 className="text-3xl font-bold text-center mb-10 capitalize">
        {typeStr} Spells
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((spell) => (
          <SpellCard key={spell.uid} spell={spell} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No spells found for this category.
        </p>
      )}
    </main>
  );
}
