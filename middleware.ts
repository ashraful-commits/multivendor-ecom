import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === "/login" || path === "/signup"
  if (path.startsWith("/api/auth")) {
    return
  }
  if (
    path === "/api/signin" ||
    path === "/api/login" ||
    path === "/api/signup" 
    
  ) {
    return
  }

  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    ""

  if (isPublicPath) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.nextUrl))
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
  }
}


 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard', 
    '/api/carts/:path*', 
    '/api/favorites/:path*'
    
  ],
}