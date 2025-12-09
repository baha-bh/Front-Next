// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { books, Book } from "../lib/book"; 

// const aspects = ["Astral", "Nature", "Shadow", "Order", "Chaos", "Matter"];

// export default function BooksPage() {
//   const [openAspect, setOpenAspect] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSelectBook = (aspect: string, bookId: number) => {
//     router.push(`/books/aspect/${aspect}/${bookId}`);
//   };

//   return (
//     <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8">
//       <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
//         Книги магии
//       </h1>

//       <div className="flex flex-wrap justify-center gap-4">
//         {aspects.map((aspect) => {
//           const booksOfAspect = books.filter((b) => b.aspect === aspect);

//           return (
//             <div key={aspect} className="relative">
//               <button
//                 onClick={() =>
//                   setOpenAspect(openAspect === aspect ? null : aspect)
//                 }
//                 className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-all"
//               >
//                 {aspect}
//                 <ChevronDown
//                   className={`w-4 h-4 transition-transform ${
//                     openAspect === aspect ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {openAspect === aspect && booksOfAspect.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute z-10 mt-2 w-56 bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg"
//                 >
//                   <ul className="p-2">
//                     {booksOfAspect.map((book: Book) => (
//                       <li
//                         key={book.id}
//                         onClick={() => handleSelectBook(aspect, book.id)}
//                         className="px-4 py-2 hover:bg-zinc-700 rounded-lg cursor-pointer"
//                       >
//                         {book.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </main>
//   );
// }


// import { redirect } from "next/navigation";
// import { books } from "../lib/book";

// export default function BooksIndexPage() {
//   const firstBook = books[0];

//   if (firstBook) {
//     // Редирект на /books/[aspect]/[id]
//     redirect(`/books/${firstBook.aspect}/${firstBook.id}`);
//   }

//   return (
//     <div className="p-10 text-center text-gray-500">
//       Книги не найдены.
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { Loader2 } from "lucide-react";


type BookSummary = {
  id: number;
  name: string;
  aspect: string;
  tier: number;
  image: string;
  description: string;
};

export default function BooksIndexPage() {
  const [books, setBooks] = useState<BookSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("tier", { ascending: true });

      if (error) {
        console.error("Error fetching books:", error);
      } else {
        setBooks(data || []);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-500">
        Библиотека Магии
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/books/${book.aspect}/${book.id}`}
            className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/20 flex flex-col"
          >
            <div className="relative h-48 w-full bg-black/50">
              <Image
                src={book.image}
                alt={book.name}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-yellow-500 border border-yellow-500/30">
                Tier {book.tier}
              </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-yellow-400 transition-colors">
                {book.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-3">
                {book.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}