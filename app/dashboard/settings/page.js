"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ButtonLinkedin from "@/components/ButtonLinkedin";

export default function SettingsPage() {
  const [linkedinStatus, setLinkedinStatus] = useState({
    connected: false,
    lastConnected: null
  });

  // Fetch LinkedIn connection status
  useEffect(() => {
    const checkLinkedinStatus = async () => {
      try {
        const response = await fetch("/api/auths/linkedin/status");
        if (response.ok) {
          const data = await response.json();
          setLinkedinStatus({
            connected: data.connected,
            lastConnected: data.last_connected
          });
        }
      } catch (error) {
        console.error("Failed to fetch LinkedIn status:", error);
      }
    };

    checkLinkedinStatus();
  }, []);

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
                  {linkedinStatus.connected 
                    ? `Your LinkedIn account is connected${linkedinStatus.lastConnected ? ` (Last updated: ${new Date(linkedinStatus.lastConnected).toLocaleDateString()})` : ''}` 
                    : "Your LinkedIn account is not connected"}
                </p>
              </div>
              <ButtonLinkedin 
                variant="outline" 
                text={linkedinStatus.connected ? "Reconnect LinkedIn" : "Connect LinkedIn"} 
              />
            </div>
            <div className="pt-4 border-t border-[#1A1A1A]">
              <p className="text-sm text-[#A1A1AA]">
                Connecting your LinkedIn account allows Prospectr to send connection requests and messages on your behalf.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-[#0F0F0F] rounded-lg p-6 border border-[#1A1A1A]">
          <h2 className="text-lg font-medium text-white mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-sm text-[#A1A1AA]">Receive updates about your campaigns</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[#1A1A1A] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-white rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-[#1A1A1A] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F0F0F]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]">
              <div>
                <p className="text-white">Daily Reports</p>
                <p className="text-sm text-[#A1A1AA]">Get daily performance summaries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[#1A1A1A] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-white rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-[#1A1A1A] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F0F0F]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-[#0F0F0F] rounded-lg p-6 border border-[#1A1A1A]">
          <h2 className="text-lg font-medium text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#1A1A1A] rounded-md text-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#1A1A1A] rounded-md text-white"
                placeholder="Your Company"
              />
            </div>
            <div className="pt-4 flex justify-end border-t border-[#1A1A1A]">
              <Button variant="outline">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
