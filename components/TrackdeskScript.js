"use client";

import { useEffect } from "react";

export default function TrackdeskScript() {
  useEffect(() => {
    // Check if the trackdesk function exists
    if (typeof window !== "undefined" && window.trackdesk) {
      // Trigger the tracking
      window.trackdesk("leadsprospectr", "click");
    }
  }, []);

  // This component doesn't render anything
  return null;
} 