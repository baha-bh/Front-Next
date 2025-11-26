import "../globals.css";

export const metadata = {
  title: "Вход / Регистрация",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex items-center justify-center bg-black/50">
        {children}
      </body>
    </html>
  );
}
