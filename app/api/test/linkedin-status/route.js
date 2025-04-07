import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();
    const { event } = await request.json();

    // Simulate a webhook payload
    const payload = {
      account_id: "test_account_" + Date.now(),
      name: user.id,
      event: `account.${event}`,
      metadata: {
        test: true,
        timestamp: new Date().toISOString(),
      },
    };

    // Call the webhook handler directly
    const { data: result, error: txError } = await supabase.rpc(
      "handle_linkedin_webhook",
      {
        p_account_id: payload.account_id,
        p_user_id: payload.name,
        p_event: payload.event,
        p_metadata: JSON.stringify(payload),
      }
    );

    if (txError) {
      console.error("Test webhook error:", txError);
      throw txError;
    }

    // Get the latest status
    const { data: events, error: eventsError } = await supabase
      .from("linkedin_connection_events")
      .select("*")
      .eq("user_id", user.id)
      .order("occurred_at", { ascending: false })
      .limit(5);

    if (eventsError) {
      throw eventsError;
    }

    return NextResponse.json({
      success: true,
      event: payload.event,
      recentEvents: events,
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return NextResponse.json(
      { error: "Test failed: " + error.message },
      { status: 500 }
    );
  }
}
