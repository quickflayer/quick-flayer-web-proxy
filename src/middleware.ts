import { NextRequest, NextResponse } from 'next/server';
import { AUTH_CONFIG } from './lib/auth/auth-config';

// Helper function to check if token is expired
function isTokenExpired(token: string): boolean {
  if (!token) return true;

  try {
    // Get the payload part of the JWT token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check if the token has expired
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error parsing token in middleware:', error);
    return true;
  }
}

// Helper function to validate token format
function isValidTokenFormat(token: string): boolean {
  if (!token) return false;

  // JWT tokens have 3 parts separated by dots
  const parts = token.split('.');
  return parts.length === 3;
}

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

  // Validate token if it exists
  const isValidToken = token && isValidTokenFormat(token) && !isTokenExpired(token);

  // If it's a protected route and no valid token exists, redirect to login
  if (isProtectedRoute && !isValidToken) {
    console.log(`Redirecting to login: ${pathname} - Token valid: ${!!isValidToken}`);
    const url = new URL(AUTH_CONFIG.LOGIN_ROUTE, request.url);

    // Clear invalid token cookie
    const response = NextResponse.redirect(url);
    if (token && !isValidToken) {
      response.cookies.set('auth_token', '', {
        expires: new Date(0),
        path: '/',
      });
    }
    return response;
  }

  // If user has valid token and trying to access login page, redirect to dashboard
  if (pathname === AUTH_CONFIG.LOGIN_ROUTE && isValidToken) {
    console.log('Redirecting authenticated user from login to dashboard');
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
