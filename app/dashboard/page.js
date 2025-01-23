"use client";

import { Button } from "@/components/ui/button";
import ButtonAccount from "@/components/ButtonAccount";

export default function Dashboard() {
  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C9E5FF]">Welcome back!</h1>
          <p className="text-sm text-[#A3A3A3]">Here's what's happening with your campaigns</p>
        </div>
        <ButtonAccount />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0C0C0C] p-6 rounded-lg border border-[#2A2A2A]">
          <h3 className="text-lg font-medium text-[#C9E5FF]">Total Connections</h3>
          <p className="text-3xl font-bold mt-2 text-[#C9E5FF]">0</p>
          <p className="text-sm text-[#A3A3A3] mt-1">From all campaigns</p>
        </div>
        <div className="bg-[#0C0C0C] p-6 rounded-lg border border-[#2A2A2A]">
          <h3 className="text-lg font-medium text-[#C9E5FF]">Active Campaigns</h3>
          <p className="text-3xl font-bold mt-2 text-[#C9E5FF]">0</p>
          <p className="text-sm text-[#A3A3A3] mt-1">Currently running</p>
        </div>
        <div className="bg-[#0C0C0C] p-6 rounded-lg border border-[#2A2A2A]">
          <h3 className="text-lg font-medium text-[#C9E5FF]">Response Rate</h3>
          <p className="text-3xl font-bold mt-2 text-[#C9E5FF]">0%</p>
          <p className="text-sm text-[#A3A3A3] mt-1">Average across campaigns</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button variant="outline">
          New Campaign
        </Button>
        <Button variant="outline">
          Import Contacts
        </Button>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-[#C9E5FF] mb-4">Recent Activity</h2>
        <div className="bg-[#0C0C0C] rounded-lg p-6 border border-[#2A2A2A]">
          <div className="text-center py-8">
            <p className="text-[#A3A3A3]">No recent activity</p>
            <Button variant="link" className="mt-4 text-[#C9E5FF] hover:text-[#A3A3A3]">
              Start your first campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
