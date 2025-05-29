import { NextResponse } from "next/server";
import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    // Get current profile status
    const { data: profile } = await supabase
      .from("profiles")
      .select("unipile_account_id, linkedin_status, linkedin_connection_status")
      .eq("user_id", user.id)
      .single();

    console.log(`Current profile status for user ${user.id}:`, profile);

    // If no unipile_account_id, try to get all accounts from Unipile
    if (!profile?.unipile_account_id) {
      console.log(
        "No unipile_account_id found, checking Unipile for accounts..."
      );

      try {
        const accountsResponse = await fetch(
          `${process.env.UNIPILE_API_URL}/api/v1/accounts`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": process.env.UNIPILE_API_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );

        if (accountsResponse.ok) {
          const accounts = await accountsResponse.json();
          console.log("All Unipile accounts:", accounts);

          // Look for an account with the user's ID as the name
          const userAccount = accounts.find(
            (account) => account.name === user.id
          );

          if (userAccount) {
            console.log(`Found account for user ${user.id}:`, userAccount);

            // Update the profile with the found account
            const { data: updatedProfile, error } = await supabase
              .from("profiles")
              .update({
                unipile_account_id: userAccount.id,
                linkedin_status: true,
                linkedin_connection_status: "connected",
              })
              .eq("user_id", user.id)
              .select();

            if (error) {
              console.error("Error updating profile:", error);
              return NextResponse.json(
                { error: "Failed to update profile" },
                { status: 500 }
              );
            }

            return NextResponse.json({
              message: "LinkedIn connection restored",
              account_found: userAccount,
              profile_updated: updatedProfile[0],
            });
          } else {
            return NextResponse.json({
              message: "No LinkedIn account found for this user",
              user_id: user.id,
              available_accounts: accounts,
            });
          }
        } else {
          const errorData = await accountsResponse.json().catch(() => ({}));
          console.error("Failed to fetch accounts from Unipile:", errorData);
          return NextResponse.json(
            {
              error: "Failed to fetch accounts from Unipile",
              details: errorData,
            },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error("Error checking Unipile accounts:", error);
        return NextResponse.json(
          {
            error: "Error checking Unipile accounts",
            details: error.message,
          },
          { status: 500 }
        );
      }
    } else {
      // Test the existing account
      console.log(`Testing existing account: ${profile.unipile_account_id}`);

      const accountResponse = await fetch(
        `${process.env.UNIPILE_API_URL}/api/v1/accounts/${profile.unipile_account_id}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": process.env.UNIPILE_API_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      const accountData = await accountResponse.json();

      return NextResponse.json({
        message: "Account test completed",
        current_profile: profile,
        account_status: {
          status_code: accountResponse.status,
          status_ok: accountResponse.ok,
          data: accountData,
        },
      });
    }
  } catch (error) {
    console.error("Test connection error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
