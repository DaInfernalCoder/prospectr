import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
    },
  );

  // Get the user and session to check authentication status
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if the URL has auth_success parameter
  const authSuccess = request.nextUrl.searchParams.get("auth_success");

  // Try to refresh the session if we have a session but no user
  if (!user && session) {
    try {
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (!refreshError) {
        const {
          data: { user: refreshedUser },
        } = await supabase.auth.getUser();

        if (refreshedUser) {
          return supabaseResponse;
        }
      }
    } catch (error) {
      console.error("Error refreshing session:", error);
    }
  }

  // Protected routes check
  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/signin") &&
    !request.nextUrl.pathname.startsWith("/signup") &&
    !request.nextUrl.pathname.startsWith("/reset-password") &&
    request.nextUrl.pathname !== "/"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // Handle successful auth
  if (authSuccess && user) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("auth_success");

    const cleanResponse = NextResponse.redirect(url);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      cleanResponse.cookies.set(cookie.name, cookie.value, {
        domain: cookie.domain,
        httpOnly: cookie.httpOnly,
        maxAge: cookie.maxAge,
        path: cookie.path,
        sameSite: cookie.sameSite as CookieOptions["sameSite"],
        secure: cookie.secure,
      });
    });

    return cleanResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
