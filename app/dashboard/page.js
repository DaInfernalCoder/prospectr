"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ButtonAccount from "@/components/ButtonAccount";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import config from "@/config";
import ButtonCheckout from "@/components/ButtonCheckout";
import { Zap } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStats, setConnectionStats] = useState({
    total: 0,
    used: 0,
    remaining: 0,
  });

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
        
        // Calculate connection stats based on subscription tier
        const limit = data.user?.subscriptionTier === 'premium' 
          ? premiumPlan.connectionLimit 
          : data.user?.subscriptionTier === 'pro'
            ? proPlan.connectionLimit
            : 0;
            
        // For demo purposes, let's assume some connections have been used
        const used = Math.floor(Math.random() * 30); // Random number for demo
        
        setConnectionStats({
          total: limit,
          used: used,
          remaining: limit - used,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6" suppressHydrationWarning>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Welcome back!
          </h1>
          <p className="text-sm text-[#A1A1AA]">
            Here&apos;s what&apos;s happening with your campaigns
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <ButtonAccount />
        </div>
      </div>

      {/* Subscription Alert */}
      {!isLoading && !isSubscribed && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-white font-medium">Upgrade to start connecting</h3>
              <p className="text-sm text-white/70 mt-1">
                Choose a plan to start sending connection requests on LinkedIn
              </p>
            </div>
            <div className="flex gap-2">
              <ButtonCheckout
                priceId={proPlan?.priceId}
                productLink={proPlan?.link}
                className="btn btn-sm btn-outline"
              >
                Get Pro
              </ButtonCheckout>
              <ButtonCheckout
                priceId={premiumPlan?.priceId}
                productLink={premiumPlan?.link}
                className="btn btn-sm bg-gradient-to-r from-red-500 to-red-700 border-0 text-white hover:from-red-600 hover:to-red-800"
              >
                <span className="flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" />
                  Get Premium
                </span>
              </ButtonCheckout>
            </div>
          </div>
        </div>
      )}

      {/* Connection Limit */}
      {!isLoading && isSubscribed && (
        <div className="bg-[#0F0F0F] rounded-lg p-4 border border-[#1A1A1A]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-white font-medium">
                {subscriptionTier === 'premium' ? 'Premium' : 'Pro'} Plan
              </h3>
              <p className="text-sm text-white/70 mt-1">
                {connectionStats.used} of {connectionStats.total} connection requests used this month
              </p>
            </div>
            {subscriptionTier === 'pro' && (
              <ButtonCheckout
                priceId={premiumPlan?.priceId}
                productLink={premiumPlan?.link}
                className="btn btn-sm bg-gradient-to-r from-red-500 to-red-700 border-0 text-white hover:from-red-600 hover:to-red-800"
              >
                <span className="flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" />
                  Upgrade to Premium
                </span>
              </ButtonCheckout>
            )}
          </div>
          <div className="mt-3">
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  subscriptionTier === 'premium' ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${(connectionStats.used / connectionStats.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#0F0F0F] p-4 sm:p-6 rounded-lg border border-[#1A1A1A]">
          <h3 className="text-base sm:text-lg font-medium text-white">
            Total Connections
          </h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2 text-white">0</p>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            From all campaigns
          </p>
        </div>
        <div className="bg-[#0F0F0F] p-4 sm:p-6 rounded-lg border border-[#1A1A1A]">
          <h3 className="text-base sm:text-lg font-medium text-white">
            Active Campaigns
          </h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2 text-white">0</p>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Currently running
          </p>
        </div>
        <div className="bg-[#0F0F0F] p-4 sm:p-6 rounded-lg border border-[#1A1A1A] sm:col-span-2 md:col-span-1">
          <h3 className="text-base sm:text-lg font-medium text-white">
            Response Rate
          </h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2 text-white">0%</p>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Average across campaigns
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/campaigns/new/leads")}
          className="text-sm sm:text-base py-2 px-3 sm:px-4"
          disabled={!isSubscribed}
        >
          New Campaign
        </Button>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
          Recent Activity
        </h2>
        <div className="bg-[#0F0F0F] rounded-lg p-4 sm:p-6 border border-[#1A1A1A]">
          <div className="text-center py-6 sm:py-8">
            <p className="text-[#A1A1AA] text-sm sm:text-base">
              No recent activity
            </p>
            <Button
              variant="link"
              className="mt-3 sm:mt-4 text-white hover:text-[#A1A1AA] text-sm sm:text-base"
              onClick={() => router.push("/dashboard/campaigns/new/leads")}
              disabled={!isSubscribed}
            >
              Start your first campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
