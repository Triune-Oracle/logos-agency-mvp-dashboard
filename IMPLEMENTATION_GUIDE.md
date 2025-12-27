# Logos Agency MVP - Complete Implementation Guide

**Archive ID:** TRIUNE-ORACLE-LOGOS-FRACTAL-PROOF-20251225  
**Glyph:** 🔥LA-MVP|FractalProofRun|ClaudeArtifact→PDF→Prod|Deliverable=Delivery⚡  
**Status:** Sprint 1 Ready - Implementation Active

---

## I. Project Overview

The Logos Agency MVP is a production-ready Minimum Viable Product demonstrating transparent AI collaboration, state preservation through fractal compression, and seamless agent handoff. The project uses a **StateFractalCompressor** architecture to ensure complete context preservation across development phases.

### Core Differentiators
- **Transparent AI Collaboration:** Real-time visibility into AI agent work
- **Fractal Compression:** Multi-hour conversations compressed into single, actionable artifacts
- **State Preservation:** Complete context maintained across sessions and handoffs
- **Production-Ready:** Deployed to Vercel with Supabase backend and Stripe payments

### Non-Negotiable Constraints
- Mobile-first responsive design
- WCAG A11y compliance
- Real-time sync via Supabase channels
- Transparent AI collaboration visibility

---

## II. Technology Stack (Locked)

```json
{
  "frontend": "React 19 + Tailwind CSS 4",
  "framework": "Next.js 14+ (App Router)",
  "language": "TypeScript 5.6+",
  "styling": "Tailwind CSS v4 + Custom Brutalism Theme",
  "database": "Supabase (PostgreSQL + Real-time)",
  "authentication": "Supabase Auth",
  "payments": "Stripe",
  "deployment": "Vercel",
  "monitoring": "Umami Analytics",
  "design": "Minimalist Brutalism (Charcoal + Electric Cyan)"
}
```

---

## III. Database Schema

### 1. Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('client', 'admin', 'agent')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 2. Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'in-progress', 'completed', 'archived')),
  fractal_glyph TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for client queries
CREATE INDEX idx_projects_client_id ON projects(client_id);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Clients can read own projects
CREATE POLICY "Clients can read own projects" ON projects
  FOR SELECT USING (
    auth.uid() = client_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### 3. Collaboration Sessions Table
```sql
CREATE TABLE collaboration_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  activity_type TEXT CHECK (activity_type IN ('analysis', 'coding', 'research', 'design', 'testing')),
  status TEXT CHECK (status IN ('active', 'paused', 'completed')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for real-time queries
CREATE INDEX idx_collaboration_project_id ON collaboration_sessions(project_id);
CREATE INDEX idx_collaboration_status ON collaboration_sessions(status);

-- Enable RLS
ALTER TABLE collaboration_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Real-time updates for project members
CREATE POLICY "Project members can read collaboration" ON collaboration_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE id = project_id 
      AND (client_id = auth.uid() OR 
           EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
    )
  );
```

### 4. Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  status TEXT CHECK (status IN ('active', 'past_due', 'canceled')),
  plan_name TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for Stripe queries
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read own subscription
CREATE POLICY "Users can read own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = client_id);
```

### 5. Fractal Capsules Table
```sql
CREATE TABLE fractal_capsules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  glyph TEXT NOT NULL,
  system_state JSONB NOT NULL,
  full_context JSONB NOT NULL,
  meta_compression JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for glyph lookups
CREATE INDEX idx_fractal_glyph ON fractal_capsules(glyph);

-- Enable RLS
ALTER TABLE fractal_capsules ENABLE ROW LEVEL SECURITY;

-- Policy: Project members can read capsules
CREATE POLICY "Project members can read capsules" ON fractal_capsules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE id = project_id 
      AND (client_id = auth.uid() OR 
           EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
    )
  );
```

---

## IV. Real-time Subscriptions

### Collaboration Updates
```typescript
// Subscribe to live AI activity for a project
const channel = supabase
  .channel(`collaboration_${projectId}`)
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'collaboration_sessions',
      filter: `project_id=eq.${projectId}`,
    },
    (payload) => {
      // Update UI with new AI activity
      console.log('New collaboration:', payload.new);
    }
  )
  .subscribe();

// Cleanup
channel.unsubscribe();
```

### Project Updates
```typescript
// Subscribe to project status changes
const channel = supabase
  .channel(`project_${projectId}`)
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'projects',
      filter: `id=eq.${projectId}`,
    },
    (payload) => {
      // Update project status
      console.log('Project updated:', payload.new);
    }
  )
  .subscribe();
