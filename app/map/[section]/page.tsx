// // "use client";

// // import { usePathname } from "next/navigation";
// // import MapMaterialCard from "../../component/MapMaterialCard";
// // import AncientWondersCard from "../../component/AncientWondersCard";
// // import LandmarkCard from "../../component/LandmarksCard";

// // import { landmarks, type Landmark } from "../../lib/landmarks";
// // import { magicMaterials, type MagicMaterial } from "../../lib/Map";
// // import EventCard from "@/app/component/EventsCard";

// // export default function MapSectionPage() {
// //   const pathname = usePathname();
// //   const parts = pathname.split("/");
// //   const section = parts[2];

// //   let content: JSX.Element;

// //   switch (section) {
// //     case "materials":
// //       content = (
// //         <div className="flex flex-col gap-6 items-center">
// //           {magicMaterials.map((material: MagicMaterial) => (
// //             <MapMaterialCard key={material.id} material={material} />
// //           ))}
// //         </div>
// //       );
// //       break;

// //     case "wonders":
// //       content = <AncientWondersCard />;
// //       break;

// //     case "landmarks":
// //       content = (
// //         <div className="flex flex-col gap-6 items-center">
// //           {landmarks.map((landmark: Landmark) => (
// //             <LandmarkCard key={landmark.id} landmark={landmark} />
// //           ))}
// //         </div>
// //       );
// //       break;

// //     case "cosmic":
// //       content = <EventCard />;
// //       break;

// //     default:
// //       content = (
// //         <p className="text-center text-gray-400 mt-10">Раздел не найден</p>
// //       );
// //   }

// //   return (
// //     <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8">
// //       <h1 className="text-4xl font-bold mb-10 text-center capitalize">
// //         {section.replace("-", " ")}
// //       </h1>

// //       {content}
// //     </main>
// //   );
// // }


// "use client";

// import { useParams } from "next/navigation";
// import MapMaterialCard from "../../component/MapMaterialCard";
// import AncientWondersCard from "../../component/AncientWondersCard";
// import LandmarkCard from "../../component/LandmarksCard";
// import EventCard from "../../component/EventsCard";

// import { landmarks, type Landmark } from "../../lib/landmarks";
// import { magicMaterials, type MagicMaterial } from "../../lib/Map";

// const sectionsMap: Record<string, string> = {
//   materials: "MAGIC MATERIALS",
//   wonders: "ANCIENT WONDERS",
//   landmarks: "LANDMARKS",
//   cosmic: "COSMIC HAPPENINGS",
// };

// export default function MapSectionPage() {
//   const params = useParams();
//   const section = params.section as string;
//   const title = sectionsMap[section] || section;

//   let content: JSX.Element;

//   switch (section) {
//     case "materials":
//       content = (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {magicMaterials.map((material: MagicMaterial) => (
//             <MapMaterialCard key={material.id} material={material} />
//           ))}
//         </div>
//       );
//       break;

//     case "wonders":
//       content = <AncientWondersCard />;
//       break;

//     case "landmarks":
//       content = (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {landmarks.map((landmark: Landmark) => (
//             <LandmarkCard key={landmark.id} landmark={landmark} />
//           ))}
//         </div>
//       );
//       break;

//     case "cosmic":
//       content = <EventCard />;
//       break;

//     default:
//       content = (
//         <div className="col-span-full py-20 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed w-full">
//           <p className="text-xl text-gray-400">Раздел не найден</p>
//         </div>
//       );
//   }

//   return (
//     <section className="flex-1 p-6 lg:p-10 overflow-y-auto w-full">
//       <header className="mb-8">
//         <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
//           {title}
//         </h1>
//       </header>

//       {content}
//     </section>
//   );
// }

import { redirect } from "next/navigation";

type Props = {
  params: {
    section: string;
  };
};

export default function SectionPage({ params }: Props) {
  redirect(`/map/${params.section}/all`);
}