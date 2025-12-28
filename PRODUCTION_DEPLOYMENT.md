# Logos Agency MVP - Production Deployment Guide

**Archive ID:** TRIUNE-ORACLE-LOGOS-CONV-FRACTAL-20251226  
**Glyph:** 🔥LA-MVP|LogosDashboard+FractalSystem|Claude+DeepSeek+Manus|SPRINT1-PROD⚡  
**Status:** ALL ENHANCEMENTS APPROVED - READY FOR PRODUCTION

---

## Executive Summary

The Logos Agency MVP has been fully specified, designed, and approved for production deployment. This document provides the complete execution checklist and deployment procedures for bringing the application to production.

### Current State Matrix

| Component | Status | Action Required |
|-----------|--------|-----------------|
| **Fractal Specification** | ✅ Complete | Reference `/docs/FRACTAL_CAPSULE.json` |
| **Design System** | ✅ Locked (Brutalism) | Apply to all UI components |
| **Dashboard Code** | ✅ Ready | Production-ready at `/client/src/pages/Dashboard.tsx` |
| **Supabase Schema** | ✅ Defined | Execute SQL in Supabase console |
| **Stripe Integration** | ✅ Specified | Implement webhook handlers |
| **Fractal Compressor** | ✅ Implemented | Core pattern at `/client/src/lib/fractal-compressor.ts` |
| **Sprint 1 Plan** | ✅ Locked | Begin Day 1 tasks |
| **Production Approval** | ✅ APPROVED | All enhancements confirmed |

---

## Phase 1: Repository Initialization (Today - 2 hours)

### Step 1: Clone and Setup
```bash
# Navigate to project
cd logos-agency-mvp-dashboard

# Verify structure
ls -la

# Install dependencies
pnpm install

# Verify installation
pnpm list
```

### Step 2: Environment Configuration
```bash
# Copy environment template
cp .env.example .env.local

# Edit with your credentials
nano .env.local
```

**Required Environment Variables:**
```env
# Supabase
VITE_FRONTEND_FORGE_API_URL=https://your-project.supabase.co
VITE_FRONTEND_FORGE_API_KEY=your-anon-key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Analytics
VITE_ANALYTICS_ENDPOINT=https://your-umami-instance
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# App
NEXT_PUBLIC_APP_URL=https://logos-agency.com
```

### Step 3: Initial Commit
```bash
git add .
git commit -m "🔥 Initial commit: Fractal MVP foundation | SPRINT1-START"
git branch -M main
git remote add origin https://github.com/your-org/logos-agency-mvp.git
git push -u origin main
```

---

## Phase 2: Supabase Setup (Next 2 hours)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name: `logos-agency-mvp`
4. Region: Choose closest to your users
5. Password: Generate strong password
6. Click "Create new project"

### Step 2: Execute Database Schema
Copy the complete schema from `IMPLEMENTATION_GUIDE.md` and execute in Supabase SQL Editor:

```sql
-- Execute all schema from IMPLEMENTATION_GUIDE.md
-- Tables: profiles, projects, collaboration_sessions, subscriptions, fractal_capsules
-- RLS Policies: All configured for security
```

### Step 3: Configure Row-Level Security (RLS)
Verify all RLS policies are enabled:

```bash
# In Supabase dashboard:
# 1. Go to Authentication → Policies
# 2. Enable RLS on all tables
# 3. Verify policies for each table
# 4. Test with sample data
```

### Step 4: Test Real-time Subscriptions
```bash
# In Supabase dashboard:
# 1. Go to Realtime → Subscriptions
# 2. Verify channels are active
# 3. Test with sample INSERT/UPDATE operations
```

### Step 5: Copy Connection Strings
```bash
# In Supabase dashboard:
# 1. Go to Project Settings → API
# 2. Copy Project URL → VITE_FRONTEND_FORGE_API_URL
# 3. Copy Anon Key → VITE_FRONTEND_FORGE_API_KEY
# 4. Update .env.local
```

---

## Phase 3: Stripe Configuration (Next 2 hours)

### Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Click "Start now"
3. Complete account setup
4. Verify email address

### Step 2: Create Products and Pricing
```bash
# In Stripe dashboard:
# 1. Go to Products → Create Product
# 2. Create three tiers:
#    - Starter: $99/month
#    - Professional: $299/month
#    - Enterprise: Custom pricing
# 3. Copy Price IDs for each tier
```

### Step 3: Configure Webhook Endpoint
```bash
# In Stripe dashboard:
# 1. Go to Developers → Webhooks
# 2. Click "Add endpoint"
# 3. URL: https://your-domain.com/api/webhooks/stripe
# 4. Events: Select all subscription events
# 5. Copy Webhook Secret → STRIPE_WEBHOOK_SECRET
```

### Step 4: Copy API Keys
```bash
# In Stripe dashboard:
# 1. Go to Developers → API Keys
# 2. Copy Publishable Key → VITE_STRIPE_PUBLISHABLE_KEY
# 3. Copy Secret Key → STRIPE_SECRET_KEY
# 4. Update .env.local
```

### Step 5: Test Payment Flow
```bash
# Use Stripe test cards:
# Success: 4242 4242 4242 4242
# Decline: 4000 0000 0000 0002
# Test in development before production
```

