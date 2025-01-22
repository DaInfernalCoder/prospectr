"use client";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">Analytics</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Track your campaign performance and metrics</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md px-3 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Connection Rate</h3>
          <p className="text-2xl font-bold mt-2 text-neutral-900 dark:text-white">0%</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">vs previous period</p>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Response Rate</h3>
          <p className="text-2xl font-bold mt-2 text-neutral-900 dark:text-white">0%</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">vs previous period</p>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Connections</h3>
          <p className="text-2xl font-bold mt-2 text-neutral-900 dark:text-white">0</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">vs previous period</p>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Active Campaigns</h3>
          <p className="text-2xl font-bold mt-2 text-neutral-900 dark:text-white">0</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">vs previous period</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connection Growth Chart */}
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Connection Growth</h3>
          <div className="h-64 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
            No data available
          </div>
        </div>

        {/* Response Rate Chart */}
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Response Rate</h3>
          <div className="h-64 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
            No data available
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Campaign Performance</h3>
        <div className="text-center py-8">
          <p className="text-neutral-500 dark:text-neutral-400">No campaign data available</p>
          <button className="mt-4 text-sm text-neutral-800 dark:text-white hover:underline">
            Create your first campaign
          </button>
        </div>
      </div>
    </div>
  );
}
