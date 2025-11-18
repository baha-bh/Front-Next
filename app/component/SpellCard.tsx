"use client";

interface Spell {
  id: number;
  name: string;
  tier: number;
  type: string;
  cost: string;
  description: string;
  icon: string;
}

export default function SpellCard({ spell }: { spell: Spell }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4 mb-3">
        <img
          src={spell.icon}
          alt={spell.name}
          style={{ width: 70, height: 70 }}
          className="rounded-lg object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-100 truncate">{spell.name}</h3>
          <p className="text-sm text-gray-400 truncate">
            {spell.type} • Tier {spell.tier}
          </p>
        </div>

        <span className="text-sm text-gray-300 flex-shrink-0">{spell.cost}</span>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">{spell.description}</p>
    </div>
  );
}
