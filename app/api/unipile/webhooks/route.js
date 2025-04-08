import { createClient } from "@supabase/supabase-js"; // Import the standard JS client
import { NextResponse } from "next/server";

// IMPORTANT: Use the standard Supabase client here, initialized with the Service Role Key
// DO NOT use the server client from utils/supabase/server which relies on cookies/user context
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // Use the Service Role Key
  {
    auth: {
      // Important: disable auto-refreshing tokens for service roles
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request) {
  console.log("=== WEBHOOK RECEIVED ==="); // Changed log message slightly

  try {
    const payload = await request.json();
    console.log("Webhook Payload:", JSON.stringify(payload, null, 2)); // Log the full payload

    // Validate essential payload fields
    if (!payload.account_id || !payload.name) {
      console.error(
        "Webhook Error: Missing account_id or name (user_id) in payload"
      );
      return NextResponse.json(
        { error: "Bad request: Missing required fields" },
        { status: 400 }
      );
    }

    const userId = payload.name; // Assuming payload.name contains the Supabase user_id
    const unipileAccountId = payload.account_id;

    console.log(
      `Attempting to update profile for user_id: ${userId} with unipile_account_id: ${unipileAccountId}`
    );

    // Use the supabaseAdmin client (with Service Role Key) to bypass RLS
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        unipile_account_id: unipileAccountId,
        linkedin_status: true, // Set status to true upon successful connection
        // Optionally update a timestamp:
        // linkedin_connected_at: new Date().toISOString(),
      })
      .eq("user_id", userId) // Match the user based on the ID from the webhook payload
      .select(); // Select the updated row to confirm the update

    if (error) {
      console.error(`Supabase Update Error for user ${userId}:`, error);
      // Consider specific error handling, e.g., if user_id doesn't exist
      if (error.code === "PGRST116") {
        // Error code for no rows found matching the filter
        console.warn(
          `Webhook Warning: No profile found for user_id ${userId}. Cannot update.`
        );
        // Return success to Unipile anyway, as the connection happened, just couldn't update profile.
        return NextResponse.json({
          success: true,
          message: "Profile not found for user, but webhook acknowledged.",
        });
      }
      // Throw other errors to be caught below
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn(
        `Webhook Warning: Profile update for user_id ${userId} returned no data. Check if user exists.`
      );
      // Return success to Unipile, but log the issue.
      return NextResponse.json({
        success: true,
        message: "Profile update succeeded but returned no data.",
      });
    }

    console.log(
      `Update successful for user ${userId}:`,
      JSON.stringify(data, null, 2)
    );

    // Acknowledge receipt to Unipile
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fatal Webhook Processing Error:", error);
    // Return a generic server error response
    return NextResponse.json(
      { error: "Webhook processing failed internally" },
      { status: 500 }
    );
  }
}
