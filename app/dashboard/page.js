"use client";

import { Button } from "@/components/ui/button";
import ButtonAccount from "@/components/ButtonAccount";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  
  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
          <p className="text-sm text-[#A1A1AA]">
            Here&apos;s what&apos;s happening with your campaigns
          </p>
        </div>
        <ButtonAccount />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0F0F0F] p-6 rounded-lg border border-[#1A1A1A]">
          <h3 className="text-lg font-medium text-white">
            Total Connections
          </h3>
          <p className="text-3xl font-bold mt-2 text-white">0</p>
          <p className="text-sm text-[#A1A1AA] mt-1">From all campaigns</p>
        </div>
        <div className="bg-[#0F0F0F] p-6 rounded-lg border border-[#1A1A1A]">
          <h3 className="text-lg font-medium text-white">
            Active Campaigns
          </h3>
          <p className="text-3xl font-bold mt-2 text-white">0</p>
          <p className="text-sm text-[#A1A1AA] mt-1">Currently running</p>
        </div>
        <div className="bg-[#0F0F0F] p-6 rounded-lg border border-[#1A1A1A]">
          <h3 className="text-lg font-medium text-white">Response Rate</h3>
          <p className="text-3xl font-bold mt-2 text-white">0%</p>
          <p className="text-sm text-[#A1A1AA] mt-1">
            Average across campaigns
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button 
          variant="outline"
          onClick={() => router.push('/dashboard/campaigns/new/leads')}
        >
          New Campaign
        </Button>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Recent Activity
        </h2>
        <div className="bg-[#0F0F0F] rounded-lg p-6 border border-[#1A1A1A]">
          <div className="text-center py-8">
            <p className="text-[#A1A1AA]">No recent activity</p>
            <Button
              variant="link"
              className="mt-4 text-white hover:text-[#A1A1AA]"
              onClick={() => router.push('/dashboard/campaigns/new/leads')}
            >
              Start your first campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
