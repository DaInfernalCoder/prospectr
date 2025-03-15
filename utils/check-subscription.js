"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { getUser } from "./supabase/getUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function checkSubscription(
  userId,
  redirectToCheckout = false,
  isApiRoute = false
) {
  if (!userId) {
    if (isApiRoute) {
      return {
        hasAccess: false,
        needsCheckout: true,
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/signin`,
      };
    }
    redirect("/signin");
  }

  const supabase = await createClient();
  const user = await getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("has_access, subscription_status, trial_ends_at, customer_id")
    .eq("user_id", userId)
    .single();

  if (error || !profile) {
    console.error("Error checking subscription:", error);
    if (isApiRoute) {
      return {
        hasAccess: false,
        needsCheckout: true,
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
      };
    }
    redirect("/#pricing");
  }

  const hasActiveSubscription = profile.has_access === true;

  // Only create checkout session if explicitly requested AND user doesn't have access
  if (!hasActiveSubscription && redirectToCheckout) {
    const sessionOptions = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      client_reference_id: userId,
      subscription_data: {
        trial_period_days: 7,
      },
    };

    if (profile.customer_id) {
      sessionOptions.customer = profile.customer_id;
    } else {
      sessionOptions.customer_email = user.email;
    }

    try {
      const session = await stripe.checkout.sessions.create(sessionOptions);

      if (isApiRoute) {
        return {
          hasAccess: false,
          needsCheckout: true,
          checkoutUrl: session.url,
        };
      }
      redirect(session.url);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      if (isApiRoute) {
        return {
          hasAccess: false,
          needsCheckout: true,
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
        };
      }
      redirect("/#pricing");
    }
  }

  return {
    hasAccess: hasActiveSubscription,
    subscriptionStatus: profile.subscription_status,
    trialEndsAt: profile.trial_ends_at,
    needsCheckout: !hasActiveSubscription,
  };
}
