import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getUser } from "@/utils/supabase/getUser";
import config from "@/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// This function is used to create a Stripe Checkout Session (one-time payment or subscription)
// It's called by the <ButtonCheckout /> component
// Users must be authenticated. It will prefill the Checkout data with their email and/or credit card (if any)
export async function POST(req) {
  try {
    const { priceId, successUrl, cancelUrl } = await req.json();

    // Get authenticated user
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Determine if this is the Premium plan (to add trial period)
    const premiumPlan = config.stripe.plans.find(plan => plan.isFeatured);
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
