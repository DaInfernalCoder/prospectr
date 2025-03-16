import { UnipileClient } from "unipile-node-sdk";
import { NextResponse } from "next/server";
import { getUser } from "@/utils/supabase/getUser";
import { checkSubscription } from "@/utils/check-subscription";

export async function GET(request) {
  try {
    // 1. Verify environment variables
    const BASE_URL = process.env.UNIPILE_API_URL;
    const ACCESS_TOKEN = process.env.UNIPILE_API_TOKEN;

    if (!BASE_URL || !ACCESS_TOKEN) {
      throw new Error("Missing Unipile configuration in .env");
    }

    const user = await getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // First check if user has access
    const subscriptionCheck = await checkSubscription(user.id, true, true);

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
    if (!user)
      return NextResponse.json({ status: 404, message: "There is no user" });

    const client = new UnipileClient(BASE_URL, ACCESS_TOKEN);

    // 3. Create auth link
    const response = await client.account.createHostedAuthLink({
      type: "create",
      providers: ["LINKEDIN"],
      api_url: BASE_URL,
      expiresOn: new Date(Date.now() + 3600 * 1000),
      // Use current user's ID
      name: user.id,
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/unipile/webhooks`,
      success_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      failure_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return NextResponse.redirect(response.url);
  } catch (error) {
    console.error("Connection failed:", {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: "Connection failed: " + error.message },
      { status: 500 }
    );
  }
}
