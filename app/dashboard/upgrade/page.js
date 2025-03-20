"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import ButtonCheckout from "@/components/ButtonCheckout";
import config from "@/config";
import dynamic from "next/dynamic";

// Dynamically import the TrackdeskScript component to prevent SSR issues
const TrackdeskScript = dynamic(() => import("@/components/TrackdeskScript"), {
  ssr: false,
});

// Dynamically import the TrackdeskClientReferenceScript component
const TrackdeskClientReferenceScript = dynamic(
  () => import("@/components/TrackdeskClientReferenceScript"),
  { ssr: false }
);

export default function UpgradePage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState(null);
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

  return (
    <>
      <TrackdeskScript />
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Upgrade Your Plan
            </h1>
            <p className="text-[#A1A1AA]">
              Choose the plan that best fits your needs and take your LinkedIn outreach to the next level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pro Plan */}
            <div className={`bg-[#0F0F0F] rounded-lg border ${subscriptionTier === 'pro' ? 'border-blue-500' : 'border-[#1A1A1A]'} overflow-hidden`}>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-white">{proPlan.name}</h2>
                    <p className="text-[#A1A1AA] mt-1">{proPlan.description}</p>
                  </div>
                  {subscriptionTier === 'pro' && (
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">Current Plan</span>
                  )}
                </div>
                
                <div className="mt-6">
                  <span className="text-3xl font-bold text-white">${proPlan.price}</span>
                  <span className="text-[#A1A1AA] ml-1">{proPlan.priceDetails}</span>
                </div>
                
                <div className="mt-6">
                  <ButtonCheckout
                    priceId={proPlan.priceId}
                    productLink={proPlan.link}
                    className={`w-full btn ${
                      subscriptionTier === 'pro' 
                        ? 'btn-disabled bg-[#2A2A2A] text-[#A1A1AA]' 
                        : 'btn-primary bg-blue-600 hover:bg-blue-700 border-0'
                    }`}
                    disabled={subscriptionTier === 'pro'}
                  >
                    {subscriptionTier === 'pro' ? 'Current Plan' : 'Get Pro'}
                  </ButtonCheckout>
                </div>
                
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium text-white">Features:</h3>
                  <ul className="space-y-2">
                    {proPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-[#A1A1AA]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className={`bg-[#0F0F0F] rounded-lg border ${
              subscriptionTier === 'premium' 
                ? 'border-red-500' 
                : 'border-[#1A1A1A] relative overflow-hidden'
            }`}>
              {premiumPlan.isFeatured && (
                <div className="bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-medium text-center py-1">
                  RECOMMENDED
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-white">{premiumPlan.name}</h2>
                    <p className="text-[#A1A1AA] mt-1">{premiumPlan.description}</p>
                  </div>
                  {subscriptionTier === 'premium' && (
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">Current Plan</span>
                  )}
                </div>
                
                <div className="mt-6">
                  <span className="text-3xl font-bold text-white">${premiumPlan.price}</span>
                  <span className="text-[#A1A1AA] ml-1">{premiumPlan.priceDetails}</span>
                </div>
                
                <div className="mt-6">
                  <ButtonCheckout
                    priceId={premiumPlan.priceId}
                    productLink={premiumPlan.link}
                    className={`w-full btn ${
                      subscriptionTier === 'premium' 
                        ? 'btn-disabled bg-[#2A2A2A] text-[#A1A1AA]' 
                        : 'bg-gradient-to-r from-red-500 to-red-700 border-0 text-white hover:from-red-600 hover:to-red-800'
                    }`}
                    disabled={subscriptionTier === 'premium'}
                  >
                    {subscriptionTier === 'premium' ? 'Current Plan' : 'Get Premium'}
                  </ButtonCheckout>
                </div>
                
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium text-white">Features:</h3>
                  <ul className="space-y-2">
                    {premiumPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-[#A1A1AA]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] p-6 mt-6">
            <h3 className="text-lg font-medium text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-1">Can I upgrade or downgrade at any time?</h4>
                <p className="text-[#A1A1AA] text-sm">Yes, you can change your plan at any time. Your billing will be prorated based on the time remaining in your current billing cycle.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">How do connection requests work?</h4>
                <p className="text-[#A1A1AA] text-sm">Connection requests are sent through your LinkedIn account. Each plan has a monthly limit that resets at the beginning of your billing cycle.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Is there a free trial?</h4>
                <p className="text-[#A1A1AA] text-sm">The Premium plan includes a 7-day free trial. You won&apos;t be charged until the trial period ends, and you can cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrackdeskClientReferenceScript />
    </>
  );
} 