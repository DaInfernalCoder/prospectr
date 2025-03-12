import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { UnipileClient } from "unipile-node-sdk";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const accountId = searchParams.get("account_id");

    const supabase = await createClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("reconnect_token, reconnect_expires_at")
      .eq("unipile_account_id", accountId)
      .single();

    //TODO LATER
    //   if (
    //     profile.reconnect_token !== token ||
    //     new Date(profile.reconnect_expires_at) < new Date()
    //   ) {
    //     return NextResponse.redirect("/auth/error");
    //   }

    const client = new UnipileClient(
      process.env.UNIPILE_API_URL,
      process.env.UNIPILE_API_TOKEN
    );

    const { url } = await client.account.createHostedAuthLink({
      type: "reconnect",
      // HARDCODED FOR NOW
      reconnect_account: accountId,
      providers: ["LINKEDIN"],
      api_url: process.env.UNIPILE_API_URL,
      success_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/unipile/webhooks`,
      expiresOn: new Date(Date.now() + 3600 * 1000),
    });
    console.log(url);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Fatal error:", error.body);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
