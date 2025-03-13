// import { getUser } from "@/utils/supabase/getUser";
// import { createClient } from "@/utils/supabase/server";
// import { unipileClient } from "@/utils/unipileClient";
// import { NextResponse } from "next/server";

// //FRONT:
// //  await fetch('/api/linkedin/invitations/send', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({
// //       identifier: public_identifier,
// //       message: "Hi {name}, I admire your work at {company}!"  // message not required
// //     })
// //   });

// export async function POST(request) {
//   const supabase = await createClient();

//   try {
//     const user = await getUser();
//     if (!user)
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("unipile_account_id")
//       .eq("user_id", user.id)
//       .single();

//     if (!profile?.unipile_account_id) {
//       return NextResponse.json(
//         { error: "LinkedIn not connected" },
//         { status: 400 }
//       );
//     }

//     // Get recipient data from request
//     const { identifier, message } = await request.json();
//     if (!identifier) {
//       return NextResponse.json(
//         { error: "Missing identifier" },
//         { status: 400 }
//       );
//     }

//     const client = unipileClient();

//     // fetch invited user
//     const invitedUser = await client.users.getProfile({
//       account_id: profile.unipile_account_id,
//       identifier: identifier,
//     });

//     if (!invitedUser)
//       return NextResponse.json(
//         { error: "There is no user with that identifier" },
//         { status: 404 }
//       );

//     //Send invite
//     if (message) {
//       await client.users.sendInvitation({
//         account_id: profile.unipile_account_id,
//         provider_id: invitedUser?.provider_id,
//         message,
//       });
//     } else {
//       await client.users.sendInvitation({
//         account_id: profile.unipile_account_id,
//         provider_id: invitedUser?.provider_id,
//       });
//     }
//     //LATER IF YOU WANT TO TRACK CONNECTION REQUESTS (YOU SHOULD ADD TABLE ALSO)
//     // await supabase.from("connection_requests").insert({
//     //   user_id: user.id,
//     //   recipient_id: profileId,
//     //   status: "pending",
//     // });
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Invitation error:", error);
//     return NextResponse.json(
//       { error: error.message || "Failed to send connection request" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { processInvitations } from "@/lib/invitation-service";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/getUser";

// front end :
// const recipients = searchResults.map(profile => ({
//   provider_id: profile.provider_id
// }));

// // Send to invitation endpoint
// const response = await fetch('/api/linkedin/invitations', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     recipients: recipients,
//     message: message
//   })
// });
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

    // Get data from request
    const body = await request.json();
    const { recipients, message, templateName, followUpMessage } = body;

    // Validate request
    if (!recipients) {
      return NextResponse.json(
        { error: "Missing recipients data" },
        { status: 400 }
      );
    }

    // First, create or get the template
    let templateId;
    if (followUpMessage) {
      const { data: template, error: templateError } = await supabase
        .from("invitation_templates")
        .insert({
          user_id: user.id,
          name: templateName || `Template ${new Date().toISOString()}`,
          follow_up_message: followUpMessage,
        })
        .select()
        .single();

      if (templateError) {
        console.error("Failed to create template:", templateError);
        return NextResponse.json(
          { error: "Failed to create template" },
          { status: 500 }
        );
      }

      templateId = template.id;
    }

    // Format recipients for processing
    let formattedRecipients = [];
    if (Array.isArray(recipients)) {
      if (typeof recipients[0] === "string") {
        formattedRecipients = recipients.map((id) => ({ identifier: id }));
      } else {
        formattedRecipients = recipients;
      }
    } else if (typeof recipients === "string") {
      formattedRecipients = [{ identifier: recipients }];
    } else if (recipients.identifier || recipients.provider_id) {
      formattedRecipients = [recipients];
    } else {
      return NextResponse.json(
        { error: "Invalid recipients format" },
        { status: 400 }
      );
    }

    console.log({ formattedRecipients });

    // Generate a unique job ID
    const jobId = `inv_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    // Store job reference in database for tracking
    const { error } = await supabase.from("invitation_jobs").insert({
      job_id: jobId,
      user_id: user.id,
      template_id: templateId, // Link to the template if one was created
      status: "queued",
      total_invitations: formattedRecipients.length,
      invitations_sent: 0,
      message: message, // Store the initial connection message
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to create job record:", error);
      return NextResponse.json(
        { error: "Failed to create job" },
        { status: 500 }
      );
    }

    // Start processing in background without awaiting
    processInvitations({
      accountId: profile.unipile_account_id,
      recipients: formattedRecipients,
      message,
      userId: user.id,
      jobId,
      templateId,
    }).catch((error) => {
      console.error("Error in background processing:", error);

      // Update job as failed in case of error
      supabase
        .from("invitation_jobs")
        .update({
          status: "failed",
          error_message: error.message,
          last_updated: new Date().toISOString(),
        })
        .eq("job_id", jobId);
    });

    return NextResponse.json({
      success: true,
      message: `${formattedRecipients.length} invitation(s) queued for processing`,
      jobId,
      templateId,
    });
  } catch (error) {
    console.error("Error in invitation API:", error);
    return NextResponse.json(
      { error: "Failed to process invitation request" },
      { status: 500 }
    );
  }
}
