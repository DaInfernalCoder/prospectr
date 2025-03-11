import { Resend } from "resend";
import { getUser } from "../supabase/getUser";
import { createClient } from "../supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReconnectionEmail(email, accountId) {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("unipile_account_id", accountId)
    .single();
  console.log("profile", profile);

  const reconnectionUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/reconnect?token=${profile.reconnect_token}&account_id=${accountId}`;
  console.log(reconnectionUrl, "reconnectionUrl in reconnectionEmail");
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reconnect LinkedIn Account",
    html: `<a href="${reconnectionUrl}">Reconnect Now</a>`,
  });
  console.log(data, error);
}
