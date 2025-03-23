import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
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
        // Set secure to true in production
        secure: process.env.NODE_ENV === "production",
        // Set longer expiration for better persistence
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax",
        path: "/",
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  // Get the user and session to check authentication status
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if the URL has auth_success parameter which indicates a successful authentication
  const authSuccess = request.nextUrl.searchParams.get("auth_success");

  // Try to refresh the session if we have a session but no user
  // This can happen if the session is expired but the cookie still exists
  if (!user && session) {
    try {
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (!refreshError) {
        // Session refreshed successfully, get the user again
        const {
          data: { user: refreshedUser },
        } = await supabase.auth.getUser();

        // If we now have a user, we can proceed
        if (refreshedUser) {
          // Continue with the request
          return supabaseResponse;
        }
      }
    } catch (error) {
      console.error("Error refreshing session:", error);
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
    request.nextUrl.pathname !== "/"
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // If we have a successful auth and user, ensure cookies are properly set
  if (authSuccess && user) {
    // Create a new response with the auth_success parameter removed to clean up the URL
    const url = request.nextUrl.clone();
    url.searchParams.delete("auth_success");

    const cleanResponse = NextResponse.redirect(url);

    // Copy all cookies from the supabaseResponse to ensure session persistence
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      cleanResponse.cookies.set(cookie.name, cookie.value, cookie.options);
    });

    return cleanResponse;
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
