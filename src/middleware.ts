import { NextRequest, NextResponse } from 'next/server'

// Mobile-only routes that should redirect to desktop-warning if accessed from desktop
const MOBILE_ONLY_ROUTES = [
  '/login',
  '/register',
  '/home',
  '/events',
  '/live',
  '/profile',
  '/wallet',
  '/host-center',
  '/manager-center',
  '/room'
]

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/home',
  '/events',
  '/live',
  '/profile',
  '/wallet',
  '/host-center',
  '/manager-center',
  '/room'
]

// Public routes accessible to all
const PUBLIC_ROUTES = [
  '/',
  '/terms-conditions',
  '/privacy-policy',
  '/user-terminated',
  '/user-suspended',
  '/404',
  '/maintenance-mode',
  '/desktop-warning'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get('user-agent') || ''
  
  // Check if the request is from a mobile device
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  const isTablet = /tablet|ipad/i.test(userAgent)
  const isDesktop = !isMobile && !isTablet

  // Security headers for all responses
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route))
  
  // Generate and set CSRF token
  if (!request.cookies.has('csrf-token')) {
    const csrfToken = generateCSRFToken()
    const isProduction = typeof window === 'undefined' ? false : window.location.protocol === 'https:'
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      path: '/'
    })
  }

  // Check for mobile-only route restrictions
  if (MOBILE_ONLY_ROUTES.some(route => pathname.startsWith(route))) {
    if (isDesktop) {
      return NextResponse.redirect(new URL('/desktop-warning', request.url))
    }
  }

  // Check authentication for protected routes
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const authToken = request.cookies.get('auth-token')
    const sessionId = request.cookies.get('session-id')
    
    if (!authToken || !sessionId) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Add user session validation headers
    response.headers.set('X-Session-Required', 'true')
    response.headers.set('X-Device-Check', isMobile ? 'mobile' : 'desktop')
  }

  // Rate limiting headers
  const clientIP = getClientIP(request)
  response.headers.set('X-RateLimit-IP', clientIP)
  
  // Anti-tampering headers
  response.headers.set('X-Anti-Tamper', 'enabled')
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  // Device fingerprinting
  const deviceFingerprint = generateDeviceFingerprint(request)
  response.headers.set('X-Device-ID', deviceFingerprint)

  return response
}

// Generate CSRF token
function generateCSRFToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = request.headers.get('x-client-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  return realIP || clientIP || '0.0.0.0'
}

// Generate device fingerprint for security
function generateDeviceFingerprint(request: NextRequest): string {
  const userAgent = request.headers.get('user-agent') || ''
  const acceptLanguage = request.headers.get('accept-language') || ''
  const acceptEncoding = request.headers.get('accept-encoding') || ''
  const clientIP = getClientIP(request)
  
  // Create a simple hash of device characteristics
  const fingerprint = btoa(`${userAgent}:${acceptLanguage}:${acceptEncoding}:${clientIP}`)
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 16)
  
  return fingerprint
}

// Configure which paths this middleware runs on
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
}