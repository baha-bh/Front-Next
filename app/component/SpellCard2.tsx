"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useSavedItems } from "@/context/SavedItemsContext";
import { motion, AnimatePresence } from "framer-motion";

interface Spell {
  id: number | string;
  name: string;
  tier: number;
  is_combat?: boolean;
  description?: string;
  cost?: any; 
  icon?: string; // Используем icon вместо image
  bookName?: string;
  bookImage?: string;
}

export default function SpellCard({ spell }: { spell: Spell }) {
  const { savedSpells, toggleSpell, isAuthenticated } = useSavedItems();
  const [showLoginHint, setShowLoginHint] = useState(false);

  const isSaved = savedSpells.includes(spell.name);

  const renderCost = () => {
    if (!spell.cost) return null;
    let val = spell.cost;
    if (typeof val === 'object') {
       val = Object.values(val).join(', ');
    }
    return `${val} маны`;
  };

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 flex flex-col h-full">
      
      {/* --- ВЕРХНЯЯ ЧАСТЬ: Книга и Название --- */}
      <div className="p-3 flex items-center justify-between gap-3 bg-zinc-800/40 border-b border-zinc-800/50 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          {/* Иконка книги */}
          <div className="relative w-8 h-8 flex-shrink-0 rounded-md overflow-hidden border border-zinc-700 shadow-sm bg-zinc-900">
            {spell.bookImage ? (
              <Image
                src={spell.bookImage}
                alt={spell.bookName || "Book"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600">?</div>
            )}
          </div>
          
          {/* Название и Книга */}
          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-gray-100 text-sm leading-tight truncate group-hover:text-amber-400 transition-colors">
              {spell.name}
            </h3>
            <p className="text-[10px] text-zinc-500 truncate">
              {spell.bookName || "Неизвестная книга"}
            </p>
          </div>
        </div>

        {/* Стоимость (перенесено сюда) */}
        {renderCost() && (
            <div className="flex-shrink-0 px-2 py-1 rounded bg-zinc-900/80 border border-zinc-700 text-[10px] text-zinc-300 font-mono whitespace-nowrap">
                {renderCost()}
            </div>
        )}

        {/* Кнопка Лайка */}
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
            onClick={(e) => {
              e.preventDefault();
              if (!isAuthenticated) {
                setShowLoginHint(true);
                setTimeout(() => setShowLoginHint(false), 2000);
                return;
              }
              toggleSpell(spell.name);
            }}
            className="relative z-20 p-1.5 rounded-full hover:bg-zinc-800 transition-colors focus:outline-none group/heart"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isSaved 
                  ? "fill-red-500 text-red-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                  : "text-zinc-600 group-hover/heart:text-red-400"
              }`}
            />
          </button>
        </div>
      </div>

      {/* --- КАРТИНКА ЗАКЛИНАНИЯ (ICON) --- */}
      <div className="relative w-full h-40 bg-zinc-950/50 flex items-center justify-center p-4 group-hover:bg-zinc-950/30 transition-colors">
        {spell.icon ? (
          <Image
            src={spell.icon}
            alt={spell.name}
            fill
            className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <span className="text-zinc-700 text-xs">Нет изображения</span>
        )}

        {/* Бейдж Тира */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
          Tier {spell.tier}
        </div>
      </div>

      {/* --- ОПИСАНИЕ И ХАРАКТЕРИСТИКИ --- */}
      <div className="p-4 flex-1 flex flex-col gap-3 bg-gradient-to-b from-zinc-900 to-zinc-900/95">
        {/* Теги */}
        <div className="flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-wider">
          {spell.is_combat !== undefined && (
            <span className={`px-2 py-1 rounded border ${
              spell.is_combat 
                ? "bg-red-950/30 border-red-900/50 text-red-400" 
                : "bg-blue-950/30 border-blue-900/50 text-blue-400"
            }`}>
              {spell.is_combat ? "Боевое" : "Стратегическое"}
            </span>
          )}
        </div>

        {/* Текст описания */}
        {spell.description && (
          <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-serif">
            {spell.description}
          </p>
        )}
      </div>
    </div>
  );
}