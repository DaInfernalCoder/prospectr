import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: [
    // Protect dashboard routes
    "/dashboard/:path*",
    "/survey/:path*",
    // Handle auth callback
    "/auth/callback",
    // Skip static files and api routes
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
