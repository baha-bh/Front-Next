"use client";

import { useState } from "react";
import MapMaterialCard from "../component/MapMaterialCard";
import AncientWonderCard from "../component/AncientWondersCard";
import LandmarkCard from "../component/LandmarksCard";
import { landmarks } from "../lib/landmarks";
import { magicMaterials, type MagicMaterial } from "../lib/Map";
import { ancientWonders, type AncientWonder } from "../lib/Ancient";

const categories = [
  { key: "materials", label: "MAGIC MATERIALS" },
  { key: "wonders", label: "ANCIENT WONDERS" },
  { key: "landmarks", label: "LANDMARKS" },
  { key: "cosmic", label: "COSMIC HAPPENINGS" },
];

const tiers = ["Bronze", "Silver", "Gold"];

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState("province");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const data = {
    province: [
      { name: "Fertile Plains", effect: "+20% Food Production" },
      { name: "Crystal Hills", effect: "+10 Mana income" },
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
            onClick={() => {
              setSelectedCategory(cat.key);
              setSelectedTier(null); // сброс фильтра при смене категории
            }}
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
) : selectedCategory === "wonders" ? (
  <div className="flex gap-6">
    {/* Фильтр по tier слева */}
    <div className="flex flex-col gap-2 min-w-[120px]">
      <p className="text-gray-300 font-semibold mb-2">Filter by Tier:</p>
      {tiers.map((tier) => (
        <button
          key={tier}
          onClick={() =>
            setSelectedTier((prev) => (prev === tier ? null : tier))
          }
          className={`px-3 py-1 rounded-lg border text-sm transition-all duration-200 ${
            selectedTier === tier
              ? "bg-gray-800 border-gray-600 text-white"
              : "bg-transparent border-gray-700 hover:border-gray-500 hover:bg-gray-800/50"
          }`}
        >
          {tier.toUpperCase()}
        </button>
      ))}
    </div>

    {/* Список карточек */}
    <div className="flex-1 flex flex-col gap-6">
      {(ancientWonders.filter(
        (w) => !selectedTier || w.tier === selectedTier
      ) as AncientWonder[]).map((wonder) => (
        <AncientWonderCard key={wonder.id} wonder={wonder} />
      ))}
      {(ancientWonders.filter(
        (w) => !selectedTier || w.tier === selectedTier
      ) as AncientWonder[]).length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No wonders available for this tier.
        </p>
      )}
    </div>
  </div>
) : selectedCategory === "landmarks" ? (
  <div className="flex flex-col gap-6 items-center">
    {landmarks.map((landmark, i) => (
      <LandmarkCard key={i} landmark={landmark} />
    ))}
    {landmarks.length === 0 && (
      <p className="text-gray-500 text-center mt-10">No landmarks available.</p>
    )}
  </div>
) : (
  // Для категории cosmic
  <div className="flex flex-col gap-6 items-center">
    {(data[selectedCategory as keyof typeof data] || []).map(
      (item, i) => (
        <div
          key={i}
          className="bg-gray-800 p-5 w-full max-w-3xl rounded-xl border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <h2 className="text-lg font-semibold text-gray-100 mb-2">
            {item.name}
          </h2>
          <p className="text-sm text-gray-400">{item.effect}</p>
        </div>
      )
    )}
  </div>
)}


      {/* Если данных нет */}
      {selectedCategory !== "materials" &&
        selectedCategory !== "wonders" &&
        ((data[selectedCategory as keyof typeof data] || []).length === 0 && (
          <p className="text-center text-gray-500 mt-10">No data available.</p>
        ))}
    </main>
  );
}
