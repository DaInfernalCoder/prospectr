import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const supabase = createClient();

  try {
    const user = await getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const profileData = await request.json();

    // Check if profile already exists
    const { data: existing } = await supabase
      .from("saved_profiles")
      .select()
      .eq("user_id", user.id)
      .eq("profile_id", profileData.profile_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Profile already saved" },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("saved_profiles")
      .insert({
        user_id: user.id,
        profile_data: profileData,
        profile_id: profileData.profile_id,
      })
      .select()
      .single();

    if (error) throw error;

    // LATER IF YOU WANT TO TRACK CONNECTIONS IF IT IS REQUESTED OR CANCLED ETC...
    // await supabase
    // .from('connection_requests')
    // .insert({
    //   user_id: user.id,
    //   recipient_id: profileId,
    //   status: 'pending'
    // });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}
