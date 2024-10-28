import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // 1. Rate limiting
  try {
    const limiter = await rateLimit(request);
    const { success, limit, remaining, reset } = limiter;

    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  } catch {
    // Continue if rate limiting fails
  }

  // 2. Authentication check
  const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1];
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth/');
  const isApiRequest = request.nextUrl.pathname.startsWith('/api/');
  const isPublicApi = request.nextUrl.pathname === '/api/auth/login' || 
                      request.nextUrl.pathname === '/api/auth/register';

  // API authentication
  if (isApiRequest && !isPublicApi) {
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      await verifyAuth(token);
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  // Page authentication
  if (!isAuthPage && !isApiRequest) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      await verifyAuth(token);
    } catch {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (isAuthPage && token) {
    try {
      await verifyAuth(token);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch {
      // Continue if token is invalid
    }
  }

  // 3. Security headers
  const headers = new Headers(request.headers);
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );

  const response = NextResponse.next({
    request: {
      headers,
    },
  });

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/api/:path*',
  ],
};