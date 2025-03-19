import { checkSubscription } from "@/utils/check-subscription";
import { getUser } from "@/utils/supabase/getUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has the required subscription
    const subscriptionCheck = await checkSubscription(user.id, true, true);

    // If user needs checkout, return the checkout URL
    if (subscriptionCheck.needsCheckout) {
      return NextResponse.json(
        {
          error: "Subscription required",
          checkoutUrl:
            subscriptionCheck.checkoutUrl || subscriptionCheck.redirectUrl,
        },
        { status: 402 }
      );
    }

    // User has the required subscription
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error checking subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
