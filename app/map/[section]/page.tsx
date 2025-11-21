"use client";

import { usePathname } from "next/navigation";
import MapMaterialCard from "../../component/MapMaterialCard";
import AncientWonderCard from "../../component/AncientWondersCard";
import LandmarkCard from "../../component/LandmarksCard";

import { landmarks, type Landmark } from "../../lib/landmarks";
import { magicMaterials, type MagicMaterial } from "../../lib/Map";
import { ancientWonders, type AncientWonder } from "../../lib/Ancient";

export default function MapSectionPage() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const section = parts[2]; 

  let content: JSX.Element[] | JSX.Element = [];

  switch (section) {
    case "materials":
      content = magicMaterials.map((material: MagicMaterial) => (
        <MapMaterialCard key={material.id} material={material} />
      ));
      break;

    case "wonders":
      content = ancientWonders.map((wonder: AncientWonder) => (
        <AncientWonderCard key={wonder.id} wonder={wonder} />
      ));
      break;

    case "landmarks":
      content = landmarks.map((landmark: Landmark) => (
        <LandmarkCard key={landmark.id} landmark={landmark} />
      ));
      break;

    case "cosmic":
      content = (
        <p className="text-center text-gray-400 mt-10">
          Раздел "Cosmic Happenings" пока пуст
        </p>
      );
      break;

    default:
      content = (
        <p className="text-center text-gray-400 mt-10">Раздел не найден</p>
      );
  }

  return (
    <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-10 text-center capitalize">
        {section.replace("-", " ")}
      </h1>

      {/* Вертикальное отображение карточек */}
      <div className="flex flex-col gap-6 items-center">
        {content}
      </div>
    </main>
  );
}
