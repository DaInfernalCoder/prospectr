"use client";

import { Button } from "@/components/ui/button";
import { Users, BarChart2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Mock data - replace with real data later
const mockCampaigns = {
  active: [
    {
      id: "1",
      name: "Q1 Outreach",
      prospects: 250,
      progress: 45,
      replies: 42,
      replyRate: 16.8,
    }
  ],
  drafts: [
    {
      id: "2",
      name: "Tech Founders",
      lastEdited: "2 days ago"
    }
  ],
  completed: [
    {
      id: "3",
      name: "December Outreach",
      prospects: 500,
      replies: 89,
      replyRate: 17.8,
    }
  ]
};

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();

  const handleViewDetails = (campaignId) => {
    router.push(`/dashboard/campaigns/${campaignId}`);
  };
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C9E5FF]">Campaigns</h1>
          <p className="text-sm text-[#A3A3A3]">Manage your LinkedIn outreach campaigns</p>
        </div>
        <Button 
          variant="outline"
          onClick={() => router.push('/dashboard/campaigns/new/leads')}
        >
          New Campaign
        </Button>
      </div>

      {/* Campaign Filters */}
      <div className="flex gap-4 pb-4 border-b border-[#2A2A2A]">
        <Button 
          variant="ghost" 
          className={`pb-4 px-2 rounded-none ${
            activeTab === "all" 
              ? "text-[#C9E5FF] border-b-2 border-[#C9E5FF]" 
              : "text-[#A3A3A3] hover:text-[#C9E5FF]"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Campaigns
        </Button>
        <Button 
          variant="ghost" 
          className={`pb-4 px-2 rounded-none ${
            activeTab === "active" 
              ? "text-[#C9E5FF] border-b-2 border-[#C9E5FF]" 
              : "text-[#A3A3A3] hover:text-[#C9E5FF]"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </Button>
        <Button 
          variant="ghost" 
          className={`pb-4 px-2 rounded-none ${
            activeTab === "drafts" 
              ? "text-[#C9E5FF] border-b-2 border-[#C9E5FF]" 
              : "text-[#A3A3A3] hover:text-[#C9E5FF]"
          }`}
          onClick={() => setActiveTab("drafts")}
        >
          Drafts
        </Button>
        <Button 
          variant="ghost" 
          className={`pb-4 px-2 rounded-none ${
            activeTab === "completed" 
              ? "text-[#C9E5FF] border-b-2 border-[#C9E5FF]" 
              : "text-[#A3A3A3] hover:text-[#C9E5FF]"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </Button>
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {/* Active Campaigns */}
        {(activeTab === "all" || activeTab === "active") && mockCampaigns.active.length > 0 && (
          <div className="bg-[#0C0C0C] rounded-lg border border-[#2A2A2A]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-[#C9E5FF]">Active Campaigns</h3>
                  <p className="text-sm text-[#A3A3A3]">Currently running campaigns</p>
                </div>
                <Button variant="outline" onClick={() => handleViewDetails(mockCampaigns.active[0].id)}>View Details</Button>
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

        )}

        {/* Draft Campaigns */}
        {(activeTab === "all" || activeTab === "drafts") && mockCampaigns.drafts.length > 0 && (
          <div className="bg-[#0C0C0C] rounded-lg border border-[#2A2A2A]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-[#C9E5FF]">Draft Campaigns</h3>
                  <p className="text-sm text-[#A3A3A3]">Campaigns in preparation</p>
                </div>
                <Button variant="outline" onClick={() => handleViewDetails(mockCampaigns.drafts[0].id)}>View Details</Button>
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

        )}

        {/* Completed Campaigns */}
        {(activeTab === "all" || activeTab === "completed") && mockCampaigns.completed.length > 0 && (
          <div className="bg-[#0C0C0C] rounded-lg border border-[#2A2A2A]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-[#C9E5FF]">Completed</h3>
                  <p className="text-sm text-[#A3A3A3]">Past campaigns</p>
                </div>
                <Button variant="outline" onClick={() => handleViewDetails(mockCampaigns.completed[0].id)}>View Details</Button>
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
        )}
      </div>
    </div>
  );
}
