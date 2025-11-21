"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { books, Book } from "../../../../lib/book";
import SpellCard from "../../../../component/SpellCard";

export default function BookPage() {
  const params = useParams(); 
  const router = useRouter();

  const aspect = params.value;
  const id = Number(params.id);

  const book: Book | undefined = books.find(
    (b) => b.aspect === aspect && b.id === id
  );

  const booksOfAspect = books.filter((b) => b.aspect === aspect);

  if (!book) {
    return (
      <main className="w-screen min-h-screen flex items-center justify-center text-gray-100 bg-gradient-to-b from-zinc-900 to-black">
        <h1 className="text-2xl">Книга не найдена</h1>
      </main>
    );
  }

  return (
   <main className="w-screen min-h-screen bg-gradient-to-b from-zinc-900 to-black text-gray-100 p-8 flex gap-12">
  {/* Список книг слева */}
  <aside className="w-72 bg-gray-900/80 border border-gray-800 p-6 space-y-6 rounded-2xl">
    <h2 className="text-lg font-semibold text-gray-100 text-center mb-4">
      {aspect} книги
    </h2>

    <div className="space-y-2">
      {booksOfAspect.map((b) => (
        <button
          key={b.id}
          onClick={() => router.push(`/books/aspect/${aspect}/${b.id}`)}
          className={`w-full text-left p-3 rounded-lg transition-all ${
            b.id === book.id
              ? "bg-gray-800 border border-gray-600 text-gray-100"
              : "hover:bg-gray-700 text-gray-300"
          }`}
        >
          {b.name}
        </button>
      ))}
    </div>
  </aside>

  {/* Основная часть — информация о выбранной книге */}
  <section className="flex-1 space-y-8">
    <h1 className="text-3xl font-bold text-gray-100 text-center">{book.name}</h1>

    <div
      className="relative w-full h-[360px] p-6 rounded-2xl border border-gray-800 shadow-lg flex items-start gap-6"
      style={{
        backgroundImage: `url(/Background_Unitpanel.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

      <div className="relative flex items-start gap-6 w-full z-10">
        <div className="w-[160px] h-[160px] flex-shrink-0">
          <Image
            src={book.image}
            alt={book.name}
            width={160}
            height={160}
            unoptimized
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex-1 text-gray-100">
          <p className="text-gray-200 leading-relaxed">{book.description}</p>
          <p className="mt-4 font-semibold">Бонус: {book.bonus}</p>
        </div>
      </div>
    </div>

    <section>
      <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">
        Заклинания книги
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {book.spells.map((spell) => (
          <SpellCard key={spell.id} spell={spell} />
        ))}
      </div>
    </section>
  </section>
</main>

  );
}
