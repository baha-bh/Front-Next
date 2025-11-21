"use client";

import { usePathname } from "next/navigation";
import { units, Aspect, UnitClass, UnitType, Culture } from "../../../lib/warrior";
import UnitCard from "../../../component/warrior-card";

export default function FilteredUnitsPage() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const key = parts[2];
  const value = decodeURIComponent(parts[3]);

  const filtered = units.filter((unit) => {
    switch (key) {
      case "culture":
        return unit.culture === (value as Culture);

      case "aspect":
        return unit.aspects.includes(value as Aspect);

      case "class":
        return unit.unitClass === (value as UnitClass);

      case "type":
        return unit.type === (value as UnitType);

      default:
        return false;
    }
  });

  return (
    <main className="min-h-screen p-8 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {key.toUpperCase()}: {value}
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((unit) => <UnitCard key={unit.id} unit={unit} />)
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            Нет юнитов для выбранного фильтра
          </p>
        )}
      </section>
    </main>
  );
}
