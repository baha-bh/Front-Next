import { NextResponse } from "next/server";

export function middleware(req: any) {
  const { pathname } = req.nextUrl;

  const publicPaths = ["/login", "/register", "/favicon.ico"];

  const isLoggedIn = req.cookies.get("loggedIn")?.value === "true";

  if (!isLoggedIn && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
