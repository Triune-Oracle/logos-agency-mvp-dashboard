import { Router } from 'express';
import { Client } from 'pg';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

const getDbClient = () => {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

router.post('/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const client = getDbClient();
  try {
    await client.connect();

    switch (event.type) {
      case 'charge.succeeded':
      case 'invoice.payment_succeeded':
        const data = event.data.object as any;
        const amount = data.amount / 100; // Amount in cents, convert to dollars
        const referenceId = data.id;
        const type = event.type === 'charge.succeeded' ? 'charge' : 'invoice_payment';

        await client.query(
          'INSERT INTO transactions (reference_id, source, type, amount, created_at) VALUES ($1, $2, $3, $4, NOW())',
          [referenceId, 'stripe', type, amount]
        );
        console.log(`Transaction recorded for event ${event.id}`);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook or inserting transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
});

export default router;
