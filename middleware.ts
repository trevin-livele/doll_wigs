import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // No server-side auth middleware needed — auth is handled via
  // JWT tokens stored in localStorage and sent as Bearer headers
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
