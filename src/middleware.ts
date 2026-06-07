import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard') ||
                        req.nextUrl.pathname.startsWith('/analytics') ||
                        req.nextUrl.pathname.startsWith('/reports') ||
                        req.nextUrl.pathname.startsWith('/projects') ||
                        req.nextUrl.pathname.startsWith('/users') ||
                        req.nextUrl.pathname.startsWith('/settings')

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (isLoggedIn && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}