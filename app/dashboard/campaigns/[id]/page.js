"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, BarChart2, Calendar, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data - replace with real data later
const mockCampaigns = {
  "1": {
    id: "1",
    name: "Q1 Outreach",
    status: "active",
    prospects: 250,
    progress: 45,
    replies: 42,
    replyRate: 16.8,
    startDate: "2025-01-01",
    lastActive: "2025-01-23",
    description: "Q1 outreach campaign targeting tech decision makers",
  },
  "2": {
    id: "2",
    name: "Tech Founders",
    status: "draft",
    lastEdited: "2 days ago",
    description: "Campaign targeting startup founders in the tech industry",
  },
  "3": {
    id: "3",
    name: "December Outreach",
    status: "completed",
    prospects: 500,
    replies: 89,
    replyRate: 17.8,
    startDate: "2024-12-01",
    completedDate: "2024-12-31",
    description: "End of year outreach campaign",
  }
};

export default function CampaignDetailsPage({ params }) {
  const router = useRouter();
  const campaign = mockCampaigns[params.id];

  if (!campaign) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.back()} className="text-[#C9E5FF]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campaigns
        </Button>
        <div className="text-[#C9E5FF]">Campaign not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.back()} className="text-[#C9E5FF]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campaigns
        </Button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#C9E5FF]">{campaign.name}</h1>
            <p className="text-sm text-[#A3A3A3]">{campaign.description}</p>
          </div>
          <div className="flex gap-2">
            {campaign.status === "draft" && (
              <>
                <Button variant="outline">Edit</Button>
                <Button variant="ghost">Delete</Button>
              </>
            )}
            {campaign.status === "active" && (
              <Button variant="outline">Pause Campaign</Button>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0C0C0C] rounded-lg border border-[#2A2A2A] p-6">
          <h3 className="text-lg font-medium text-[#C9E5FF] mb-4">Campaign Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#A3A3A3]" />
                <span className="text-[#A3A3A3]">Total Prospects</span>
              </div>
              <span className="text-[#C9E5FF] font-medium">{campaign.prospects || "N/A"}</span>
            </div>
            {campaign.status === "active" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#A3A3A3]" />
                  <span className="text-[#A3A3A3]">Progress</span>
                </div>
                <span className="text-[#C9E5FF] font-medium">{campaign.progress}%</span>
              </div>
            )}
            {(campaign.status === "active" || campaign.status === "completed") && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#A3A3A3]" />
                    <span className="text-[#A3A3A3]">Start Date</span>
                  </div>
                  <span className="text-[#C9E5FF] font-medium">{campaign.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#A3A3A3]" />
                    <span className="text-[#A3A3A3]">
                      {campaign.status === "active" ? "Last Active" : "Completed Date"}
                    </span>
                  </div>
                  <span className="text-[#C9E5FF] font-medium">
                    {campaign.status === "active" ? campaign.lastActive : campaign.completedDate}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {(campaign.status === "active" || campaign.status === "completed") && (
          <div className="bg-[#0C0C0C] rounded-lg border border-[#2A2A2A] p-6">
            <h3 className="text-lg font-medium text-[#C9E5FF] mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#A3A3A3]">Total Replies</span>
                <span className="text-[#C9E5FF] font-medium">{campaign.replies}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A3A3A3]">Reply Rate</span>
                <span className="text-[#C9E5FF] font-medium">{campaign.replyRate}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
