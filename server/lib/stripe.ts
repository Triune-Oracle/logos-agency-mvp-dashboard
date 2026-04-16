/**
 * Stripe server-side utilities.
 * Moved from client/src/lib/stripe-server.ts — belongs in server/, not client/.
 * These functions use STRIPE_SECRET_KEY and must never be bundled into the browser.
 */

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil" as Stripe.LatestApiVersion,
});

export async function createCheckoutSession(
  priceId: string,
  clientId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { clientId },
  });
  return session;
}

export function verifyWebhookSignature(
  body: Buffer | string,
  signature: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(body, signature, secret);
}

export async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
  supabaseClient: ReturnType<typeof import("@supabase/supabase-js").createClient>
) {
  const clientId = subscription.metadata?.clientId;
  if (!clientId) {
    console.warn(`subscription.created ${subscription.id}: no clientId in metadata`);
    return;
  }

  const subData = subscription as unknown as Record<string, unknown>;
  const periodStart = typeof subData.current_period_start === "number"
    ? new Date((subData.current_period_start as number) * 1000)
    : new Date();
  const periodEnd = typeof subData.current_period_end === "number"
    ? new Date((subData.current_period_end as number) * 1000)
    : new Date();

  const { error } = await supabaseClient.from("subscriptions").upsert(
    {
      client_id: clientId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      status: subscription.status,
      plan_name: subscription.items.data[0]?.price?.nickname || "Unknown",
      current_period_start: periodStart,
      current_period_end: periodEnd,
    },
    { onConflict: "stripe_subscription_id" }
  );

  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
  console.log(`subscription.created recorded: ${subscription.id}`);
}

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabaseClient: ReturnType<typeof import("@supabase/supabase-js").createClient>
) {
  const subData = subscription as unknown as Record<string, unknown>;
  const periodStart = typeof subData.current_period_start === "number"
    ? new Date((subData.current_period_start as number) * 1000)
    : new Date();
  const periodEnd = typeof subData.current_period_end === "number"
    ? new Date((subData.current_period_end as number) * 1000)
    : new Date();

  const { error } = await supabaseClient
    .from("subscriptions")
    .update({
      status: subscription.status,
      current_period_start: periodStart,
      current_period_end: periodEnd,
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) throw new Error(`Supabase update failed: ${error.message}`);
  console.log(`subscription.updated recorded: ${subscription.id}`);
}

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabaseClient: ReturnType<typeof import("@supabase/supabase-js").createClient>
) {
  const { error } = await supabaseClient
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("stripe_subscription_id", subscription.id);

  if (error) throw new Error(`Supabase update failed: ${error.message}`);
  console.log(`subscription.deleted recorded: ${subscription.id}`);
}

export async function getCustomerPortalUrl(
  customerId: string,
  returnUrl: string
) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session.url;
}

export default stripe;
