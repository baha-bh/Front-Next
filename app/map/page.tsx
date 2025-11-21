"use client";

import { useRouter } from "next/navigation";

const sections = [
  { key: "materials", label: "MAGIC MATERIALS" },
  { key: "wonders", label: "ANCIENT WONDERS" },
  { key: "landmarks", label: "LANDMARKS" },
  { key: "cosmic", label: "COSMIC HAPPENINGS" },
];

export default function MapPage() {
  const router = useRouter();

  const handleSelectSection = (key: string) => {
    router.push(`/map/${key}`);
  };

  return (
    <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8 overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-8 text-center">Spell Map</h1>

      {/* Переключатели разделов */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => handleSelectSection(section.key)}
            className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-all"
          >
            {section.label}
          </button>
        ))}
      </div>
    </main>
  );
}
