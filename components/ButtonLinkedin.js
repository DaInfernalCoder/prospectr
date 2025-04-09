"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLinkedIn } from "@/components/contexts/LinkedInContext"; // Correct import
import { useQuery } from "@tanstack/react-query";

const ButtonLinkedin = ({
  className = "",
  variant = "default",
  text = "Connect LinkedIn",
}) => {
  const [isLoading, setIsLoading] = useState(false); // Local loading state for button actions
  const router = useRouter();
  // Destructure the context value correctly
  const { linkedInStatus, refreshLinkedInStatus } = useLinkedIn();

  // Fetch user's LinkedIn account information using React Query
  const { data: linkedInAccount, isLoading: isLoadingAccount } = useQuery({
    queryKey: ["linkedInAccount"],
    queryFn: async () => {
      const response = await fetch("/api/auths/linkedin/account");
      if (!response.ok) {
        // Handle specific errors if needed, e.g., 401 Unauthorized
        if (response.status === 401) {
          console.warn(
            "Unauthorized fetching LinkedIn account. User might be logged out."
          );
          return null; // Return null or throw specific error
        }
        throw new Error("Failed to fetch LinkedIn account");
      }
      return response.json();
    },
    // Only fetch if we know the user is connected according to context
    // Use optional chaining for safety during initial renders
    enabled: !!linkedInStatus?.connected,
    // Add staleTime and gcTime if needed for caching behavior
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleConnectLinkedin = async () => {
    // Use local loading state
    setIsLoading(true);
    try {
      // Use linkedInStatus.connected safely with optional chaining
      if (linkedInStatus?.connected && linkedInAccount?.unipileAccountId) {
        // Reconnect logic
        const response = await fetch(
          `/api/auths/linkedin/reconnect?account_id=${linkedInAccount.unipileAccountId}`
        );

        if (response.ok) {
          alert("Reconnection email sent! Please check your inbox.");
        } else {
          const errorData = await response.json();
          if (response.status === 402 && errorData.checkoutUrl) {
            window.location.href = errorData.checkoutUrl;
            return;
          }
          throw new Error(
            errorData.error || "Failed to reconnect LinkedIn account"
          );
        }
      } else {
        // New connection logic
        const checkResponse = await fetch(
          "/api/auths/linkedin/check-subscription"
        );
        const checkData = await checkResponse.json();

        if (checkResponse.status === 402 && checkData.checkoutUrl) {
          window.location.href = checkData.checkoutUrl;
          return;
        }

        // Redirect to LinkedIn connect API
        window.location.href = "/api/auths/linkedin/connect";
      }
    } catch (error) {
      console.error("LinkedIn connection error:", error);
      // Consider showing a user-friendly error message (e.g., using toast)
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop local loading state
    }
  };

  const handleRefreshStatus = async (e) => {
    // Use linkedInStatus.connected safely
    if (linkedInStatus?.connected) {
      e.preventDefault();
      e.stopPropagation();

      // Use local loading state
      setIsLoading(true);
      try {
        await refreshLinkedInStatus(); // Call the refresh function from context
      } catch (error) {
        console.error("Failed to refresh LinkedIn status:", error);
        alert(`Error refreshing status: ${error.message}`);
      } finally {
        setIsLoading(false); // Stop local loading state
      }
    }
  };

  // Determine button class based on variant
  let buttonStyle = "btn";
  if (className) buttonStyle += ` ${className}`;

  if (variant === "outline") {
    buttonStyle +=
      " btn-outline bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#C9E5FF] border-[#2A2A2A]";
  } else if (variant === "ghost") {
    buttonStyle += " btn-ghost";
  } else if (variant === "link") {
    buttonStyle += " btn-link";
  } else {
    // Default to primary style
    buttonStyle += " btn-primary";
  }

  // Determine button text based on connection status
  // Use optional chaining for safety
  const buttonText = linkedInStatus?.connected ? "Reconnect LinkedIn" : text;

  // Combine all loading states for the disabled prop
  const isDisabled = isLoading || isLoadingAccount || linkedInStatus?.loading;

  return (
    <button
      className={buttonStyle}
      onClick={handleConnectLinkedin}
      // Consider if double click is the best UX for refresh
      onDoubleClick={handleRefreshStatus}
      disabled={isDisabled}
      data-tooltip-id="tooltip"
      // Use optional chaining for safety
      data-tooltip-content={
        linkedInStatus?.connected
          ? `LinkedIn account connected${
              linkedInStatus?.lastChecked // Check if lastChecked exists in the status object
                ? ` (Last checked: ${new Date(
                    linkedInStatus.lastChecked
                  ).toLocaleString()})`
                : ""
            }`
          : "Connect your LinkedIn account"
      }
    >
      {/* Show spinner if any loading state is true */}
      {isDisabled ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-1" // Added margin for spacing
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
          {buttonText}
        </>
      )}
    </button>
  );
};

export default ButtonLinkedin;
