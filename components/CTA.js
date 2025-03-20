"use client";

import Image from "next/image";
import config from "@/config";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import ButtonCheckout from "./ButtonCheckout";
import TrackdeskScriptWrapper from "./TrackdeskScriptWrapper";

const CTA = () => {
  const router = useRouter();

  const benefits = [
    "AI-powered lead generation",
    "Automated connection requests",
    "Personalized messaging at scale",
    "Sales pipeline acceleration",
  ];

  // Get the plans from config
  const plans = config.stripe.plans;
  // Get the premium plan (featured plan)
  const premiumPlan = plans.find((plan) => plan.isFeatured) || plans[1];
  // Get the pro plan (non-featured plan)
  const proPlan = plans.find((plan) => !plan.isFeatured) || plans[0];

  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-black bg-opacity-90"></div>
      <div className="relative hero-content text-white p-8 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-red-500/20 text-red-500 font-medium self-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Limited Time Offer
            </div>

            <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                transform
              </span>{" "}
              your LinkedIn outreach?
            </h2>

            <p className="text-lg text-gray-300 max-w-xl">
              Join the founders who are consistently generating high-quality
              leads and growing their SaaS businesses with Prospectr&apos;s
              AI-powered automation.
            </p>

            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-200">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-900/80 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm shadow-xl">
            <div className="text-center mb-8">
              <h3 className="font-bold text-2xl mb-2">Choose Your Plan</h3>
              <p className="text-gray-400">
                Select the plan that fits your growth needs
              </p>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col rounded-lg bg-zinc-800/50 p-4 border border-zinc-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium">{proPlan?.name}</p>
                    <span className="text-lg font-bold text-red-500">
                      ${proPlan?.price}
                      {proPlan?.priceDetails}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {proPlan?.description}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {proPlan?.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-3 h-3 text-red-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <ButtonCheckout
                    priceId={proPlan?.priceId}
                    productLink={proPlan?.link}
                    className="mt-auto btn btn-sm bg-zinc-700 hover:bg-zinc-600 text-white border-0"
                  >
                    Get Started with Pro
                  </ButtonCheckout>
                </div>

                <div className="flex flex-col rounded-lg bg-red-500/10 p-4 border border-red-500/30 relative">
                  {premiumPlan?.isFeatured && (
                    <div className="absolute -top-3 right-3 bg-red-500 text-xs font-bold px-2 py-1 rounded text-white">
                      BEST VALUE
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium">{premiumPlan?.name}</p>
                    <span className="text-lg font-bold text-red-500">
                      ${premiumPlan?.price}
                      {premiumPlan?.priceDetails}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {premiumPlan?.description}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {premiumPlan?.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-3 h-3 text-red-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <ButtonCheckout
                    priceId={premiumPlan?.priceId}
                    productLink={premiumPlan?.link}
                    className="mt-auto bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white border-0 btn btn-sm"
                  >
                    Start 7-Day Free Trial
                  </ButtonCheckout>
                </div>
              </div>

              <p className="text-center text-sm text-gray-400">
                By signing up, you agree to our{" "}
                <a href="/tos" className="underline hover:text-white">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  className="underline hover:text-white"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* TrackdeskScriptWrapper will handle the client reference ID functionality */}
      <TrackdeskScriptWrapper />
    </section>
  );
};

export default CTA;
