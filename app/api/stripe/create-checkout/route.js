import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getUser } from "@/utils/supabase/getUser";
import config from "@/config";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// This function is used to create a Stripe Checkout Session (one-time payment or subscription)
// It's called by the <ButtonCheckout /> component
// Users must be authenticated. If not, it will return a response indicating the user should create an account
export async function POST(req) {
  try {
    const { priceId, successUrl, cancelUrl } = await req.json();

    // Get authenticated user
    let user = await getUser();

    // If no user, try to refresh the session
    if (!user) {
      const supabase = await createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Try to refresh the session
        const { error: refreshError } = await supabase.auth.refreshSession();
        if (!refreshError) {
          // Get the user again after refresh
          const {
            data: { user: refreshedUser },
          } = await supabase.auth.getUser();
          if (refreshedUser) {
            user = refreshedUser;
          }
        }
      }

      // If still no user after refresh, return signup redirect
      if (!user) {
        return NextResponse.json(
          {
            error: "Authentication required",
            redirectToSignup: true,
            status: 401,
          },
          { status: 401 }
        );
      }
    }

    // Determine if this is the Premium plan (to add trial period)
    const premiumPlan = config.stripe.plans.find((plan) => plan.isFeatured);
    const isPremiumPlan = premiumPlan && premiumPlan.priceId === priceId;

    // Create checkout session
    const sessionOptions = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: user.id,
      customer_email: user.email,
    };

    // Add trial period only for Premium plan
    if (isPremiumPlan) {
      sessionOptions.subscription_data = {
        trial_period_days: 7,
      };
    }

    const session = await stripe.checkout.sessions.create(sessionOptions);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
