"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronLeft, AlertCircle } from "lucide-react";
import { useCampaignStore } from "@/app/store/campaignStore";

export default function SequencePage() {
  const router = useRouter();
  const {
    selectedLeads,
    connectionMessage,
    setConnectionMessage,
    followUpMessage,
    setFollowUpMessage,
    templateName,
    setTemplateName,
  } = useCampaignStore();

  const [errors, setErrors] = useState({});

  // Check if we have leads
  useEffect(() => {
    // TEMPORARILY REMOVED VALIDATION - Allow proceeding without leads
    // if (selectedLeads.length === 0) {
    //   router.push("/dashboard/campaigns/new/leads");
    // }
  }, [selectedLeads, router]);

  // Validate form
  const validateForm = () => {
    // TEMPORARILY REMOVED VALIDATION - Always return true
    return true;

    // const newErrors = {};

    // // Connection message is now optional, but still has a character limit
    // if (connectionMessage && connectionMessage.length > 300) {
    //   newErrors.connectionMessage =
    //     "Connection message must be less than 300 characters";
    // }

    // // Follow-up message is still optional with a character limit
    // if (followUpMessage && followUpMessage.length > 1000) {
    //   newErrors.followUpMessage =
    //     "Follow-up message must be less than 1000 characters";
    // }

    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
  };

  // Go to previous step
  const goToPreviousStep = () => {
    router.push("/dashboard/campaigns/new/leads");
  };

  // Go to next step
  const goToNextStep = () => {
    if (validateForm()) {
      router.push("/dashboard/campaigns/new/review");
    }
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
            <div className="w-8 h-8 rounded-full bg-[#C9E5FF] text-black flex items-center justify-center font-bold">
              2
            </div>
            <span className="ml-2 text-white font-medium">Set Sequence</span>
          </div>
          <div className="w-8 h-0.5 bg-[#2A2A2A]"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A3A3A3] flex items-center justify-center font-bold">
              3
            </div>
            <span className="ml-2 text-[#A3A3A3] font-medium">
              Review And Publish
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-6">
            Set up your connection sequence
          </h2>

          {/* Template Name */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">
              Template Name (for your reference)
            </label>
            <Input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="My LinkedIn Campaign"
              className="bg-black border-[#2A2A2A] text-white"
            />
          </div>

          {/* Connection Message */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">
              Connection Message (Optional)
            </label>
            <div className="mb-1 flex justify-between">
              <span className="text-[#A3A3A3] text-sm">
                This message will be sent with your connection request
              </span>
              <span
                className={`text-sm ${
                  connectionMessage.length > 300
                    ? "text-red-500"
                    : "text-[#A3A3A3]"
                }`}
              >
                {connectionMessage.length}/300
              </span>
            </div>
            <textarea
              value={connectionMessage}
              onChange={(e) => setConnectionMessage(e.target.value)}
              placeholder="Hi {{name}}, I noticed we're both in the same industry. I'd love to connect!"
              className="bg-black border-[#2A2A2A] text-white h-32 w-full p-2 rounded-md"
            />
            {errors.connectionMessage && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.connectionMessage}
              </p>
            )}
            <div className="mt-2 text-[#A3A3A3] text-sm">
              <p>Available variables:</p>
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>{`{{name}}`} - Recipient&apos;s name</li>
                <li>{`{{company}}`} - Recipient&apos;s company</li>
                <li>{`{{position}}`} - Recipient&apos;s job title</li>
              </ul>
            </div>
          </div>

          {/* Follow-up Message */}
          <div>
            <label className="block text-white font-medium mb-2">
              Follow-up Message (Optional)
            </label>
            <div className="mb-1 flex justify-between">
              <span className="text-[#A3A3A3] text-sm">
                This message will be sent after the connection is accepted
              </span>
              <span
                className={`text-sm ${
                  followUpMessage.length > 1000
                    ? "text-red-500"
                    : "text-[#A3A3A3]"
                }`}
              >
                {followUpMessage.length}/1000
              </span>
            </div>
            <textarea
              value={followUpMessage}
              onChange={(e) => setFollowUpMessage(e.target.value)}
              placeholder="Thanks for connecting {{name}}! I'd love to learn more about your work at {{company}}."
              className="bg-black border-[#2A2A2A] text-white h-32 w-full p-2 rounded-md"
            />
            {errors.followUpMessage && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.followUpMessage}
              </p>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={goToPreviousStep}
            className="border border-[#2A2A2A] text-white hover:bg-[#2A2A2A] px-4 py-2 rounded-md flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </button>

          <button
            onClick={goToNextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            Review Campaign
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
