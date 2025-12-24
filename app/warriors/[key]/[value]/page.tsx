"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import UnitCard from "../../../component/warrior-card";
import { Loader2 } from "lucide-react";

type Unit = {
  id: number;
  name: string;
  tier: string;
  aspects: string[];
  health: number;
  attack: number;
  defense: number;
  resistance: number;
  movement: number;
  upkeep: any;
  cost: any;
  unit_class: string; 
  type: string;
  culture: string;
  vulnerabilities: string[];
  image: string;
};

const titles: Record<string, string> = {
  culture: "Культура",
  aspect: "Аспекты",
  class: "Класс",
  type: "Прочее"
};

export default function FilteredUnitsPage() {
  const params = useParams();
  const key = params.key as string;
  const value = decodeURIComponent(params.value as string);

  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      setLoading(true);
      let query = supabase.from("units").select("*");

      switch (key) {
        case "culture":
          query = query.eq("culture", value);
          break;
        case "aspect":
          query = query.contains("aspects", [value]);
          break;
        case "class":
          query = query.eq("unit_class", value);
          break;
        case "type":
          query = query.eq("type", value);
          break;
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching units:", error);
      } else {
        setUnits(data || []);
      }
      setLoading(false);
    };

    fetchUnits();
  }, [key, value]);

  const categoryTitle = titles[key] || key;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh] w-full">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <section className="flex-1 p-6 lg:p-10 overflow-y-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
          {categoryTitle}: <span className="text-yellow-500">{value}</span>
        </h1>
        <p className="text-zinc-400 text-sm">Найдено юнитов: {units.length}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {units.length > 0 ? (
          units.map((unit) => (
            <div key={unit.id} className="transform transition hover:scale-[1.02]">
              
              <UnitCard 
                unit={{
                  ...unit,
                  unitClass: unit.unit_class as any,
                  tier: unit.tier as any,
                  type: unit.type as any,
                  culture: unit.culture as any,
                }} 
              />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed w-full">
<p className="text-xl text-gray-400">
Нет юнитов для выбранного фильтра
</p>
</div>
)}
</div>
</section>
);
}

