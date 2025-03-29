import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("=== WEBHOOK STARTED ===");

  try {
    const payload = await request.json();
    console.log({ payload });

    if (!payload.account_id || !payload.name || !payload.event) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: user, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", payload.name)
      .single();

    if (fetchError) {
      console.error("User lookup failed:", fetchError);
      throw fetchError;
    }
    console.log("Found user:", user);

    // Handle different webhook events
    const updateData = {
      unipile_account_id: payload.account_id,
      updated_at: new Date().toISOString(),
    };

    switch (payload.event) {
      case "account.connected":
        updateData.linkedin_status = true;
        break;
      case "account.disconnected":
      case "account.expired":
      case "account.revoked":
        updateData.linkedin_status = false;
        break;
      default:
        console.log("Unhandled webhook event:", payload.event);
        return NextResponse.json({ success: true });
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("user_id", payload.name)
      .select();

    if (error) {
      console.error("Update error:", error);
      throw error;
    }
    console.log("Update successful:", data);

    if (payload.event === "account.connected") {
      // Also initialize the connections table
      const { error: connectionsError } = await supabase
        .from("linkedin_status_updates")
        .insert({
          user_id: payload.name,
          status: "connected",
          metadata: { account_id: payload.account_id, event: payload.event },
        });

      if (connectionsError) {
        console.error("Failed to create status update:", connectionsError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fatal error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
