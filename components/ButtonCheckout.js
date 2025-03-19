"use client";

import { useEffect, useState } from "react";
import { createCheckoutSession } from "@/utils/stripe-client";
import config from "@/config";
import Link from "next/link";

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card. You can change that in the API route
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckout = ({ 
  priceId, 
  productLink, 
  mode = "payment", 
  children, 
  className, 
  disabled,
  theme = "blue", // blue, red, or default
  showIcon = false // Changed default to false to remove the lightning bolt
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) return;
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, []);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      // If there's a direct product link, use it
      if (productLink) {
        window.location.href = productLink;
        return;
      }
      
      // Otherwise create a checkout session
      const { url } = await createCheckoutSession({
        priceId,
        successUrl: `${window.location.origin}/dashboard?checkout=success`,
        cancelUrl: `${window.location.origin}${window.location.pathname}?checkout=cancel`,
      });
      
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define color classes based on theme
  const getIconColorClass = () => {
    switch (theme) {
      case 'blue':
        return 'fill-blue-500 group-hover:fill-blue-400';
      case 'red':
        return 'fill-red-500 group-hover:fill-red-400';
      default:
        return 'fill-primary-content';
    }
  };

  return (
    <button
      className={`${className || "btn btn-primary btn-block"} group transition-all duration-200 flex items-center justify-center relative overflow-hidden`}
      onClick={handlePayment}
      disabled={isLoading || disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <div className="flex items-center justify-center gap-2">
          {showIcon && (
            <svg
              className={`w-5 h-5 ${getIconColorClass()} transform ${isHovered ? 'scale-110 -rotate-3' : 'scale-100'} transition-all duration-300`}
              viewBox="0 0 375 509"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M249.685 14.125C249.685 11.5046 248.913 8.94218 247.465 6.75675C246.017 4.57133 243.957 2.85951 241.542 1.83453C239.126 0.809546 236.463 0.516683 233.882 0.992419C231.301 1.46815 228.917 2.69147 227.028 4.50999L179.466 50.1812C108.664 118.158 48.8369 196.677 2.11373 282.944C0.964078 284.975 0.367442 287.272 0.38324 289.605C0.399039 291.938 1.02672 294.226 2.20377 296.241C3.38082 298.257 5.06616 299.929 7.09195 301.092C9.11775 302.255 11.4133 302.867 13.75 302.869H129.042V494.875C129.039 497.466 129.791 500.001 131.205 502.173C132.62 504.345 134.637 506.059 137.01 507.106C139.383 508.153 142.01 508.489 144.571 508.072C147.131 507.655 149.516 506.503 151.432 504.757L172.698 485.394C247.19 417.643 310.406 338.487 359.975 250.894L373.136 227.658C374.292 225.626 374.894 223.327 374.882 220.99C374.87 218.653 374.243 216.361 373.065 214.341C371.887 212.322 370.199 210.646 368.17 209.482C366.141 208.318 363.841 207.706 361.5 207.707H249.685V14.125Z" />
            </svg>
          )}
          <span className={`font-medium ${isHovered ? 'tracking-wide' : 'tracking-normal'} transition-all duration-300`}>
            {children || "Start 7 Day Free Trial"}
          </span>
        </div>
      )}
      
      {/* Background animation on hover */}
      {!disabled && !isLoading && (
        <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'red' ? 'bg-red-500' : 'bg-blue-500'} transform scale-x-0 ${isHovered ? 'scale-x-100' : ''} transition-transform origin-center duration-300`}></span>
      )}
    </button>
  );
};

export default ButtonCheckout;
