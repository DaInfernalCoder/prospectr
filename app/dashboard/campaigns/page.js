"use client";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C9E5FF]">Campaigns</h1>
          <p className="text-sm text-[#A3A3A3]">Manage your LinkedIn outreach campaigns</p>
        </div>
        <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#C9E5FF] px-4 py-2 rounded-md transition-colors border border-[#2A2A2A]">
          New Campaign
        </button>
      </div>

      {/* Campaign Filters */}
      <div className="flex gap-4 pb-4 border-b border-[#2A2A2A]">
        <button className="text-sm font-medium text-[#C9E5FF] border-b-2 border-[#C9E5FF] pb-4 px-2">
          All Campaigns
        </button>
        <button className="text-sm font-medium text-[#A3A3A3] hover:text-[#C9E5FF] pb-4 px-2">
          Active
        </button>
        <button className="text-sm font-medium text-[#A3A3A3] hover:text-[#C9E5FF] pb-4 px-2">
          Drafts
        </button>
        <button className="text-sm font-medium text-[#A3A3A3] hover:text-[#C9E5FF] pb-4 px-2">
          Completed
        </button>
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
          <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#C9E5FF] px-6 py-2 rounded-md transition-colors border border-[#2A2A2A]">
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
