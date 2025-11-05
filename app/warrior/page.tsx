"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import WarriorCard from "../component/warrior-card";

const tabs = [
  {
    title: "Культура",
    key: "culture",
    items: ["Азия", "Европа", "Африка", "Америки", "Другое"],
  },
  {
    title: "Книги",
    key: "books",
    items: ["Легенды", "Хроники", "Современные источники"],
  },
  {
    title: "Типы",
    key: "types",
    items: ["Воин", "Шаман", "Страж", "Лучник", "Наёмник"],
  },
  {
    title: "Класс",
    key: "class",
    items: ["Эпический", "Редкий", "Обычный", "Мифический"],
  },
  {
    title: "Прочее",
    key: "other",
    items: ["Оружие", "Тактика", "История", "Символика"],
  },
];

const warriors = [
  {
    id: 1,
    name: "Самурай",
    culture: "Азия",
    type: "Воин",
    class: "Редкий",
    image: "/images/samurai.png",
    background: "https://minionsart.github.io/aow4db/PreviewsAvif/defender.avif",
    stats: { hp: 60, armor: 20, mana: 0, speed: 35, luck: 5 },
    abilities: [
      "Мощный удар катаной",
      "Стойкость духа",
      "Боевой клич",
      "Путь воина",
    ],
    maintenance: "2 золота/ход", 
    cast: "Боевой маг",          
    tier: 3,                     
  },
  {
    id: 2,
    name: "Самурай",
    culture: "Азия",
    type: "Воин",
    class: "Редкий",
    image: "/images/samurai.png",
    background: "https://minionsart.github.io/aow4db/PreviewsAvif/defender.avif",
    stats: { hp: 60, armor: 20, mana: 0, speed: 35, luck: 5 },
    abilities: [
      "Мощный удар катаной",
      "Стойкость духа",
      "Боевой клич",
      "Путь воина",
    ],
    maintenance: "2", 
    cast: "30 золотых",          
    tier: 3,                     
  },
];



export default function WarriorsPage() {
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSelect = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setOpenTab(null);
  };

  const filtered = warriors.filter((warrior) =>
    Object.entries(filters).every(([key, value]) => {
      return warrior[key as keyof typeof warrior] === value;
    })
  );

  return (
<main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8 overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
        Воины древних культур
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map((tab) => (
          <div key={tab.title} className="relative">
            <button
              onClick={() =>
                setOpenTab(openTab === tab.title ? null : tab.title)
              }
              className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-all"
            >
              {tab.title}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openTab === tab.title ? "rotate-180" : ""
                }`}
              />
            </button>

            {openTab === tab.title && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-2 w-52 bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg"
              >
                <ul className="p-2">
                  {tab.items.map((item) => (
                    <li
                      key={item}
                      onClick={() => handleSelect(tab.key, item)}
                      className="px-4 py-2 hover:bg-zinc-700 rounded-lg cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Выбранные фильтры */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {Object.entries(filters).map(([key, value]) => (
          <span
            key={key}
            className="bg-zinc-800 text-gray-300 px-3 py-1 rounded-xl text-sm border border-zinc-700"
          >
            {value}
          </span>
        ))}
      </div>

    {/* Карточки юнитов */}
<section className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
  {filtered.length > 0 ? (
    filtered.map((warrior) => (
      <WarriorCard key={warrior.id} warrior={warrior} />
    ))
  ) : (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg p-6 text-center text-gray-400 w-full">
      Выбери категорию выше, чтобы увидеть воинов.
    </div>
  )}
</section>
    </main>
  );
}
