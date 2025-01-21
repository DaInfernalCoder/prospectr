import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const createClient = () => {
  return createClientComponentClient();
};

// Helper function to get the current session
export const getCurrentSession = async () => {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session:', error.message);
    return null;
  }
  
  return session;
};

// Helper function to get the current user
export const getCurrentUser = async () => {
  const session = await getCurrentSession();
  return session?.user ?? null;
};

// Helper function to sign out
export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
}; 