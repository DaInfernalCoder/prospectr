"use server";

import { createClient } from "@/utils/supabase/server";
import { unipileClient } from "@/utils/unipileClient";

// : {
//     accountId: string;
//     recipients: Array<{ identifier?: string; provider_id?: string }>;
//     message?: string;
//     userId: string;
//     jobId: string;
//   }
export async function processInvitations(options) {
  console.log("process invitations");
  const { accountId, recipients, message, userId, jobId, templateId } = options;
  const client = unipileClient();
  const supabase = await createClient();

  let successCount = 0;
  let failureCount = 0;

  // Update job status to "processing"
  await supabase
    .from("invitation_jobs")
    .update({
      status: "processing",
      started_at: new Date().toISOString(),
    })
    .eq("job_id", jobId);

  // Process each recipient
  for (const [index, recipient] of recipients.entries()) {
    console.log("for loop");
    try {
      let providerId = recipient.provider_id;
      let profileUrl = recipient.profile_url;
      let name = recipient.name;

      if (!providerId && recipient.identifier) {
        const profile = await client.users.getProfile({
          account_id: accountId,
          identifier: recipient.identifier,
        });

        console.log(
          { profileProvider: profile.provider_id },
          "profile get",
          profile
        );

        if (!profile) {
          console.error(
            `Profile not found for identifier: ${recipient.identifier}`
          );
          failureCount++;
          continue;
        }

        providerId = profile.provider_id;
        profileUrl =
          profile.profile_url ||
          `https://linkedin.com/in/${profile.public_identifier}`;
        name = profile.name;
      }

      if (!providerId) {
        failureCount++;
        continue;
      }

      console.log(providerId, "providerId");

      // Send invitation
      if (message) {
        const inv = await client.users.sendInvitation({
          account_id: accountId,
          provider_id: providerId,
          message: message,
        });
        console.log({ inv }, "invite with message");
      } else {
        const inv = await client.users.sendInvitation({
          account_id: accountId,
          provider_id: providerId,
        });
        console.log({ inv }, "invite with message");
      }

      // Track this invitation in the invitation_users table
      await trackInvitation(userId, jobId, providerId, profileUrl, name);

      successCount++;

      // Update progress in database
      await supabase
        .from("invitation_jobs")
        .update({
          invitations_sent: successCount,
          last_updated: new Date().toISOString(),
        })
        .eq("job_id", jobId);

      const delay = Math.floor(Math.random() * (300000 - 120000 + 1)) + 120000; // 2-5 minutes
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      console.error(
        `Failed to invite recipient at index ${index}:`,
        error.body || error
      );

      // Check if this is an account not found error
      if (error.message && error.message.includes("Account not found")) {
        console.log(
          "Account not found, resetting LinkedIn connection for user:",
          userId
        );

        // Reset the LinkedIn connection
        await supabase
          .from("profiles")
          .update({
            linkedin_status: false,
            unipile_account_id: null,
            linkedin_connection_status: "disconnected",
          })
          .eq("user_id", userId);

        // Update job as failed with specific message
        await supabase
          .from("invitation_jobs")
          .update({
            status: "failed",
            error_message:
              "LinkedIn account disconnected. Please reconnect your LinkedIn account in Settings.",
            last_updated: new Date().toISOString(),
          })
          .eq("job_id", jobId);

        return { successCount, failureCount, needsReconnection: true };
      }

      failureCount++;

      // Update failure count
      await supabase
        .from("invitation_jobs")
        .update({
          invitations_failed: failureCount,
          last_updated: new Date().toISOString(),
        })
        .eq("job_id", jobId);
    }
  }

  // Update job as completed
  await supabase
    .from("invitation_jobs")
    .update({
      status: "completed",
      invitations_sent: successCount,
      invitations_failed: failureCount,
      completed_at: new Date().toISOString(),
    })
    .eq("job_id", jobId);

  return { successCount, failureCount };
}

export async function trackInvitation(
  userId,
  jobId,
  linkedinUserId,
  profileUrl,
  name
) {
  const supabase = await createClient();

  // Check if this invitation is already being tracked
  const { data: existingInvitation } = await supabase
    .from("invitation_users")
    .select("*")
    .eq("job_id", jobId)
    .eq("linkedin_user_id", linkedinUserId)
    .single();

  console.log({ existingInvitation }, "exiastance invit");
  if (existingInvitation) {
    return existingInvitation;
  }

  // Create a new invitation tracking record
  const { data, error } = await supabase
    .from("invitation_users")
    .insert({
      job_id: jobId,
      linkedin_user_id: linkedinUserId,
      linkedin_profile_url: profileUrl,
      name: name,
      invitation_status: "pending",
      invitation_sent_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error tracking invitation:", error);
    throw new Error("Failed to track invitation");
  }

  return data;
}

export async function updateInvitationStatus(
  invitationId,
  status,
  acceptedAt = null
) {
  try {
    const supabase = await createClient();

    // First get the current invitation to preserve job_id
    const { data: currentInvitation } = await supabase
      .from("invitation_users")
      .select("*")
      .eq("id", invitationId)
      .single();

    if (!currentInvitation) {
      console.error("No invitation found with ID:", invitationId);
      return null;
    }

    // Create updates object while preserving existing data
    const updates = {
      ...currentInvitation, // Preserve all existing fields
      invitation_status: status,
      updated_at: new Date().toISOString(),
    };

    if (status === "accepted" && acceptedAt) {
      updates.invitation_accepted_at = acceptedAt;
    }

    // Use upsert to update while preserving job_id
    const { data, error } = await supabase
      .from("invitation_users")
      .upsert(
        {
          id: invitationId,
          ...updates,
        },
        {
          onConflict: "id",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Error updating invitation status:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in updateInvitationStatus:", error);
    return null;
  }
}

export async function markFollowUpSent(invitationId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invitation_users")
    .update({
      invitation_status: "message_sent",
      follow_up_sent_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", invitationId)
    .select()
    .single();

  if (error) {
    console.error("Error marking follow-up as sent:", error);
    throw new Error("Failed to mark follow-up as sent");
  }

  return data;
}

export async function getPendingFollowUps() {
  const supabase = await createClient();

  // Get invitations that have been accepted but haven't had follow-up messages sent
  const { data, error } = await supabase
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
    .is("follow_up_sent_at", null);

  if (error) {
    console.error("Error getting pending follow-ups:", error);
    throw new Error("Failed to get pending follow-ups");
  }

  return data;
}
