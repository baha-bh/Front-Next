"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// ИСПРАВЛЕНО: правильный путь к клиенту Supabase
import { supabase } from "../lib/supabase"; 

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Если вы отключили подтверждение почты в Supabase, это поле можно убрать
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMsg("Регистрация успешна! Проверьте почту или войдите.");
      // Если авто-подтверждение включено, можно сразу перенаправить:
      // router.push("/login");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-md p-8 bg-black/70 rounded-md shadow-md text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Регистрация</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}
        {msg && <p className="text-green-400 mb-4">{msg}</p>}

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
            placeholder="Пароль (минимум 6 символов)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
          >
            Создать аккаунт
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Уже есть аккаунт?{" "}
          <a href="/login" className="text-yellow-400 hover:underline">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
}
