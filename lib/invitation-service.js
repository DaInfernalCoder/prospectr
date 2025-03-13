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
  const { accountId, recipients, message, userId, jobId } = options;
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
        error.body
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
