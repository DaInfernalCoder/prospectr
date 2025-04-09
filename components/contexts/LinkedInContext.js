"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams, useRouter } from "next/navigation"; // Import hooks

// Create the LinkedIn context with default values matching the expected structure
const LinkedInContext = createContext({
  linkedInStatus: {
    // Default state object
    connected: false,
    loading: true,
    error: null,
    // Add lastChecked if you plan to use it in the default structure
    // lastChecked: null,
  },
  refreshLinkedInStatus: () => {}, // Default function with the correct name
});

const LinkedInProviderContent = ({ children }) => {
  // Initialize state with the same structure as the default context value
  const [linkedInStatus, setLinkedInStatus] = useState({
    connected: false,
    loading: true,
    error: null,
    // lastChecked: null, // Initialize if needed
  });
  const supabase = createClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Function to refresh LinkedIn status and clear cache
  const refreshAndClearCache = async () => {
    try {
      // Update loading state within the linkedInStatus object
      setLinkedInStatus((prev) => ({ ...prev, loading: true, error: null }));
      const response = await fetch("/api/linkedin/status");
      if (!response.ok) {
        throw new Error("Failed to refresh LinkedIn status");
      }
      const data = await response.json();
      // Update the entire linkedInStatus object
      setLinkedInStatus({
        connected: data.connected,
        loading: false,
        error: null,
        // lastChecked: new Date().toISOString(), // Optionally update last checked time
      });
    } catch (error) {
      // Update error state within the linkedInStatus object
      setLinkedInStatus((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  // Check LinkedIn status when user is authenticated
  useEffect(() => {
    const checkInitialStatus = async () => {
      // --- Check for redirect parameter ---
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

      // Normal status check
      try {
        // Update loading state
        setLinkedInStatus((prev) => ({ ...prev, loading: true, error: null }));
        const response = await fetch("/api/linkedin/status");
        if (!response.ok) {
          throw new Error("Failed to check LinkedIn status");
        }
        const data = await response.json();
        // Update the entire linkedInStatus object
        setLinkedInStatus({
          connected: data.connected,
          loading: false,
          error: null,
          // lastChecked: new Date().toISOString(), // Optionally update last checked time
        });
      } catch (error) {
        // Update error state
        setLinkedInStatus((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    checkInitialStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]); // Dependencies remain the same

  return (
    <LinkedInContext.Provider
      value={{
        linkedInStatus: linkedInStatus, // Provide the whole state object
        refreshLinkedInStatus: refreshAndClearCache, // Use the name expected by ButtonLinkedin
      }}
    >
      {children}
    </LinkedInContext.Provider>
  );
};

export function LinkedInProvider({ children }) {
  return (
    // Suspense is good practice when using useSearchParams/useRouter
    <Suspense fallback={<div>Loading LinkedIn Status...</div>}>
      <LinkedInProviderContent>{children}</LinkedInProviderContent>
    </Suspense>
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
