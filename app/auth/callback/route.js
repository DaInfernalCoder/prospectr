import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error_description = searchParams.get("error_description");

  // Handle error case first
  if (error_description) {
    console.error("Auth error:", error_description);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/signin?error=${encodeURIComponent(
        error_description
      )}`
    );
  }

  if (code) {
    const supabase = await createClient();

    try {
      let error = null;

      // Exchange the code for a session
      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);
      error = exchangeError;

      if (!error) {
        // Get the current domain
        const forwardedHost = request.headers.get("x-forwarded-host");
        const host = forwardedHost || request.headers.get("host");
        const protocol =
          process.env.NODE_ENV === "production" ? "https" : "http";
        const baseUrl = `${protocol}://${host}`;

        // Redirect to /dashboard after successful login
        return NextResponse.redirect(`${baseUrl}/dashboard`);
      } else {
        console.error("Error during authentication callback:", error);
        // Redirect to login with an error message
        return NextResponse.redirect(
          `${
            process.env.NEXT_PUBLIC_APP_URL
          }/signin?error=auth-failed&message=${encodeURIComponent(
            error.message
          )}`
        );
      }
    } catch (err) {
      console.error("Exception during auth callback:", err);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/signin?error=unexpected-error`
      );
    }
  }

  // If no code, redirect to login
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/signin?error=missing-code`
  );
}
