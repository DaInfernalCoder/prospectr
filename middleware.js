import { NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request) {
  // Update user session
  const { response, supabase, session } = await updateSession(request);

  // Paths that don't require subscription
  const publicPaths = [
    "/",
    "/signin",
    "/pricing",
    "/api/webhook/stripe",
    "/reset-password",
    "/about",
    "/blog",
    "privacy-policy",
    "survey",
    "test-page",
    "thankyou",
    "tos",
  ];

  const isPublicPath = publicPaths.some(
    (path) =>
      request.nextUrl.pathname === path ||
      request.nextUrl.pathname.startsWith("/api/auths/") ||
      request.nextUrl.pathname.startsWith("/_next/")
  );

  // Allow public paths for everyone
  if (isPublicPath) {
    return response;
  }

  // If no session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Check if user has active subscription
  const { data: profile } = await supabase
    .from("profiles")
    .select("has_access, subscription_status, trial_ends_at")
    .eq("user_id", session.user.id)
    .single();

  const hasActiveSubscription = profile?.has_access === true;

  // If user is logged in but doesn't have active subscription,
  // redirect to pricing page
  if (!hasActiveSubscription) {
    // Allow access to billing/account management paths
    if (
      request.nextUrl.pathname.startsWith("/account") ||
      request.nextUrl.pathname.startsWith("/billing")
    ) {
      return response;
    }

    return NextResponse.redirect(new URL("/pricing", request.url));
  }

  // User has active subscription, allow access
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
