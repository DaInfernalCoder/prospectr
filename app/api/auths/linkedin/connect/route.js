import { UnipileClient } from "unipile-node-sdk";
import { NextResponse } from "next/server";
import { getUser } from "@/utils/supabase/getUser";

export async function GET(request) {
  try {
    // 1. Verify environment variables
    const BASE_URL = process.env.UNIPILE_API_URL;
    const ACCESS_TOKEN = process.env.UNIPILE_API_TOKEN;

    if (!BASE_URL || !ACCESS_TOKEN) {
      throw new Error("Missing Unipile configuration in .env");
    }

    // REMOVE COMMENTS THIS LATER BECAUSE WITH NGROK WILL NEED COMPLEX EDITING
    // const user = await getUser();
    // if (!user)
    //   return NextResponse.json({ status: 404, message: "There is no user" });

    const client = new UnipileClient(BASE_URL, ACCESS_TOKEN);

    // 3. Create auth link
    const response = await client.account.createHostedAuthLink({
      type: "create",
      providers: ["LINKEDIN"],
      api_url: BASE_URL,
      expiresOn: new Date(Date.now() + 3600 * 1000),
      // IM NOW HARDCODED THE USER_ID BECAUSE WE USER CONNECTED IN ORDER TO GET THE ID BUT NOW LETS LEAVE IT LIKE THAT OR YOU CAN TRY WITH YOUR URER_ID
      name: "fa8bcc3f-8a0f-4e40-8f16-eb70ed6dcd83",
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/unipile/webhooks`,
    });

    return NextResponse.redirect(response.url);
  } catch (error) {
    console.error("Connection failed:", {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: "Connection failed: " + error.message },
      { status: 500 }
    );
  }
}
