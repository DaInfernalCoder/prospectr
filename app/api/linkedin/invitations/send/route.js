import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { unipileClient } from "@/utils/unipileClient";
import { NextResponse } from "next/server";

//FRONT:
//  await fetch('/api/linkedin/invitations/send', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       identifier: public_identifier,
//       message: "Hi {name}, I admire your work at {company}!"  // message not required
//     })
//   });

export async function POST(request) {
  const supabase = await createClient();

  try {
    const user = await getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

    // Get recipient data from request
    const { identifier, message } = await request.json();
    if (!identifier) {
      return NextResponse.json(
        { error: "Missing identifier" },
        { status: 400 }
      );
    }

    const client = unipileClient();

    // fetch invited user
    const invitedUser = await client.users.getProfile({
      account_id: profile.unipile_account_id,
      identifier: identifier,
    });

    if (!invitedUser)
      return NextResponse.json(
        { error: "There is no user with that identifier" },
        { status: 404 }
      );

    //Send invite
    if (message) {
      await client.users.sendInvitation({
        account_id: profile.unipile_account_id,
        provider_id: invitedUser?.provider_id,
        message,
      });
    } else {
      await client.users.sendInvitation({
        account_id: profile.unipile_account_id,
        provider_id: invitedUser?.provider_id,
      });
    }
    //LATER IF YOU WANT TO TRACK CONNECTION REQUESTS (YOU SHOULD ADD TABLE ALSO)
    // await supabase.from("connection_requests").insert({
    //   user_id: user.id,
    //   recipient_id: profileId,
    //   status: "pending",
    // });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Invitation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send connection request" },
      { status: 500 }
    );
  }
}