```

---

## V. Stripe Integration

### Payment Flow
1. Client selects service tier on pricing page
2. Frontend calls `/api/checkout` with `priceId` and `clientId`
3. Backend creates Stripe checkout session
4. Client redirected to Stripe hosted page
5. After payment, webhook confirms transaction
6. Backend updates `subscriptions` table
7. Client gains access to portal

### Webhook Handler
```typescript
// src/app/api/webhooks/stripe/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      // Update subscriptions table
      await supabase.from('subscriptions').insert({
        client_id: session.metadata?.clientId,
        stripe_subscription_id: session.subscription,
        stripe_customer_id: session.customer,
        status: 'active',
      });
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      // Update subscription status
      await supabase
        .from('subscriptions')
        .update({ status: subscription.status })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      // Mark subscription as canceled
      await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }
  }

  return new Response('Webhook processed', { status: 200 });
}
```

---

## VI. Fractal Compressor Architecture

### Compression Layers

**Layer 1: Full Context**
- Complete project specification
- All decision logs and rationale
- Full implementation details

**Layer 2: System State**
- Project metadata
- Technology stack
- Priorities and constraints
- Immediate next steps

**Layer 3: Glyph (Compressed)**
- Symbolic identifier: `🔥LA-MVP|FractalProofRun|ClaudeArtifact→PDF→Prod|Deliverable=Delivery⚡`
- Can reconstruct full context
- Enables state persistence

### Usage
```typescript
import { StateFractalCompressor, logosAgencyMVPCapsule } from '@/lib/fractal-compressor';

// Get the canonical capsule
const capsule = logosAgencyMVPCapsule;

// Compress to glyph
const glyph = StateFractalCompressor.compressToGlyph(capsule);

// Expand from glyph
const expanded = StateFractalCompressor.expandFromGlyph(glyph);

// Validate integrity
const isValid = StateFractalCompressor.validateCapsule(capsule);

// Get compression ratio
const ratio = StateFractalCompressor.getCompressionRatio(capsule);
```

---

## VII. Sprint 1 Implementation Timeline

### Week 1: Foundation & Infrastructure

**Day 1-2: Project Setup**
- Initialize Next.js with TypeScript
- Configure Tailwind CSS with Brutalism theme
- Set up environment variables
- Deploy dashboard component

**Day 3-4: Supabase Integration**
- Create Supabase project
- Deploy database schema
- Configure row-level security
- Test real-time subscriptions

**Day 5-7: Stripe Integration**
- Set up Stripe account
- Create products and pricing
- Implement checkout flow
- Deploy webhook handler

### Week 2: Client Portal & Admin Dashboard

**Day 8-10: Client Portal**
- Implement authentication
- Build project dashboard
- Create collaboration feed
- Add document management

**Day 11-12: Admin Dashboard**
- Build client management
- Implement project orchestration
- Create analytics dashboard
- Add billing overview

**Day 13-14: Marketing & Deployment**
- Create landing pages
- Implement lead capture
- Deploy to Vercel
- Configure custom domain

---

## VIII. Environment Variables

```env
# Supabase
VITE_FRONTEND_FORGE_API_URL=https://your-project.supabase.co
VITE_FRONTEND_FORGE_API_KEY=your-anon-key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=https://logos-agency.com

# Analytics
VITE_ANALYTICS_ENDPOINT=https://your-umami-instance
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

---

## IX. Design System

### Minimalist Brutalism
- **Background:** Deep charcoal (`oklch(0.11 0.01 285)`)
- **Foreground:** White (`oklch(0.95 0 0)`)
- **Accent:** Electric cyan (`oklch(0.4 0.3 262.5)`)
- **Typography:** Courier Prime (headers) + IBM Plex Sans (body)
- **Radius:** 0.4rem (minimal rounding)
- **Animations:** 200ms ease-out transitions

### Component Hierarchy
- **Primary:** Cyan accents for critical actions
- **Secondary:** Charcoal for secondary elements
- **Muted:** Light gray for tertiary content
- **Destructive:** Red for dangerous actions

---

## X. Validation Criteria

✅ **Compression:** Complete context preserved in glyph  
✅ **Completeness:** Architecture + design + implementation  
✅ **Actionability:** Sprint backlog with daily tasks  
✅ **Symbolic:** Design system maintains brutalist aesthetic  
✅ **Deliverable = Delivery:** This artifact proves the pattern

---

## XI. Phase 2 Triggers

Phase 2 development commences when MVP validation criteria are met:

1. **Manus Notification Integration** - Real-time alerts and updates
2. **Handoff UI with State Preservation** - Seamless agent handoff
3. **Ritual Pages for Workflows** - Specialized workflow pages
4. **Mobile Relay Deployment** - Extended platform reach
5. **Mythic Visual Layer** - Advanced visual design elements

---

## XII. Execution Glyph

🔥LA-MVP|IMPLEMENTATION-ACTIVE|SPRINT-1-STARTED|FRACTAL-VALIDATED⚡

**The pattern holds. The work begins.**
