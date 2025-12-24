"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Shield, Zap, Activity, Move, Sword } from "lucide-react";
import { useSavedItems } from "@/context/SavedItemsContext";

interface UnitProps {
  unit: {
    id: number | string;
    name: string;
    tier: string | number;
    culture?: string;
    unitClass?: string; 
    type?: string;
    image?: string;
    defense?: number;
    resistance?: number;
    health?: number;
    movement?: number;
    aspects?: any[];
  }
}

export default function UnitCard({ unit }: UnitProps) {
  const { savedUnits, toggleUnit } = useSavedItems();
  const [imageError, setImageError] = useState(false);
  
  const isSaved = savedUnits.includes(unit.name);

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/20 flex flex-col h-full">

      <div className="relative w-full aspect-[3/4] bg-zinc-950 overflow-hidden">
      
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 via-zinc-950/80 to-zinc-950" />

        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1">
            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-zinc-700 rounded text-[10px] font-bold text-amber-500 uppercase tracking-wider shadow-lg">
              Tier {unit.tier}
            </span>
            {unit.culture && (
              <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-zinc-700 rounded text-[10px] text-zinc-300 shadow-lg">
                {unit.culture}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleUnit(unit.name);
            }}
            className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-zinc-800 border border-transparent hover:border-zinc-600 transition-all group/btn"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isSaved 
                  ? "fill-red-500 text-red-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                  : "text-zinc-400 group-hover/btn:text-red-400"
              }`}
            />
          </button>
        </div>

        <div className="absolute inset-0 flex items-end justify-center pb-4 px-2">
          {unit.image && !imageError ? (
            <Image
              src={unit.image}
              alt={unit.name}
              fill
              className="object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              unoptimized={true}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-700 gap-2">
              <Shield className="w-16 h-16 opacity-20" />
              <span className="text-xs">Нет изображения</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />
      </div>

      <div className="relative flex-1 flex flex-col bg-zinc-900 px-4 pb-4 -mt-6 z-10">
        
        <div className="mb-4 text-center">
          <h3 className="text-lg font-bold text-gray-100 leading-tight group-hover:text-amber-400 transition-colors">
            {unit.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-1 text-xs text-zinc-500">
            {unit.unitClass && (
              <span className="flex items-center gap-1">
                <Sword size={12} className="text-zinc-600" />
                {unit.unitClass}
              </span>
            )}
            {unit.type && unit.type !== unit.unitClass && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>{unit.type}</span>
              </>
            )}
          </div>
        </div>

        {/* Сетка характеристик */}
        <div className="grid grid-cols-4 gap-2 mt-auto">
           <StatBox icon={<Shield size={14} />} value={unit.defense} color="text-blue-400" label="Def" />
           <StatBox icon={<Zap size={14} />} value={unit.resistance} color="text-purple-400" label="Res" />
           <StatBox icon={<Activity size={14} />} value={unit.health} color="text-green-400" label="HP" />
           <StatBox icon={<Move size={14} />} value={unit.movement} color="text-yellow-400" label="Move" />
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, value, color, label }: { icon: React.ReactNode, value?: number, color: string, label: string }) {
  if (value === undefined) return <div className="bg-zinc-950/50 rounded-lg h-14" />; 

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group/stat">
      <div className={`text-xl ${color} mb-1`}>{icon}</div>
      <div className="text-sm text-zinc-300 text-center">
        {value}
        <span className="block text-xs uppercase">{label}</span>
      </div>
    </div>
  );

}    
  
