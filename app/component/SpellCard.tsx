"use client";

import { Heart } from "lucide-react";
import { useSavedItems } from "@/context/SavedItemsContext";

interface Spell {
  id: number;
  name: string;
  tier: number;
  type: string;
  cost: string;
  description: string;
  icon: string;
}

export default function SpellCard({ spell }: { spell: Spell }) {
  const { savedSpells, toggleSpell } = useSavedItems();
  const isSaved = savedSpells.includes(spell.name);

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 relative">
      <div className="flex items-center gap-4 mb-3">
        <img
          src={spell.icon}
          alt={spell.name}
          style={{ width: 70, height: 70 }}
          className="rounded-lg object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-100 truncate pr-2">{spell.name}</h3>
            <button
              onClick={() => toggleSpell(spell.name)}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSaved ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-400"
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-gray-400 truncate">
            {spell.type} • Tier {spell.tier}
          </p>
          <p className="text-xs text-yellow-500 mt-1">{spell.cost}</p>
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">{spell.description}</p>
    </div>
  );
}
