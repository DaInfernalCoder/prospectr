import { checkSubscription } from "@/utils/check-subscription";
import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("searching .....");
  const supabase = await createClient();

  try {
    const user = await getUser();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // First check if user has access
    const subscriptionCheck = await checkSubscription(user.id, true, true);

    // If user needs checkout, return the checkout URL
    if (subscriptionCheck.needsCheckout) {
      console.log({
        error: "Subscription required",
        checkoutUrl:
          subscriptionCheck.checkoutUrl || subscriptionCheck.redirectUrl,
      });
      return NextResponse.json(
        {
          error: "Subscription required",
          checkoutUrl:
            subscriptionCheck.checkoutUrl || subscriptionCheck.redirectUrl,
        },
        { status: 402 }
      );
    }

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

    const {
      name,
      jobTitle,
      location,
      company,
      industry,
      keywords,
      networkDistance,
      profileLanguage,
      school,
      sortBy,
      pastCompany,
      yearsOfExperience,
      openToWork,
    } = await request.json();

    const searchParams = {
      api: "classic", // You can use "classic", "sales_navigator", or "recruiter" depending on the LinkedIn account type
      category: "people",
      limit: 20,
    };

    // Add keywords if either name, jobTitle or keywords is provided
    if (name || jobTitle || keywords) {
      const keywordString = [name, jobTitle, keywords]
        .filter(Boolean)
        .join(" ");
      if (keywordString) {
        searchParams.keywords = keywordString;
      }
    }

    // NOTWORK FOR NOW
    // Add location filter if provided
    // if (location) {
    //   // Note: For exact location matching, you might need to first call the
    //   // /linkedin/search/parameters endpoint with type=LOCATION to get location IDs
    //   searchParams.location_name = location;
    // }

    if (company) {
      searchParams.company = {
        include: [company],
      };
    }

    if (pastCompany) {
      searchParams.past_company = {
        include: [pastCompany],
      };
    }

    if (industry) {
      searchParams.industry = {
        include: [industry],
      };
    }

    if (school) {
      searchParams.school = {
        include: [school],
      };
    }

    if (networkDistance && Array.isArray(networkDistance)) {
      searchParams.network_distance = networkDistance;
    }

    if (profileLanguage && Array.isArray(profileLanguage)) {
      searchParams.profile_language = profileLanguage;
    }

    if (sortBy) {
      searchParams.sort_by = sortBy; // Options include: "relevance" or "date"
    }

    if (yearsOfExperience && typeof yearsOfExperience === "object") {
      searchParams.tenure = [
        {
          min: yearsOfExperience.min,
          max: yearsOfExperience.max,
        },
      ];
    }

    if (openToWork === true) {
      searchParams.open_to_work = true;
    }

    console.log("searchParams", { searchParams });
    const response = await fetch(
      `${process.env.UNIPILE_API_URL}/api/v1/linkedin/search?account_id=${profile.unipile_account_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.UNIPILE_API_TOKEN,
        },
        body: JSON.stringify(searchParams),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Unipile API error:", errorData);
      return NextResponse.json(
        { message: `Search failed: ${response.status} ${response.statusText}` },
        { status: 402 }
      );
    }

    const results = await response.json();

    // Format results
    const formattedResults = results.items.map((profile) => ({
      id: profile.id,
      name: profile.name,
      identifier: profile.public_identifier,
      headline: profile.headline,
      location: profile.location,
      profile_url: profile.profile_url,
      profile_picture: profile.profile_picture_url,
      profile_picture_large: profile.profile_picture_url_large,
      network_distance: profile.network_distance,
      current_position: profile.current_positions?.[0]?.role || null,
      company: profile.current_positions?.[0]?.company || null,
      shared_connections_count: profile.shared_connections_count,
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: error.message || "Search failed" },
      { status: 500 }
    );
  }
}
