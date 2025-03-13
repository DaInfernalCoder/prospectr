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
    try {
      let providerId = recipient.provider_id;
      let profileUrl = recipient.profile_url;
      let name = recipient.name;

      console.log(recipient, "recipiennt solo");

      if (!providerId && recipient.identifier) {
        const profile = await client.users.getProfile({
          account_id: accountId,
          identifier: recipient.identifier,
        });

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
        await client.users.sendInvitation({
          account_id: accountId,
          provider_id: providerId,
          message: message,
        });
      } else {
        await client.users.sendInvitation({
          account_id: accountId,
          provider_id: providerId,
        });
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

      // Respect rate limits - wait between requests
      await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 seconds
    } catch (error) {
      console.error(
        `Failed to invite recipient at index ${index}:`,
        error.body || error
      );
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
  const supabase = await createClient();
  console.log("UpdateInvStatus");
  const updates = {
    invitation_status: status,
    updated_at: new Date().toISOString(),
  };

  console.log(status, "status");
  console.log({ acceptedAt });
  if (status === "accepted" && acceptedAt) {
    updates.invitation_accepted_at = acceptedAt;
  }

  const { data, error } = await supabase
    .from("invitation_users")
    .update(updates)
    .eq("id", invitationId)
    .select()
    .single();

  if (error) {
    console.error("Error updating invitation status:", error);
    throw new Error("Failed to update invitation status");
  }

  return data;
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
