import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { markFollowUpSent } from "@/lib/invitation-service";
import { unipileClient } from "@/utils/unipileClient";
import { NextResponse } from "next/server";

export async function GET(request) {
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

    // Get accepted invitations that need follow-up
    const { data: pendingFollowUps } = await supabase
      .from("invitation_users")
      .select(
        `
        *,
        invitation_jobs(
          user_id,
          template_id,
          invitation_templates(follow_up_message)
        )
      `
      )
      .eq("invitation_status", "accepted")
      .is("follow_up_sent_at", null)
      .eq("invitation_jobs.user_id", user.id);

    if (!pendingFollowUps || pendingFollowUps.length === 0) {
      return NextResponse.json({ message: "No pending follow-ups to send" });
    }

    const client = unipileClient();
    const sentFollowUps = [];

    for (const followUp of pendingFollowUps) {
      try {
        // Skip if no template or message
        if (
          !followUp.invitation_jobs?.invitation_templates?.follow_up_message
        ) {
          continue;
        }

        // Get the template message
        const templateMessage =
          followUp.invitation_jobs.invitation_templates.follow_up_message;

        // Personalize the message
        const personalizedMessage = templateMessage
          .replace(/{{name}}/g, followUp.name || "there")
          .replace(/{{first_name}}/g, followUp.name?.split(" ")[0] || "there");

        // Send message via Unipile
        await client.messaging.sendMessage({
          account_id: profile.unipile_account_id,
          provider: "LINKEDIN",
          recipient_id: followUp.linkedin_user_id,
          text: personalizedMessage,
        });

        // Mark follow-up as sent
        const updatedFollowUp = await markFollowUpSent(followUp.id);
        sentFollowUps.push(updatedFollowUp);
      } catch (error) {
        console.error(
          `Error sending follow-up to ${followUp.linkedin_user_id}:`,
          error
        );
        // Continue with next follow-up
      }
    }

    return NextResponse.json({
      message: `Sent ${sentFollowUps.length} follow-up messages out of ${pendingFollowUps.length} pending`,
      sentFollowUps,
    });
  } catch (error) {
    console.error("Follow-up error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send follow-ups" },
      { status: 500 }
    );
  }
}
