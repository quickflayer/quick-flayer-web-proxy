import { NextRequest, NextResponse } from 'next/server';
import { AUTH_CONFIG } from './lib/auth/auth-config';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookie
  const token = request.cookies.get('auth_token')?.value;
  
  // Check if the path is protected
  const isProtectedRoute = [
    '/dashboard',
    '/users',
    '/settings',
  ].some(route => pathname.startsWith(route));
  
  // If it's a protected route and no token exists, redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL(AUTH_CONFIG.LOGIN_ROUTE, request.url);
    return NextResponse.redirect(url);
  }
  
  // If user is logged in and trying to access login page, redirect to dashboard
  if (pathname === AUTH_CONFIG.LOGIN_ROUTE && token) {
    const url = new URL(AUTH_CONFIG.DASHBOARD_ROUTE, request.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure the middleware to run only on specific routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
