/**
 * Stripe Server-side Utilities
 * Handles payment processing and subscription management
 * 
 * Note: These utilities should be used in API routes only
 * Never expose secret keys to the client
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
// Note: API version is managed by Stripe SDK

/**
 * Create a checkout session for subscription
 */
export async function createCheckoutSession(
  priceId: string,
  clientId: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        clientId,
      },
    });

    return session;
  } catch (error) {
    console.error('Checkout session error:', error);
    throw error;
  }
}

/**
 * Handle subscription.created webhook event
 */
export async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
  supabaseClient: any
) {
  try {
    const clientId = subscription.metadata?.clientId;

    if (!clientId) {
      console.warn('No clientId in subscription metadata');
      return;
    }

    // Store subscription in Supabase
    const subData = subscription as any;
    const periodStart = typeof subData.current_period_start === 'number' 
      ? new Date(subData.current_period_start * 1000)
      : new Date();
    const periodEnd = typeof subData.current_period_end === 'number'
      ? new Date(subData.current_period_end * 1000)
      : new Date();

    await supabaseClient.from('subscriptions').insert({
      client_id: clientId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      status: subscription.status,
      plan_name: subscription.items.data[0]?.price?.nickname || 'Unknown',
      current_period_start: periodStart,
      current_period_end: periodEnd,
    });

    console.log(`Subscription created: ${subscription.id}`);
  } catch (error) {
    console.error('Subscription creation error:', error);
    throw error;
  }
}

/**
 * Handle subscription.updated webhook event
 */
export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabaseClient: any
) {
  try {
    // Update subscription status in Supabase
    const subData = subscription as any;
    const periodStart = typeof subData.current_period_start === 'number' 
      ? new Date(subData.current_period_start * 1000)
      : new Date();
    const periodEnd = typeof subData.current_period_end === 'number'
      ? new Date(subData.current_period_end * 1000)
      : new Date();

    await supabaseClient
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_start: periodStart,
        current_period_end: periodEnd,
      })
      .eq('stripe_subscription_id', subscription.id);

    console.log(`Subscription updated: ${subscription.id}`);
  } catch (error) {
    console.error('Subscription update error:', error);
    throw error;
  }
}

/**
 * Handle subscription.deleted webhook event
 */
export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabaseClient: any
) {
  try {
    // Mark subscription as canceled in Supabase
    await supabaseClient
      .from('subscriptions')
      .update({
        status: 'canceled',
      })
      .eq('stripe_subscription_id', subscription.id);

    console.log(`Subscription deleted: ${subscription.id}`);
  } catch (error) {
    console.error('Subscription deletion error:', error);
    throw error;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw error;
  }
}

/**
 * Get customer portal URL for subscription management
 */
export async function getCustomerPortalUrl(
  customerId: string,
  returnUrl: string
) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId as string,
      return_url: returnUrl,
    });

    return session.url;
  } catch (error) {
    console.error('Customer portal error:', error);
    throw error;
  }
}

/**
 * Get subscription details
 */
export async function getSubscriptionDetails(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Subscription retrieval error:', error);
    throw error;
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    return subscription;
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    throw error;
  }
}

export default stripe;
