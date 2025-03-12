"use client";

import { useRouter } from "next/navigation";

export default function AnalyticsPage() {
  const router = useRouter();
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C9E5FF]">Analytics</h1>
          <p className="text-sm text-[#A3A3A3]">Track your campaign performance and metrics</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-[#0C0C0C] border border-[#2A2A2A] text-[#A3A3A3] rounded-md px-3 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] p-6 rounded-lg hover:border-[#2A2A2A] transition-colors">
          <h3 className="text-sm font-medium text-[#A3A3A3]">Connection Rate</h3>
          <p className="text-2xl font-bold mt-2 text-[#C9E5FF]">0%</p>
          <p className="text-xs text-[#A3A3A3] mt-1">vs previous period</p>
        </div>
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] p-6 rounded-lg hover:border-[#2A2A2A] transition-colors">
          <h3 className="text-sm font-medium text-[#A3A3A3]">Replies</h3>
          <p className="text-2xl font-bold mt-2 text-[#C9E5FF]">0</p>
          <p className="text-xs text-[#A3A3A3] mt-1">Total replies received</p>
        </div>
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] p-6 rounded-lg hover:border-[#2A2A2A] transition-colors">
          <h3 className="text-sm font-medium text-[#A3A3A3]">Total Connections</h3>
          <p className="text-2xl font-bold mt-2 text-[#C9E5FF]">0</p>
          <p className="text-xs text-[#A3A3A3] mt-1">vs previous period</p>
        </div>
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] p-6 rounded-lg hover:border-[#2A2A2A] transition-colors">
          <h3 className="text-sm font-medium text-[#A3A3A3]">Active Campaigns</h3>
          <p className="text-2xl font-bold mt-2 text-[#C9E5FF]">0</p>
          <p className="text-xs text-[#A3A3A3] mt-1">vs previous period</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Progress */}
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] p-6 rounded-lg">
          <h3 className="text-lg font-medium text-[#C9E5FF] mb-4">Campaign Progress</h3>
          <div className="space-y-4">
            {/* Example campaign progress bars */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#A3A3A3]">19 Jan M&D</span>
                <span className="text-[#C9E5FF]">100%</span>
              </div>
              <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#A3A3A3]">Connection Request Jan 2025</span>
                <span className="text-[#C9E5FF]">22%</span>
              </div>
              <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '22%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#C9E5FF]">Recent Replies</h3>
            <button className="text-sm text-[#C9E5FF] hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-[#2A2A2A]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#2A2A2A] rounded-full flex items-center justify-center text-sm font-medium">
                  B
                </div>
                <div>
                  <p className="text-sm font-medium text-[#C9E5FF]">benteusse@habit.health</p>
                  <p className="text-xs text-[#A3A3A3]">19 Jan M&D</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-[#A3A3A3]">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg p-6">
        <h3 className="text-lg font-medium text-[#C9E5FF] mb-4">Campaign Performance</h3>
        <div className="text-center py-8">
          <p className="text-[#A3A3A3]">No campaign data available</p>
          <button 
            className="mt-4 text-sm text-[#C9E5FF] hover:underline"
            onClick={() => router.push('/dashboard/campaigns/new/leads')}
          >
            Create your first campaign
          </button>
        </div>
      </div>
    </div>
  );
}
