"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ButtonLinkedin from "@/components/ButtonLinkedin";
import { useLinkedIn } from "@/components/contexts/LinkedInContext";

export default function SettingsPage() {
  const { linkedInStatus, refreshLinkedInStatus } = useLinkedIn();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-[#A1A1AA]">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* LinkedIn Integration */}
        <div className="bg-[#0F0F0F] rounded-lg p-6 border border-[#1A1A1A]">
          <h2 className="text-lg font-medium text-white mb-4">LinkedIn Integration</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Connection Status</p>
                <p className="text-sm text-[#A1A1AA]">
                  {linkedInStatus.connected 
                    ? `Your LinkedIn account is connected${linkedInStatus.lastChecked ? ` (Last checked: ${new Date(linkedInStatus.lastChecked).toLocaleString()})` : ''}` 
                    : "Your LinkedIn account is not connected"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {linkedInStatus.checked && (
                  <button 
                    onClick={refreshLinkedInStatus}
                    className="btn btn-sm btn-ghost"
                    title="Refresh status"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                )}
                <ButtonLinkedin 
                  variant="outline" 
                  text={linkedInStatus.connected ? "Reconnect LinkedIn" : "Connect LinkedIn"} 
                />
              </div>
            </div>
            <div className="pt-4 border-t border-[#1A1A1A]">
              <p className="text-sm text-[#A1A1AA]">
                Connecting your LinkedIn account allows Prospectr to send connection requests and messages on your behalf.
              </p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-[#0F0F0F] rounded-lg p-6 border border-[#1A1A1A]">
          <h2 className="text-lg font-medium text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="pt-4 text-center text-[#A1A1AA]">
              <p>Account settings are managed through your authentication provider.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
