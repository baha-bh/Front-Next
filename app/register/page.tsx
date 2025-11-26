"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    // После регистрации сразу логиним пользователя
    await signIn("credentials", { email, password, callbackUrl: "/" });
  };

  return (
    <div className="w-full max-w-md p-8 bg-black/70 rounded-md shadow-md text-white">
      
        <h1 className="text-2xl font-bold mb-6 text-center">Регистрация</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Уже есть аккаунт?{" "}
          <a href="/login" className="text-yellow-400 hover:underline">
            Войти
          </a>
        </p>
      </div>
    
  );
}
