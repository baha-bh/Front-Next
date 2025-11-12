import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Age of Wonders 4 Database",
  description: "Fan-made interactive database for Age of Wonders 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-white font-serif bg-fixed bg-cover bg-center`}
        style={{
          backgroundImage: "url('/fon.jpg')",
        }}
      >
        {/* Верхняя панель */}
        <header className="flex justify-between items-center px-8 py-3 bg-black/70 backdrop-blur-md shadow-md">
          <div className="flex items-center space-x-6"></div>

          <div className="text-3xl font-bold text-yellow-300 tracking-wide text-center">
            Age of Wonders 4 Database
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-300">WIP</span>
            <select className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm">
              <option>Русский</option>
              <option>English</option>
            </select>
          </div>
        </header>

        {/* Навигация */}
        <nav className="flex justify-center items-center space-x-6 bg-black/70 backdrop-blur-md py-3 border-y border-gray-700">
          {[
            ["ЮНИТЫ", "/warrior"],
            ["КНИГИ", "/books"],
            ["ЗАКЛИНАНИЯ", "/spells"],
            ["ГЛОБАЛЬНАЯ КАРТА", "/map"],
            ["ГЕРОИ", "/heroes"],
            ["ИМПЕРИЯ", "/empire"],
            ["ABILITY", "/abilities"],
            ["BUILDS/PLANNERS", "/builds"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="relative text-lg font-semibold tracking-wide text-gray-200 hover:text-yellow-300 transition duration-300 group"
            >
              {label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Основной контент */}
        <main className="flex flex-col items-center text-center py-16 bg-black/50 min-h-[80vh]">
          {children}
        </main>
      </body>
    </html>
  );
}
