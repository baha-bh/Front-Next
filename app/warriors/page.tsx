"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const tabs = [
  {
    title: "Культура",
    key: "culture",
    items: [
      "ФЕОДАЛЫ",
      "ВЫСШИЕ",
      "ВАРВАР",
      "МАСТЕРСКИЙ",
      "ТЬМА",
      "МИСТИКИ",
      "КОРСАРЫ",
      "ПЕРВОБЫТНЫЕ",
      "ПРИСЯГНУВШИЕ",
      "ЗОДЧИЕ",
    ],
  },
  {
    title: "Аспекты",
    key: "aspect",
    items: ["Astral", "Nature", "Shadow", "Order", "Chaos", "Matter"],
  },
  {
    title: "Класс",
    key: "class",
    items: [
      "РАЗВЕДЧИК",
      "ЗАСТРЕЛЬЩИК",
      "БОЕЦ",
      "СТРЕЛОК",
      "ВОИН С ПИКОЙ",
      "УДАРНЫЙ ВОИН",
      "ВОИН СО ЩИТОМ",
      "БОЕВЫЕ МАГ",
      "ВОИН ПОДДЕРЖКИ",
      "МИФИЧЕСКОЕ СОЗДАНИЕ",
    ],
  },
  {
    title: "Прочее",
    key: "type",
    items: [
      "ФЕЯ",
      "ЖИВОТНОЕ",
      "ЧУДОВИЩНЫЙ",
      "ДЕМОН",
      "ДРАКОН",
      "ВЕЛИКАНЫ И",
      "ПОЛУГИГАНТЫ",
      "ЭЛЕМЕНТАЛЬ",
      "НЕЖИТЬ",
      "БЕСПЛОТНЫЙ",
      "РАСТЕНИЕ",
      "АНГЕЛ",
      "КОНСТРУКЦИЯ",
      "ДЕМОН МРАКА",
      "ПРОКЛЯТЫЙ ДЕМОН",
      "Осадные машины",
      "Башни",
    ],
  },
];

export default function WarriorsPage() {
  const [openTab, setOpenTab] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (key: string, value: string) => {
  router.push(`/warriors/${key}/${encodeURIComponent(value)}`);
}

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
              className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-all">
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
                className="absolute z-10 mt-2 w-52 bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg">
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

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg p-6 text-center text-gray-400 w-full max-w-3xl mx-auto">
        Выбери категорию выше, чтобы перейти к странице со списком юнитов.
      </div>
    </main>
  );
}
