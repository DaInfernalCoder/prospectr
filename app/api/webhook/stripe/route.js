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

  let data;
  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    if (!signature) {
      throw new Error("No Stripe signature found in request headers");
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
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

        console.log({ session });
        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = data.object.client_reference_id;
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);
        console.log({ plan });

        // Set subscription tier to pro
        const subscriptionTier = "pro";

        // Get subscription data to check trial status
        const subscriptionId = session?.subscription;
        let trialEndsAt = null;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(
            subscriptionId
          );
          console.log({ subscription });
          if (subscription.status === "trialing") {
            console.log("trial");
            trialEndsAt = new Date(subscription.trial_end * 1000).toISOString();
          }
        }

        if (!plan) break;

        console.log({
          customer_id: customerId,
          price_id: priceId,
          has_access: true,
          subscription_id: subscriptionId,
          subscription_status: subscriptionId ? "active" : "inactive",
          trial_ends_at: trialEndsAt,
          subscription_created_at: new Date().toISOString(),
          subscription_tier: subscriptionTier,
        });

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
            subscription_tier: subscriptionTier,
          })
          .eq("user_id", userId);

        break;
      }

      case "customer.subscription.created": {
        // A new subscription is created (including trials)
        const subscription = data.object;
        const customerId = subscription.customer;

        // First try to find user by customer_id (for existing customers)
        let { data: userByCustomerId } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("customer_id", customerId)
          .single();

        // If no user found by customer_id, we need to find the user by client_reference_id
        // from the checkout session that created this subscription
        if (!userByCustomerId) {
          // Get the checkout session that created this subscription
          const sessions = await stripe.checkout.sessions.list({
            subscription: subscription.id,
            limit: 1,
          });

          if (sessions.data.length > 0) {
            const userId = sessions.data[0].client_reference_id;

            if (userId) {
              // Update the user's profile with the customer_id and subscription info
              await supabase
                .from("profiles")
                .update({
                  customer_id: customerId,
                  has_access: true,
                  subscription_id: subscription.id,
                  subscription_status: subscription.status,
                  trial_ends_at: subscription.trial_end
                    ? new Date(subscription.trial_end * 1000).toISOString()
                    : null,
                })
                .eq("user_id", userId);

              console.log(
                `Updated user ${userId} with new subscription ${subscription.id}`
              );
              break;
            }
          }

          console.log("Could not find user for subscription:", subscription.id);
          break;
        }

        // If we found a user by customer_id, update their subscription info
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
          .eq("user_id", userByCustomerId.user_id);

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

        if (!user) {
          console.log("No user found for customer:", customerId);
          break;
        }

        // Get the price ID from the subscription
        const priceId = subscription.items.data[0]?.price.id;

        // Find the plan and determine the tier
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);
        const subscriptionTier = "pro";

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
            subscription_tier: subscriptionTier,
          })
          .eq("user_id", user.user_id);

        break;
      }

      case "customer.subscription.deleted": {
        // Subscription ended or was canceled
        const subscription = data.object;
        const customerId = subscription.customer;

        const { data: user } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("customer_id", customerId)
          .single();

        if (!user) {
          console.log("No user found for customer:", customerId);
          break;
        }

        await supabase
          .from("profiles")
          .update({
            has_access: false,
            subscription_status: "canceled",
            canceled_at: new Date().toISOString(),
          })
          .eq("user_id", user.user_id);

        break;
      }

      case "invoice.payment_succeeded": {
        // Invoice paid, update access if needed
        const invoice = data.object;
        const customerId = invoice.customer;
        const subscriptionId = invoice.subscription;

        // Skip one-time payments with no subscription
        if (!subscriptionId) break;

        const { data: user } = await supabase
          .from("profiles")
          .select("user_id, subscription_status")
          .eq("customer_id", customerId)
          .single();

        if (!user) {
          console.log("No user found for customer:", customerId);
          break;
        }

        // Get subscription to check plan details
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        const priceId = subscription.items.data[0]?.price.id;
        const subscriptionTier = "pro";

        await supabase
          .from("profiles")
          .update({
            has_access: true,
            subscription_status: "active",
            subscription_tier: subscriptionTier,
            last_payment_date: new Date().toISOString(),
          })
          .eq("user_id", user.user_id);

        break;
      }

      case "invoice.payment_failed": {
        // Payment failed - notify but don't revoke access yet
        // Stripe will retry and send customer.subscription.deleted if all retries fail
        const customerId = data.object.customer;

        const { data: user } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("customer_id", customerId)
          .single();

        if (!user) {
          console.log("No user found for customer:", customerId);
          break;
        }

        // Add a flag to indicate payment issues
        await supabase
          .from("profiles")
          .update({
            payment_failed: true,
            subscription_status: "past_due",
          })
          .eq("user_id", user.user_id);

        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (e) {
    console.error("stripe error:", e.message, "EVENT TYPE:", eventType);
  }

  return NextResponse.json({});
}
