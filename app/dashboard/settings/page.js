"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">Settings</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* LinkedIn Integration */}
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">LinkedIn Integration</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-700 dark:text-neutral-300">Connection Status</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Your LinkedIn account is not connected</p>
              </div>
              <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-md transition-colors">
                Connect LinkedIn
              </button>
            </div>
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Connecting your LinkedIn account allows Prospectr to send connection requests and messages on your behalf.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-700 dark:text-neutral-300">Email Notifications</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Receive updates about your campaigns</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neutral-300 dark:peer-focus:ring-neutral-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-neutral-900"></div>
              </label>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div>
                <p className="text-neutral-700 dark:text-neutral-300">Daily Reports</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Get daily performance summaries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neutral-300 dark:peer-focus:ring-neutral-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-neutral-900"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-700 dark:text-neutral-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-700 dark:text-neutral-300"
                placeholder="Your Company"
              />
            </div>
            <div className="pt-4 flex justify-end border-t border-neutral-200 dark:border-neutral-700">
              <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-md transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
