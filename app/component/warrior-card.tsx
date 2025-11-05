"use client";

import Image from "next/image";

interface Warrior {
  id: number;
  name: string;
  culture: string;
  type: string;
  class: string;
  image: string;
  background?: string;
  stats: {
    hp: number;
    armor: number;
    mana: number;
    speed: number;
    luck: number;
  };
  abilities: string[];
  maintenance: string;
  cast: string;
  tier: number;
}

export default function WarriorCard({ warrior }: { warrior: Warrior }) {
  return (
    <div className="flex bg-zinc-900/95 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 max-w-5xl mx-auto">
      {/* Левая часть — изображение */}
      <div className="relative w-2/3 h-[380px] bg-black flex items-center justify-center">
        {warrior.background && (
          <Image
            src={warrior.background}
            alt={warrior.name}
            width={400}
            height={300}
            unoptimized
            className="object-cover opacity-60 rounded-lg"
          />
        )}
      </div>

      {/* Правая часть — информация */}
      <div className="w-1/3 bg-gradient-to-b from-zinc-950 to-zinc-900 p-5 flex flex-col justify-between border-l border-zinc-800">
        <div>
          {/* Имя и описание */}
          <h2 className="text-2xl font-bold text-yellow-300 text-center mb-1">
            {warrior.name}
          </h2>
          <p className="text-center text-sm text-gray-400 mb-4">
            {warrior.culture} • {warrior.type} • {warrior.class}
          </p>

          {/* Характеристики */}
          <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-300 mb-3">
            <span>❤️ {warrior.stats.hp}</span>
            <span>🛡️ {warrior.stats.armor}</span>
            {warrior.stats.mana > 0 && <span>🔮 {warrior.stats.mana}</span>}
            <span>⚡ {warrior.stats.speed}</span>
            <span>🍀 {warrior.stats.luck}</span>
          </div>

          {/* Новые поля */}
          <div className="border-t border-gray-700 pt-3 mt-2 text-sm text-gray-300 space-y-1">
            <p>💰 <span className="text-yellow-400">Содержание:</span> {warrior.maintenance}</p>
            <p>🪄 <span className="text-yellow-400">Каст:</span> {warrior.cast}</p>
            <p>⭐ <span className="text-yellow-400">Tier:</span> {warrior.tier}</p>
          </div>

          {/* Умения */}
          <div className="border-t border-gray-700 pt-3 mt-3">
            <h3 className="text-sm text-yellow-400 mb-1 text-center">Умения:</h3>
            <ul className="text-xs text-gray-300 space-y-1 pl-3">
              {warrior.abilities.map((ability, index) => (
                <li key={index}>• {ability}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
