"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "./supabase/server";
import { cookies } from "next/headers";

const signInWith = (provider) => async (formData) => {
  const supabase = await createClient();
  const headersList = await headers();
  const cookieStore = cookies();

  // Get the host, with fallbacks for Vercel and local development
  const host =
    headersList.get("host") || process.env.VERCEL_URL || "localhost:3000";

  // Use https for production (including Vercel) and http for localhost
  const protocol = host.includes("localhost") ? "http" : "https";

  // Ensure consistent redirect path for all auth methods
  const auth_callback = `${protocol}://${host}/auth/callback`;

  // Parse form data values in a way that works on the server
  // Instead of using formData.get() which causes client reference issues
  const redirectToCheckout =
    Object.fromEntries(formData.entries())?.redirectToCheckout === "true";
  const selectedPlanId = Object.fromEntries(formData.entries())?.selectedPlanId;

  // Set cookies for checkout flow if needed
  if (redirectToCheckout) {
    // Set a cookie to indicate we should redirect to checkout after auth
    cookieStore.set("redirectToCheckoutAfterAuth", "true", {
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    });

    // Store the selected plan ID if we have it
    if (selectedPlanId) {
      cookieStore.set("selectedPlanId", selectedPlanId, {
        maxAge: 60 * 10, // 10 minutes
        path: "/",
      });
    }
  }

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

// For normal Google sign-in
const signInWithGoogle = signInWith("google");

export { signInWithGoogle };
