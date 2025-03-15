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
  const [subscriptionTier, setSubscriptionTier] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get the premium plan (featured plan)
  const premiumPlan = config.stripe.plans.find((plan) => plan.isFeatured) || config.stripe.plans[1];
  // Get the pro plan (non-featured plan)
  const proPlan = config.stripe.plans.find((plan) => !plan.isFeatured) || config.stripe.plans[0];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUser(data.user);
        setIsSubscribed(data.user?.isSubscribed || false);
        setSubscriptionTier(data.user?.subscriptionTier || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-[#A1A1AA]">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Subscription Management */}
        <div className="bg-[#0F0F0F] rounded-lg p-6 border border-[#1A1A1A]">
          <h2 className="text-lg font-medium text-white mb-4">Subscription</h2>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="loading loading-spinner loading-md"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-white">Current Plan</p>
                  <p className="text-sm text-[#A1A1AA]">
                    {isSubscribed 
                      ? `You are currently on the ${subscriptionTier === 'premium' ? 'Premium' : 'Pro'} plan` 
                      : "You don't have an active subscription"}
                  </p>
                  {isSubscribed && (
                    <div className="mt-2">
                      <p className="text-sm text-white">
                        <span className="text-red-500 font-medium">
                          {subscriptionTier === 'premium' 
                            ? premiumPlan.connectionLimit 
                            : proPlan.connectionLimit}
                        </span> connection requests per month
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {isSubscribed && (
                    <button
                      onClick={handleManageBilling}
                      className="btn btn-sm btn-outline"
                    >
                      Manage Billing
                    </button>
                  )}
                  
                  {(!isSubscribed || subscriptionTier === 'pro') && (
                    <ButtonCheckout
                      priceId={premiumPlan?.priceId}
                      productLink={premiumPlan?.link}
                      className="btn btn-sm bg-gradient-to-r from-red-500 to-red-700 border-0 text-white hover:from-red-600 hover:to-red-800"
                    >
                      <span className="flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3" />
                        {isSubscribed ? 'Upgrade to Premium' : 'Subscribe Now'}
                      </span>
                    </ButtonCheckout>
                  )}
                  
                  {!isSubscribed && (
                    <ButtonCheckout
                      priceId={proPlan?.priceId}
                      productLink={proPlan?.link}
                      className="btn btn-sm btn-outline"
                    >
                      Get Pro Plan
                    </ButtonCheckout>
                  )}
                </div>
              </div>
              
              {/* Plan Comparison */}
              <div className="pt-4 mt-4 border-t border-[#1A1A1A]">
                <h3 className="text-sm font-medium text-white mb-3">Plan Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-zinc-900/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-white">{proPlan.name}</h4>
                      <span className="text-red-500 font-bold">${proPlan.price}{proPlan.priceDetails}</span>
                    </div>
                    <ul className="space-y-2">
                      {proPlan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-white">{premiumPlan.name}</h4>
                      <span className="text-red-500 font-bold">${premiumPlan.price}{premiumPlan.priceDetails}</span>
                    </div>
                    <ul className="space-y-2">
                      {premiumPlan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

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
