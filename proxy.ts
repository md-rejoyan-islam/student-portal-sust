import { refreshAccessToken } from "@/lib/refresh-token";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Auth routes — if user is logged in, redirect away from login pages
  const authRoutes = ["/login", "/forgot-password", "/reset-password"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Protected routes — require authentication
  const protectedRoutes = ["/courses", "/course", "/profile", "/enrollments"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  let hasValidToken = !!accessToken;
  let newAccessToken: string | null = null;

  // If no access token but we have a refresh token, try refreshing
  if (!accessToken && refreshToken) {
    newAccessToken = await refreshAccessToken(refreshToken);
    hasValidToken = !!newAccessToken;
  }

  // 1. Auth Route — redirect logged-in users away from login pages
  if (hasValidToken && isAuthRoute) {
    const response = NextResponse.redirect(new URL("/", request.url));
    if (newAccessToken) {
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }
    return response;
  }

  // 2. Protected Route — redirect unauthenticated users to login
  if (!hasValidToken && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Pass through — set refreshed token cookie if we got a new one
  const response = NextResponse.next();
  if (newAccessToken) {
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|pdf).*)",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/",
    "/courses",
    "/course/:path*",
    "/profile",
    "/enrollments",
    "/enrollments/:path*",
  ],
};
