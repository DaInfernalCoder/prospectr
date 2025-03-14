"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLinkedIn } from "@/components/contexts/LinkedInContext";

const ButtonLinkedin = ({ className = "", variant = "default", text = "Connect LinkedIn" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { linkedInStatus, refreshLinkedInStatus } = useLinkedIn();

  const handleConnectLinkedin = async () => {
    try {
      setIsLoading(true);
      // Redirect to LinkedIn connect API
      window.location.href = "/api/auths/linkedin/connect";
    } catch (error) {
      console.error("LinkedIn connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshStatus = async (e) => {
    // If the user is already connected, they might want to refresh the status
    // rather than reconnect, so we'll prevent the default action
    if (linkedInStatus.connected) {
      e.preventDefault();
      e.stopPropagation();
      
      try {
        setIsLoading(true);
        await refreshLinkedInStatus();
      } catch (error) {
        console.error("Failed to refresh LinkedIn status:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Determine button class based on variant
  let buttonStyle = "btn";
  if (className) buttonStyle += ` ${className}`;
  
  if (variant === "outline") {
    buttonStyle += " btn-outline bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#C9E5FF] border-[#2A2A2A]";
  } else if (variant === "ghost") {
    buttonStyle += " btn-ghost";
  } else if (variant === "link") {
    buttonStyle += " btn-link";
  } else {
    buttonStyle += " btn-primary";
  }

  return (
    <button
      className={buttonStyle}
      onClick={handleConnectLinkedin}
      onDoubleClick={handleRefreshStatus}
      disabled={isLoading}
      data-tooltip-id="tooltip"
      data-tooltip-content={linkedInStatus.connected 
        ? `LinkedIn account connected${linkedInStatus.lastChecked ? ` (Last checked: ${new Date(linkedInStatus.lastChecked).toLocaleString()})` : ''}`
        : "Connect your LinkedIn account"}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
          {text}
        </>
      )}
    </button>
  );
};

export default ButtonLinkedin; 