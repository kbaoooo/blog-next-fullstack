import { NextRequest, NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = ["/admin", "/user-settings", "/profile"];

// Define auth routes (redirect to dashboard if already logged in)
const authRoutes = ["/dang-nhap", "/dang-ky"];

// Define admin routes (only for admin users)
const adminRoutes = ["/admin"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for session cookie
  const sessionCookie = request.cookies.get("session");
  const isAuthenticated = !!sessionCookie;

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if route is auth-related
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Check if route is admin-only
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/dang-nhap", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from auth routes
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For admin routes, we need to check user role
  // This is a simplified check - in a real app you might want to verify the session
  if (isAdminRoute && isAuthenticated) {
    // We can't easily check user role in middleware without making a database call
    // So we'll let the page handle role checking and redirect if needed
    // Alternatively, you could store role in a separate cookie or JWT
  }

  // Continue with i18n middleware if needed
  // const intlResponse = i18nMiddleware(request);
  // if (intlResponse) return intlResponse;

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
