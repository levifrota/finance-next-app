"use client";

import { Button } from "@/app/_components/ui/button";
import { createStrypeCheckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlanButton = () => {
  const handleAcquirePlan = async () => {
    const { sessionId } = await createStrypeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Missing Stripe public key");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Failed to load Stripe");
    }

    if (!sessionId) {
      throw new Error("Missing session ID");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button
      onClick={handleAcquirePlan}
      className="w-full rounded-full font-bold"
    >
      Adquirir Plano
    </Button>
  );
};

export default AcquirePlanButton;
