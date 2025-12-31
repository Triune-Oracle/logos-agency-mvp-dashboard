/**
 * Stripe Client Configuration
 * Workstream 2: Stripe Integration
 * Glyph: 🔥WS2-SPEC|Stripe-Integration|Payment-Flows|DeepSeek⚡
 */

import { loadStripe } from '@stripe/stripe-js';

let stripePromise: ReturnType<typeof loadStripe> | null = null;

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY || '');
  }
  return stripePromise;
};

/**
 * Pricing tier configuration
 */
export const PRICING_TIERS = {
  starter: {
    name: 'Starter',
    price: 99,
    priceId: process.env.VITE_STRIPE_STARTER_PRICE_ID || '',
    features: [
      'Up to 3 active projects',
      'Basic AI collaboration',
      'Email support',
      'Mobile app access',
    ],
  },
  professional: {
    name: 'Professional',
    price: 299,
    priceId: process.env.VITE_STRIPE_PROFESSIONAL_PRICE_ID || '',
    features: [
      'Unlimited projects',
      'Advanced AI collaboration',
      'Priority support',
      'Custom workflows',
      'Team collaboration',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: null,
    priceId: '',
    features: [
      'Everything in Professional',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'On-premise deployment',
    ],
  },
};

/**
 * Create a checkout session for subscription
 */
export const createCheckoutSession = async (
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  customerEmail?: string
) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      successUrl,
      cancelUrl,
      customerEmail,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
};

/**
 * Redirect to Stripe Checkout
 */
export const redirectToCheckout = async (sessionId: string) => {
  // Modern Stripe uses session URL directly
  window.location.href = `/checkout/${sessionId}`;
};

/**
 * Get customer portal URL
 */
export const getCustomerPortalUrl = async (returnUrl: string) => {
  const response = await fetch('/api/customer-portal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      returnUrl,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get customer portal URL');
  }

  const { url } = await response.json();
  return url;
};

/**
 * Redirect to customer portal
 */
export const redirectToCustomerPortal = async (returnUrl: string) => {
  const url = await getCustomerPortalUrl(returnUrl);
  window.location.href = url;
};
