"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, CheckCircle } from "lucide-react";

export default function ReviewAndPublishPage() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);

  // Mock data - in a real implementation, this would come from state management
  const campaignData = {
    leads: {
      count: 250,
      searchQuery: "project manager OR manager OR senior project manager",
      filters: [
        "Connections: 2nd degree",
        "Industries: Software Development",
        "Location: United States"
      ],
      exclusions: [
        "Exclude profiles without photos",
        "Exclude 1st degree connections"
      ]
    },
    messages: {
      connectionRequest: "Looks like we have similar connections, let's connect :)",
      autoFollowUp: true,
      followUpMessage: "Thanks for connecting with me."
    }
  };

  // Navigate to previous step
  const goToPreviousStep = () => {
    router.push('/dashboard/campaigns/new/sequence');
  };

  // Handle campaign publish
  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Redirect to campaigns page after successful publish
      router.push('/dashboard/campaigns');
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6 bg-black">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A3A3A3] flex items-center justify-center font-bold">
              1
            </div>
            <span className="ml-2 text-[#A3A3A3] font-medium">Add Leads</span>
          </div>
          <div className="w-8 h-0.5 bg-[#2A2A2A]"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A3A3A3] flex items-center justify-center font-bold">
              2
            </div>
            <span className="ml-2 text-[#A3A3A3] font-medium">Set Sequence</span>
          </div>
          <div className="w-8 h-0.5 bg-[#2A2A2A]"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#C9E5FF] text-black flex items-center justify-center font-bold">
              3
            </div>
            <span className="ml-2 text-white font-medium">Review And Publish</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
            className="border-[#2A2A2A] text-white hover:bg-[#2A2A2A]"
            disabled={isPublishing}
          >
            Back
          </Button>
          <Button 
            onClick={handlePublish} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isPublishing}
          >
            {isPublishing ? "Publishing..." : "Publish Campaign"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Campaign Review</h2>
        
        {/* Leads Summary */}
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg p-5">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center mr-4">
              <Users className="w-5 h-5 text-[#C9E5FF]" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">Leads</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => router.push('/dashboard/campaigns/new/leads')}
                  className="text-[#A3A3A3] hover:text-white"
                >
                  Edit
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[#A3A3A3] text-sm">Search Query:</p>
                  <p className="text-white">{campaignData.leads.searchQuery}</p>
                </div>
                <div>
                  <p className="text-[#A3A3A3] text-sm">Filters:</p>
                  <ul className="list-disc list-inside text-white">
                    {campaignData.leads.filters.map((filter, index) => (
                      <li key={index}>{filter}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[#A3A3A3] text-sm">Exclusions:</p>
                  <ul className="list-disc list-inside text-white">
                    {campaignData.leads.exclusions.map((exclusion, index) => (
                      <li key={index}>{exclusion}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-[#2A2A2A]">
                  <p className="text-white font-medium">Total Leads: {campaignData.leads.count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Messages Summary */}
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg p-5">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center mr-4">
              <MessageSquare className="w-5 h-5 text-[#C9E5FF]" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">Messages</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => router.push('/dashboard/campaigns/new/sequence')}
                  className="text-[#A3A3A3] hover:text-white"
                >
                  Edit
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[#A3A3A3] text-sm mb-1">Connection Request:</p>
                  <div className="bg-black border border-[#2A2A2A] rounded-md p-3 text-white">
                    {campaignData.messages.connectionRequest}
                  </div>
                </div>
                
                {campaignData.messages.autoFollowUp && (
                  <div>
                    <p className="text-[#A3A3A3] text-sm mb-1">Follow-up Message:</p>
                    <div className="bg-black border border-[#2A2A2A] rounded-md p-3 text-white">
                      {campaignData.messages.followUpMessage}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Campaign Settings */}
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg p-5">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="w-5 h-5 text-[#C9E5FF]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-2">Campaign Settings</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-[#A3A3A3]">Rate Limiting</p>
                  <p className="text-white">Automatic (Based on account tier)</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#A3A3A3]">Connection Spacing</p>
                  <p className="text-white">1 minute between requests</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#A3A3A3]">Working Hours</p>
                  <p className="text-white">9:00 AM - 5:00 PM (Local time)</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#A3A3A3]">Auto Follow-up</p>
                  <p className="text-white">{campaignData.messages.autoFollowUp ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg p-4 text-[#A3A3A3] text-sm">
          <p>
            By publishing this campaign, you agree to LinkedIn's terms of service. 
            We automatically enforce rate limits based on your LinkedIn account tier to ensure account safety.
          </p>
        </div>
      </div>
    </div>
  );
}
