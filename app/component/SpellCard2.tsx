// "use client";


// export interface SpellWithBook {
//   id: number;
//   name: string;
//   tier: number;
//   type: string;
//   cost: string;
//   description: string;
//   icon: string; 
//   bookName: string;
//   bookImage: string;
// }

// interface SpellCardProps {
//   spell: SpellWithBook;
// }

// export default function SpellCard({ spell }: SpellCardProps) {
//   return (
//     <div className="flex bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      
//       {/* Картинка книги слева */}
//       <img
//         src={spell.bookImage}
//         alt={spell.bookName}
//         className="w-20 h-20 rounded-md  object-cover mr-4 flex-shrink-0"
//       />

//       {/* Основной контент заклинания */}
//       <div className="flex-1">
//         <div className="flex items-center gap-3 mb-3">
//           <img
//             src={spell.icon}
//             alt={spell.name}
//             className="w-14 h-14 rounded-md object-cover"
//           />
          
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold text-gray-100">{spell.name}</h3>
//             <p className="text-sm text-gray-400">
//               {spell.type} • Tier {spell.tier}
//             </p>
//             <p className="text-xs text-gray-500 mt-1">{spell.bookName}</p>
//           </div>
          
//           <span className="text-sm text-gray-300">{spell.cost}</span>
//         </div>
        
//         <p className="text-sm text-gray-300 leading-relaxed">{spell.description}</p>
//       </div>
// }


"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useSavedItems } from "@/context/SavedItemsContext";

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
  const { savedSpells, toggleSpell } = useSavedItems();

  // Проверяем наличие в избранном по ИМЕНИ
  const isSaved = savedSpells.includes(spell.name);

  // Форматируем стоимость
  const renderCost = () => {
    if (!spell.cost) return null;
    if (typeof spell.cost === 'string') return spell.cost;
    if (typeof spell.cost === 'object') {
      return Object.entries(spell.cost)
        .map(([key, val]) => `${val}`)
        .join(', ');
    }
    return "Cost info";
  };

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 flex flex-col h-full">
      
      {/* --- ВЕРХНЯЯ ЧАСТЬ: Книга и Название --- */}
      <div className="p-3 flex items-center justify-between gap-3 bg-zinc-800/40 border-b border-zinc-800/50 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3 overflow-hidden">
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

        {/* Кнопка Лайка */}
        <button
          onClick={(e) => {
            e.preventDefault();
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
          {renderCost() && (
            <span className="px-2 py-1 rounded border bg-zinc-800/50 border-zinc-700 text-zinc-400">
              {renderCost()}
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