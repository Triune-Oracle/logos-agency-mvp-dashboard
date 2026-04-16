import { loadStripe } from '@stripe/stripe-js';

// Use VITE_STRIPE_PUBLISHABLE_KEY — set this in your deployment env vars.
// (Previously VITE_FRONTEND_FORGE_API_KEY — standardized to conventional naming.)
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

let stripePromise: ReturnType<typeof loadStripe> | null = null;

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

export const createCheckoutSession = async (
  priceId: string,
  clientId: string
) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, clientId }),
  });

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error || 'Failed to create checkout session');
  }

  const { url } = await response.json();
  return url as string;
};

export const getCustomerPortalUrl = async (customerId: string) => {
  const response = await fetch('/api/customer-portal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId }),
  });

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error || 'Failed to get customer portal');
  }

  const { url } = await response.json();
  return url as string;
};
