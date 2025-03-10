"use server";

import { redirect } from "next/navigation";

const { createClient } = require("./supabase/server");

const signInWith = (provider) => async () => {
  const supabase = await createClient();

  const auth_callback = "http://localhost:3000/auth/callback";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback,
    },
  });

  if (error) {
    console.error(error, "errrrr");
  }

  redirect(data.url);
};

const signInWithGoogle = signInWith("google");

export { signInWithGoogle };
