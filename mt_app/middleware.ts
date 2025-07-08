// import { getToken } from 'next-auth/jwt'
// import { NextRequest, NextResponse } from 'next/server'

// export async function middleware(request : NextRequest) {
//   const user = await getToken({
//     req: request,
//     secret: process.env.AUTH_SECRET,
//   })

//   // console.log('user', user)

//   // Get the pathname of the request
//   const { pathname } = request.nextUrl

//   // If the pathname starts with /protected and the user is not an admin, redirect to the home page
//   // if (
//   //   pathname.startsWith('/profile') &&
//   //   (!user || user.role !== 'member')
//   // ) {
//   //   return NextResponse.redirect(new URL('/', request.url))
//   // }

//   // Continue with the request if the user is an admin or the route is not protected
//   return NextResponse.next()
// }

import { auth } from "./app/api/auth/auth" // Import your auth configuration
import { NextResponse } from "next/server"

export default auth((req) => {
  const token = req.auth
  const isAuth = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  
  // Clean array approach for protected routes
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

  // Redirect authenticated users away from auth pages
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next() // Allow access to auth pages for unauthenticated users
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
    // More efficient matcher - covers all your protected routes
    '/user/Form/:path*',
    '/user/profile/:path*',
    '/auth/:path*',
    '/api/:path*',
    '/user/Test'
  ]
}