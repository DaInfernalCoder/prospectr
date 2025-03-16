import { NextResponse } from "next/server";
import { checkSubscription } from "./check-subscription";

export const getIsSubscription = async (userId) => {
  // First check if user has access
  const subscriptionCheck = await checkSubscription(userId, true, true);

  // If user needs checkout, return the checkout URL
  if (subscriptionCheck.needsCheckout) {
    console.log({
      error: "Subscription required",
      checkoutUrl:
        subscriptionCheck.checkoutUrl || subscriptionCheck.redirectUrl,
    });
    return NextResponse.json(
      {
        error: "Subscription required",
        checkoutUrl:
          subscriptionCheck.checkoutUrl || subscriptionCheck.redirectUrl,
      },
      { status: 402 }
    );
  }
};
