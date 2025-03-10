import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to /dashboard after successful login
      const next = "/dashboard"; // Hardcoded to /dashboard
      const forwardedHost = request.headers.get("x-forwarded-host"); // Original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // Local environment
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // Production environment with a load balancer
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        // Production environment without a load balancer
        return NextResponse.redirect(`${origin}${next}`);
      }
    } else {
      console.error("Error during OAuth callback:", error);
      // Redirect to login with an error message
      return NextResponse.redirect(`${origin}/signin?error=auth-failed`);
    }
  }

  // If no code, redirect to login
  return NextResponse.redirect(`${origin}/signin`);
}
