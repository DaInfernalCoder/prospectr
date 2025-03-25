export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
}) {
  const response = await fetch("/api/stripe/create-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priceId,
      successUrl,
      cancelUrl,
    }),
  });

  const data = await response.json();

  // If the user is not authenticated, we need to redirect to signup
  if (!response.ok) {
    if (data.redirectToSignup && data.status === 401) {
      // Save the plan info to localStorage
      localStorage.setItem("selectedPlanId", priceId);
      localStorage.setItem(
        "checkoutReturnUrl",
        window.location.pathname + window.location.search
      );

      // Return object with redirect info
      return {
        redirectToSignup: true,
        url: "/signup?checkout=pending",
      };
    }

    throw new Error(data.error || "Failed to create checkout session");
  }

  return data;
}
