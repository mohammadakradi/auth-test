import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Define protected routes
  const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard')

  // Define auth routes  
  const isAuthRoute = nextUrl.pathname.startsWith('/auth')

  // Redirect to signin if accessing protected route without authentication
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', nextUrl))
  }

  // Redirect to dashboard if accessing auth routes while authenticated
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}