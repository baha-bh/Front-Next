import { NextResponse } from "next/server";

export function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // Публичные страницы
  const publicPaths = ["/login", "/register", "/favicon.ico"];

  // Читаем cookie
  const isLoggedIn = req.cookies.get("loggedIn")?.value === "true";

  // Неавторизованный → на login
  if (!isLoggedIn && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Авторизованный → не пускаем на login/register
  if (isLoggedIn && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
