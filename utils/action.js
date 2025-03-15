"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

const { createClient } = require("./supabase/server");

const signInWith = (provider) => async () => {
  const supabase = await createClient();
  const headersList = await headers();

  // Get the host, with fallbacks for Vercel and local development
  const host =
    headersList.get("host") || process.env.VERCEL_URL || "localhost:3000";

  // Use https for production (including Vercel) and http for localhost
  const protocol = host.includes("localhost") ? "http" : "https";

  const auth_callback = `${protocol}://${host}/auth/callback`;
  console.log("first", auth_callback);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback,
    },
  });

  if (error) {
    console.error(error, "Authentication error:", error);
  }

  redirect(data.url);
};

const signInWithGoogle = signInWith("google");

export { signInWithGoogle };
