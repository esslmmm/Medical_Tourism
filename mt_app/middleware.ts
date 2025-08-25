import { auth } from "./app/api/auth/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const token = req.auth
  const isAuth = !!token
  const userRole = (token as any)?.user.role as string || 'customer'
  const pathname = req.nextUrl.pathname
  
  // Auth pages that should redirect if already authenticated
  const isAuthPage = pathname.startsWith('/verify-otp') || pathname.startsWith('/signin') || pathname.startsWith('/auth/callback')
  
  // Define role-based route patterns
  const adminRoutes = ['/admin']
  const staffRoutes = ['/staff']
  const userRoutes = [
    '/user/Form',
    '/user/profile',
    '/user/accommodation_booking',
    '/user/Guide',
    '/user/Test',
    '/user/BookingDetail',
    '/user/ContactUs',
    '/user/DoctorList',
    '/user/Doctorprofile',
    '/user/Hospital',
    '/user/package_landing_page',
    '/user/payment',
    '/user/ReviewPopUp',
    '/user/BookingEdit'
  ]
  
  // Check if current path matches any route pattern
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  const isStaffRoute = staffRoutes.some(route => pathname.startsWith(route))
  const isUserRoute = userRoutes.some(route => pathname.startsWith(route))
  const isProtectedRoute = isAdminRoute || isStaffRoute || isUserRoute

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

  // Handle auth callback page and OTP verification page
  if (pathname === '/auth/callback' || pathname.startsWith('/verify-otp')) {
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth pages (except callback and OTP verification)
  if (isAuthPage && pathname !== '/auth/callback' && !pathname.startsWith('/verify-otp')) {
    if (isAuth) {
      // Debug logging
      console.log('Middleware - redirecting authenticated user:', { 
        userRole, 
        pathname,
        isAuthPage 
      });
      
      // Redirect to role-appropriate dashboard
      const redirectUrl = userRole === 'admin' ? '/admin/booking-management' 
                         : userRole === 'staff' ? '/staff/booking-management'
                         : '/'
      return NextResponse.redirect(new URL(redirectUrl, req.url))
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

  // Role-based access control for authenticated users
  if (isAuth && isProtectedRoute) {
    // Admin can access everything
    if (userRole === 'admin') {
      return NextResponse.next()
    }
    
    // Staff can access staff and user routes (but not admin routes)
    if (userRole === 'staff') {
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/staff/booking-management', req.url))
      }
      return NextResponse.next()
    }
    
    // Customer can only access user routes
    if (userRole === 'customer') {
      if (isAdminRoute || isStaffRoute) {
        return NextResponse.redirect(new URL('/', req.url))
      }
      return NextResponse.next()
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/user/Form/:path*',
    '/user/profile/:path*',
    '/user/accommodation_booking/:path*',
    '/user/Guide/:path*',
    '/user/Test/:path*',
    // Staff routes
    '/staff/:path*',
    // Admin routes
    '/admin/:path*',
    // Auth routes
    '/verify-otp/:path*',
    '/signin/:path*',
    '/auth/callback/:path*',
  ]
}