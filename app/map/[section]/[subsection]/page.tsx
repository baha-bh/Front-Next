"use client";

import { useParams } from "next/navigation";
import MapMaterialCard from "../../../component/MapMaterialCard";
import AncientWondersCard from "../../../component/AncientWondersCard"; 
import LandmarkCard from "../../../component/LandmarksCard";
import EventCard from "../../../component/EventsCard"; 

import { landmarks, type Landmark } from "../../../lib/landmarks";
import { magicMaterials, type MagicMaterial } from "../../../lib/Map";
import { ancientWonders } from "../../../lib/Ancient";
import { events } from "../../../lib/Events";

const sectionsMap: Record<string, string> = {
  materials: "MAGIC MATERIALS",
  wonders: "ANCIENT WONDERS",
  landmarks: "LANDMARKS",
  cosmic: "COSMIC HAPPENINGS",
};

export default function MapContentPage() {
  const params = useParams();
  const section = params.section as string;
  const subsection = decodeURIComponent(params.subsection as string);
  
  const title = sectionsMap[section] || section;

  let content: React.ReactNode;

  switch (section) {
    case "materials":
      content = (
        <div className="flex flex-col gap-6">
          {magicMaterials.map((material: MagicMaterial) => (
            <MapMaterialCard key={material.id} material={material} />
          ))}
        </div>
      );
      break;

    case "wonders":
      const filteredWonders = subsection.toLowerCase() === "all" 
        ? ancientWonders 
        : ancientWonders.filter(w => w.tier === subsection);
      
      content = (
         <div className="flex flex-col gap-6">
            {filteredWonders.length > 0 ? (
                filteredWonders.map(wonder => (
                    <AncientWondersCard key={wonder.name} wonder={wonder} />
                ))
            ) : (
                <p className="text-gray-500 text-center py-10">Нет чудес этого ранга.</p>
            )}
         </div>
      );
      break;

    case "landmarks":
      content = (
        <div className="flex flex-col gap-6">
          {landmarks.map((landmark: Landmark) => (
            <LandmarkCard key={landmark.id} landmark={landmark} />
          ))}
        </div>
      );
      break;

    case "cosmic":
      const filteredEvents = subsection === "All" || subsection === "all"
        ? events 
        : events.filter(e => e.category === subsection);

      content = (
        <div className="flex flex-col gap-6">
            {filteredEvents.map(event => (
                 <EventCard key={event.name} event={event} />
            ))}
        </div>
      );
      break;

    default:
      content = (
        <div className="py-20 text-center">
          <p className="text-xl text-gray-400">Раздел не найден</p>
        </div>
      );
  }

  return (
    <section className="flex-1 p-6 lg:p-10 overflow-y-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
          {title} {section !== 'materials' && section !== 'landmarks' && <span className="text-yellow-500">/ {subsection}</span>}
        </h1> 
      </header>

      {content}
    </section>
  );
}