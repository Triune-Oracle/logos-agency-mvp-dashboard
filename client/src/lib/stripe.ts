import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = process.env.VITE_FRONTEND_FORGE_API_KEY || '';

let stripePromise: ReturnType<typeof loadStripe> | null = null;

/**
 * Get Stripe instance for client-side operations
 * Lazy loads to ensure key is available
 */
export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

/**
 * Create a Stripe checkout session
 * Used for subscription purchases
 */
export const createCheckoutSession = async (
  priceId: string,
  clientId: string
) => {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        clientId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

/**
 * Retrieve customer portal URL for subscription management
 */
export const getCustomerPortalUrl = async (customerId: string) => {
  try {
    const response = await fetch('/api/customer-portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get customer portal');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Portal error:', error);
    throw error;
  }
};
