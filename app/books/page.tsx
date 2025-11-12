"use client";

import { useState } from "react";
import Image from "next/image";
import SpellCard from "../component/SpellCard";

interface Spell {
  id: number;
  name: string;
  tier: number;
  type: string;
  cost: string;
  description: string;
  icon: string;
}

interface Book {
  id: number;
  name: string;
  aspect: string;
  description: string;
  image: string;
  bonus: string;
  spells: Spell[];
}

const books: Book[] = [
  {
    id: 1,
    name: "Tome of Evocation",
    aspect: "Astral",
    description:
      "Эта книга посвящена искусству призыва элементальных существ и управлению магической энергией. Она усиливает способность мага наносить урон на расстоянии и вызывает магию чистой силы.",
    image:
      "https://minionsart.github.io/aow4db/Icons/TomeIcons/0000041B00001214.png",
    bonus: "+20% к урону заклинаний и +10 маны за каждый ход.",
    spells: [
      {
        id: 1,
        name: "Awakened Tools",
        tier: 1,
        type: "City Enchantment",
        cost: "50 / 10",
        description:
          "Улучшает производительность города, оживляя инструменты и усиливая производство.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/0000041B0000121B.png",
      },
      {
        id: 2,
        name: "Arcane Restoration",
        tier: 1,
        type: "Combat Spell",
        cost: "30",
        description:
          "Мгновенно восстанавливает часть здоровья союзных войск и снимает негативные эффекты.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/0000041B0000121F.png",
      },
      {
        id: 3,
        name: "Evocation",
        tier: 2,
        type: "Unit Enchantment",
        cost: "60 / 15",
        description:
          "Придаёт боевым магам дополнительную мощь, увеличивая урон от заклинаний.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/evoker.png",
      },
      {
        id: 4,
        name: "Summon Lesser Elemental",
        tier: 2,
        type: "Summon Spell",
        cost: "80 / 20",
        description:
          "Призывает элементаля, чтобы сражаться на стороне заклинателя.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/0000041B00001227.png",
      },
      {
        id: 5,
        name: "Astral Echoes",
        tier: 3,
        type: "Strategic Spell",
        cost: "100⚡ / 25",
        description:
          "Оставляет на поле битвы магический след, усиливающий последующие чары.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/0000041B000012E5.png",
      },
    ],
  },

  {
    id: 2,
    name: "Книга корней",
    aspect: "Nature",
    description:
      "«Чтобы раскрыть тайны природы, нужно стать её частью. Разделите разум с деревьями, пустите корни в почву и почувствуйте идущую из неё целительную силу. Задушите побегами того, кто идёт на вас с топором дровосека».-Древоступ, отшельник поляны",
    image:
      "https://minionsart.github.io/aow4db/Icons/TomeIcons/0000041B00000D9D.png",
    bonus: "+15% к регенерации войск и +1 приручённое существо.",
    spells: [
      {
        id: 1,
        name: "Entangling Vines",
        tier: 1,
        type: "Combat Spell",
        cost: "40",
        description:
          "Оплетает врагов живыми корнями, снижая их подвижность и атаку.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/0000041B00000DAF.png",
      },
      {
        id: 2,
        name: "Bloom of Life",
        tier: 2,
        type: "City Enchantment",
        cost: "60 / 10",
        description:
          "Оживляет землю, повышая рост населения и ускоряя восстановление ран у жителей.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/0000041B00000DAB.png",
      },
      {
        id: 3,
        name: "Summon Animal",
        tier: 2,
        type: "Summon Spell",
        cost: "70 / 20",
        description:
          "Призывает дикое существо на службу магу, усиливая природную армию.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/0000041B00000DA7.png",
      },
    ],
  },

  {
    id: 3,
    name: "Tome of Shadows",
    aspect: "Shadow",
    description:
      "Мрачный том, источающий энергию забвения. Его страницы описывают древние проклятия и секреты манипуляции страхом и смертью.",
    image:
      "https://minionsart.github.io/aow4db/Icons/TomeIcons/0000041B000016E2.png",
    bonus: "+10% к шансу критического удара и +5% к урону по ослабленным врагам.",
    spells: [
      {
        id: 1,
        name: "Shadow Veil",
        tier: 1,
        type: "Strategic Spell",
        cost: "40",
        description:
          "Покрывает армию завесой тьмы, снижая шанс быть замеченными врагами.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/skeleton_reanimation.png",
      },
      {
        id: 2,
        name: "Curse of Weakness",
        tier: 2,
        type: "Combat Spell",
        cost: "60",
        description:
          "Ослабляет противников, снижая их силу атаки и защиту.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/0000041B000016EF.png",
      },
      {
        id: 3,
        name: "Summon Shade",
        tier: 3,
        type: "Summon Spell",
        cost: "100 / 25",
        description:
          "Вызывает тень погибшего воина, которая сражается за мага до рассвета.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/necromancer.png",
      },
    ],
  },
];


const aspects = ["Astral", "Nature", "Shadow", "Order", "Chaos", "Matter"];

export default function BooksPage() {
  const [selectedAspect, setSelectedAspect] = useState<string>("Astral");
  const filteredBooks = books.filter((b) => b.aspect === selectedAspect);
  const [sel, setSel] = useState<Book>(filteredBooks[0]);

  const handleAspectChange = (aspect: string) => {
    setSelectedAspect(aspect);
    const booksOfAspect = books.filter((b) => b.aspect === aspect);
    if (booksOfAspect.length > 0) {
      setSel(booksOfAspect[0]);
    }
  };

  return (
    <div className="flex w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8 overflow-x-hidden">
      {/* Сайдбар */}
      <aside className="w-72 bg-gray-900/80 border-r border-gray-800 p-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-100 text-center">Аспекты</h2>
        <select
          value={selectedAspect}
          onChange={(e) => handleAspectChange(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
        >
          {aspects.map((asp) => (
            <option key={asp} value={asp}>
              {asp}
            </option>
          ))}
        </select>

        <div className="mt-4 space-y-2">
          {filteredBooks.map((b) => (
            <button
              key={b.id}
              onClick={() => setSel(b)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                sel.id === b.id
                  ? "bg-gray-800 border border-gray-600 text-gray-100"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Основная часть */}
<main className="flex-1 p-10 space-y-6">
  <h1 className="text-3xl font-bold text-gray-100 text-center">{sel.name}</h1>

  <div
    className="relative w-[1080px] h-[360px] p-6 rounded-2xl border border-gray-800 shadow-lg flex items-start gap-6"
    style={{
      backgroundImage: `url(/Background_Unitpanel.png)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Полупрозрачный overlay для читаемости текста */}
    <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

    <div className="relative flex items-start gap-6 w-full">
      <div className="w-[160px] h-[160px] flex-shrink-0">
        <Image
          src={sel.image}
          alt={sel.name}
          width={160}
          height={160}
          unoptimized
          className="rounded-xl  object-cover"
        />
      </div>
      <div className="flex-1 text-gray-100 relative z-10">
        <p className="text-gray-200 leading-relaxed">{sel.description}</p>
        <p className="mt-4 font-semibold">Бонус: {sel.bonus}</p>
      </div>
    </div>
  </div>

  <section>
    <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">Заклинания книги</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sel.spells.map((spell) => (
        <SpellCard key={spell.id} spell={spell} />
      ))}
    </div>
  </section>
</main>
    </div>
  );
}
