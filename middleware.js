import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax",
        path: "/",
      },
    }
  );

  try {
    // IMPORTANT: DO NOT REMOVE auth.getUser()
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Check if the URL has auth_success parameter which indicates a successful authentication
    const authSuccess = request.nextUrl.searchParams.get("auth_success");

    // Try to refresh the session if we have a session but no user
    if (!user && session) {
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (!refreshError) {
        // Session refreshed successfully, get the user again
        const {
          data: { user: refreshedUser },
        } = await supabase.auth.getUser();

        // If we now have a user, we can proceed
        if (refreshedUser) {
          return supabaseResponse;
        }
      }
    }

    // Protected routes check - redirect to signin if not authenticated
    if (
      !user &&
      !request.nextUrl.pathname.startsWith("/login") &&
      !request.nextUrl.pathname.startsWith("/auth") &&
      !request.nextUrl.pathname.startsWith("/signin") &&
      !request.nextUrl.pathname.startsWith("/signup") &&
      !request.nextUrl.pathname.startsWith("/reset-password") &&
      !request.nextUrl.pathname.startsWith("/api/stripe") && // Exclude Stripe API routes
      request.nextUrl.pathname !== "/"
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    // If we have a successful auth and user, ensure cookies are properly set
    if (authSuccess && user) {
      const url = request.nextUrl.clone();
      url.searchParams.delete("auth_success");
      const cleanResponse = NextResponse.redirect(url);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        cleanResponse.cookies.set(cookie.name, cookie.value, cookie.options);
      });
      return cleanResponse;
    }

    return supabaseResponse;
  } catch (error) {
    console.error("Middleware error:", error);
    return supabaseResponse;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
  runtime: "edge",
};
