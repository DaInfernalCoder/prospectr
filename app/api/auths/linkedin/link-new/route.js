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

    const { searchParams } = new URL(request.url);
    const redirectTo = searchParams.get("redirect_to") || "dashboard";

    const client = new UnipileClient(BASE_URL, ACCESS_TOKEN);

    // Determine redirect URLs based on context
    const baseRedirectUrl = process.env.NEXT_PUBLIC_APP_URL;
    const successRedirect =
      redirectTo === "settings"
        ? `${baseRedirectUrl}/dashboard/settings?linkedin_connected=true`
        : `${baseRedirectUrl}/dashboard?linkedin_connected=true`;
    const failureRedirect =
      redirectTo === "settings"
        ? `${baseRedirectUrl}/dashboard/settings?linkedin_failed=true`
        : `${baseRedirectUrl}/dashboard?linkedin_failed=true`;

    // 3. Create auth link to replace existing account
    const response = await client.account.createHostedAuthLink({
      type: "create",
      providers: ["LINKEDIN"],
      api_url: BASE_URL,
      expiresOn: new Date(Date.now() + 3600 * 1000),
      // Use the same naming convention as the main connect endpoint
      name: user.id,
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/unipile/webhooks`,
      success_redirect_url: successRedirect,
      failure_redirect_url: failureRedirect,
    });

    return NextResponse.redirect(response.url);
  } catch (error) {
    console.error("LinkedIn account replacement failed:", {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: "Connection failed: " + error.message },
      { status: 500 }
    );
  }
}
