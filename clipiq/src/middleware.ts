import { clerkMiddleware ,createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000',"http://localhost:5000"]

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const isProtectedRoutes= createRouteMatcher([
    '/dashboard(.*)',
    '/api/payment',
    '/payment(.*)',
])
export default clerkMiddleware(async (auth, req) => {
   const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }
    if (isProtectedRoutes(req)) {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST_URL}/auth/sign-in`);
        }
    } else {
        // Only call NextResponse.next() if not redirected
        const response = NextResponse.next()
        if (isAllowedOrigin) {
            response.headers.set('Access-Control-Allow-Origin', origin)
            Object.entries(corsOptions).forEach(([key, value]) => {
                response.headers.set(key, value)
            })
        }
        return response
    }
});

export const config = {
  matcher: [
    // This regex matches all routes except Next.js internals and static files (html, css, js, images, fonts, docs, etc.)
    // It ensures middleware runs only for application routes and API/trpc endpoints.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};