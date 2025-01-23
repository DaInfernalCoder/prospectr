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
          <select className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md px-3 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Connection Rate</h3>
          <p className="text-2xl font-bold mt-2 text-neutral-900 dark:text-white">0%</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">vs previous period</p>
        </div>
        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Replies</h3>
          <p className="text-2xl font-bold mt-2 text-neutral-900 dark:text-white">0</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Total replies received</p>
        </div>
        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Connections</h3>
          <p className="text-2xl font-bold mt-2 text-neutral-900 dark:text-white">0</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">vs previous period</p>
        </div>
        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Active Campaigns</h3>
          <p className="text-2xl font-bold mt-2 text-neutral-900 dark:text-white">0</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">vs previous period</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Progress */}
        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Campaign Progress</h3>
          <div className="space-y-4">
            {/* Example campaign progress bars */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600 dark:text-neutral-400">19 Jan M&D</span>
                <span className="text-neutral-800 dark:text-white">100%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600 dark:text-neutral-400">Connection Request Jan 2025</span>
                <span className="text-neutral-800 dark:text-white">22%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '22%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-white">Recent Replies</h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center text-sm font-medium">
                  B
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800 dark:text-white">benteusse@habit.health</p>
                  <p className="text-xs text-neutral-500">19 Jan M&D</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-neutral-500">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
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
