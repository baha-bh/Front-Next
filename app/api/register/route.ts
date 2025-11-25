import { NextRequest, NextResponse } from "next/server";

// Простейший пример: данные сохраняются в памяти
let users: { id: string; email: string; password: string; name?: string }[] = [];

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  // Проверка на существующего пользователя
  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = {
    id: (users.length + 1).toString(),
    email,
    password, // В реальном приложении — хэшировать!
    name: name || "User",
  };

  users.push(newUser);

  return NextResponse.json({ message: "User created", user: newUser });
}
