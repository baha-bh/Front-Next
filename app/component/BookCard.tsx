"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Book } from "lucide-react";
import { useSavedItems } from "@/context/SavedItemsContext";

interface BookType {
  id: number | string;
  name: string;
  aspect: string; 
  tier: number;
  image?: string;
  description?: string;
}

export default function BookCard({ book }: { book: BookType }) {
  const { savedBooks, toggleBook } = useSavedItems();
  const isSaved = savedBooks.includes(book.name);

  const getAspectColor = (aspect: string) => {
    switch (aspect?.toLowerCase()) {
      case 'chaos': return 'text-red-500 border-red-500/30';
      case 'order': return 'text-blue-400 border-blue-400/30';
      case 'nature': return 'text-green-500 border-green-500/30';
      case 'shadow': return 'text-purple-500 border-purple-500/30';
      case 'materium': return 'text-amber-600 border-amber-600/30';
      case 'astral': return 'text-cyan-400 border-cyan-400/30';
      default: return 'text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 flex flex-col h-full">
      <div className="relative h-36 w-full bg-zinc-950">
        {book.image ? (
          <Image
            src={book.image}
            alt={book.name}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-700">
            <Book className="w-12 h-12 opacity-20" />
          </div>
        )}
        
        {/* Кнопка лайка */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleBook(book.name);
          }}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/80 transition-colors group/heart"
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isSaved ? "fill-red-500 text-red-500" : "text-white group-hover/heart:text-red-400"
            }`}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 to-transparent h-20" />
      </div>

      <div className="p-5 flex-1 flex flex-col relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-100 group-hover:text-amber-400 transition-colors">
            {book.name}
          </h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getAspectColor(book.aspect)}`}>
            Tier {book.tier}
          </span>
        </div>
        
        <p className="text-sm text-zinc-400 line-clamp-3 mb-4">
          {book.description || "Описание отсутствует..."}
        </p>

        <Link 
          href={`/books/${book.aspect}/${book.id}`} 
          className="mt-auto w-full py-2 text-center rounded bg-zinc-800 hover:bg-amber-600 hover:text-black text-zinc-300 text-sm font-bold transition-colors"
        >
          Открыть книгу
        </Link>
      </div>
    </div>
  );
}