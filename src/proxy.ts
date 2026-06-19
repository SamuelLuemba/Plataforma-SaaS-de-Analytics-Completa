// src/proxy.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Rotas públicas
  const publicRoutes = ["/", "/login", "/register", "/forgot-password"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Rotas do dashboard (protegidas)
  const isDashboardRoute = pathname.startsWith("/dashboard") ||
                           pathname.startsWith("/analytics") ||
                           pathname.startsWith("/reports") ||
                           pathname.startsWith("/projects") ||
                           pathname.startsWith("/users") ||
                           pathname.startsWith("/settings");

  // Se está em rota do dashboard e não está logado → redireciona para login
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se está logado e tenta acessar login/register → redireciona para dashboard
  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};