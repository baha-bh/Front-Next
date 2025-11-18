"use client";

import { useRouter } from "next/navigation";

const categories = [
  { key: "transformation", label: "Transformations" },
  { key: "combat", label: "Combat Spells" },
  { key: "enchantment", label: "Enchantments" },
  { key: "strategic", label: "Strategic Spells" },
  { key: "siege", label: "Siege Projects" },
];

export default function SpellsMainPage() {
  const router = useRouter();

  return (
   <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8">
      
  <h1 className="text-4xl font-bold text-center mb-10 text-gray-100">
    Spell Library
  </h1>

  <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-4">
    {categories.map((cat) => (
      <button
        key={cat.key}
        onClick={() => router.push(`/spells/${cat.key}`)}
        className="w-auto flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-all"
      >
        {cat.label}
      </button>
    ))}
  </div>

</main>
  );
}
