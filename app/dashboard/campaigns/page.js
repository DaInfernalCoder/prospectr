"use client";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">Campaigns</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Manage your LinkedIn outreach campaigns</p>
        </div>
        <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-md transition-colors">
          New Campaign
        </button>
      </div>

      {/* Campaign Filters */}
      <div className="flex gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
        <button className="text-sm font-medium text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white pb-4 px-2">
          All Campaigns
        </button>
        <button className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white pb-4 px-2">
          Active
        </button>
        <button className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white pb-4 px-2">
          Drafts
        </button>
        <button className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white pb-4 px-2">
          Completed
        </button>
      </div>

      {/* Empty State */}
      <div className="text-center py-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <div className="max-w-sm mx-auto">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
            No campaigns yet
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">
            Create your first campaign to start connecting with potential leads on LinkedIn
          </p>
          <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded-md transition-colors">
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
