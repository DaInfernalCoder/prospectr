import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const createClient = () => {
  return createClientComponentClient({
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "sb-auth-token",
      storage: {
        getItem: (key) => {
          if (typeof window !== "undefined") {
            return window.localStorage.getItem(key);
          }
          return null;
        },
        setItem: (key, value) => {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, value);
          }
        },
        removeItem: (key) => {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(key);
          }
        },
      },
    },
  });
};

// Helper function to sign out
export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut({
    scope: "local", // Only sign out from this browser/device
  });

  if (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};
