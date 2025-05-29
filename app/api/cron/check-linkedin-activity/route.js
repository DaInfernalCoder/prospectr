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
  console.log("/check-linkedin-activity - Combined cron job");

  const supabase = await createClient();
  const client = unipileClient();

  try {
    // PART 1: Check pending invitations
    console.log("Checking pending invitations...");
    const invitationResults = await checkPendingInvitations(supabase, client);

    // PART 2: Check for responses
    console.log("Checking for responses...");
    const responseResults = await checkForResponses(supabase, client);

    return NextResponse.json({
      message: "LinkedIn activity check completed",
      invitations: invitationResults,
      responses: responseResults,
    });
  } catch (error) {
    console.error("Combined cron job error:", error);
    return NextResponse.json(
      { error: error.message || "Cron job failed" },
      { status: 500 }
    );
  }
}

async function checkPendingInvitations(supabase, client) {
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
      return { error: "Failed to fetch pending invitations" };
    }

    if (!pendingInvitations?.length) {
      return { message: "No pending invitations to check" };
    }

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
                .replace(/{{first_name}}/g, userProfile.first_name || "there")
                .replace(/{{company}}/g, "the company")
                .replace(/{{first_name}}/g, userProfile.first_name || "there")
                .replace(/{{position}}/g, "the position");
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

    return {
      message: `Processed ${pendingInvitations.length} invitations`,
      results,
    };
  } catch (error) {
    console.error("Error in checkPendingInvitations:", error);
    return { error: error.message };
  }
}

async function checkForResponses(supabase, client) {
  try {
    // Get all accepted invitations that we haven't marked as responded
    const { data: acceptedInvitations, error } = await supabase
      .from("invitation_users")
      .select(
        `
        *,
        invitation_jobs(
          user_id
        )
      `
      )
      .in("invitation_status", ["accepted", "message_sent"])
      .eq("has_responded", false);

    if (error) {
      console.error("Error fetching accepted invitations:", error);
      return { error: "Failed to fetch accepted invitations" };
    }

    if (!acceptedInvitations?.length) {
      return { message: "No invitations to check for responses" };
    }

    const results = [];

    // Process each invitation to check for responses
    for (const invitation of acceptedInvitations) {
      try {
        // Get the user's unipile_account_id from profiles table
        const { data: profileData } = await supabase
          .from("profiles")
          .select("unipile_account_id")
          .eq("user_id", invitation.invitation_jobs.user_id)
          .single();

        // Get all chats to find the one with this user
        const { items: chats } = await client.messaging.getAllChats({
          account_id: profileData.unipile_account_id,
          provider: "LINKEDIN",
        });

        // Try to find the chat with this user using various methods
        let matchingChat = null;

        // First attempt: Try to match directly with attendee_provider_id
        matchingChat = chats.find(
          (chat) => chat.attendee_provider_id === invitation.linkedin_user_id
        );

        // Second attempt: Look at all chats and their messages to find matching sender
        if (!matchingChat) {
          for (const chat of chats) {
            try {
              const { items: messages } = await client.messaging.getAllMessages(
                {
                  account_id: profileData.unipile_account_id,
                  provider: "LINKEDIN",
                  chat_id: chat.id,
                }
              );

              // Log the first message from each chat to understand structure
              if (messages.length > 0) {
                console.log(
                  "Message sample:",
                  JSON.stringify(messages[0], null, 2)
                );
              }

              // Check if any messages in this chat match our invitation's user
              if (
                messages.some((msg) => {
                  // Check all possible sender ID fields
                  const senderMatches =
                    (msg.sender_id &&
                      msg.sender_id === invitation.linkedin_user_id) ||
                    (msg.sender_attendee_id &&
                      msg.sender_attendee_id === invitation.linkedin_user_id);

                  if (senderMatches) {
                    console.log("Found matching sender in chat", chat.id);
                    return true;
                  }
                  return false;
                })
              ) {
                matchingChat = chat;
                break;
              }
            } catch (error) {
              console.error(
                `Error getting messages for chat ${chat.id}:`,
                error
              );
            }
          }
        }

        if (!matchingChat) {
          console.log(
            "No matching chat found for user",
            invitation.linkedin_user_id
          );
          continue;
        }

        // Get messages in this chat
        const { items: messages } = await client.messaging.getAllMessages({
          account_id: profileData.unipile_account_id,
          provider: "LINKEDIN",
          chat_id: matchingChat.id,
        });

        // Enhanced filter that checks multiple fields
        const responsesFromOther = messages.filter((msg) => {
          // Skip messages from the account owner
          if (msg.is_sender === 1) {
            return false;
          }

          // Try multiple ID fields to find responses
          return true; // Consider all non-sender messages as responses
        });

        if (responsesFromOther.length > 0) {
          console.log(
            "Found responses:",
            responsesFromOther.map((msg) => msg.text)
          );

          // Update the invitation as responded
          const { data: updatedInvitation, error: updateError } = await supabase
            .from("invitation_users")
            .update({
              has_responded: true,
              first_response_at: new Date().toISOString(),
            })
            .eq("id", invitation.id)
            .select()
            .single();

          if (updateError) {
            console.error("Error updating invitation response:", updateError);
            continue;
          }

          results.push({
            id: invitation.id,
            status: "responded",
            response_text: responsesFromOther[0].text || "No text content",
          });
        }
      } catch (error) {
        console.error(
          `Error checking responses for invitation ${invitation.id}:`,
          error
        );
      }
    }

    return {
      message: `Checked ${acceptedInvitations.length} invitations for responses`,
      results,
    };
  } catch (error) {
    console.error("Error in checkForResponses:", error);
    return { error: error.message };
  }
}
