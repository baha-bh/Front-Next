"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { books, Book } from "../lib/book"; 

const aspects = ["Astral", "Nature", "Shadow", "Order", "Chaos", "Matter"];

export default function BooksPage() {
  const [openAspect, setOpenAspect] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectBook = (aspect: string, bookId: number) => {
    router.push(`/books/aspect/${aspect}/${bookId}`);
  };

  return (
    <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
        Книги магии
      </h1>

      <div className="flex flex-wrap justify-center gap-4">
        {aspects.map((aspect) => {
          const booksOfAspect = books.filter((b) => b.aspect === aspect);

          return (
            <div key={aspect} className="relative">
              <button
                onClick={() =>
                  setOpenAspect(openAspect === aspect ? null : aspect)
                }
                className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-all"
              >
                {aspect}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAspect === aspect ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openAspect === aspect && booksOfAspect.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-2 w-56 bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg"
                >
                  <ul className="p-2">
                    {booksOfAspect.map((book: Book) => (
                      <li
                        key={book.id}
                        onClick={() => handleSelectBook(aspect, book.id)}
                        className="px-4 py-2 hover:bg-zinc-700 rounded-lg cursor-pointer"
                      >
                        {book.name}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
