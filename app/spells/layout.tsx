"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

const categories = [
  { key: "transformation", label: "Трансформации" },
  { key: "combat", label: "Боевые заклинания" },
  { key: "enchantment", label: "Чары" },
  { key: "strategic", label: "Стратегические" },
  { key: "siege", label: "Осадные проекты" },
];

export default function SpellsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeType = pathname.split("/")[2];

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-gray-100 font-sans">
      <div className="flex flex-col lg:flex-row min-h-screen w-full">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-full lg:w-72 bg-zinc-900 border-r border-zinc-800 flex-shrink-0">
          <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
            <Sparkles className="text-yellow-500" />
            <span className="text-xl font-bold text-white">Библиотека магии</span>
          </div>
          
          <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar sticky top-0">
            <div className="rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50">
              <div className="p-4 font-semibold text-gray-300">Категории</div>
              <ul className="bg-zinc-950/30 border-t border-zinc-800/50 py-2">
                {categories.map((cat) => {
                  const isSelected = activeType === cat.key;
                  return (
                    <li key={cat.key}>
                      <Link
                        href={`/spells/${cat.key}`}
                        className={`block w-full text-left px-6 py-2 text-sm transition-all border-l-2 ${
                          isSelected
                            ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
                            : "border-transparent text-gray-400 hover:text-gray-200 hover:border-zinc-600"
                        }`}
                      >
                        {cat.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>

        {/* --- CONTENT --- */}
        {children}
        
      </div>
    </main>
  );
}