// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import { useRouter } from "next/navigation";

// // Данные меню (можно вынести в отдельный файл constants.ts, чтобы не дублировать)
// const tabs = [
// 	{
// 		title: "Культура",
// 		key: "culture",
// 		items: [
// 			"ФЕОДАЛЫ",
// 			"ВЫСШИЕ",
// 			"ВАРВАР",
// 			"МАСТЕРСКИЙ",
// 			"ТЬМА",
// 			"МИСТИКИ",
// 			"КОРСАРЫ",
// 			"ПЕРВОБЫТНЫЕ",
// 			"ПРИСЯГНУВШИЕ",
// 			"ЗОДЧИЕ",
// 		],
// 	},
// 	{
// 		title: "Аспекты",
// 		key: "aspect",
// 		items: ["Astral", "Nature", "Shadow", "Order", "Chaos", "Matter"],
// 	},
// 	{
// 		title: "Класс",
// 		key: "class",
// 		items: [
// 			"РАЗВЕДЧИК",
// 			"ЗАСТРЕЛЬЩИК",
// 			"БОЕЦ",
// 			"СТРЕЛОК",
// 			"ВОИН С ПИКОЙ",
// 			"УДАРНЫЙ ВОИН",
// 			"ВОИН СО ЩИТОМ",
// 			"БОЕВЫЕ МАГ",
// 			"ВОИН ПОДДЕРЖКИ",
// 			"МИФИЧЕСКОЕ СОЗДАНИЕ",
// 		],
// 	},
// 	{
// 		title: "Прочее",
// 		key: "type",
// 		items: [
// 			"ФЕЯ",
// 			"ЖИВОТНОЕ",
// 			"ЧУДОВИЩНЫЙ",
// 			"ДЕМОН",
// 			"ДРАКОН",
// 			"ВЕЛИКАНЫ И ПОЛУГИГАНТЫ",
// 			"ЭЛЕМЕНТАЛЬ",
// 			"НЕЖИТЬ",
// 			"БЕСПЛОТНЫЙ",
// 			"РАСТЕНИЕ",
// 			"АНГЕЛ",
// 			"КОНСТРУКЦИЯ",
// 			"ДЕМОН МРАКА",
// 			"ПРОКЛЯТЫЙ ДЕМОН",
// 			"Осадные машины",
// 			"Башни",
// 		],
// 	},
// ];

// export default function WarriorsPage() {
// 	const [openTab, setOpenTab] = useState<string | null>(null);
// 	const router = useRouter();

// 	const handleSelect = (key: string, value: string) => {
// 		// Переход на динамический маршрут
// 		router.push(`/warriors/${key}/${encodeURIComponent(value)}`);
// 	};

// 	return (
// 		<main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8 overflow-x-hidden font-sans">
// 			<h1 className="text-4xl font-bold mb-8 text-center tracking-wide text-white drop-shadow-lg">
// 				Воины древних культур
// 			</h1>

// 			<div className="flex flex-wrap justify-center gap-4 mb-12 relative z-20">
// 				{tabs.map((tab) => (
// 					<div key={tab.title} className="relative">
// 						<button
// 							onClick={() =>
// 								setOpenTab(openTab === tab.title ? null : tab.title)
// 							}
// 							className={`flex items-center gap-2 px-6 py-2 rounded-2xl transition-all border border-transparent bg-zinc-800 hover:bg-zinc-700 border-zinc-700`}
// 						>
// 							{tab.title}
// 							<ChevronDown
// 								className={`w-4 h-4 transition-transform ${
// 									openTab === tab.title ? "rotate-180" : ""
// 								}`}
// 							/>
// 						</button>

