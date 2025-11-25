export interface Events {
  id: number;
  name: string;
  tier: string;
  effect: string;
  category: string;
  image?: string;
  Duration: number;
  icon: string;
}


export const events: Events[] = [
  {
    id: 1,
    name: "АСТРАЛЬНОЕ ЗАТМЕНИЕ",
    tier: "Silver",
    category: "Constellation",
    Duration: 5,
    effect: "Прирост < Мана>> снижается на 30%. Применение <Боевое заклинаниеa{1}n{2}>> и <Глобальное заклинаниеa{1}n{2}>> стоит на 50% очков заклинаний дороже.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_AstralEclipse.png",
    icon: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/category_icon_Constellation.png"
  },
  {
    id: 2,
    name: "ПАРАД ПЛАНЕТ ЧУМНОЙ ПАДИ",
    tier: "Silver",
    category: "Planet Phase",
    Duration: 5,
    effect: "В сражениях действует эффект «Blightfall combat property». Города теряют -5 ед. < Пища>> за каждую единицу < Население>>.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_BlightfallConjunction.png",
    icon: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/category_icon_PlanetPhase.png"
  },
  {
    id: 3,
    name: "ГИГАНТСКАЯ ЛУНА",
    tier: "Silver",
    category: "Planet Phase",
    Duration: 8,
    effect: "В сражениях действует эффект «Colossus moon unit auto spell». Регионы по всему миру превращаются в болота.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_ColossusMoon.png",
    icon: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/category_icon_PlanetPhase.png"
  },
  {
    id: 4,
    name: "ЗВЁЗДНОЕ ПРОСВЕТЛЕНИЕ",
    tier: "Silver",
    category: "Constellation",
    Duration: 5,
    effect: "Города получают +100% к < Знанияn>>. Любое объявление войны считается несправедливым. Завершение войн увеличивает < Авторитет>> на 200.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_GabrielsEye.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 5,
    name: "ХИЩНЫЕ ГОСТИ",
    tier: "Silver",
    category: "Entity",
    Duration: 8,
    effect: "По всему миру появляются группы враждебных астральных созданий. При использовании заклинаний воины с «Ethereal» получают случайный положительный эффект.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_BlightfallConjunction.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 6,
    name: "ПОЦЕЛУЙ МЕЛЕНИС",
    tier: "Silver",
    category: "Entity",
    Duration: 8,
    effect: "Все воины с вероятностью 30% могут превращать убитых врагов (кроме <Undead>>) в зомби под вашим контролем. Эти зомби не пропадают после боя.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_MelenisKiss.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 7,
    name: "ОТКАЗ ТЕЛЕПОРТАЦИИ",
    tier: "Silver",
    category: "Entity",
    Duration: 5,
    effect: "Улучшения-телепорты, а также любые заклинания и способности к телепортации не действуют.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_PhaseShiftNixing.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 8,
    name: "ЗИМА СОЛНЦА",
    tier: "Silver",
    category: "Asteroid",
    Duration: 5,
    effect: "По всему миру разрастается тундра. В сражениях действует эффект «Solar winter combat property». Воины в арктических провинциях страдают от эффекта «Solar winter property group».",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_RaysOfWinter.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 9,
    name: "ЗНАК РАЗБИТОГО ЩИТА",
    tier: "Silver",
    category: "Constellation",
    Duration: 5,
    effect: "<Shield unit>> получают: урон от атак +40%; -4 к < Защита>>.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_SignoftheCleftShield.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 10,
    name: "ЗНАК ОХОТНИЦЫ",
    tier: "Silver",
    category: "Constellation",
    Duration: 5,
    effect: "Магические атаки и стрельба <Ranged unit>>, <Battle mage>> и <Skirmisher>> наносят на 30% больше урона; < Дальность>> снижается на 1.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_SignOfTheHuntress.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 11,
    name: "ЗНАК ТЯЖКОГО ПОСОХА",
    tier: "Silver",
    category: "Constellation",
    Duration: 5,
    effect: "Support unit и <Battle mage>> получают: +1 к < Дальность>> магических способностей и способностей <Поддержка>>; эффект «Slow movement» в бою.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_SignOfTheLumberingStaff.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 12,
    name: "ЗНАК АВАНГАРДА",
    tier: "Silver",
    category: "Constellation",
    Duration: 5,
    effect: "Shock unit получают способность «Very fast movement» в бою. Стрельба и магические атаки по этому воину теряют 20% точности. Атаки в ближнем бою наносят на 20% меньше урона.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_SignOfTheVanguard.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 13,
    name: "КОСМИЧЕСКИЕ ВЕТРА",
    tier: "Silver",
    category: "Weather",
    Duration: 8,
    effect: "Провинции по всему миру превращаются в пустыни. В сражениях действует эффект «Solar winds combat property».",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_SolarWinds.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 14,
    name: "ВТОРЖЕНИЕ ЛЕСОВ",
    tier: "Silver",
    category: "Asteroid",
    Duration: 8,
    effect: "Леса начинают разрастаться на провинции по соседству. В сражениях действует эффект «Starseeds combat property». Воины в лесных провинциях страдают от эффекта «Starseeds property group».",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_Starseeds.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 15,
    name: "ПАРАД ПЛАНЕТ ПРОБУДИВШИХСЯ КАМНЕЙ",
    tier: "Silver",
    category: "Planet Phase",
    Duration: 8,
    effect: "Города получают +100% к < Производство>>. Все воины получают способность «Siege breaker».",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_StirringStoneConjunction.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 16,
    name: "СОЛНЕЧНЫЕ ИЗВЕРЖЕНИЯ",
    tier: "Silver",
    category: "Entity",
    Duration: 8,
    effect: "Провинции по всему миру превращаются в пустоши. В сражениях действует эффект «Sunstruck eruptions combat property».",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_SunstruckEruptions.png",
    icon: "/placeholder-icon.png"
  },
  {
    id: 17,
    name: "ЗНАМЕНИЕ НЕИСТОВСТВА",
    tier: "Silver",
    category: "Asteroid",
    Duration: 5,
    effect: "Базовая стоимость <Содержание воиновn{1}x{2}>> снижается на 50%; города получают +100% к очкам < Наём>>; в конце события вы получаете 20 ед. < Золото>> за каждого воина в вашей империи.",
    image: "https://minionsart.github.io/aow4db/Icons/CosmicHappenings/image_XornsJavelin.png",
    icon: "/placeholder-icon.png"
  }
];
