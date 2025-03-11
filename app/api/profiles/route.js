import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      return NextResponse.json(
        { status: 404, message: "There is no user" },
        { status: 404 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { status: 404, message: "There is no profile" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: data.user, profile }, { status: 200 });
  } catch (error) {
    console.error("Error getting profile:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
