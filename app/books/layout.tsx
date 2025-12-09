// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronRight, Book as BookIcon } from "lucide-react";
// import { books } from "../lib/book"; // Проверьте правильность пути к данным

// const aspects = ["Astral", "Nature", "Shadow", "Order", "Chaos", "Matter"];

// export default function BooksLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   // Парсим URL: /books/[aspect]/[bookId]
//   const segments = pathname.split("/");
//   const activeAspect = segments[2]; // например "Nature"
//   const activeBookId = segments[3]; // например "1"

//   const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

//   // Автоматически открываем секцию текущего аспекта
//   useEffect(() => {
//     if (activeAspect) {
//       setOpenSections((prev) => ({ ...prev, [activeAspect]: true }));
//     }
//   }, [activeAspect]);

//   const toggleSection = (aspect: string) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [aspect]: !prev[aspect],
//     }));
//   };

//   return (
//     <main className="w-full min-h-screen bg-zinc-950 text-gray-100 font-sans">
//       <div className="flex flex-col lg:flex-row min-h-screen w-full">
        
//         {/* --- SIDEBAR --- */}
//         <aside className="w-full lg:w-72 bg-zinc-900 border-r border-zinc-800 flex-shrink-0">
//           <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
//             <BookIcon className="text-yellow-500" />
//             <span className="text-xl font-bold text-white">Книги магии</span>
//           </div>
          
//           <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar sticky top-0">
//             {aspects.map((aspect) => {
//               // Фильтруем книги для текущего аспекта
//               const aspectBooks = books.filter((b) => b.aspect === aspect);
//               const isOpen = openSections[aspect];
//               const isActiveCategory = activeAspect === aspect;

//               // Если книг в этом аспекте нет, можно не рендерить или рендерить disabled
//               if (aspectBooks.length === 0) return null;

//               return (
//                 <div key={aspect} className="rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50">
//                   <button
//                     onClick={() => toggleSection(aspect)}
//                     className={`w-full flex items-center justify-between p-4 text-left font-semibold transition-colors ${
//                       isActiveCategory ? "text-yellow-500" : "text-gray-300 hover:text-white"
//                     }`}
//                   >
//                     {aspect}
//                     {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//                   </button>

//                   <AnimatePresence>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         className="overflow-hidden"
//                       >
//                         <ul className="bg-zinc-950/30 border-t border-zinc-800/50 py-2">
//                           {aspectBooks.map((book) => {
//                             const isSelected = activeBookId === String(book.id);
//                             return (
//                               <li key={book.id}>
//                                 <Link
//                                   href={`/books/${aspect}/${book.id}`}
//                                   className={`block w-full text-left px-6 py-2 text-sm transition-all border-l-2 ${
//                                     isSelected
//                                       ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
//                                       : "border-transparent text-gray-400 hover:text-gray-200 hover:border-zinc-600"
//                                   }`}
//                                 >
//                                   {book.name}
//                                 </Link>
//                               </li>
//                             );
//                           })}
//                         </ul>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>
//         </aside>

//         {/* --- CONTENT --- */}
//         {children}
        
//       </div>
//     </main>
//   );
// }

import { supabase } from "../lib/supabase";
import BooksSidebar from "./BooksSidebar";

async function getBooksForSidebar() {
  const { data } = await supabase
    .from("books")
    .select("id, name, aspect, tier")
    .order("tier", { ascending: true });
  return data || [];
}

export default async function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const books = await getBooksForSidebar();

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden">
      
      <div className="shrink-0">
        <BooksSidebar books={books} />
      </div>

      <main className="flex-1 relative h-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}