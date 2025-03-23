"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "./supabase/server";

const signInWith = (provider) => async () => {
  const supabase = await createClient();
  const headersList = await headers();

  // Get the host, with fallbacks for Vercel and local development
  const host =
    headersList.get("host") || process.env.VERCEL_URL || "localhost:3000";

  // Use https for production (including Vercel) and http for localhost
  const protocol = host.includes("localhost") ? "http" : "https";

  // Ensure consistent redirect path for all auth methods
  const auth_callback = `${protocol}://${host}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback,
      persistSession: true,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      emailConfirmationRequired: true, // Explicitly require email confirmation
      data: {
        // User metadata can be added here
      },
    },
  });

  if (error) {
    console.error("Authentication error:", error);
    throw error;
  }

  redirect(data.url);
};

const signInWithGoogle = signInWith("google");

export { signInWithGoogle };
