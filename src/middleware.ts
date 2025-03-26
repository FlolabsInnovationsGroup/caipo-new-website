import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'ADMIN';
    const isApiRoute = req.nextUrl.pathname.startsWith('/api');
    const isAuthRoute = req.nextUrl.pathname.startsWith('/auth');
    const isAppRoute = req.nextUrl.pathname.startsWith('/app');
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    // Handle app routes - prepare for future CAIPO app integration
    if (isAppRoute) {
      // TODO: Once app is ready, handle deep linking or app redirections
      return NextResponse.redirect(new URL('/?message=app-coming-soon', req.url));
    }

    // Redirect authenticated users away from auth pages
    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    // Check admin access
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/admin/login?error=access_denied', req.url));
    }

    // Add CORS headers if needed
    const response = NextResponse.next();
    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Protect all admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN';
        }
        return true;
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

// Protect these paths with authentication
export const config = {
  matcher: [
    '/app/:path*',
    '/auth/signout',
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// This function can be marked `