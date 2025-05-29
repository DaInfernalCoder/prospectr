"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useCampaignStore } from "@/app/store/campaignStore";
import { useMutation } from "@tanstack/react-query";
import UpdateFrequencyInfo from "../../../../components/UpdateFrequencyInfo";

export default function ReviewPage() {
  const router = useRouter();
  const {
    selectedLeads,
    connectionMessage,
    followUpMessage,
    templateName,
    isPublishing,
    publishError,
    publishSuccess,
    setPublishingStatus,
    setPublishError,
    setPublishSuccess,
    resetCampaign,
  } = useCampaignStore();

  // Check if we have leads (but messages are now optional)
  useEffect(() => {
    // TEMPORARILY REMOVED VALIDATION - Allow proceeding without leads
    // if (selectedLeads.length === 0) {
    //   router.push("/dashboard/campaigns/new/leads");
    // }
  }, [selectedLeads, router]);

  // Send connection requests mutation
  const sendConnectionsMutation = useMutation({
    mutationFn: async () => {
      setPublishingStatus(true);
      setPublishError(null);

      const response = await fetch("/api/linkedin/invitations/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: selectedLeads,
          message: connectionMessage,
          templateName: templateName || "LinkedIn Campaign",
          followUpMessage: followUpMessage || "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to send connection requests"
        );
      }

      return await response.json();
    },
    onSuccess: () => {
      setPublishSuccess(true);
      setPublishingStatus(false);
    },
    onError: (error) => {
      // Convert the error to a string to avoid the React child error
      setPublishError(error.message || String(error));
      setPublishingStatus(false);
    },
  });

  // Go to previous step
  const goToPreviousStep = () => {
    router.push("/dashboard/campaigns/new/sequence");
  };

  // Publish campaign
  const publishCampaign = () => {
    sendConnectionsMutation.mutate();
  };

  // Start a new campaign
  const startNewCampaign = () => {
    resetCampaign();
    router.push("/dashboard/campaigns/new/leads");
  };

  // Go to campaigns dashboard
  const goToCampaignsDashboard = () => {
    resetCampaign();
    router.push("/dashboard/campaigns");
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
            <span className="ml-2 text-[#A3A3A3] font-medium">
              Set Sequence
            </span>
          </div>
          <div className="w-8 h-0.5 bg-[#2A2A2A]"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#C9E5FF] text-black flex items-center justify-center font-bold">
              3
            </div>
            <span className="ml-2 text-white font-medium">
              Review And Publish
            </span>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {publishSuccess && (
        <div className="p-4 bg-green-900/20 border border-green-800 rounded-md text-green-400 mb-6 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Campaign published successfully!</p>
            <p className="text-sm mt-1">
              Your connection requests will be sent to {selectedLeads.length}{" "}
              leads.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {publishError && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-md text-red-400 mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Error publishing campaign</p>
            <p className="text-sm mt-1">
              {typeof publishError === "string"
                ? publishError
                : "An unexpected error occurred"}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!publishSuccess ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">
              Review your campaign
            </h2>

            {/* Campaign Summary */}
            <div className="bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg p-6 mb-6">
              <h3 className="text-white font-medium mb-4">Campaign Summary</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-[#A3A3A3]">Template Name</p>
                  <p className="text-white">
                    {templateName || "LinkedIn Campaign"}
                  </p>
                </div>

                <div>
                  <p className="text-[#A3A3A3]">Leads</p>
                  <p className="text-white">
                    {selectedLeads.length} leads selected
                  </p>
                </div>

                {connectionMessage ? (
                  <div>
                    <p className="text-[#A3A3A3]">Connection Message</p>
                    <div className="bg-[#1A1A1A] p-3 rounded-md text-white mt-1">
                      {connectionMessage}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[#A3A3A3]">Connection Message</p>
                    <div className="bg-[#1A1A1A] p-3 rounded-md text-[#A3A3A3] italic mt-1">
                      No connection message (LinkedIn default will be used)
                    </div>
                  </div>
                )}

                {followUpMessage ? (
                  <div>
                    <p className="text-[#A3A3A3]">Follow-up Message</p>
                    <div className="bg-[#1A1A1A] p-3 rounded-md text-white mt-1">
                      {followUpMessage}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[#A3A3A3]">Follow-up Message</p>
                    <div className="bg-[#1A1A1A] p-3 rounded-md text-[#A3A3A3] italic mt-1">
                      No follow-up message
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Leads */}
            <div className="bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg p-6">
              <h3 className="text-white font-medium mb-4">
                Selected Leads ({selectedLeads.length})
              </h3>

              <div className="max-h-60 overflow-y-auto space-y-3">
                {selectedLeads.map((lead) => (
                  <div
                    key={lead.identifier}
                    className="flex items-center p-2 bg-[#1A1A1A] rounded-md"
                  >
                    {lead.profile_picture && (
                      <img
                        src={lead.profile_picture}
                        alt={lead.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <p className="text-white font-medium">{lead.name}</p>
                      <p className="text-[#A3A3A3] text-sm">
                        {lead.headline || lead.company || ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              onClick={goToPreviousStep}
              variant="outline"
              className="border-[#2A2A2A] text-white hover:bg-[#2A2A2A]"
              disabled={isPublishing}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Sequence
            </Button>

            <Button
              onClick={publishCampaign}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isPublishing}
            >
              {isPublishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  Publish Campaign
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Campaign Published!
            </h2>
            <p className="text-[#A3A3A3] max-w-md mx-auto mb-6">
              Your connection requests will be sent to {selectedLeads.length}{" "}
              leads. You can track the progress in your campaigns dashboard.
            </p>
            <div className="max-w-md mx-auto">
              <UpdateFrequencyInfo />
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={startNewCampaign}
              variant="outline"
              className="border-[#2A2A2A] text-white hover:bg-[#2A2A2A]"
            >
              Start New Campaign
            </Button>

            <Button
              onClick={goToCampaignsDashboard}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go to Campaigns Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
