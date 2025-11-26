
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; // <- статический импорт

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // Определяем публичные страницы
  const publicPaths = ["/login", "/register"];

  // Путь текущей страницы
  const currentPath = typeof window === "undefined" 
    ? "/" // при SSR используем "/"
    : window.location.pathname;

  // Редиректы
  if (!session && !publicPaths.includes(currentPath)) redirect("/login");
  if (session && publicPaths.includes(currentPath)) redirect("/");

  return (
    <>
      <h1 className="text-4xl font-semibold text-yellow-300">
        Age of Wonders 4 Database
      </h1>
      <p className="mt-4 text-gray-400 text-lg">
        Выберите категорию выше, чтобы начать.
      </p>
    </>
  );
}
