import { checkSubscription } from "@/utils/check-subscription";
import { sendReconnectionEmail } from "@/utils/email/reconnectionEmail";
import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("account_id");

  const supabase = await createClient();
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
  const { error: dbError } = await supabase
    .from("profiles")
    .update({
      reconnect_token: crypto.randomUUID(),
      reconnect_expires_at: new Date(Date.now() + 3600 * 1000),
    })
    .eq("unipile_account_id", accountId);
  //   if (dbError) {
  //     return NextResponse.json({ error: dbError }, { status: 500 });
  //   }
  await sendReconnectionEmail(user.email, accountId);

  return NextResponse.json({ success: true });
}
