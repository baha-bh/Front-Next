// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { units, Aspect, UnitClass, UnitType, Culture } from "../../../lib/warrior";
// import UnitCard from "../../../component/warrior-card";

// const tabs = [
//   {
//     title: "Культура",
//     key: "culture",
//     items: [
//       "ФЕОДАЛЫ", "ВЫСШИЕ", "ВАРВАР", "МАСТЕРСКИЙ", "ТЬМА",
//       "МИСТИКИ", "КОРСАРЫ", "ПЕРВОБЫТНЫЕ", "ПРИСЯГНУВШИЕ", "ЗОДЧИЕ",
//     ],
//   },
//   {
//     title: "Аспекты",
//     key: "aspect",
//     items: ["Astral", "Nature", "Shadow", "Order", "Chaos", "Matter"],
//   },
//   {
//     title: "Класс",
//     key: "class",
//     items: [
//       "РАЗВЕДЧИК", "ЗАСТРЕЛЬЩИК", "БОЕЦ", "СТРЕЛОК", "ВОИН С ПИКОЙ",
//       "УДАРНЫЙ ВОИН", "ВОИН СО ЩИТОМ", "БОЕВЫЕ МАГ", "ВОИН ПОДДЕРЖКИ", "МИФИЧЕСКОЕ СОЗДАНИЕ",
//     ],
//   },
//   {
//     title: "Прочее",
//     key: "type",
//     items: [
//       "ФЕЯ", "ЖИВОТНОЕ", "ЧУДОВИЩНЫЙ", "ДЕМОН", "ДРАКОН",
//       "ВЕЛИКАНЫ И ПОЛУГИГАНТЫ", "ЭЛЕМЕНТАЛЬ", "НЕЖИТЬ", "БЕСПЛОТНЫЙ",
//       "РАСТЕНИЕ", "АНГЕЛ", "КОНСТРУКЦИЯ", "ДЕМОН МРАКА", "ПРОКЛЯТЫЙ ДЕМОН",
//       "Осадные машины", "Башни",
//     ],
//   },
// ];

// export default function FilteredUnitsPage() {
//   const params = useParams();
//   const key = params.key as string;
//   const value = decodeURIComponent(params.value as string);

//   const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     if (key) {
//       setOpenSections((prev) => ({ ...prev, [key]: true }));
//     }
//   }, [key]);

//   const toggleSection = (sectionKey: string) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [sectionKey]: !prev[sectionKey],
//     }));
//   };

//   const filtered = units.filter((unit) => {
//     switch (key) {
//       case "culture":
//         return unit.culture === (value as Culture);
//       case "aspect":
//         return unit.aspects.includes(value as Aspect);
//       case "class":
//         return unit.unitClass === (value as UnitClass);
//       case "type":
//         return unit.type === (value as UnitType);
//       default:
//         return false;
//     }
//   });

//   return (
//     <main className="min-h-screen bg-zinc-950 text-gray-100 font-sans">
//       <div className="flex flex-col lg:flex-row min-h-screen">
        
//         {/* --- SIDEBAR --- */}
//         <aside className="w-full lg:w-72 bg-zinc-900 border-r border-zinc-800 flex-shrink-0">
//           <div className="p-6 border-b border-zinc-800">
//             <Link href="/warriors" className="text-xl font-bold text-white hover:text-yellow-500 transition flex items-center gap-2">
//               <span>←</span> Назад
//             </Link>
//           </div>
          
//           <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar sticky top-0">
//             {tabs.map((tab) => {
//               const isOpen = openSections[tab.key];
//               const isActiveCategory = key === tab.key;

//               return (
//                 <div key={tab.key} className="rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50">
//                   <button
//                     onClick={() => toggleSection(tab.key)}
//                     className={`w-full flex items-center justify-between p-4 text-left font-semibold transition-colors ${
//                       isActiveCategory ? "text-yellow-500" : "text-gray-300 hover:text-white"
//                     }`}
//                   >
//                     {tab.title}
//                     {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//                   </button>

//                   <AnimatePresence>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         className="overflow-hidden"
//                       >
//                         <ul className="bg-zinc-950/30 border-t border-zinc-800/50 py-2">
//                           {tab.items.map((item) => {
//                             const isSelected = isActiveCategory && value === item;
//                             return (
//                               <li key={item}>
//                                 <Link
//                                   href={`/warriors/${tab.key}/${encodeURIComponent(item)}`}
//                                   className={`block px-6 py-2 text-sm transition-all border-l-2 ${
//                                     isSelected
//                                       ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
//                                       : "border-transparent text-gray-400 hover:text-gray-200 hover:border-zinc-600"
//                                   }`}
//                                 >
//                                   {item}
//                                 </Link>
//                               </li>
//                             );
//                           })}
//                         </ul>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>
//         </aside>

//         {/* --- MAIN CONTENT --- */}
//         <section className="flex-1 p-6 lg:p-10 overflow-y-auto">
//           <header className="mb-8">
//             <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
//               {tabs.find(t => t.key === key)?.title}: <span className="text-yellow-500">{value}</span>
//             </h1>
//             <p className="text-zinc-400 text-sm">Найдено юнитов: {filtered.length}</p>
//           </header>

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filtered.length > 0 ? (
//               filtered.map((unit) => (
//                 <div key={unit.id} className="transform transition hover:scale-[1.02]">
//                   <UnitCard unit={unit} />
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full py-20 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
//                 <p className="text-xl text-gray-400">
//                   Нет юнитов для выбранного фильтра
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import UnitCard from "../../../component/warrior-card";
import { Loader2 } from "lucide-react";

// Типы данных, соответствующие вашей БД
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
  unit_class: string; // В БД это поле называется unit_class
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
  // Декодируем значение из URL (например "ФЕОДАЛЫ" -> "Феодалы" если нужно, или оставляем как есть)
  const value = decodeURIComponent(params.value as string);

  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      setLoading(true);
      let query = supabase.from("units").select("*");

      // Логика фильтрации в зависимости от параметра URL
      switch (key) {
        case "culture":
          // Фильтр по культуре (точное совпадение)
          query = query.eq("culture", value);
          break;
        case "aspect":
          // Фильтр по массиву аспектов (содержит значение)
          query = query.contains("aspects", [value]);
          break;
        case "class":
          // Фильтр по классу (точное совпадение)
          // В базе поле называется unit_class
          query = query.eq("unit_class", value);
          break;
        case "type":
          // Фильтр по типу (точное совпадение)
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
                  // Приводим типы к any, чтобы TypeScript пропустил данные из БД
                  unitClass: unit.unit_class as any,
                  tier: unit.tier as any,
                  // aspects: unit.aspects as any, // УДАЛЕНО: Это свойство не нужно в карточке
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

