import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// In front:
// const response = await fetch(`/api/saved-profiles/${savedProfileId}`, {
//   method: 'DELETE'
// });

export async function DELETE(request, props) {
  const params = await props.params;
  const supabase = await createClient();
  const profileId = params.id;

  try {
    const { user } = await getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { error } = await supabase.from("saved_profiles").delete().match({
      id: profileId,
      user_id: user.id,
    });

    if (error) throw error;

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete profile" },
      { status: 500 }
    );
  }
}
