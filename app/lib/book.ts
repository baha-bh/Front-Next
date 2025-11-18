export interface Spell {
  id: number;
  name: string;
  tier: number;
  type: string;
  cost: string;
  description: string;
  icon: string;
}

export interface Book {
  id: number;
  name: string;
  aspect: string;
  description: string;
  image: string;
  bonus: string;
  spells: Spell[];
  tier: number;
}


export const books: Book[] = [
  {
    id: 1,
    name: "Tome of Evocation",
    tier: 3,
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
        cost: "100 / 25",
        description:
          "Оставляет на поле битвы магический след, усиливающий последующие чары.",
        icon: "https://minionsart.github.io/aow4db/Icons/SpellIcons/0000041B000012E5.png",
      },
    ],
  },

  {
    id: 2,
    name: "Книга корней",
    tier: 1,
    aspect: "Shadow",
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
    tier: 2,
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