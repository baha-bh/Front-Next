"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useSavedItems } from "@/context/SavedItemsContext";
import { motion, AnimatePresence } from "framer-motion";

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
  const { savedSpells, toggleSpell, isAuthenticated } = useSavedItems();
  const [showLoginHint, setShowLoginHint] = useState(false);
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
            <div className="relative">
              <AnimatePresence>
                {showLoginHint && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-8 w-40 bg-red-900/90 text-white text-[10px] p-2 rounded border border-red-500/50 backdrop-blur-md shadow-xl z-50 text-center"
                  >
                    Войдите, чтобы сохранять
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginHint(true);
                    setTimeout(() => setShowLoginHint(false), 2000);
                    return;
                  }
                  toggleSpell(spell.name);
                }}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isSaved ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-400"
                  }`}
                />
              </button>
            </div>
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
