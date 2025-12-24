"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Book } from "lucide-react";

type BookSummary = {
  id: number;
  name: string;
  aspect: string;
  tier: number;
};

export default function BooksSidebar({ books }: { books: BookSummary[] }) {
  const pathname = usePathname();
  
  const [openAspects, setOpenAspects] = useState<Record<string, boolean>>({});

  const groupedBooks = books.reduce((acc, book) => {
    if (!acc[book.aspect]) acc[book.aspect] = [];
    acc[book.aspect].push(book);
    return acc;
  }, {} as Record<string, typeof books>);

  useEffect(() => {
    const currentAspect = books.find(b => pathname.includes(`/${b.id}`))?.aspect;
    if (currentAspect) {
      setOpenAspects(prev => ({ ...prev, [currentAspect]: true }));
    }
  }, [pathname, books]);

  const toggleAspect = (aspect: string) => {
    setOpenAspects(prev => ({ ...prev, [aspect]: !prev[aspect] }));
  };

  return (
    <aside className="w-full md:w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800 bg-zinc-900 z-10">
        <Link 
          href="/books" 
          className="flex items-center gap-3 group"
        >
          <div className="text-amber-500 group-hover:text-amber-400 transition-colors">
            <Book className="w-6 h-6" />
          </div>
          <span className="text-lg font-bold text-white tracking-wide group-hover:text-gray-200 transition-colors">
            Библиотека магии
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {Object.entries(groupedBooks).map(([aspect, aspectBooks]) => {
          const isOpen = openAspects[aspect];
          
          return (
            <div key={aspect} className="mb-1">
              <button
                onClick={() => toggleAspect(aspect)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all uppercase tracking-wider"
              >
                {aspect}
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {isOpen && (
                <ul className="mt-1 ml-2 space-y-1 border-l border-zinc-800 pl-2">
                  {aspectBooks.map((book) => {
                    const isActive = pathname.includes(`/${book.id}`);
                    return (
                      <li key={book.id}>
                        <Link
                          href={`/books/${book.aspect}/${book.id}`}
                          className={`block px-3 py-2 rounded-md text-sm transition-colors truncate ${
                            isActive 
                              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" 
                              : "text-gray-400 hover:bg-zinc-800 hover:text-gray-200"
                          }`}
                        >
                          <span className={`mr-2 text-xs font-mono ${isActive ? "text-yellow-500" : "text-zinc-600"}`}>
                            [T{book.tier}]
                          </span>
                          {book.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}