"use server";

import { createClient } from "@/utils/supabase/server";

export async function getLinkedInAnalytics(userId) {
  const supabase = await createClient();

  try {
    // Get all invitation jobs for this user
    const { data: invitationJobs, error: jobsError } = await supabase
      .from("invitation_jobs")
      .select("*")
      .eq("user_id", userId);

    if (jobsError) {
      console.error("Error fetching invitation jobs:", jobsError);
      throw new Error("Failed to fetch invitation jobs");
    }

    // Get all invitation users for this user's jobs
    const jobIds = invitationJobs.map((job) => job.job_id);

    const { data: invitationUsers, error: usersError } = await supabase
      .from("invitation_users")
      .select("*")
      .in("job_id", jobIds);
    console.log({ invitationUsers });

    if (usersError) {
      console.error("Error fetching invitation users:", usersError);
      throw new Error("Failed to fetch invitation users");
    }

    // Calculate analytics
    const totalCampaigns = invitationJobs.length;
    const activeCampaigns = invitationJobs.filter(
      (job) => job.status === "completed" || job.status === "processing"
    ).length;
    console.log({ activeCampaigns });

    const totalInvitations = invitationUsers.length;
    const acceptedConnections = invitationUsers.filter(
      (user) =>
        user.invitation_status === "accepted" ||
        user.invitation_status === "message_sent"
    ).length;
    console.log({ acceptedConnections });

    const responseRate =
      totalInvitations > 0 ? (acceptedConnections / totalInvitations) * 100 : 0;

    // Get campaign-specific analytics
    const campaignAnalytics = invitationJobs.map((job) => {
      const campaignInvitations = invitationUsers.filter(
        (user) => user.job_id === job.job_id
      );
      const campaignAccepted = campaignInvitations.filter(
        (user) =>
          user.invitation_status === "accepted" ||
          user.invitation_status === "message_sent"
      ).length;

      const campaignResponseRate =
        campaignInvitations.length > 0
          ? (campaignAccepted / campaignInvitations.length) * 100
          : 0;
      console.log({ campaignAccepted });

      return {
        job_id: job.job_id,
        name: job.name || `Campaign ${job.created_at}`,
        status: job.status,
        total_invitations: campaignInvitations.length,
        accepted_connections: campaignAccepted,
        response_rate: campaignResponseRate.toFixed(2),
        created_at: job.created_at,
        completed_at: job.completed_at,
      };
    });

    // Get monthly trend data
    const monthlyData = getMonthlyTrendData(invitationUsers);

    console.log({ monthlyData });
    return {
      summary: {
        total_campaigns: totalCampaigns,
        active_campaigns: activeCampaigns,
        total_invitations: totalInvitations,
        total_connections: acceptedConnections,
        response_rate: responseRate.toFixed(2),
      },
      campaigns: campaignAnalytics,
      monthly_trends: monthlyData,
    };
  } catch (error) {
    console.error("Error in getLinkedInAnalytics:", error);
    throw error;
  }
}

function getMonthlyTrendData(invitationUsers) {
  const monthlyData = {};

  invitationUsers.forEach((user) => {
    // Skip if no sent date
    if (!user.invitation_sent_at) return;

    const sentDate = new Date(user.invitation_sent_at);
    const monthKey = `${sentDate.getFullYear()}-${String(
      sentDate.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        invitations_sent: 0,
        connections_accepted: 0,
      };
    }

    monthlyData[monthKey].invitations_sent++;

    if (
      user.invitation_status === "accepted" ||
      user.invitation_status === "message_sent"
    ) {
      monthlyData[monthKey].connections_accepted++;
    }
  });

  // Convert to array and sort by month
  return Object.values(monthlyData).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
}
