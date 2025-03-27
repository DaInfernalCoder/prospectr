"use client";

import { Button } from "@/components/ui/button";
import { Users, BarChart2 } from "lucide-react";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAnalytics } from "@/components/contexts/AnalyticsContext";
import UpdateFrequencyInfo from "../../components/UpdateFrequencyInfo";

function CampaignsContent() {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  const { analyticsData } = useAnalytics();

  // Helper function to transform analytics data into the format we need
  const getCampaignData = () => {
    if (!analyticsData.data || !analyticsData.data.campaigns) {
      return { active: [], drafts: [], completed: [] };
    }

    const campaigns = analyticsData.data.campaigns || [];

    return {
      active: campaigns.filter((camp) => camp.status === "processing"),
      drafts: campaigns.filter((camp) => camp.status === "pending"),
      completed: campaigns.filter((camp) => camp.status === "completed"),
    };
  };

  const campaigns = getCampaignData();

  const handleViewDetails = (campaignId) => {
    router.push(`/dashboard/campaigns/${campaignId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Campaigns</h1>
          <p className="text-sm text-[#A1A1AA]">
            Manage your LinkedIn outreach campaigns
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/campaigns/new/leads")}
        >
          New Campaign
        </Button>
      </div>

      {/* Update Frequency Info */}
      <UpdateFrequencyInfo />

      {/* Campaign Filters */}
      <div className="flex gap-4 pb-4 border-b border-[#1A1A1A]">
        <Button
          variant="ghost"
          className={`pb-4 px-2 rounded-none ${
            activeTab === "all"
              ? "text-white border-b-2 border-white"
              : "text-[#A1A1AA] hover:text-white"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Campaigns
        </Button>
        <Button
          variant="ghost"
          className={`pb-4 px-2 rounded-none ${
            activeTab === "active"
              ? "text-white border-b-2 border-white"
              : "text-[#A1A1AA] hover:text-white"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </Button>
        <Button
          variant="ghost"
          className={`pb-4 px-2 rounded-none ${
            activeTab === "drafts"
              ? "text-white border-b-2 border-white"
              : "text-[#A1A1AA] hover:text-white"
          }`}
          onClick={() => setActiveTab("drafts")}
        >
          Drafts
        </Button>
        <Button
          variant="ghost"
          className={`pb-4 px-2 rounded-none ${
            activeTab === "completed"
              ? "text-white border-b-2 border-white"
              : "text-[#A1A1AA] hover:text-white"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </Button>
      </div>

      {/* Loading State */}
      {analyticsData.isLoading && (
        <div className="w-full flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Campaign List */}
      {!analyticsData.isLoading && (
        <div className="space-y-4">
          {/* Active Campaigns */}
          {(activeTab === "all" || activeTab === "active") &&
            campaigns.active.length > 0 && (
              <div className="bg-[#0F0F0F] rounded-lg border border-[#1A1A1A]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Active Campaigns
                      </h3>
                      <p className="text-sm text-[#A1A1AA]">
                        Currently running campaigns
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {campaigns.active.map((campaign) => (
                      <div
                        key={campaign.job_id}
                        className="flex items-center justify-between p-4 bg-black rounded-lg border border-[#1A1A1A]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">
                              {campaign.name}
                            </h4>
                            <p className="text-sm text-[#A1A1AA]">
                              {campaign.total_invitations} prospects •{" "}
                              {Math.min(
                                100,
                                (campaign.accepted_connections /
                                  campaign.total_invitations) *
                                  100
                              ).toFixed(0)}
                              % complete
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-white">
                              {campaign.accepted_connections} connections
                            </p>
                            <p className="text-xs text-[#A1A1AA]">
                              {campaign.response_rate}% rate
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(campaign.job_id)}
                          >
                            <BarChart2 className="w-4 h-4 text-[#A1A1AA]" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          {/* Draft Campaigns */}
          {(activeTab === "all" || activeTab === "drafts") &&
            campaigns.drafts.length > 0 && (
              <div className="bg-[#0F0F0F] rounded-lg border border-[#1A1A1A]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Draft Campaigns
                      </h3>
                      <p className="text-sm text-[#A1A1AA]">
                        Campaigns in preparation
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {campaigns.drafts.map((campaign) => (
                      <div
                        key={campaign.job_id}
                        className="flex items-center justify-between p-4 bg-black rounded-lg border border-[#1A1A1A]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">
                              {campaign.name}
                            </h4>
                            <p className="text-sm text-[#A1A1AA]">
                              Draft • Last edited{" "}
                              {campaign.created_at
                                ? new Date(
                                    campaign.created_at
                                  ).toLocaleDateString()
                                : "recently"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(campaign.job_id)}
                          >
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          {/* Completed Campaigns */}
          {(activeTab === "all" || activeTab === "completed") &&
            campaigns.completed.length > 0 && (
              <div className="bg-[#0F0F0F] rounded-lg border border-[#1A1A1A]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Completed
                      </h3>
                      <p className="text-sm text-[#A1A1AA]">Past campaigns</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {campaigns.completed.map((campaign) => (
                      <div
                        key={campaign.job_id}
                        className="flex items-center justify-between p-4 bg-black rounded-lg border border-[#1A1A1A]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">
                              {campaign.name}
                            </h4>
                            <p className="text-sm text-[#A1A1AA]">
                              {campaign.total_invitations} prospects • Completed
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-white">
                              {campaign.accepted_connections} connections
                            </p>
                            <p className="text-xs text-[#A1A1AA]">
                              {campaign.response_rate}% rate
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(campaign.job_id)}
                          >
                            <BarChart2 className="w-4 h-4 text-[#A1A1AA]" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          {/* No Campaigns State */}
          {!analyticsData.isLoading &&
            analyticsData.data &&
            (!analyticsData.data.campaigns ||
              analyticsData.data.campaigns.length === 0) && (
              <div className="bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] p-12 text-center">
                <p className="text-[#A1A1AA] mb-4">
                  You don&apos;t have any campaigns yet
                </p>
                <Button
                  onClick={() => router.push("/dashboard/campaigns/new/leads")}
                >
                  Create your first campaign
                </Button>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default function CampaignsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      <CampaignsContent />
    </Suspense>
  );
}
