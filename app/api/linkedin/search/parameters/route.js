import { checkSubscription } from "@/utils/check-subscription";
import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = await createClient();
  const searchParams = request.nextUrl.searchParams;

  // Get required parameters
  const type = searchParams.get("type");
  const keywords = searchParams.get("keywords");

  // Validate required parameters
  if (!type || !keywords) {
    return NextResponse.json(
      { error: "Missing required parameters: type and keywords" },
      { status: 400 }
    );
  }

  try {
    const user = await getUser();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Check subscription
    const subscriptionCheck = await checkSubscription(user.id, true, true);
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

    // Get user's Unipile account ID
    const { data: profile } = await supabase
      .from("profiles")
      .select("unipile_account_id")
      .eq("user_id", user.id)
      .single();

    if (!profile?.unipile_account_id) {
      return NextResponse.json(
        { error: "LinkedIn not connected" },
        { status: 400 }
      );
    }

    // Optional limit parameter
    const limit = searchParams.get("limit") || 10;

    // Call Unipile API to get parameter IDs
    const response = await fetch(
      `${
        process.env.UNIPILE_API_URL
      }/api/v1/linkedin/search/parameters?account_id=${
        profile.unipile_account_id
      }&type=${type}&keywords=${encodeURIComponent(keywords)}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.UNIPILE_API_TOKEN,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Unipile API error:", errorData);
      return NextResponse.json(
        {
          message: `Parameter lookup failed: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const results = await response.json();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Parameter lookup error:", error);
    return NextResponse.json(
      { error: error.message || "Parameter lookup failed" },
      { status: 500 }
    );
  }
}
