import { getUser } from "@/utils/supabase/getUser";
import { getLinkedInAnalytics } from "@/lib/analytics-service";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(user.id, "userId");

    const analytics = await getLinkedInAnalytics(user.id);

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
