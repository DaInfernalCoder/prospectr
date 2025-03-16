import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    // Get the user's LinkedIn account information from the profiles table
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("unipile_account_id")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching LinkedIn account:", error);
      return NextResponse.json(
        { error: "Failed to fetch account" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      unipileAccountId: profile?.unipile_account_id || null,
    });
  } catch (error) {
    console.error("Error in LinkedIn account API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
