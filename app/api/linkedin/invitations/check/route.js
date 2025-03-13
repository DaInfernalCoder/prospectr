import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { updateInvitationStatus } from "@/lib/invitation-service";
import { unipileClient } from "@/utils/unipileClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = await createClient();
  console.log("/check route");
  try {
    const user = await getUser();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase
      .from("profiles")
      .select("unipile_account_id")
      .eq("user_id", user.id)
      .single();
    console.log({ id: profile.unipile_account_id }, "1");

    if (!profile?.unipile_account_id) {
      return NextResponse.json(
        { error: "LinkedIn not connected" },
        { status: 400 }
      );
    }

    // Get pending invitations from our database
    const { data: pendingInvitations, error } = await supabase
      .from("invitation_users")
      .select(
        `
        *,
        invitation_jobs(
          user_id,
          template_id
        )
      `
      )
      .eq("invitation_status", "pending")
      .eq("invitation_jobs.user_id", user.id);
    console.log(error, "error");
    console.log({ pendingInvitations }, "2");
    if (!pendingInvitations || pendingInvitations.length === 0) {
      return NextResponse.json({ message: "No pending invitations to check" });
    }

    const client = unipileClient();

    // Get list of relations (connections) from Unipile
    const relations = await client.users.getAllRelations({
      account_id: profile.unipile_account_id,
      limit: 100, // Get most recent connections first
    });

    console.log({ relations }, "3");

    // Create a map of LinkedIn public identifiers for quick lookup
    const relationMap = new Map();
    if (relations && relations.items) {
      for (const relation of relations.items) {
        if (relation.public_identifier) {
          try {
            // Get the provider_id for each connection using their public identifier
            const userProfile = await client.users.getProfile({
              account_id: profile.unipile_account_id,
              identifier: relation.public_identifier,
            });
            console.log({ userProfile }, "/check route");

            if (userProfile && userProfile.provider_id) {
              relationMap.set(userProfile.provider_id, {
                ...relation,
                provider_id: userProfile.provider_id,
              });
            }
            console.log({ relationMap }, "1");
          } catch (error) {
            console.error(
              `Error getting profile for ${relation.public_identifier}:`,
              error
            );
            continue;
          }
        }
      }
    }

    // Check status of each pending invitation
    const updatedInvitations = [];

    console.log({ relationMap }, "2");
    for (const invitation of pendingInvitations) {
      // Check if the user is now a connection (invitation accepted)
      if (relationMap.has(invitation.linkedin_user_id)) {
        console.log("has user_id_linkedin");
        const updatedInvitation = await updateInvitationStatus(
          invitation.id,
          "accepted",
          new Date().toISOString()
        );
        updatedInvitations.push(updatedInvitation);
      }
    }

    return NextResponse.json({
      message: `Checked ${pendingInvitations.length} invitations, updated ${updatedInvitations.length}`,
      updatedInvitations,
    });
  } catch (error) {
    console.error("Check invitations error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check invitations" },
      { status: 500 }
    );
  }
}
