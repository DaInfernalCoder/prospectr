"use client";

import { Button } from "@/components/ui/button";
import { Users, BarChart2 } from "lucide-react";

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

      {/* Campaign List */}
      <div className="space-y-4">
        {/* Active Campaigns */}
        <div className="bg-[#0C0C0C] rounded-lg border border-[#2A2A2A]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-[#C9E5FF]">Active Campaigns</h3>
                <p className="text-sm text-[#A3A3A3]">Currently running campaigns</p>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-[#2A2A2A]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#C9E5FF]" />
                  </div>
                  <div>
                    <h4 className="text-[#C9E5FF] font-medium">Q1 Outreach</h4>
                    <p className="text-sm text-[#A3A3A3]">250 prospects • 45% complete</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-[#C9E5FF]">42 replies</p>
                    <p className="text-xs text-[#A3A3A3]">16.8% rate</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <BarChart2 className="w-4 h-4 text-[#A3A3A3]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Draft Campaigns */}
        <div className="bg-[#0C0C0C] rounded-lg border border-[#2A2A2A]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-[#C9E5FF]">Draft Campaigns</h3>
                <p className="text-sm text-[#A3A3A3]">Campaigns in preparation</p>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-[#2A2A2A]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#C9E5FF]" />
                  </div>
                  <div>
                    <h4 className="text-[#C9E5FF] font-medium">Tech Founders</h4>
                    <p className="text-sm text-[#A3A3A3]">Draft • Last edited 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Campaigns */}
        <div className="bg-[#0C0C0C] rounded-lg border border-[#2A2A2A]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-[#C9E5FF]">Completed</h3>
                <p className="text-sm text-[#A3A3A3]">Past campaigns</p>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-[#2A2A2A]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#C9E5FF]" />
                  </div>
                  <div>
                    <h4 className="text-[#C9E5FF] font-medium">December Outreach</h4>
                    <p className="text-sm text-[#A3A3A3]">500 prospects • Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-[#C9E5FF]">89 replies</p>
                    <p className="text-xs text-[#A3A3A3]">17.8% rate</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <BarChart2 className="w-4 h-4 text-[#A3A3A3]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
