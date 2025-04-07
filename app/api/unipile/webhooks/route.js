import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("=== WEBHOOK STARTED ===");

  try {
    const payload = await request.json();
    console.log("Webhook payload:", payload);

    if (!payload.account_id || !payload.name || !payload.event) {
      console.error("Missing required fields in webhook payload");
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const supabase = await createClient();

    // Update profile with new connection status
    const { data, error } = await supabase
      .from("profiles")
      .update({
        unipile_account_id: payload.account_id,
        linkedin_status: payload.event === "account.connected",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", payload.name)
      .select()
      .single();

    if (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }

    // Log the status update
    const { error: statusError } = await supabase
      .from("linkedin_status_updates")
      .insert({
        user_id: payload.name,
        connection_id: data.id,
        status: payload.event.replace("account.", ""),
        account_id: payload.account_id,
        metadata: payload,
      });

    if (statusError) {
      console.error("Failed to log status update:", statusError);
    }

    console.log("Webhook processed successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
