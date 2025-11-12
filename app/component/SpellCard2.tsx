"use client";


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
}

interface SpellCardProps {
  spell: SpellWithBook;
}

export default function SpellCard({ spell }: SpellCardProps) {
  return (
    <div className="flex bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Картинка книги слева */}
      <img
        src={spell.bookImage}
        alt={spell.bookName}
        className="w-20 h-20 rounded-md  object-cover mr-4 flex-shrink-0"
      />

      {/* Основной контент заклинания */}
      <div className="flex-1">
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
          
          <span className="text-sm text-gray-300">{spell.cost}</span>
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed">{spell.description}</p>
      </div>
    </div>
  );
}
