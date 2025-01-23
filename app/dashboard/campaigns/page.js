"use client";

import { Button } from "@/components/ui/button";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C9E5FF]">Campaigns</h1>
          <p className="text-sm text-[#A3A3A3]">Manage your LinkedIn outreach campaigns</p>
        </div>
        <Button variant="outline">
          New Campaign
        </Button>
      </div>

      {/* Campaign Filters */}
      <div className="flex gap-4 pb-4 border-b border-[#2A2A2A]">
        <Button variant="ghost" className="text-[#C9E5FF] border-b-2 border-[#C9E5FF] pb-4 px-2 rounded-none">
          All Campaigns
        </Button>
        <Button variant="ghost" className="text-[#A3A3A3] hover:text-[#C9E5FF] pb-4 px-2 rounded-none">
          Active
        </Button>
        <Button variant="ghost" className="text-[#A3A3A3] hover:text-[#C9E5FF] pb-4 px-2 rounded-none">
          Drafts
        </Button>
        <Button variant="ghost" className="text-[#A3A3A3] hover:text-[#C9E5FF] pb-4 px-2 rounded-none">
          Completed
        </Button>
      </div>

      {/* Empty State */}
      <div className="text-center py-12 bg-[#0C0C0C] rounded-lg border border-[#2A2A2A]">
        <div className="max-w-sm mx-auto">
          <h3 className="text-lg font-medium text-[#C9E5FF] mb-2">
            No campaigns yet
          </h3>
          <p className="text-[#A3A3A3] mb-4">
            Create your first campaign to start connecting with potential leads on LinkedIn
          </p>
          <Button variant="outline">
            Create Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}
