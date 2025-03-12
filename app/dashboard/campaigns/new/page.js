"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewCampaignPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first step of campaign creation
    router.push('/dashboard/campaigns/new/leads');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white">Redirecting to campaign creation...</div>
    </div>
  );
}
