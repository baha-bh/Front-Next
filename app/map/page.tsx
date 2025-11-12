"use client";

import { useState } from "react";
import MapMaterialCard from "../component/MapMaterialCard";
import { magicMaterials, type MagicMaterial  } from "../lib/Map";

const categories = [
  { key: "province", label: "PROVINCE IMPR." },
  { key: "materials", label: "MAGIC MATERIALS" },
  { key: "wonders", label: "ANCIENT WONDERS" },
  { key: "landmarks", label: "LANDMARKS" },
  { key: "cosmic", label: "COSMIC HAPPENINGS" },
];

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState("province");

  const data = {
    province: [
      { name: "Fertile Plains", effect: "+20% Food Production" },
      { name: "Crystal Hills", effect: "+10 Mana income" },
    ],
    wonders: [
      { name: "Obsidian Tower", effect: "Summons powerful guardians" },
      { name: "Temple of Stars", effect: "Boosts Astral Affinity" },
    ],
    landmarks: [
      { name: "Ancient Library", effect: "+15% Research speed" },
      { name: "Great Forge", effect: "+10% Production" },
    ],
    cosmic: [
      { name: "Astral Convergence", effect: "Spells cost less mana" },
      { name: "Shadow Eclipse", effect: "Dark magic grows stronger" },
    ],
  };

  const activeList = data[selectedCategory as keyof typeof data] || [];

  return (
    <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8 overflow-x-hidden">
    
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-100">
        Global Map Overview
      </h1>

      {/* Переключатели категорий */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-5 py-2 rounded-lg border text-sm transition-all duration-200 ${
              selectedCategory === cat.key
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-transparent border-gray-700 hover:border-gray-500 hover:bg-gray-800/50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

{/* Контент */}
{selectedCategory === "materials" ? (
  <div className="flex flex-col gap-6 items-center">
    {magicMaterials.map((mat: MagicMaterial) => (
      <MapMaterialCard key={mat.id} material={mat} />
    ))}
  </div>
) : (
  <div className="flex flex-col gap-6 items-center">
    {activeList.map((item, i) => (
      <div
        key={i}
        className="bg-gray-800 p-5 w-full max-w-3xl rounded-xl border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <h2 className="text-lg font-semibold text-gray-100 mb-2">
          {item.name}
        </h2>
        <p className="text-sm text-gray-400">{item.effect}</p>
      </div>
    ))}
  </div>
)}

      {/* Если данных нет */}
      {!activeList.length && selectedCategory !== "materials" && (
        <p className="text-center text-gray-500 mt-10">No data available.</p>
      )}
    </main>
  );
}
