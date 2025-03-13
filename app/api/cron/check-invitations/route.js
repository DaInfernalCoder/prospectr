import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { unipileClient } from "@/utils/unipileClient";
import {
  updateInvitationStatus,
  markFollowUpSent,
} from "@/lib/invitation-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  console.log("/check-inviations");
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  console.log("next...");
  try {
    // Get all users with active invitation jobs
    const { data: activeJobs, errorActiveJobs } = await supabase
      .from("invitation_jobs")
      .select("user_id")
      .in("status", ["active", "completed"])
      .order("created_at", { ascending: false });

    console.log({ activeJobs });

    if (!activeJobs) {
      return NextResponse.json({ message: "No active invitation jobs" });
    }

    // Get unique user IDs
    const userIds = [...new Set(activeJobs.map((job) => job.user_id))];
    console.log({ userIds });
    // For each user, call the check and follow-up endpoints
    const results = [];

    for (const userId of userIds) {
      try {
        // Get user's unipile account ID
        const { data: profile } = await supabase
          .from("profiles")
          .select("unipile_account_id")
          .eq("user_id", userId)
          .single();

        if (!profile?.unipile_account_id) {
          results.push({
            userId,
            status: "skipped",
            reason: "No LinkedIn account",
          });
          continue;
        }

        // Get pending invitations for this user
        const { data: pendingInvitations } = await supabase
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
          .eq("invitation_status", "pending")
          .eq("invitation_jobs.user_id", userId);

        const client = unipileClient();

        // Get list of relations from Unipile
        const relations = await client.users.getAllRelations({
          account_id: profile.unipile_account_id,
          limit: 100,
        });

        // Create a map of LinkedIn provider IDs
        const relationMap = new Map();
        if (relations?.items) {
          for (const relation of relations.items) {
            if (relation.public_identifier) {
              try {
                const userProfile = await client.users.getProfile({
                  account_id: profile.unipile_account_id,
                  identifier: relation.public_identifier,
                });

                if (userProfile?.provider_id) {
                  relationMap.set(userProfile.provider_id, {
                    ...relation,
                    provider_id: userProfile.provider_id,
                  });
                }
              } catch (error) {
                console.error(`Error getting profile: ${error.message}`);
                continue;
              }
            }
          }
        }

        // Check and update invitation statuses
        const updatedInvitations = [];
        for (const invitation of pendingInvitations || []) {
          if (relationMap.has(invitation.linkedin_user_id)) {
            const updatedInvitation = await updateInvitationStatus(
              invitation.id,
              "accepted",
              new Date().toISOString()
            );
            updatedInvitations.push(updatedInvitation);

            // If there's a follow-up message template, send it
            if (
              invitation.invitation_jobs?.invitation_templates
                ?.follow_up_message
            ) {
              try {
                const templateMessage =
                  invitation.invitation_jobs.invitation_templates
                    .follow_up_message;
                const personalizedMessage = templateMessage
                  .replace(/{{name}}/g, invitation.name || "there")
                  .replace(
                    /{{first_name}}/g,
                    invitation.name?.split(" ")[0] || "there"
                  );

                console.log({ templateMessage });

                const msg = await client.messaging.sendMessage({
                  account_id: profile.unipile_account_id,
                  provider: "LINKEDIN",
                  recipient_id: invitation.linkedin_user_id,
                  text: personalizedMessage,
                });
                console.log({ msg });

                await markFollowUpSent(invitation.id);
              } catch (error) {
                console.error(`Error sending follow-up: ${error.message}`);
              }
            }
          }
        }

        results.push({
          userId,
          status: "processed",
          updatedCount: updatedInvitations.length,
        });
      } catch (error) {
        console.error(`Error processing user ${userId}:`, error);
        results.push({ userId, status: "error", message: error.message });
      }
    }

    return NextResponse.json({
      message: `Processed ${results.length} users`,
      results,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { error: error.message || "Cron job failed" },
      { status: 500 }
    );
  }
}