// 						{openTab === tab.title && (
// 							<motion.div
// 								initial={{ opacity: 0, y: -10 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								exit={{ opacity: 0, y: -10 }}
// 								className="absolute left-0 z-30 mt-2 w-64 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden"
// 							>
// 								<ul className="max-h-80 overflow-y-auto custom-scrollbar">
// 									{tab.items.map((item) => (
// 										<li
// 											key={item}
// 											onClick={() => handleSelect(tab.key, item)}
// 											className="px-4 py-3 hover:bg-zinc-800 cursor-pointer text-sm border-b border-zinc-800 last:border-0 transition-colors hover:text-yellow-400"
// 										>
// 											{item}
// 										</li>
// 									))}
// 								</ul>
// 							</motion.div>
// 						)}
// 					</div>
// 				))}
// 			</div>

// 			<div className="text-center text-gray-500 mt-20 bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 max-w-2xl mx-auto">
// 				Выберите категорию выше, чтобы перейти к полному списку юнитов.
// 			</div>
// 		</main>
// 	);
// }


// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { units, Aspect, UnitClass, UnitType, Culture } from "../lib/warrior";
// import UnitCard from "../component/warrior-card";

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

// export default function WarriorsPage() {
//   // Устанавливаем дефолтные значения: Культура -> ФЕОДАЛЫ
//   const [activeKey, setActiveKey] = useState<string>("culture");
//   const [activeValue, setActiveValue] = useState<string>("ФЕОДАЛЫ");

//   // Раскрываем секцию "culture" по умолчанию
//   const [openSections, setOpenSections] = useState<Record<string, boolean>>({
//     culture: true,
//   });

//   const toggleSection = (sectionKey: string) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [sectionKey]: !prev[sectionKey],
//     }));
//   };

//   const handleSelect = (key: string, value: string) => {
//     setActiveKey(key);
//     setActiveValue(value);
//   };

//   const filtered = units.filter((unit) => {
//     switch (activeKey) {
//       case "culture":
//         return unit.culture === (activeValue as Culture);
//       case "aspect":
//         return unit.aspects.includes(activeValue as Aspect);
//       case "class":
//         return unit.unitClass === (activeValue as UnitClass);
//       case "type":
//         return unit.type === (activeValue as UnitType);
//       default:
//         return false;
//     }
//   });

//   // Находим заголовок текущей категории для отображения
//   const currentTabTitle = tabs.find((t) => t.key === activeKey)?.title;

//   return (
//     <main className="w-full min-h-screen bg-zinc-950 text-gray-100 font-sans">
//       <div className="flex flex-col lg:flex-row min-h-screen w-full">
        
//         {/* --- SIDEBAR --- */}
//         <aside className="w-full lg:w-72 bg-zinc-900 border-r border-zinc-800 flex-shrink-0">
//           {/* Заголовок сайдбара (опционально, можно убрать padding-top если не нужен) */}
//           <div className="h-4"></div>
          
//           <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-20px)] custom-scrollbar sticky top-0">
//             {tabs.map((tab) => {
//               const isOpen = openSections[tab.key];
//               const isActiveCategory = activeKey === tab.key;

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
//                             const isSelected = isActiveCategory && activeValue === item;
//                             return (
//                               <li key={item}>
//                                 <button
//                                   onClick={() => handleSelect(tab.key, item)}
//                                   className={`w-full text-left px-6 py-2 text-sm transition-all border-l-2 ${
//                                     isSelected
//                                       ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
//                                       : "border-transparent text-gray-400 hover:text-gray-200 hover:border-zinc-600"
//                                   }`}
//                                 >
//                                   {item}
//                                 </button>
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
//         <section className="flex-1 p-6 lg:p-10 overflow-y-auto w-full">
//           <header className="mb-8">
//             <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
//               {currentTabTitle}: <span className="text-yellow-500">{activeValue}</span>
//             </h1>
//             <p className="text-zinc-400 text-sm">Найдено юнитов: {filtered.length}</p>
//           </header>

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
//             {filtered.length > 0 ? (
//               filtered.map((unit) => (
//                 <div key={unit.id} className="transform transition hover:scale-[1.02]">
//                   <UnitCard unit={unit} />
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full py-20 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed w-full">
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

import { redirect } from "next/navigation";

export default function WarriorsPage() {
  redirect("/warriors/culture/ФЕОДАЛЫ");
}