import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient(
    { req, res },
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        cookieOptions: {
          name: "sb-auth-token",
          lifetime: 60 * 60 * 24 * 7, // 7 days
          domain:
            process.env.NODE_ENV === "production"
              ? ".leadsprospectr.com"
              : "localhost",
          sameSite: "lax",
          path: "/",
        },
      },
    }
  );

  // Try to refresh the session if it exists
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (session?.user && !error) {
    // Session exists and is valid, try to refresh it
    await supabase.auth.refreshSession();
  }

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
