"use client";

import { useState } from "react";
import { ancientWonders, type AncientWonder } from "../lib/Ancient";

export default function AncientWondersCard() {
  const [selectedTier, setSelectedTier] = useState<"Silver" | "Gold" | "Bronze">("Bronze");

  const filteredWonders = ancientWonders.filter(w => w.tier === selectedTier);

  // Функция для определения цвета Tier
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "#CD7F32"; // бронзовый
      case "Silver":
        return "#C0C0C0"; // серебряный
      case "Gold":
        return "#FFD700"; // золотой
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="flex gap-6">
      {/* Меню выбора тира */}
      <div className="flex flex-col gap-3 p-4 border-r border-gray-700">
        {["Bronze", "Silver", "Gold"].map(tier => (
          <button
            key={tier}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedTier === tier
                ? "bg-amber-500 text-black"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedTier(tier as any)}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* Секция карточек чудес */}
      <div className="flex-1 flex flex-col gap-6">
        {filteredWonders.map((wonder: AncientWonder) => (
          <div
            key={wonder.id}
            className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-gray-700 shadow-md hover:border-amber-600/40 transition-all duration-300"
          >
            {/* Верхний блок: название, tier и описание */}
            <div className="flex flex-col md:flex-row p-6 gap-6 bg-black/50 backdrop-blur-md">
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-amber-400 drop-shadow-md">
                    {wonder.name.toUpperCase()}
                  </h2>
                  <span
                    className="text-sm font-semibold border px-2 py-0.5 rounded"
                    style={{ color: getTierColor(wonder.tier), borderColor: getTierColor(wonder.tier) }}
                  >
                    {wonder.tier}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {wonder.description}
                </p>

                {/* Эффект */}
                {wonder.effect && (
                  <div className="mt-2 p-3 bg-gray-800 rounded-lg border border-gray-700 text-gray-200 text-sm">
                    <span className="font-semibold text-amber-400">Effect: </span>
                    {wonder.effect}
                  </div>
                )}
              </div>

              {wonder.image && (
                <div className="flex-shrink-0 w-48 h-48">
                  <img
                    src={wonder.image}
                    alt={wonder.name}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Rally Units */}
            {wonder.rallyUnits && wonder.rallyUnits.length > 0 && (
              <div className="bg-gray-900 p-6">
                <div className="w-full h-px bg-gray-700 mb-2" />
                <p className="text-amber-400 font-semibold text-sm uppercase tracking-wide mb-2">
                  Rally Units:
                </p>
                <div className="flex flex-wrap gap-3">
                  {wonder.rallyUnits.map((unit, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-gray-100 px-3 py-1 rounded-lg text-sm shadow-sm"
                    >
                      {unit}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
