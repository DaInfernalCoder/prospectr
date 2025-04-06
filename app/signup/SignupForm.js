"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import config from "@/config";
import { signInWithGoogle } from "@/utils/action";
import { createCheckoutSession } from "@/utils/stripe-client";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPendingCheckout = searchParams.get("checkout") === "pending";

  // Load checkout data from localStorage if redirected from pricing
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    // If we're in checkout flow, check localStorage for plan ID
    if (isPendingCheckout) {
      const storedPlanId = localStorage.getItem("selectedPlanId");
      if (storedPlanId) {
        setSelectedPlanId(storedPlanId);
      }
    }
  }, [isPendingCheckout]);

  // Function to handle checkout after signup if needed
  const handleCheckoutAfterSignup = async () => {
    try {
      // Check if there was a pending checkout
      const selectedPlanId = localStorage.getItem("selectedPlanId");
      const returnUrl = localStorage.getItem("checkoutReturnUrl");

      if (selectedPlanId) {
        // Clear localStorage items
        localStorage.removeItem("selectedPlanId");
        localStorage.removeItem("checkoutReturnUrl");

        // Create a checkout session with the saved plan
        const { url } = await createCheckoutSession({
          priceId: selectedPlanId,
          successUrl: `${window.location.origin}/dashboard?checkout=success`,
          cancelUrl: `${window.location.origin}${
            returnUrl || "/"
          }?checkout=cancel`,
        });

        // Redirect to checkout
        window.location.href = url;
      } else {
        // Normal redirect to dashboard if no pending checkout
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error handling checkout after signup:", error);
      toast.error("Could not process checkout. Please try again.");
      router.push("/dashboard");
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            // User metadata can be added here
          },
          emailConfirmationRequired: true, // Explicitly require email confirmation
          persistSession: true,
        },
      });

      if (error) {
        toast.error(error.message);
        console.log(error);
      } else if (data?.user?.identities?.length === 0) {
        // User already exists but hasn't confirmed their email
        toast.error(
          "An account with this email already exists. Please check your email for the confirmation link or try signing in."
        );
      } else {
        toast.success(
          "Please check your email for a confirmation link to complete your registration."
        );
        // Don't redirect yet - user needs to confirm email first
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  // Custom Google sign-in that handles checkout after auth
  const handleGoogleSignIn = async () => {
    // Create a FormData object to pass data to the server action
    const formData = new FormData();

    if (isPendingCheckout) {
      formData.append("redirectToCheckout", "true");

      // Get the selected plan ID from localStorage
      const planId = localStorage.getItem("selectedPlanId");
      if (planId) {
        formData.append("selectedPlanId", planId);

        // Clear localStorage after submitting to server action
        localStorage.removeItem("selectedPlanId");
        localStorage.removeItem("checkoutReturnUrl");
      }
    }

    // Call the server action with the form data
    await signInWithGoogle(formData);
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 md:p-24"
      data-theme={config.colors.theme}
    >
      <div className="max-w-md mx-auto">
        {/* Navigation Links */}
        <div className="flex justify-center gap-4 mb-8">
          <Link
            href="/signin"
            className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium"
          >
            Sign Up
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-12 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
          Create Account
        </h1>

        {isPendingCheckout && (
          <div className="alert alert-info mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Create an account to continue with your subscription</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Google Sign Up */}
          <button
            className="flex items-center justify-center w-full px-4 py-3 text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            Sign up with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-b from-gray-900 to-black text-gray-400">
                OR
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            By signing up, you agree to our{" "}
            <Link href="/tos" className="text-white hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-white hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
