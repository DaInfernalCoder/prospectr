"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAnalytics } from "@/components/contexts/AnalyticsContext";
import { Suspense } from "react";

function AnalyticsContent() {
  const router = useRouter();
  const { analyticsData, refreshAnalyticsData } = useAnalytics();
  const [timeframe, setTimeframe] = useState("all");

  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
  };

  // Handle refresh button click
  const handleRefresh = async () => {
    await refreshAnalyticsData();
  };

  // Handle timeframe change
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-[#A1A1AA]">Track your campaign performance and metrics</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="bg-[#0F0F0F] border border-[#1A1A1A] text-[#A1A1AA] rounded-md px-3 py-2 text-sm"
            value={timeframe}
            onChange={handleTimeframeChange}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="all">All time</option>
          </select>
          <button 
            className="btn btn-sm btn-outline" 
            onClick={handleRefresh}
            disabled={analyticsData.isLoading}
          >
            {analyticsData.isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {analyticsData.isLoading && (
        <div className="w-full flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {!analyticsData.isLoading && analyticsData.error && (
        <div className="bg-[#0F0F0F] border border-red-500 rounded-lg p-6 text-center">
          <p className="text-red-500">{analyticsData.error}</p>
          <button 
            className="mt-4 text-sm text-white hover:underline"
            onClick={handleRefresh}
          >
            Try again
          </button>
        </div>
      )}

      {/* Content when data is loaded */}
      {!analyticsData.isLoading && !analyticsData.error && analyticsData.data && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 rounded-lg hover:border-[#2A2A2A] transition-colors">
              <h3 className="text-sm font-medium text-white">Connection Rate</h3>
              <p className="text-2xl font-bold mt-2 text-white">
                {analyticsData.data.summary?.response_rate || "0"}%
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1">Average connection rate</p>
            </div>
            <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 rounded-lg hover:border-[#2A2A2A] transition-colors">
              <h3 className="text-sm font-medium text-white">Total Connections</h3>
              <p className="text-2xl font-bold mt-2 text-white">
                {formatNumber(analyticsData.data.summary?.total_connections || 0)}
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1">Connections accepted</p>
            </div>
            <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 rounded-lg hover:border-[#2A2A2A] transition-colors">
              <h3 className="text-sm font-medium text-white">Total Invitations</h3>
              <p className="text-2xl font-bold mt-2 text-white">
                {formatNumber(analyticsData.data.summary?.total_invitations || 0)}
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1">Invitations sent</p>
            </div>
            <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 rounded-lg hover:border-[#2A2A2A] transition-colors">
              <h3 className="text-sm font-medium text-white">Active Campaigns</h3>
              <p className="text-2xl font-bold mt-2 text-white">
                {analyticsData.data.summary?.active_campaigns || "0"}
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Out of {analyticsData.data.summary?.total_campaigns || "0"} total
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Progress */}
            <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">Campaign Progress</h3>
              {analyticsData.data.campaigns && analyticsData.data.campaigns.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.data.campaigns.slice(0, 5).map((campaign) => (
                    <div key={campaign.job_id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#A1A1AA]">{campaign.name || `Campaign ${campaign.job_id}`}</span>
                        <span className="text-white">{campaign.response_rate || "0"}%</span>
                      </div>
                      <div className="w-full bg-[#1A1A1A] rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{width: `${Math.min(100, parseFloat(campaign.response_rate) || 0)}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-[#A1A1AA]">No campaign data available</p>
              )}
            </div>

            {/* Monthly Trends */}
            <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Monthly Trends</h3>
              </div>
              {analyticsData.data.monthly_trends && analyticsData.data.monthly_trends.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.data.monthly_trends.slice(0, 5).map((month) => (
                    <div key={month.month} className="flex items-center justify-between py-2 border-b border-[#1A1A1A]">
                      <div>
                        <p className="text-sm font-medium text-white">{month.month}</p>
                        <p className="text-xs text-[#A1A1AA]">{month.invitations_sent || 0} invitations sent</p>
                      </div>
                      <div>
                        <p className="text-sm text-white">{month.connections_accepted || 0} connections</p>
                        <p className="text-xs text-[#A1A1AA] text-right">
                          {month.invitations_sent > 0 
                            ? ((month.connections_accepted / month.invitations_sent) * 100).toFixed(1) 
                            : 0}% rate
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-[#A1A1AA]">No monthly data available</p>
              )}
            </div>
          </div>

          {/* Campaign Performance Table */}
          <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Campaign Performance</h3>
            {analyticsData.data.campaigns && analyticsData.data.campaigns.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-[#A1A1AA] uppercase">
                    <tr>
                      <th scope="col" className="px-4 py-3">Campaign</th>
                      <th scope="col" className="px-4 py-3">Status</th>
                      <th scope="col" className="px-4 py-3">Invitations</th>
                      <th scope="col" className="px-4 py-3">Connections</th>
                      <th scope="col" className="px-4 py-3">Rate</th>
                      <th scope="col" className="px-4 py-3">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.data.campaigns.map((campaign) => (
                      <tr key={campaign.job_id} className="border-b border-[#1A1A1A]">
                        <td className="px-4 py-3 font-medium text-white">{campaign.name || `Campaign ${campaign.job_id}`}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            campaign.status === 'completed' ? 'bg-green-900 text-green-300' : 
                            campaign.status === 'processing' ? 'bg-blue-900 text-blue-300' : 
                            'bg-gray-800 text-gray-300'
                          }`}>
                            {campaign.status || "pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3">{campaign.total_invitations || 0}</td>
                        <td className="px-4 py-3">{campaign.accepted_connections || 0}</td>
                        <td className="px-4 py-3">{campaign.response_rate || 0}%</td>
                        <td className="px-4 py-3">
                          {campaign.created_at ? new Date(campaign.created_at).toLocaleDateString() : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#A1A1AA]">No campaign data available</p>
                <button 
                  className="mt-4 text-sm text-white hover:underline"
                  onClick={() => router.push('/dashboard/campaigns/new/leads')}
                >
                  Create your first campaign
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* No Data State */}
      {!analyticsData.isLoading && !analyticsData.error && !analyticsData.data && (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg p-6 text-center py-12">
          <p className="text-[#A1A1AA]">No analytics data available</p>
          <button 
            className="mt-4 text-sm text-white hover:underline"
            onClick={() => router.push('/dashboard/campaigns/new/leads')}
          >
            Create your first campaign
          </button>
        </div>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={
      <div className="w-full flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <AnalyticsContent />
    </Suspense>
  );
}
