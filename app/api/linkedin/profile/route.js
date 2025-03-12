import { NextResponse } from "next/server";
import { getUser } from "@/utils/supabase/getUser";
import { unipileClient } from "@/utils/unipileClient";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const supabase = await createClient();

  try {
    const user = await getUser();
    console.log(user);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get Unipile account ID from database
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

    // Fetch LinkedIn profile from Unipile
    const client = unipileClient();

    const linkedinProfile = await client.users.getOwnProfile(
      profile.unipile_account_id
    );

    return NextResponse.json(linkedinProfile);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
