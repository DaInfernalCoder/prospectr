import { sendReconnectionEmail } from "@/utils/email/reconnectionEmail";
import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// app/api/unipile/webhooks/route.ts
export async function POST(request) {
  console.log("=== WEBHOOK STARTED ===");

  try {
    const payload = await request.json();
    console.log({ payload });

    // Validate payload
    if (!payload.account_id || !payload.name) {
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

    const { data, error } = await supabase
      .from("profiles")
      .update({
        unipile_account_id: payload.account_id,
        linkedin_status: true,
      })
      .eq("user_id", payload.name)
      .select();

    if (error) {
      console.error("Update error:", error);
      throw error;
    }
    console.log("Update successful:", data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fatal error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