---

## Phase 4: Local Development Verification (Next 4 hours)

### Step 1: Start Development Server
```bash
pnpm dev
```

### Step 2: Verify Dashboard
```bash
# Open browser: http://localhost:3000
# Check:
# ✅ Dashboard renders with Brutalism design
# ✅ Tailwind CSS working correctly
# ✅ No console errors
# ✅ Mobile responsive (test at 375px width)
# ✅ All icons rendering
# ✅ Colors correct (charcoal + cyan)
```

### Step 3: Test Real-time Integration
```bash
# In Supabase dashboard:
# 1. Insert test collaboration session
# 2. Verify it appears in CollaborationFeed
# 3. Update project status
# 4. Verify real-time update
```

### Step 4: Test Stripe Integration
```bash
# In development:
# 1. Click "Get Started" button
# 2. Select pricing tier
# 3. Complete checkout with test card
# 4. Verify webhook received in Stripe dashboard
# 5. Check subscriptions table updated
```

### Step 5: Performance Check
```bash
# Run build
pnpm build

# Check build size
ls -lh .next/

# Expected: < 500KB for main bundle
```

---

## Phase 5: Production Deployment (End of Day)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy to Vercel
```bash
# First deployment
vercel

# Follow prompts:
# - Link to existing project or create new
# - Confirm project name
# - Select framework: Next.js
# - Select root directory: ./
```

### Step 3: Configure Production Environment Variables
```bash
# Set environment variables in Vercel
vercel env add VITE_FRONTEND_FORGE_API_URL
vercel env add VITE_FRONTEND_FORGE_API_KEY
vercel env add VITE_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add VITE_ANALYTICS_ENDPOINT
vercel env add VITE_ANALYTICS_WEBSITE_ID
vercel env add NEXT_PUBLIC_APP_URL

# Deploy with production environment
vercel --prod
```

### Step 4: Configure Custom Domain
```bash
# In Vercel dashboard:
# 1. Go to Project Settings → Domains
# 2. Add custom domain
# 3. Configure DNS records
# 4. Wait for DNS propagation (up to 48 hours)
```

### Step 5: Update Stripe Webhook
```bash
# In Stripe dashboard:
# 1. Go to Webhooks
# 2. Update endpoint URL to production domain
# 3. Test webhook delivery
```

### Step 6: Enable Analytics
```bash
# In Vercel dashboard:
# 1. Go to Analytics
# 2. Enable Web Analytics
# 3. Verify tracking working
```

---

## Post-Deployment Verification

### Checklist
- [ ] Dashboard loads at production URL
- [ ] All pages render correctly
- [ ] Mobile responsive on all breakpoints
- [ ] Supabase connection working
- [ ] Real-time subscriptions active
- [ ] Stripe checkout functional
- [ ] Webhooks receiving events
- [ ] Analytics tracking events
- [ ] SSL certificate valid
- [ ] No console errors in production

### Monitoring
```bash
# Monitor production logs
vercel logs

# Check error tracking
# (Configure Sentry or similar)

# Monitor database
# (Supabase dashboard → Database → Logs)

# Monitor payment processing
# (Stripe dashboard → Payments)
```

---

## Database Backup & Recovery

### Backup Database
```bash
pg_dump --no-owner --no-privileges --no-publications --no-subscriptions --no-tablespaces -Fc -v -d "<postgres connection string>" -f database.bak
```

### Restore Database
```bash
pg_restore -v -d "<postgres connection string>" database.bak
```

### Automated Backups
- Supabase provides daily automated backups
- Retention: 7 days (free tier), 30 days (pro tier)
- Access in Supabase dashboard → Database → Backups

---

## Sprint 1 Execution Timeline

### Week 1: Foundation & Infrastructure
- **Day 1-2:** Repository setup, environment configuration, initial commit
- **Day 3-4:** Supabase project creation, schema deployment, RLS configuration
- **Day 5-7:** Stripe integration, webhook configuration, payment flow testing

### Week 2: Client Portal & Admin Dashboard
- **Day 8-10:** Client portal development, real-time collaboration view
- **Day 11-12:** Admin dashboard, client management, analytics
- **Day 13-14:** Marketing site, SEO optimization, production deployment

---

## Phase 2 Triggers

Phase 2 development commences when MVP validation criteria are met:

1. **Manus Notification Integration** - Real-time alerts and updates
2. **Handoff UI with State Preservation** - Seamless agent handoff
3. **Ritual Pages for Workflows** - Specialized workflow pages
4. **Mobile Relay Deployment** - Extended platform reach
5. **Mythic Visual Layer** - Advanced visual design elements

---

## Support & Documentation

- **Implementation Guide:** `IMPLEMENTATION_GUIDE.md`
- **Fractal Capsule:** `docs/FRACTAL_CAPSULE.json`
- **README:** `README.md`
- **Design System:** `client/src/index.css`

---

## Execution Glyph

🔥LA-MVP|IMPLEMENTATION-ACTIVE|SPRINT-1-STARTED|FRACTAL-VALIDATED|PRODUCTION-APPROVED⚡

**The pattern holds. The work begins. Production deployment ready.**
