"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

// Create the LinkedIn context
const LinkedInContext = createContext();

export function LinkedInProvider({ children }) {
  const [linkedInStatus, setLinkedInStatus] = useState({
    checked: false,
    connected: false,
    lastConnected: null,
    lastChecked: null,
  });
  const supabase = createClient();

  // Check LinkedIn status when user is authenticated
  useEffect(() => {
    const checkInitialStatus = async () => {
      try {
        // Get current user to ensure we're authenticated
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Only make the initial API call once per session
          const cachedStatus = sessionStorage.getItem("linkedInStatus");

          if (cachedStatus) {
            // Use cached data if available
            setLinkedInStatus(JSON.parse(cachedStatus));
          } else {
            // Make API call if no cached data
            const response = await fetch("/api/auths/linkedin/status");
            if (response.ok) {
              const data = await response.json();
              const newStatus = {
                checked: true,
                connected: data.connected,
                lastConnected: data.last_connected,
                lastChecked: new Date().toISOString(),
              };

              // Update state and cache
              setLinkedInStatus(newStatus);
              sessionStorage.setItem(
                "linkedInStatus",
                JSON.stringify(newStatus)
              );
            }
          }
        }
      } catch (error) {
        console.error("Failed to check LinkedIn status:", error);
      }
    };

    // Check status on auth state change
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        checkInitialStatus();
      } else if (event === "SIGNED_OUT") {
        // Clear status on sign out
        setLinkedInStatus({
          checked: false,
          connected: false,
          lastConnected: null,
          lastChecked: null,
        });
        sessionStorage.removeItem("linkedInStatus");
      }
    });

    // Initial check
    checkInitialStatus();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to refresh LinkedIn status on demand
  const refreshLinkedInStatus = async () => {
    try {
      setLinkedInStatus((prevState) => ({ ...prevState, checked: false }));

      const response = await fetch("/api/auths/linkedin/status");
      if (response.ok) {
        const data = await response.json();
        const newStatus = {
          checked: true,
          connected: data.connected,
          lastConnected: data.last_connected,
          lastChecked: new Date().toISOString(),
        };

        // Update state and cache
        setLinkedInStatus(newStatus);
        sessionStorage.setItem("linkedInStatus", JSON.stringify(newStatus));
        return newStatus;
      }
    } catch (error) {
      console.error("Failed to refresh LinkedIn status:", error);
      setLinkedInStatus((prevState) => ({ ...prevState, checked: true }));
      throw error;
    }
  };

  return (
    <LinkedInContext.Provider
      value={{
        linkedInStatus,
        refreshLinkedInStatus,
      }}
    >
      {children}
    </LinkedInContext.Provider>
  );
}

// Custom hook to use the LinkedIn context
export function useLinkedIn() {
  const context = useContext(LinkedInContext);
  if (context === undefined) {
    throw new Error("useLinkedIn must be used within a LinkedInProvider");
  }
  return context;
}
