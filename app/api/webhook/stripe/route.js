import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { SupabaseClient } from "@supabase/supabase-js";
import configFile from "@/config";
import { findCheckoutSession } from "@/libs/stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  // Get the raw body as text
  const body = await req.text();

  // Get the signature from headers
  const signature = headers().get("stripe-signature");

  console.log(
    "Webhook received - Signature:",
    signature ? "Present" : "Missing"
  );

  let data;
  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    if (!signature) {
      throw new Error("No Stripe signature found in request headers");
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log("Webhook verified successfully:", event.type);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  // Create a private supabase client using the secret service_role API key
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created
        const session = await findCheckoutSession(data.object.id);

        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = data.object.client_reference_id;
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);

        // Get subscription data to check trial status
        const subscriptionId = session?.subscription;
        let trialEndsAt = null;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(
            subscriptionId
          );
          if (subscription.status === "trialing") {
            trialEndsAt = new Date(subscription.trial_end * 1000).toISOString();
          }
        }

        if (!plan) break;

        // Update the profile with subscription info
        await supabase
          .from("profiles")
          .update({
            customer_id: customerId,
            price_id: priceId,
            has_access: true,
            subscription_id: subscriptionId,
            subscription_status: subscriptionId ? "active" : "inactive",
            trial_ends_at: trialEndsAt,
            subscription_created_at: new Date().toISOString(),
          })
          .eq("user_id", userId);

        break;
      }

      case "customer.subscription.created": {
        // A new subscription is created (including trials)
        const subscription = data.object;
        const customerId = subscription.customer;

        const { data: user } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("customer_id", customerId)
          .single();

        if (!user) break;

        const trialEndsAt = subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : null;

        await supabase
          .from("profiles")
          .update({
            has_access: true,
            subscription_id: subscription.id,
            subscription_status: subscription.status,
            trial_ends_at: trialEndsAt,
          })
          .eq("user_id", user.user_id);

        break;
      }

      case "customer.subscription.updated": {
        // Subscription details changed
        const subscription = data.object;
        const customerId = subscription.customer;

        const { data: user } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("customer_id", customerId)
          .single();

        if (!user) break;

        // Check if trial status changed
        const trialEndsAt = subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : null;

        // Update access based on subscription status
        const hasAccess = ["active", "trialing"].includes(subscription.status);

        await supabase
          .from("profiles")
          .update({
            has_access: hasAccess,
            subscription_status: subscription.status,
            trial_ends_at: trialEndsAt,
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq("user_id", user.user_id);

        break;
      }

      case "customer.subscription.deleted": {
        // Subscription ended or was canceled
        const subscription = data.object;
        const customerId = subscription.customer;

        await supabase
          .from("profiles")
          .update({
            has_access: false,
            subscription_status: "canceled",
            canceled_at: new Date().toISOString(),
          })
          .eq("customer_id", customerId);

        break;
      }

      case "invoice.paid": {
        // Recurring payment success - extend access
        const priceId = data.object.lines.data[0].price.id;
        const customerId = data.object.customer;

        // Find profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("customer_id", customerId)
          .single();

        if (!profile || profile.price_id !== priceId) break;

        // Grant access and update records
        await supabase
          .from("profiles")
          .update({
            has_access: true,
            subscription_status: "active",
            last_payment_at: new Date().toISOString(),
          })
          .eq("customer_id", customerId);

        break;
      }

      case "invoice.payment_failed": {
        // Payment failed - notify but don't revoke access yet
        // Stripe will retry and send customer.subscription.deleted if all retries fail
        const customerId = data.object.customer;

        // Add a flag to indicate payment issues
        await supabase
          .from("profiles")
          .update({
            payment_failed: true,
            subscription_status: "past_due",
          })
          .eq("customer_id", customerId);

        break;
      }

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: " + e.message + "EVENT TYPE: " + eventType);
  }

  return NextResponse.json({});
}
