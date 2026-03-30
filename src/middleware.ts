import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED_PATHS = ["/dashboard"];
const AUTH_PATHS = ["/login", "/register"];

const RATE_LIMIT_WINDOW = 60;
const RATE_LIMIT_MAX = 100;

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
];

function setSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(self), payment=(self)"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://res.cloudinary.com",
      "font-src 'self'",
      "connect-src 'self' https://api.paystack.co https://api.termii.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );

  return response;
}

function handleCors(request: NextRequest, response: NextResponse): NextResponse {
  const origin = request.headers.get("origin");

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Max-Age", "86400");
  }

  return response;
}

function setRateLimitHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-RateLimit-Limit", String(RATE_LIMIT_MAX));
  response.headers.set("X-RateLimit-Window", `${RATE_LIMIT_WINDOW}s`);
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle CORS preflight requests for API routes
  if (pathname.startsWith("/api/") && request.method === "OPTIONS") {
    const preflightResponse = new NextResponse(null, { status: 204 });
    handleCors(request, preflightResponse);
    return preflightResponse;
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && AUTH_PATHS.some((p) => pathname.startsWith(p))) {
    const dashboardUrl = new URL("/dashboard", request.url);
    const redirectResponse = NextResponse.redirect(dashboardUrl);
    setSecurityHeaders(redirectResponse);
    return redirectResponse;
  }

  // Protect dashboard routes
  if (
    !isAuthenticated &&
    PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);
    setSecurityHeaders(redirectResponse);
    return redirectResponse;
  }

  let response = NextResponse.next();

  // Apply security headers to all responses
  response = setSecurityHeaders(response);

  // Apply CORS headers to API routes
  if (pathname.startsWith("/api/")) {
    response = handleCors(request, response);
    response = setRateLimitHeaders(response);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
