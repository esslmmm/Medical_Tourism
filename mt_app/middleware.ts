import { auth } from "./app/api/auth/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const token = req.auth
  const isAuth = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith('/verify-otp')
  
  const protectedRoutes = [
    '/user/Form',
    '/user/profile',
    '/user/accommodation_booking',
    '/user/Interpreter',
    '/user/Test'
  ]
  
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Check session expiry if user is authenticated
  if (isAuth && token) {
    const currentTime = Math.floor(Date.now() / 1000)
    
    // Check if token is expired
    if (token.exp && token.exp < currentTime) {
      const response = NextResponse.redirect(
        new URL(`/?isLoginOpen=true&expired=true`, req.url)
      )
      // Clear session cookies
      response.cookies.delete('authjs.session-token')
      response.cookies.delete('__Secure-authjs.session-token')
      return response
    }
    
    // Check if token is about to expire (within 5 minutes)
    const expiryWarning = 5 * 60 // 5 minutes
    if (token.exp && (token.exp - currentTime) < expiryWarning) {
      const response = NextResponse.next()
      response.headers.set('X-Session-Expiry-Warning', 'true')
      response.headers.set('X-Time-Left', String(token.exp - currentTime))
      response.headers.set('X-Auth-Method', token.authMethod || 'unknown')
      return response
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isAuth && isProtectedRoute) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    
    return NextResponse.redirect(
      new URL(`/?isLoginOpen=true&from=${encodeURIComponent(from)}`, req.url)
    );
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/user/Form/:path*',
    '/user/profile/:path*',
    '/user/accommodation_booking/:path*',
    '/user/Interpreter/:path*',
    '/user/Test/:path*', 
    '/verify-otp/:path*'
  ]
}