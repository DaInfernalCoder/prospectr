"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import ButtonCheckout from "@/components/ButtonCheckout";
import config from "@/config";
import TrackdeskScriptWrapper from "@/components/TrackdeskScriptWrapper";

export default function UpgradePage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState(null);
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
      <TrackdeskScriptWrapper />
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Upgrade Your Plan
            </h1>
            <p className="text-[#A1A1AA]">
              Get access to all Prospectr features and take your LinkedIn
              outreach to the next level
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {/* Pro Plan */}
            <div
              className={`bg-[#0F0F0F] rounded-lg border ${
                subscriptionTier === "pro"
                  ? "border-red-500"
                  : "border-[#1A1A1A]"
              } overflow-hidden`}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-medium text-center py-1">
                PROFESSIONAL PLAN
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {proPlan.name}
                    </h2>
                    <p className="text-[#A1A1AA] mt-2">{proPlan.description}</p>
                  </div>
                  {subscriptionTier === "pro" && (
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
                      Current Plan
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <span className="text-4xl font-bold text-white">
                    ${proPlan.price}
                  </span>
                  <span className="text-[#A1A1AA] ml-1">
                    {proPlan.priceDetails}
                  </span>
                </div>

                <div className="mt-8">
                  <ButtonCheckout
                    priceId={proPlan.priceId}
                    productLink={proPlan.link}
                    className={`w-full btn ${
                      subscriptionTier === "pro"
                        ? "btn-disabled bg-[#2A2A2A] text-[#A1A1AA]"
                        : "bg-gradient-to-r from-red-500 to-red-700 border-0 text-white hover:from-red-600 hover:to-red-800"
                    }`}
                    disabled={subscriptionTier === "pro"}
                    theme="red"
                  >
                    {subscriptionTier === "pro"
                      ? "Current Plan"
                      : "Upgrade Now"}
                  </ButtonCheckout>

                  {!subscriptionTier && (
                    <p className="text-center text-sm text-[#A1A1AA] mt-2">
                      $0.00 due today, cancel anytime
                    </p>
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  <h3 className="text-sm font-medium text-white">
                    Everything included:
                  </h3>
                  <ul className="space-y-3">
                    {proPlan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-red-500" />
                        </div>
                        <span className="text-[#A1A1AA]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] p-6 mt-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-medium text-white mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-1">
                  Can I cancel at any time?
                </h4>
                <p className="text-[#A1A1AA] text-sm">
                  Yes, you can cancel your subscription at any time from your
                  dashboard. Your access will remain until the end of your
                  current billing period.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">
                  How do connection requests work?
                </h4>
                <p className="text-[#A1A1AA] text-sm">
                  Connection requests are sent through your LinkedIn account.
                  Your plan includes 500 connection requests per month that
                  reset at the beginning of your billing cycle.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">
                  What happens if I need more connections?
                </h4>
                <p className="text-[#A1A1AA] text-sm">
                  If you need additional connections beyond your monthly limit,
                  please contact our support team to discuss options for your
                  specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
