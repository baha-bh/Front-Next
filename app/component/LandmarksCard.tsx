"use client";

import { type Landmark } from "../lib/landmarks";

interface LandmarkCardProps {
  landmark: Landmark;
}

export default function LandmarkCard({ landmark }: LandmarkCardProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-gray-700 shadow-md hover:border-amber-600/40 transition-all duration-300">
      
      {/* Верхняя часть: текст слева, картинка справа */}
      <div className="flex flex-col md:flex-row p-6 gap-6 bg-black/50 backdrop-blur-md">
        
        {/* Левый блок с текстом */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Название */}
          <h2 className="text-2xl font-bold text-amber-400 drop-shadow-md">
            {landmark.name.toUpperCase()}
          </h2>

          {/* Описание */}
          <p className="text-sm text-gray-300 leading-relaxed">
            {landmark.description}
          </p>

          {/* Автор */}
          {landmark.author && (
            <div className="border-l-4 border-amber-700 pl-3 text-sm text-gray-400 italic">
              {landmark.author}
            </div>
          )}

          {/* Эффект */}
          {landmark.effect && (
            <p className="text-gray-100 mt-2">{landmark.effect}</p>
          )}
        </div>

        {/* Правый блок с основной картинкой */}
        {landmark.image && (
          <div className="flex-shrink-0 w-48 h-48">
            <img
              src={landmark.image}
              alt={landmark.name}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
