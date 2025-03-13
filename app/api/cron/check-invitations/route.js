import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  try {
    // Get all users with active invitation jobs
    const { data: activeJobs } = await supabase
      .from("invitation_jobs")
      .select("user_id")
      .in("status", ["active", "completed"])
      .order("updated_at", { ascending: false });

    if (!activeJobs || activeJobs.length === 0) {
      return NextResponse.json({ message: "No active invitation jobs" });
    }

    // Get unique user IDs
    const userIds = [...new Set(activeJobs.map((job) => job.user_id))];

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

        // Check invitation statuses
        const checkResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/linkedin/invitations/check`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Cookie: await generateAuthCookie(userId, supabase),
            },
          }
        );

        // Send follow-up messages
        const followUpResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/linkedin/invitations/follow-up`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Cookie: await generateAuthCookie(userId, supabase),
            },
          }
        );

        results.push({
          userId,
          status: "processed",
          checkStatus: checkResponse.status,
          followUpStatus: followUpResponse.status,
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

// Helper function to generate auth JWT for a user
async function generateAuthCookie(userId, supabase) {
  // Create a JWT token for the user
  const payload = {
    sub: userId, // subject (user id)
    role: "authenticated",
    exp: Math.floor(Date.now() / 1000) + 300, // 5 minutes expiry
  };

  const token = jwt.sign(payload, process.env.SUPABASE_SERVICE_ROLE_KEY);

  return `sb-access-token=${token}`;
}
