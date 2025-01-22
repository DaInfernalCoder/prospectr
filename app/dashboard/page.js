"use client";

import ButtonAccount from "@/components/ButtonAccount";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">Welcome back!</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Here's what's happening with your campaigns</p>
        </div>
        <ButtonAccount />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white">Total Connections</h3>
          <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">0</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">From all campaigns</p>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white">Active Campaigns</h3>
          <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">0</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Currently running</p>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white">Response Rate</h3>
          <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">0%</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Average across campaigns</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-md transition-colors">
          New Campaign
        </button>
        <button className="border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
          Import Contacts
        </button>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">Recent Activity</h2>
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6">
          <div className="text-center py-8">
            <p className="text-neutral-500 dark:text-neutral-400">No recent activity</p>
            <button className="mt-4 text-sm text-neutral-800 dark:text-white hover:underline">
              Start your first campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
