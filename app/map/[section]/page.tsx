"use client";

import { usePathname } from "next/navigation";
import MapMaterialCard from "../../component/MapMaterialCard";
import AncientWondersCard from "../../component/AncientWondersCard";
import LandmarkCard from "../../component/LandmarksCard";

import { landmarks, type Landmark } from "../../lib/landmarks";
import { magicMaterials, type MagicMaterial } from "../../lib/Map";
import EventCard from "@/app/component/EventsCard";

export default function MapSectionPage() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const section = parts[2];

  let content: JSX.Element;

  switch (section) {
    case "materials":
      content = (
        <div className="flex flex-col gap-6 items-center">
          {magicMaterials.map((material: MagicMaterial) => (
            <MapMaterialCard key={material.id} material={material} />
          ))}
        </div>
      );
      break;

    case "wonders":
      content = <AncientWondersCard />;
      break;

    case "landmarks":
      content = (
        <div className="flex flex-col gap-6 items-center">
          {landmarks.map((landmark: Landmark) => (
            <LandmarkCard key={landmark.id} landmark={landmark} />
          ))}
        </div>
      );
      break;

    case "cosmic":
      content = <EventCard />;
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

      {content}
    </main>
  );
}
