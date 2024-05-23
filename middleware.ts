import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  
  if (path.startsWith("/api/auth")) {
    return;
  }

  if (
    path === "/api/login" ||
    path === "/api/register-seller" ||
    path === "/api/register-farmer" ||
    path === "/api/register" 
  ) {
    return;
  }

  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    "";

  if (isPublicPath) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }
}

export const config = {
  matcher: [
    '/dashboard', 
    '/dashboard/:path*', 
    '/api/carts/:path*', 
    '/api/favorites/:path*',
    '/login',
    '/register'
  ],
};
