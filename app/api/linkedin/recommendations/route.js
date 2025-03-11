import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { unipileClient } from "@/utils/unipileClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = await createClient();

  try {
    const user = await getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    //  Get Unipile account ID
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

    const client = unipileClient();

    const { items } = await client.users.getAllRelations({
      account_id: profile.unipile_account_id,
      limit: 10, // Get top 10 recommendations
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}
