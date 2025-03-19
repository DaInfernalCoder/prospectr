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
      keywords,
      locationIds,
      companyIds,
      industryIds,
      schoolIds,
      networkDistance,
      sortBy,
      location,
      company,
      industry,
      school,
    } = await request.json();

    // Prepare search parameters according to Unipile API requirements
    const searchParams = {
      api: "classic", // You can use "classic", "sales_navigator", or "recruiter"
      category: "people",
      limit: 20,
    };

    // Add keywords if provided
    if (keywords) {
      searchParams.keywords = keywords;
    }

    // Handle location parameters
    if (locationIds && locationIds.length > 0) {
      searchParams.location = locationIds; // Unipile expects an array of location IDs
    } else if (location) {
      searchParams.location_name = location; // Fallback to location name
    }

    // Handle company parameters
    if (companyIds && companyIds.length > 0) {
      searchParams.current_company = {
        include: companyIds, // Unipile expects an object with include array
      };
    } else if (company) {
      searchParams.current_company = {
        include: [company], // Wrap single company in array
      };
    }

    // Handle industry parameters
    if (industryIds && industryIds.length > 0) {
      searchParams.industry = {
        include: industryIds,
      };
    } else if (industry) {
      searchParams.industry = {
        include: [industry],
      };
    }

    // Handle school parameters
    if (schoolIds && schoolIds.length > 0) {
      searchParams.school = {
        include: schoolIds,
      };
    } else if (school) {
      searchParams.school = {
        include: [school],
      };
    }

    // Handle network distance
    if (networkDistance && networkDistance.length > 0) {
      // Map our network distance values to Unipile's expected format
      const distanceMap = {
        FIRST_DEGREE: "DISTANCE_1",
        SECOND_DEGREE: "DISTANCE_2",
        THIRD_DEGREE_AND_BEYOND: "DISTANCE_3",
      };

      searchParams.network_distance = networkDistance.map(
        (d) => distanceMap[d] || d
      );
    }

    // Handle sort options
    if (sortBy) {
      searchParams.sort_by = sortBy.toLowerCase();
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
        {
          error:
            errorData.detail ||
            `Search failed: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
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

    return NextResponse.json({
      results: formattedResults,
      cursor: results.cursor,
      paging: results.paging,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: error.message || "Search failed" },
      { status: 500 }
    );
  }
}
