import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { auth: session } = req;
  const { nextUrl } = req;
  const isLoggedIn = !!session;
  const isAuthRoute = nextUrl.pathname.startsWith("/auth/");
  const isPublicAsset =
    nextUrl.pathname.startsWith("/assets/") ||
    nextUrl.pathname.startsWith("/_next/") ||
    nextUrl.pathname === "/favicon.ico" ||
    nextUrl.pathname.startsWith("/api/");

  // Always allow access to public assets
  if (isPublicAsset) {
    return NextResponse.next();
  }

  // If logged in and trying to access auth routes, redirect to home
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If not logged in and trying to access protected routes, redirect to login
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
});

// Define which routes to check with the middleware
export const config = {
  matcher: [
    // Check all routes except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
