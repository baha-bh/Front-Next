"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
// Проверьте путь к lib/book. Если папка lib в корне app, то путь:
import { books, Book } from "../../../lib/book";
import SpellCard from "../../../component/SpellCard";

export default function BookPage() {
  const params = useParams();
  
  // Имена переменных должны совпадать с названиями папок в [ ]
  const aspect = params.aspect as string; 
  const id = Number(params.id);

  const book: Book | undefined = books.find(
    (b) => b.id === id
  );

  if (!book) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 min-h-[50vh]">
        <h1 className="text-2xl">Книга не найдена (ID: {id})</h1>
      </div>
    );
  }

  return (
    <section className="flex-1 p-6 lg:p-10 overflow-y-auto w-full space-y-8">
      <h1 className="text-3xl font-bold text-gray-100 text-center uppercase tracking-wider">
        {book.name}
      </h1>

      <div
        className="relative w-full h-auto min-h-[300px] p-8 rounded-2xl border border-gray-800 shadow-lg flex flex-col md:flex-row items-start gap-8"
        style={{
          backgroundImage: `url(/Background_Unitpanel.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>

        <div className="relative flex flex-col md:flex-row items-start gap-8 w-full z-10">
          <div className="w-[160px] h-[160px] flex-shrink-0 mx-auto md:mx-0 shadow-2xl">
            <Image
              src={book.image}
              alt={book.name}
              width={160}
              height={160}
              unoptimized
              className="rounded-xl object-cover border border-zinc-600"
            />
          </div>

          <div className="flex-1 text-gray-100 flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-200 leading-relaxed italic text-lg">
                &quot;{book.description}&quot;
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-yellow-500 font-bold text-lg">
                Бонус: <span className="text-gray-200 font-normal">{book.bonus}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center border-b border-zinc-800 pb-4">
          Заклинания книги
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {book.spells.map((spell) => (
<SpellCard key={spell.id} spell={spell} />
))}
</div>
</section>
</section>
);
}