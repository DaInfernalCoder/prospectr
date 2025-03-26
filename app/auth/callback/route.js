import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

        // Check for checkout redirection cookie
        const cookieStore = cookies();

        // If this was a sign-in from the checkout process, get the selected plan ID
        // and create a checkout session
        const hasRedirectCookie = await cookieStore.has(
          "redirectToCheckoutAfterAuth"
        );
        if (hasRedirectCookie) {
          await cookieStore.delete("redirectToCheckoutAfterAuth");

          // Try to extract the selectedPlanId from the cookie
          const selectedPlanId = (await cookieStore.get("selectedPlanId"))
            ?.value;

          if (selectedPlanId) {
            await cookieStore.delete("selectedPlanId");

            // Get user info needed for checkout
            const {
              data: { user },
            } = await supabase.auth.getUser();

            if (user) {
              // Create a Stripe checkout session
              const session = await stripe.checkout.sessions.create({
                mode: "subscription",
                payment_method_types: ["card"],
                line_items: [
                  {
                    price: selectedPlanId,
                    quantity: 1,
                  },
                ],
                success_url: `${baseUrl}/dashboard?checkout=success`,
                cancel_url: `${baseUrl}?checkout=cancel`,
                client_reference_id: user.id,
                customer_email: user.email,
                // Add trial period for Premium plan
                subscription_data: {
                  trial_period_days: 7,
                },
              });

              // Redirect to Stripe checkout
              return NextResponse.redirect(session.url);
            }
          }
        }

        // Default redirect to dashboard
        return NextResponse.redirect(`${baseUrl}/dashboard`);
      } else {
        console.error("Error during authentication callback:", error);
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
