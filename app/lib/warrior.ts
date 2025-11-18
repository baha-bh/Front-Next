export type Tier = "I" | "II" | "III" | "IV" | "V";
export type Aspect = "Astral" | "Nature" | "Shadow" | "Order" | "Chaos" | "Matter";

export type UnitClass =
  | "РАЗВЕДЧИК"
  | "ЗАСТРЕЛЬЩИК"
  | "БОЕЦ"
  | "СТРЕЛОК СТРЕЛКИ"
  | "ВОИН С ПИКОЙ"
  | "УДАРНЫЙ ВОИН"
  | "ВОИН СО ЩИТОМ"
  | "БОЕВЫЕ МАГ"
  | "ВОИН ПОДДЕРЖКИ"
  | "МИФИЧЕСКОЕ СОЗДАНИЕ";

export type UnitType =
  | "ФЕЯ"
  | "ЖИВОТНОЕ"
  | "ЧУДОВИЩНЫЙ"
  | "ДЕМОН"
  | "ДРАКОН"
  | "ВЕЛИКАНЫ И"
  | "ПОЛУГИГАНТЫ"
  | "ЭЛЕМЕНТАЛЬ"
  | "НЕЖИТЬ"
  | "БЕСПЛОТНЫЙ"
  | "РАСТЕНИЕ"
  | "АНГЕЛ"
  | "КОНСТРУКЦИЯ"
  | "ДЕМОН МРАКА"
  | "ПРОКЛЯТЫЙ ДЕМОН";

export type Culture =
  | "ФЕОДАЛЫ"
  | "ВЫСШИЕ"
  | "ВАРВАР"
  | "МАСТЕРСКИЙ"
  | "ТЬМА"
  | "МИСТИКИ"
  | "КОРСАРЫ"
  | "ПЕРВОБЫТНЫЕ"
  | "ПРИСЯГНУВШИЕ"
  | "ЗОДЧИЕ";

export interface Unit {
  id: number;
  name: string;
  tier: Tier;
  aspects: Aspect[];
  health: number;
  attack: number;
  defense: number;
  resistance: number;
  movement: number;
  upkeep: { resource1: string; amount1: number; resource2?: string; amount2?: number };
  cost: { resource1: string; amount1: number; resource2?: string; amount2?: number };
  unitClass: UnitClass;
  type: UnitType;
  culture: Culture;
  vulnerabilities?: string[];
  image?: string; 
}

export const units: Unit[] = [
  {
    id: 1,
    name: "Scout",
    tier: "I",
    aspects: ["Order"],
    health: 45,
    attack: 6,
    defense: 0,
    resistance: 0,
    movement: 40,
    upkeep: { resource1: "Gold", amount1: 3 },
    cost: { resource1: "Gold", amount1: 20 },
    unitClass: "РАЗВЕДЧИК",
    type: "ФЕЯ",
    culture: "ФЕОДАЛЫ",
    vulnerabilities: ["Magic"],
    image: "https://minionsart.github.io/aow4db/PreviewsAvif/spring_fairy.avif",
  },
  {
    id: 2,
    name: "Peasant Pikeman",
    tier: "I",
    aspects: ["Order"],
    health: 65,
    attack: 11,
    defense: 2,
    resistance: 1,
    movement: 32,
    upkeep: { resource1: "Gold", amount1: 5 },
    cost: { resource1: "Gold", amount1: 25 },
    unitClass: "ВОИН С ПИКОЙ",
    type: "ЧУДОВИЩНЫЙ",
    culture: "ФЕОДАЛЫ",
    image: "/units/peasant_pikeman.gif",
  },
  {
    id: 3,
    name: "Archer",
    tier: "I",
    aspects: ["Nature"],
    health: 50,
    attack: 10,
    defense: 0,
    resistance: 0,
    movement: 32,
    upkeep: { resource1: "Gold", amount1: 4 },
    cost: { resource1: "Gold", amount1: 22 },
    unitClass: "СТРЕЛОК СТРЕЛКИ",
    type: "ЖИВОТНОЕ",
    culture: "МИСТИКИ",
    image: "/units/archer.gif",
  },
  {
    id: 4,
    name: "Knight",
    tier: "III",
    aspects: ["Order", "Matter"],
    health: 90,
    attack: 24,
    defense: 3,
    resistance: 3,
    movement: 48,
    upkeep: { resource1: "Gold", amount1: 12 },
    cost: { resource1: "Gold", amount1: 60, resource2: "Mana", amount2: 5 },
    unitClass: "УДАРНЫЙ ВОИН",
    type: "ЧУДОВИЩНЫЙ",
    culture: "ВЫСШИЕ",
    image: "/units/knight.gif",
  },
  {
    id: 5,
    name: "Phoenix",
    tier: "IV",
    aspects: ["Astral", "Matter"],
    health: 120,
    attack: 20,
    defense: 5,
    resistance: 10,
    movement: 40,
    upkeep: { resource1: "Mana", amount1: 10, resource2: "Gold", amount2: 3 },
    cost: { resource1: "Mana", amount1: 80, resource2: "Gold", amount2: 30 },
    unitClass: "МИФИЧЕСКОЕ СОЗДАНИЕ",
    type: "ДРАКОН",
    culture: "ВЫСШИЕ",
    vulnerabilities: ["Ice", "Magic"],
    image: "/units/phoenix.gif",
  },
];
