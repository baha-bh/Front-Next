"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Используем next-auth signIn с "credentials"
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      // Успешная авторизация — редирект на главную защищённую страницу
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-black/70 rounded-md shadow-md text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Вход в систему</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
        >
          Войти
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-300">
        Нет аккаунта?{" "}
        <a href="/register" className="text-yellow-400 hover:underline">
          Зарегистрироваться
        </a>
      </p>
    </div>
  );
}
