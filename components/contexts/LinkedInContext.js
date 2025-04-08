"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams, useRouter } from "next/navigation"; // Import hooks

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
  const searchParams = useSearchParams(); // Get search params
  const router = useRouter(); // Get router

  // --- NEW: Function to refresh status and clear cache ---
  const refreshAndClearCache = async () => {
    try {
      setLinkedInStatus((prevState) => ({ ...prevState, checked: false }));
      sessionStorage.removeItem("linkedInStatus"); // Clear cache first

      const response = await fetch("/api/auths/linkedin/status");
      if (response.ok) {
        const data = await response.json();
        const newStatus = {
          checked: true,
          connected: data.connected,
          lastConnected: data.last_connected,
          lastChecked: new Date().toISOString(),
        };

        setLinkedInStatus(newStatus);
        sessionStorage.setItem("linkedInStatus", JSON.stringify(newStatus));
        return newStatus;
      } else {
        throw new Error("Failed to fetch status");
      }
    } catch (error) {
      console.error("Failed to refresh LinkedIn status:", error);
      setLinkedInStatus((prevState) => ({
        ...prevState,
        checked: true,
        error: error.message,
      })); // Add error state if needed
      throw error;
    }
  };
  // --- END NEW FUNCTION ---

  // Check LinkedIn status when user is authenticated
  useEffect(() => {
    const checkInitialStatus = async () => {
      // --- NEW: Check for redirect parameter ---
      const linkedInConnected = searchParams.get("linkedin_connected");
      const linkedInFailed = searchParams.get("linkedin_failed");

      if (linkedInConnected === "true") {
        console.log("Detected linkedin_connected=true, forcing refresh...");
        await refreshAndClearCache();
        // Clean the URL parameter
        const newPath = window.location.pathname; // Keep current path
        router.replace(newPath, { scroll: false }); // Use replace to avoid back button issues
        return; // Don't proceed with cached check if we just refreshed
      }

      if (linkedInFailed === "true") {
        console.log("Detected linkedin_failed=true");
        // Optionally show an error message to the user here
        const newPath = window.location.pathname;
        router.replace(newPath, { scroll: false });
        // Fall through to check status normally
      }
      // --- END NEW CHECK ---

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const cachedStatus = sessionStorage.getItem("linkedInStatus");

          if (cachedStatus) {
            setLinkedInStatus(JSON.parse(cachedStatus));
          } else {
            // Initial fetch if no cache
            await refreshAndClearCache(); // Use the new function
          }
        } else {
          // Clear status if no session
          setLinkedInStatus({
            checked: true,
            connected: false,
            lastConnected: null,
            lastChecked: null,
          });
          sessionStorage.removeItem("linkedInStatus");
        }
      } catch (error) {
        console.error("Failed to check initial LinkedIn status:", error);
        setLinkedInStatus({
          checked: true,
          connected: false,
          lastConnected: null,
          lastChecked: null,
          error: error.message,
        });
      }
    };

    // Check status on auth state change
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        checkInitialStatus();
      } else if (event === "SIGNED_OUT") {
        setLinkedInStatus({
          checked: true,
          connected: false,
          lastConnected: null,
          lastChecked: null,
        });
        sessionStorage.removeItem("linkedInStatus");
      }
    });

    checkInitialStatus();

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Add searchParams dependency

  // Expose the refresh function
  const refreshLinkedInStatus = refreshAndClearCache;

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
