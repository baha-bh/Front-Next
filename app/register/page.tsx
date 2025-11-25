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
    <div className="flex items-center justify-center h-screen bg-black/70">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 bg-gray-900 p-8 rounded shadow-lg w-80 text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
