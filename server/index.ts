import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import {
  createCheckoutSession,
  verifyWebhookSignature,
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  getCustomerPortalUrl,
} from "./lib/stripe.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Webhook — MUST use raw body, registered before express.json()
  app.post(
    "/api/webhooks/stripe",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"] as string;
      if (!sig) {
        res.status(400).send("Missing stripe-signature");
        return;
      }

      let event: Stripe.Event;
      try {
        event = verifyWebhookSignature(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET!
        );
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`Webhook verification failed: ${msg}`);
        res.status(400).send(`Webhook Error: ${msg}`);
        return;
      }

      try {
        switch (event.type) {
          case "customer.subscription.created":
            await handleSubscriptionCreated(
              event.data.object as Stripe.Subscription,
              supabase
            );
            break;
          case "customer.subscription.updated":
            await handleSubscriptionUpdated(
              event.data.object as Stripe.Subscription,
              supabase
            );
            break;
          case "customer.subscription.deleted":
            await handleSubscriptionDeleted(
              event.data.object as Stripe.Subscription,
              supabase
            );
            break;
          default:
            console.log(`Unhandled event type: ${event.type}`);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`Webhook handler error for ${event.id}: ${msg}`);
        res.status(500).send("Handler error");
        return;
      }

      res.json({ received: true });
    }
  );

  // 2. JSON middleware for all other API routes
  app.use(express.json());

  // 3. Checkout session
  app.post("/api/checkout", async (req, res) => {
    const { priceId, clientId } = req.body;
    if (!priceId || !clientId) {
      res.status(400).json({ error: "priceId and clientId required" });
      return;
    }
    try {
      const origin = req.headers.origin || `https://${req.headers.host}`;
      const session = await createCheckoutSession(
        priceId,
        clientId,
        `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        `${origin}/pricing`
      );
      res.json({ url: session.url });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: msg });
    }
  });

  // 4. Customer portal
  app.post("/api/customer-portal", async (req, res) => {
    const { customerId } = req.body;
    if (!customerId) {
      res.status(400).json({ error: "customerId required" });
      return;
    }
    try {
      const origin = req.headers.origin || `https://${req.headers.host}`;
      const url = await getCustomerPortalUrl(customerId, `${origin}/dashboard`);
      res.json({ url });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: msg });
    }
  });

  // 5. Static files + client-side routing catch-all
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
