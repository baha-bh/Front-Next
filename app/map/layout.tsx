"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Map as MapIcon, ChevronDown, ChevronRight } from "lucide-react";
import { events } from "../lib/Events"; 

const menuConfig = [
  { 
    key: "materials", 
    label: "MAGIC MATERIALS", 
    hasSubmenu: false 
  },
  { 
    key: "wonders", 
    label: "ANCIENT WONDERS", 
    hasSubmenu: true,
    items: ["Bronze", "Silver", "Gold"] 
  },
  { 
    key: "landmarks", 
    label: "LANDMARKS", 
    hasSubmenu: false 
  },
  { 
    key: "cosmic", 
    label: "COSMIC HAPPENINGS", 
    hasSubmenu: true,
    items: ["All", ...Array.from(new Set(events.map(e => e.category)))]
  },
];

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const activeSection = segments[2]; 
  const activeSubsection = segments[3] ? decodeURIComponent(segments[3]) : "";

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (activeSection) {
      setOpenSections((prev) => ({ ...prev, [activeSection]: true }));
    }
  }, [activeSection]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-gray-100 font-sans">
      <div className="flex flex-col lg:flex-row min-h-screen w-full">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-full lg:w-72 bg-zinc-900 border-r border-zinc-800 flex-shrink-0">
          <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
            <MapIcon className="text-yellow-500" />
            <span className="text-xl font-bold text-white">Карта мира</span>
          </div>
          
          <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar sticky top-0">
            {menuConfig.map((section) => {
              const isOpen = openSections[section.key];
              const isActive = activeSection === section.key;

              if (!section.hasSubmenu) {
                return (
                  <Link
                    key={section.key}
                    href={`/map/${section.key}/all`}
                    className={`w-full flex items-center justify-between p-4 text-left font-semibold transition-colors rounded-xl border ${
                      isActive 
                        ? "text-yellow-500 bg-zinc-900/50 border-zinc-800/50" 
                        : "text-gray-300 hover:text-white border-transparent hover:bg-zinc-900/30"
                    }`}
                  >
                    {section.label}
                  </Link>
                );
              }

              return (
                <div key={section.key} className="rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50">
                  <button
                    onClick={() => toggleSection(section.key)}
                    className={`w-full flex items-center justify-between p-4 text-left font-semibold transition-colors ${
                      isActive ? "text-yellow-500" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {section.label}
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>

                  <AnimatePresence>
                    {isOpen && section.items && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="bg-zinc-950/30 border-t border-zinc-800/50 py-2">
                          {section.items.map((item) => {
                            const isSelected = isActive && activeSubsection === item;
                            return (
                              <li key={item}>
                                <Link
                                  href={`/map/${section.key}/${encodeURIComponent(item)}`}
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

        {/* --- CONTENT --- */}
        {children}
        
      </div>
    </main>
  );
}