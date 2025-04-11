// app/api/linkedin/invitations/status/[jobId]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/getUser";

export async function GET(request, params) {
  const supabase = await createClient();
  const jobId = params.jobId;

  try {
    const user = await getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: job, error } = await supabase
      .from("invitation_jobs")
      .select("*")
      .eq("job_id", jobId)
      .eq("user_id", user.id)
      .single();
    console.log("Job lookup error or not found:", {
      error,
      jobId,
      userId: user.id,
    });

    if (error || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Calculate estimated time remaining based on remaining invitations
    const remainingInvitations = job.total_invitations - job.invitations_sent;
    const estimatedSecondsRemaining =
      job.status === "completed" ? 0 : remainingInvitations * 60;

    // Format as minutes if it's a significant amount of time
    let estimatedTimeDisplay;
    if (estimatedSecondsRemaining < 60) {
      estimatedTimeDisplay = `${estimatedSecondsRemaining} seconds`;
    } else {
      const minutes = Math.ceil(estimatedSecondsRemaining / 60);
      estimatedTimeDisplay = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    return NextResponse.json({
      status: job.status,
      progress: {
        total: job.total_invitations,
        sent: job.invitations_sent || 0,
        failed: job.invitations_failed || 0,
        remaining: remainingInvitations,
      },
      startedAt: job.started_at,
      completedAt: job.completed_at,
      estimatedTimeRemaining: estimatedSecondsRemaining,
      estimatedTimeDisplay: estimatedTimeDisplay,
      percentComplete: Math.round(
        (job.invitations_sent / job.total_invitations) * 100
      ),
    });
  } catch (error) {
    console.error("Error fetching job status:", error);
    return NextResponse.json(
      { error: "Failed to fetch job status" },
      { status: 500 }
    );
  }
}
