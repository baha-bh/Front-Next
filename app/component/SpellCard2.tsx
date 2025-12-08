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
//     </div>
//   );
// }


"use client";

import { Heart } from "lucide-react"; // Убедитесь, что пакет установлен: npm install lucide-react
import { useSavedItems } from "../context/SavedItemsContext";

export interface SpellWithBook {
  id: number;
  name: string;
  tier: number;
  type: string;
  cost: string;
  description: string;
  icon: string; 
  bookName: string;
  bookImage: string;
  // Опционально, если приходит из профиля
  uniqueId?: string; 
}

interface SpellCardProps {
  spell: SpellWithBook;
}

export default function SpellCard({ spell }: SpellCardProps) {
  const { isSaved, toggleFavorite } = useSavedItems();

  // Используем uniqueId (если мы в профиле) или обычный id (если в каталоге)
  // Преобразуем в строку, так как Supabase/Context ожидают string
  const spellId = spell.uniqueId || spell.id.toString();
  
  const isLiked = isSaved(spellId, "spell");

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(spellId, "spell");
  };

  return (
    // Добавил 'relative' и 'group' для позиционирования кнопки
    <div className="relative group flex bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* КНОПКА ЛАЙКА */}
      <button
        onClick={handleLike}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/20 hover:bg-black/50 transition-colors"
        title={isLiked ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          size={18}
          className={`transition-colors duration-300 ${
            isLiked 
              ? "fill-red-500 text-red-500" 
              : "text-gray-400 group-hover:text-gray-200"
          }`}
        />
      </button>

      {/* Картинка книги слева */}
      <img
        src={spell.bookImage}
        alt={spell.bookName}
        className="w-20 h-20 rounded-md object-cover mr-4 flex-shrink-0"
      />

      {/* Основной контент заклинания */}
      <div className="flex-1 pr-8"> {/* Добавил pr-8 чтобы текст не наезжал на кнопку лайка */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={spell.icon}
            alt={spell.name}
            className="w-14 h-14 rounded-md object-cover"
          />
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-100">{spell.name}</h3>
            <p className="text-sm text-gray-400">
              {spell.type} • Tier {spell.tier}
            </p>
            <p className="text-xs text-gray-500 mt-1">{spell.bookName}</p>
          </div>
          
          {/* Цена смещена чуть ниже или левее, если мешает кнопке */}
          <span className="text-sm text-gray-300 mt-6 md:mt-0">{spell.cost}</span>
</div>
<p className="text-sm text-gray-300 leading-relaxed">{spell.description}</p>
  </div>
</div>
);
}