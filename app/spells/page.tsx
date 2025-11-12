"use client";

import { useState, useMemo } from "react";
import SpellCard from "../component/SpellCard2";
import { books, type Spell, type Book } from "../lib/book"; 

const categories = [
  { key: "all", label: "All Spells" },
  { key: "transformation", label: "Transformations" },
  { key: "combat", label: "Combat Spells" },
  { key: "enchantment", label: "Enchantments" },
  { key: "strategic", label: "Strategic Spells" },
  { key: "siege", label: "Siege Projects" },
];

interface SpellWithBook extends Spell {
  bookName: string;
  bookImage: string;
  uid: string;
}

export default function SpellsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  
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

  // Фильтр
  const filteredSpells = useMemo(() => {
    if (selectedCategory === "all") return allSpells;
    return allSpells.filter((spell) =>
      spell.type.toLowerCase().includes(selectedCategory)
    );
  }, [selectedCategory, allSpells]);

  return (
    <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8 overflow-x-hidden">
    
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-100">
        Spell Library
      </h1>

      {/* Категории */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-5 py-2 rounded-lg border transition-all duration-200 text-sm
              ${
                selectedCategory === cat.key
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-transparent border-gray-700 hover:border-gray-500 hover:bg-gray-800/50"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Сетка заклинаний */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSpells.map((spell) => (
          <SpellCard key={spell.uid} spell={spell} />
        ))}
      </div>

      {/* Если фильтр ничего не нашёл */}
      {filteredSpells.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No spells found for this category.
        </p>
      )}
    </main>
  );
}
