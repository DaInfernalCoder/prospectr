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
      // Exchange the code for a session with persistence enabled
      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (!exchangeError) {
        // Get the current domain
        const forwardedHost = request.headers.get("x-forwarded-host");
        const host = forwardedHost || request.headers.get("host");
        const protocol =
          process.env.NODE_ENV === "production" ? "https" : "http";
        const baseUrl = `${protocol}://${host}`;

        // Create response with redirect
        const response = NextResponse.redirect(`${baseUrl}/dashboard`);

        // Set cookie attributes for better persistence
        response.cookies.set("sb-auth-token", code, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
      } else {
        console.error("Error during authentication callback:", exchangeError);
        return NextResponse.redirect(
          `${
            process.env.NEXT_PUBLIC_APP_URL
          }/signin?error=auth-failed&message=${encodeURIComponent(
            exchangeError.message
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
