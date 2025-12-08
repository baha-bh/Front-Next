"use client";

import Image from "next/image";
import Link from "next/link";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function ProfilePage() {
  // Заглушка вместо null
  const user: User = {
    name: "Player One",
    email: "player@example.com",
    image: "/default-avatar.png",
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-black/50 p-8 rounded-xl shadow-xl border border-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-yellow-300 text-center">
        Профиль
      </h1>

      <div className="flex flex-col items-center">
        <Image
          src={user.image || "/default-avatar.png"}
          alt="avatar"
          width={150}
          height={150}
          className="rounded-full border border-gray-700 shadow-lg"
        />

        <div className="mt-6 text-xl space-y-2">
          <p>
            <span className="font-bold text-gray-400">Имя: </span>
            {user.name}
          </p>

          <p>
            <span className="font-bold text-gray-400">Email: </span>
            {user.email}
          </p>
        </div>

        <Link
          href="/logout"
          className="mt-6 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white font-semibold transition"
        >
          Выйти
        </Link>
      </div>
    </div>
  );
}
