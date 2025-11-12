"use client";

import { type AncientWonder } from "../lib/Ancient";

export default function AncientWonderCard({ wonder }: { wonder: AncientWonder }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-gray-700 shadow-md hover:border-amber-600/40 transition-all duration-300">
      
      {/* Верхняя часть: текст слева, картинка справа */}
      <div className="flex flex-col md:flex-row p-6 gap-6 bg-black/50 backdrop-blur-md">
        
        {/* Левый блок с текстом */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Название с Tier */}
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-amber-400 drop-shadow-md">
              {wonder.name.toUpperCase()}
            </h2>
            <span className="text-sm text-gray-300 font-semibold border px-2 py-0.5 rounded">
              {wonder.tier}
            </span>
          </div>

          {/* Описание */}
          <p className="text-sm text-gray-300 leading-relaxed">
            {wonder.description}
          </p>
        </div>

        {/* Правый блок с основной картинкой */}
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

      {/* Нижний блок: Rally Units */}
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
  );
}
