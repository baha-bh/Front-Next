"use client";

import Image from "next/image";
import { Unit } from "../lib/warrior";

interface UnitCardProps {
  unit: Unit;
}

export default function UnitCard({ unit }: UnitCardProps) {
  return (
    <div className="flex flex-col md:flex-row bg-zinc-900/95 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 max-w-5xl mx-auto">
      
      {/* Левая часть — изображение */}
      <div className="relative w-full md:w-2/5 h-64 md:h-auto bg-black flex items-center justify-center">
        {unit.image && (
          <Image
            src={unit.image}
            alt={unit.name}
            width={400}
            height={300}
            unoptimized
            className="object-cover rounded-lg"
          />
        )}
      </div>

      {/* Правая часть — информация */}
      <div className="w-full md:w-3/5 bg-gradient-to-b from-zinc-950 to-zinc-900 p-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-800">
        <div>
          {/* Название и базовая информация */}
          <h2 className="text-2xl font-bold text-yellow-300 text-center mb-1">
            {unit.name}
          </h2>
          <p className="text-center text-sm text-gray-400 mb-3">
            {unit.culture} • {unit.type} • {unit.unitClass} • Tier {unit.tier}
          </p>

          {/* Аспекты */}
          {unit.aspects && unit.aspects.length > 0 && (
            <p className="text-center text-sm text-gray-300 mb-3">
              Аспекты: {unit.aspects.join(", ")}
            </p>
          )}

          {/* Характеристики */}
          <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-300 mb-3">
            <span>❤️ {unit.health}</span>
            <span>⚔️ {unit.attack}</span>
            <span>🛡️ {unit.defense}</span>
            <span>🔮 {unit.resistance}</span>
            <span>🚶 {unit.movement}</span>
          </div>

          {/* Содержание и стоимость */}
          <div className="border-t border-gray-700 pt-3 mt-2 text-sm text-gray-300 space-y-1">
            <p>
              💰 <span className="text-yellow-400">Содержание:</span> {unit.upkeep.resource1} {unit.upkeep.amount1}
              {unit.upkeep.resource2 && ` / ${unit.upkeep.resource2} ${unit.upkeep.amount2}`}
            </p>
            <p>
              🪙 <span className="text-yellow-400">Цена:</span> {unit.cost.resource1} {unit.cost.amount1}
              {unit.cost.resource2 && ` / ${unit.cost.resource2} ${unit.cost.amount2}`}
            </p>
          </div>

          {/* Уязвимости */}
          {unit.vulnerabilities && unit.vulnerabilities.length > 0 && (
            <div className="border-t border-gray-700 pt-3 mt-3">
              <h3 className="text-sm text-yellow-400 mb-1 text-center">Уязвимости:</h3>
              <ul className="text-xs text-gray-300 space-y-1 pl-3">
                {unit.vulnerabilities.map((vul, index) => (
                  <li key={index}>• {vul}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
