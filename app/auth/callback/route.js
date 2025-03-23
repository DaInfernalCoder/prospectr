import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error_description = searchParams.get("error_description");

  // Handle error case first
  if (error_description) {
    console.error("Auth error:", error_description);
    return NextResponse.redirect(
      `${origin}/signin?error=${encodeURIComponent(error_description)}`
    );
  }

  if (code) {
    const supabase = await createClient();

    try {
      let error = null;

      // Check if this is a direct token from email/password login
      // or a code from OAuth flow
      if (code.length > 100) {
        // This is likely an OAuth code, exchange it for a session
        const result = await supabase.auth.exchangeCodeForSession(code);
        error = result.error;
      } else {
        // This might be a direct token from email/password login
        // We'll set the session directly
        const { data, error: sessionError } = await supabase.auth.getSession();
        error = sessionError;

        // If no session exists, try to set it using the token
        if (!data?.session && !sessionError) {
          const { error: setSessionError } = await supabase.auth.setSession({
            access_token: code,
            refresh_token: null,
          });
          error = setSessionError;
        }
      }

      if (!error) {
        // Redirect to /dashboard after successful login
        const next = "/dashboard"; // Hardcoded to /dashboard
        const forwardedHost = request.headers.get("x-forwarded-host"); // Original origin before load balancer
        const isLocalEnv = process.env.NODE_ENV === "development";

        // Set a cookie to indicate successful authentication
        const redirectUrl = isLocalEnv
          ? `${origin}${next}`
          : forwardedHost
          ? `https://${forwardedHost}${next}`
          : `${origin}${next}`;

        // Add a timestamp to prevent caching issues
        const timestamp = Date.now();
        return NextResponse.redirect(
          `${redirectUrl}?auth_success=${timestamp}`
        );
      } else {
        console.error("Error during authentication callback:", error);
        // Redirect to login with an error message
        return NextResponse.redirect(
          `${origin}/signin?error=auth-failed&message=${encodeURIComponent(
            error.message
          )}`
        );
      }
    } catch (err) {
      console.error("Exception during auth callback:", err);
      return NextResponse.redirect(`${origin}/signin?error=unexpected-error`);
    }
  }

  // If no code, redirect to login
  return NextResponse.redirect(`${origin}/signin?error=missing-code`);
}
