"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Swords } from "lucide-react";

const tabs = [
	{
		title: "Культура",
    key: "culture",
    items: [
      "Феодалы", "Высшие", "Варвары", "Мастеровые", "Тьма",
      "Мистики", "Корсары", "Первобытные", "Присягнувшие", "Зодчие",
    ],
  },
	{
		title: "Аспекты",
    key: "aspect",
    items: ["Астрал", "Природа", "Тень", "Порядок", "Хаос", "Материя"],
  },
	{
		title: "Класс",
    key: "class",
    items: [
      "Разведчик", "Застрельщик", "Боец", "Дальний бой", "Древковое оружие",
      "Ударное оружие", "Воин со щитом", "Боевой маг", "Поддержка", "Мифическое создание",
    ],
  },
	{
		title: "Тип",
    key: "type",
    items: [
      "Фея", "Животное", "Чудовище", "Демон", "Дракон",
      "Великан", "Полугиганты", "Элементаль", "Нежить", "Эфирный",
      "Растение", "Ангел", "Конструкт", "Демон мрака", "Проклятый демон",
      "Гуманоид",
    ],
  },
];

export default function WarriorsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const segments = pathname.split("/");
	const activeKey = segments[2];
	const activeValue = segments[3] ? decodeURIComponent(segments[3]) : "";

	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

	useEffect(() => {
		if (activeKey) {
			setOpenSections((prev) => ({ ...prev, [activeKey]: true }));
		}
	}, [activeKey]);

	const toggleSection = (sectionKey: string) => {
		setOpenSections((prev) => ({
			...prev,
			[sectionKey]: !prev[sectionKey],
		}));
	};

	return (
		<main className="w-full min-h-screen bg-zinc-950 text-gray-100 font-sans">
		<div className="flex flex-col lg:flex-row min-h-screen w-full">
			{/* --- SIDEBAR (ОБЩИЙ ДЛЯ ВСЕХ) --- */}
			<aside className="w-full lg:w-72 bg-zinc-900 border-r border-zinc-800 flex-shrink-0">
				{/* ДОБАВЛЕН ЗАГОЛОВОК */}
				<div className="mt-4 h-16 flex items-center px-6 border-b border-zinc-800">
				<div className="flex items-center gap-3 text-amber-500">
					<Swords className="w-6 h-6" />
					<span className="text-lg font-bold text-white tracking-wide">
						Энциклопедия войск
					</span>
				</div>
			</div>

			<div className="h-4"></div>

			<div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-20px)] custom-scrollbar sticky top-0">
				{tabs.map((tab) => {
					const isOpen = openSections[tab.key];
					const isActiveCategory = activeKey === tab.key;
					return (
						<div key={tab.key} className="rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50">
							<button
								onClick={() => toggleSection(tab.key)}
								className={`w-full flex items-center justify-between p-4 text-left font-semibold transition-colors ${isActiveCategory
				                	? "text-yellow-500"
									: "text-gray-300 hover:text-white"
									}`}>
									{tab.title}
									{isOpen ? (
										<ChevronDown size={18} />
									) : (
										<ChevronRight size={18} />
									)}
							</button>
							<AnimatePresence>
								{isOpen && (
									<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									className="overflow-hidden">
								<ul className="bg-zinc-950/30 border-t border-zinc-800/50 py-2">
									{tab.items.map((item) => {
									const isSelected =
									isActiveCategory &&
									activeValue === item;
								return (
									<li key={item}>
									<Link
									href={`/warriors/${tab.key}/${item}`}
									className={`block w-full text-left px-6 py-2 text-sm transition-all border-l-2 ${
									isSelected
									? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
									: "border-transparent text-gray-400 hover:text-gray-200 hover:border-zinc-600"
									}`}
									>
								{item}
							</Link>
						</li>
					);
				})}
			</ul>
		</motion.div>
	)}
</AnimatePresence>
</div>
);
})}
</div>
</aside>
{children}
</div>
</main>
	);
}