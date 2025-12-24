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