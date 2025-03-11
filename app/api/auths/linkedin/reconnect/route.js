import { sendReconnectionEmail } from "@/utils/email/reconnectionEmail";
import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("account_id");

  const supabase = await createClient();
  //   const user = await getUser();
  const { error: dbError } = await supabase
    .from("profiles")
    .update({
      reconnect_token: crypto.randomUUID(),
      reconnect_expires_at: new Date(Date.now() + 3600 * 1000),
    })
    .eq("unipile_account_id", accountId);
  //   if (dbError) {
  //     return NextResponse.json({ error: dbError }, { status: 500 });
  //   }
  console.log(accountId, "account");
  await sendReconnectionEmail("sadm3979@gmail.com", "SAJQdhTeSq2qZYvRxY2SaA");

  return NextResponse.json({ success: true });
}
