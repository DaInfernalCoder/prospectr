"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ButtonLinkedin from "@/components/ButtonLinkedin";
import { useLinkedIn } from "@/components/contexts/LinkedInContext";
import ButtonCheckout from "@/components/ButtonCheckout";
import config from "@/config";
import { ArrowRight, Check, Zap } from "lucide-react";

export default function SettingsPage() {
  const { linkedInStatus, refreshLinkedInStatus } = useLinkedIn();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get the pro plan
  const proPlan = config.stripe.plans[0];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUser(data.user);
        setIsSubscribed(data.profile?.has_access === true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsSubscribed(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleManageBilling = async () => {
    try {
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create billing portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error opening billing portal:", error);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-[#A1A1AA]">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Subscription Management */}
        <div className="bg-[#0F0F0F] rounded-lg p-5 sm:p-6 border border-[#1A1A1A]">
          <h2 className="text-lg font-medium text-white mb-4">Subscription</h2>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="space-y-2">
                  <div>
                    <p className="text-white font-medium">Current Plan</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">
                      {isSubscribed
                        ? "You are currently on the Pro plan"
                        : "You don't have an active subscription"}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    {isSubscribed ? (
                      <button
                        onClick={handleManageBilling}
                        className="btn btn-sm h-9 min-h-0 px-4 btn-outline w-full sm:w-auto"
                      >
                        Manage Billing
                      </button>
                    ) : (
                      <ButtonCheckout // Only shown if isSubscribed is false
                        priceId={proPlan?.priceId}
                        className="btn btn-sm h-9 min-h-0 px-4 bg-gradient-to-r from-red-500 to-red-700 ..."
                      >
                        <span className="flex items-center justify-center gap-1">
                          <Zap className="w-3 h-3" />
                          Subscribe to Pro Plan
                        </span>
                      </ButtonCheckout>
                    )}
                  </div>
                </div>
              </div>

              {/* Plan Features - Only show if user is not subscribed */}
              {!isSubscribed && (
                <div className="pt-5 mt-2 border-t border-[#1A1A1A]">
                  <h3 className="text-sm font-medium text-white mb-4">
                    Pro Plan Features
                  </h3>
                  <div className="bg-zinc-900/50 p-5 rounded-lg border border-[#1A1A1A]">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-white">{proPlan.name}</h4>
                      <span className="text-red-500 font-bold">
                        ${proPlan.price}
                        {proPlan.priceDetails}
                      </span>
                    </div>
                    {proPlan.description && (
                      <p className="text-sm text-white/80 mb-4">
                        {proPlan.description}
                      </p>
                    )}
                    <ul className="space-y-2.5 text-sm">
                      {proPlan.features &&
                        proPlan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-[18px] h-[18px] text-red-500 shrink-0 mt-0.5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-300">
                              {typeof feature === "string"
                                ? feature
                                : feature.name}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* LinkedIn Integration */}
        <div className="bg-[#0F0F0F] rounded-lg p-5 sm:p-6 border border-[#1A1A1A]">
          <h2 className="text-lg font-medium text-white mb-4">
            LinkedIn Integration
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white">Connection Status</p>
                <p className="text-sm text-[#A1A1AA]">
                  {linkedInStatus.connected
                    ? `Your LinkedIn account is connected${
                        linkedInStatus.lastChecked
                          ? ` (Last checked: ${new Date(
                              linkedInStatus.lastChecked
                            ).toLocaleString()})`
                          : ""
                      }`
                    : "Your LinkedIn account is not connected"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {linkedInStatus.checked && (
                  <button
                    onClick={refreshLinkedInStatus}
                    className="btn btn-sm h-9 min-h-0 btn-ghost"
                    title="Refresh status"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                )}
                <ButtonLinkedin
                  variant="outline"
                  text={
                    linkedInStatus.connected
                      ? "Reconnect LinkedIn"
                      : "Connect LinkedIn"
                  }
                  className="h-9 min-h-0 px-4"
                />
              </div>
            </div>

            {/* Link New Account Section */}
            {linkedInStatus.connected && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#1A1A1A]">
                <div>
                  <p className="text-white">Link Additional Account</p>
                  <p className="text-sm text-[#A1A1AA]">
                    Connect a new LinkedIn account to expand your outreach
                    capabilities
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      (window.location.href =
                        "/api/auths/linkedin/connect?link_new=true&redirect_to=settings")
                    }
                    className="btn btn-sm h-9 min-h-0 px-4 btn-outline bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#C9E5FF] border-[#2A2A2A]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z" />
                    </svg>
                    Link New Account
                  </button>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#1A1A1A]">
              <p className="text-sm text-[#A1A1AA]">
                Connecting your LinkedIn account allows Prospectr to send
                connection requests and messages on your behalf.
              </p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-[#0F0F0F] rounded-lg p-5 sm:p-6 border border-[#1A1A1A]">
          <h2 className="text-lg font-medium text-white mb-4">
            Account Settings
          </h2>
          <div className="space-y-4">
            <div className="pt-2 text-center text-[#A1A1AA]">
              <p>
                Account settings are managed through your authentication
                provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
