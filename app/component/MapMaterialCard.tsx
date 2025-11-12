"use client";

import { type MagicMaterial } from "../lib/Map";

interface MapMaterial {
  id: number;
  name: string;
  description: string;
  author: string;
  globalEffect: string;
  image?: string;       
  icon?: string;        
}

export default function MapMaterialCard({ material }: { material: MapMaterial }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-gray-700 shadow-md hover:border-amber-600/40 transition-all duration-300">
      
      {/* Верхняя часть: текст слева, картинка справа */}
      <div className="flex flex-col md:flex-row p-6 gap-6 bg-black/50 backdrop-blur-md">
        {/* Левый блок с текстом */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Название с иконкой слева */}
          <div className="flex items-center gap-3">
            {material.icon && (
              <img
                src={material.icon}
                alt={`${material.name} icon`}
                className="w-[50px] h-[50px] object-contain rounded"
              />
            )}
            <h2 className="text-2xl font-bold text-amber-400 drop-shadow-md">
              {material.name.toUpperCase()}
            </h2>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            {material.description}
          </p>

          <div className="border-l-4 border-amber-700 pl-3 text-sm text-gray-400 italic">
            {material.author}
          </div>
        </div>

        {/* Правый блок с основной картинкой */}
        {material.image && (
          <div className="flex-shrink-0 w-48 h-48">
            <img
              src={material.image}
              alt={material.name}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Нижний блок: непрозрачный */}
      <div className="bg-gray-900 p-6">
        <div className="w-full h-px bg-gray-700 mb-2" />

        <p className="text-amber-400 font-semibold text-sm uppercase tracking-wide">
          Уникальный глобальный эффект:
        </p>
        <p className="text-gray-100 text-base mt-1">
          {material.globalEffect}
        </p>
      </div>
    </div>
  );
}
