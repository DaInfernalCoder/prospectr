"use client";

import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-[#C9E5FF]">Settings</h1>
        <p className="text-sm text-[#A3A3A3]">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* LinkedIn Integration */}
        <div className="bg-[#0C0C0C] rounded-lg p-6 border border-[#2A2A2A]">
          <h2 className="text-lg font-medium text-[#C9E5FF] mb-4">LinkedIn Integration</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#C9E5FF]">Connection Status</p>
                <p className="text-sm text-[#A3A3A3]">Your LinkedIn account is not connected</p>
              </div>
              <Button variant="outline">
                Connect LinkedIn
              </Button>
            </div>
            <div className="pt-4 border-t border-[#2A2A2A]">
              <p className="text-sm text-[#A3A3A3]">
                Connecting your LinkedIn account allows Prospectr to send connection requests and messages on your behalf.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-[#0C0C0C] rounded-lg p-6 border border-[#2A2A2A]">
          <h2 className="text-lg font-medium text-[#C9E5FF] mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#C9E5FF]">Email Notifications</p>
                <p className="text-sm text-[#A3A3A3]">Receive updates about your campaigns</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2A2A2A] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#C9E5FF] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#C9E5FF] after:border after:border-[#2A2A2A] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0C0C0C]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
              <div>
                <p className="text-[#C9E5FF]">Daily Reports</p>
                <p className="text-sm text-[#A3A3A3]">Get daily performance summaries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2A2A2A] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#C9E5FF] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#C9E5FF] after:border after:border-[#2A2A2A] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0C0C0C]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-[#0C0C0C] rounded-lg p-6 border border-[#2A2A2A]">
          <h2 className="text-lg font-medium text-[#C9E5FF] mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#C9E5FF] mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-[#C9E5FF]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#C9E5FF] mb-1">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-[#C9E5FF]"
                placeholder="Your Company"
              />
            </div>
            <div className="pt-4 flex justify-end border-t border-[#2A2A2A]">
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
