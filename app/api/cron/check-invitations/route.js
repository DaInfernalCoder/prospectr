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
  console.log("/check-invitations");
  // Verify the request is from Vercel Cron
  //   const authHeader = request.headers.get("authorization");
  //   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }

  const supabase = await createClient();
  console.log("next...");
  try {
    // Get all pending invitations with their associated data through proper joins
    const { data: pendingInvitations, error } = await supabase
      .from("invitation_users")
      .select(
        `
        *,
        invitation_jobs(
          job_id,
          user_id,
          template_id,
          invitation_templates(
            follow_up_message
          )
        )
      `
      )
      .eq("invitation_status", "pending");

    if (error) {
      console.error("Error fetching pending invitations:", error);
      return NextResponse.json(
        { error: "Failed to fetch pending invitations" },
        { status: 500 }
      );
    }

    if (!pendingInvitations?.length) {
      return NextResponse.json({ message: "No pending invitations to check" });
    }

    const client = unipileClient();
    const results = [];

    // Process each pending invitation
    for (const invitation of pendingInvitations) {
      try {
        // Get the user's unipile_account_id from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("unipile_account_id")
          .eq("user_id", invitation.invitation_jobs.user_id)
          .single();

        if (profileError || !profileData?.unipile_account_id) {
          console.error(
            `No unipile account found for user ${invitation.invitation_jobs.user_id}:`,
            profileError
          );
          continue;
        }

        // Extract LinkedIn identifier from profile URL
        const identifier = new URL(invitation.linkedin_profile_url).pathname
          .split("/")
          .filter(Boolean)
          .pop();

        console.log({
          identifier,
          unipile_account_id: profileData.unipile_account_id,
        });

        // Try to get the user's profile
        const userProfile = await client.users.getProfile({
          account_id: profileData.unipile_account_id,
          provider_id: invitation.linkedin_user_id,
          identifier: identifier,
        });
        console.log({ userProfile });

        console.log(
          "Comparing provider_ids:",
          userProfile.provider_id,
          invitation.linkedin_user_id
        );

        // If we get a profile with provider_id matching our invitation, they've accepted
        if (
          userProfile &&
          userProfile.provider_id === invitation.linkedin_user_id
        ) {
          results.push({
            id: invitation.id,
            status: "accepted",
          });

          // Send follow-up if template exists
          const template = invitation.invitation_jobs?.invitation_templates;
          if (template?.follow_up_message) {
            try {
              console.log(template.follow_up_message, "template");
              const personalizedMessage = template.follow_up_message
                .replace(/{{name}}/g, userProfile.name || "there")
                .replace(/{{first_name}}/g, userProfile.first_name || "there");

              console.log("Sending follow-up message:", {
                personalizedMessage,
              });

              // Get all chats to find the one with this user
              const { items: chats } = await client.messaging.getAllChats({
                account_id: profileData.unipile_account_id,
                provider: "LINKEDIN",
              });

              // Find the chat with this user using attendee_provider_id
              const chat = chats.find(
                (chat) =>
                  chat.attendee_provider_id === invitation.linkedin_user_id
              );

              if (!chat?.id) {
                console.error(
                  "No chat found with user:",
                  invitation.linkedin_user_id
                );
                results[results.length - 1].followUp = "failed_no_chat";
                continue;
              }

              const messageSent = await client.messaging.sendMessage({
                account_id: profileData.unipile_account_id,
                provider: "LINKEDIN",
                recipient_id: invitation.linkedin_user_id,
                text: personalizedMessage,
                chat_id: chat.id,
              });

              console.log("Message sent response:", messageSent);

              if (messageSent) {
                // Update invitation status
                const updatedInvitation = await updateInvitationStatus(
                  invitation.id,
                  "accepted",
                  new Date().toISOString()
                );
                if (updatedInvitation) {
                  await markFollowUpSent(invitation.id);
                  results[results.length - 1].followUp = "sent";
                }
              }
            } catch (error) {
              console.error(
                `Failed to send follow-up for invitation ${invitation.id}:`,
                error
              );
              results[results.length - 1].followUp = "failed";
            }
          }
        }
      } catch (error) {
        if (error.message?.includes("insufficient_relationship")) {
          console.log(
            `Invitation ${invitation.id} pending - user hasn't accepted yet`
          );
          continue;
        }

        console.error(
          `Error processing invitation ${invitation.id}:`,
          error.body
        );
        results.push({
          id: invitation.id,
          status: "error",
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      message: `Processed ${pendingInvitations.length} invitations`,
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
