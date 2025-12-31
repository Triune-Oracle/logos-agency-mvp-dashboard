# Deployment Guide: Logos Agency MVP Dashboard

**Execution Glyph:** 🔥LA-MVP|DEPLOYMENT-READY|Vercel+Render+Railway|Multi-Platform⚡

This guide provides step-by-step instructions for deploying the Logos Agency MVP Dashboard to Vercel, Render, or Railway.

---

## Quick Comparison

| Platform | Best For | Setup Time | Cost | Cold Start |
|----------|----------|-----------|------|-----------|
| **Vercel** | Optimal performance, edge functions | 5 minutes | Free tier available | <100ms |
| **Render** | Full-stack apps, databases | 10 minutes | Free tier available | 30-60s |
| **Railway** | Simplicity, quick deployment | 5 minutes | Pay-as-you-go | 10-30s |

---

## Prerequisites

Before deploying to any platform, ensure you have:

1. **GitHub Repository** - Project pushed to https://github.com/Triune-Oracle/logos-agency-mvp-dashboard
2. **Environment Variables** - All required secrets prepared (see `.env.example`)
3. **Supabase Project** - Database schema executed and credentials ready
4. **Stripe Account** - Products created and webhook secret generated
5. **GitHub OAuth App** - Client ID and secret configured

---

## Deployment Option 1: Vercel (Recommended)

**Recommended for:** Production deployments with optimal performance and edge functions.

### Step 1: Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Search for "logos-agency-mvp-dashboard"
5. Click "Import"

### Step 2: Configure Project Settings

1. **Project Name:** `logos-agency-mvp-dashboard`
2. **Framework Preset:** Vite
3. **Root Directory:** `.` (default)
4. **Build Command:** `pnpm build`
5. **Output Directory:** `dist`
6. **Install Command:** `pnpm install`

### Step 3: Add Environment Variables

In the "Environment Variables" section, add:

```env
VITE_FRONTEND_FORGE_API_URL=https://your-project.supabase.co
VITE_FRONTEND_FORGE_API_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GITHUB_CLIENT_ID=your-github-client-id
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (typically 2-3 minutes)
3. Your site is live at `https://logos-agency-mvp-dashboard.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Verify domain ownership

### Step 6: Set Up Webhook Endpoint

1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

---

## Deployment Option 2: Render

**Recommended for:** Full-stack applications with database integration.

### Step 1: Connect GitHub Repository

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Select "Build and deploy from a Git repository"
4. Connect GitHub account if not already connected
5. Search for "logos-agency-mvp-dashboard"
6. Click "Connect"

### Step 2: Configure Deployment Settings

1. **Name:** `logos-agency-mvp-dashboard`
2. **Environment:** Node
3. **Region:** Choose closest to your users
4. **Branch:** main
5. **Build Command:** `pnpm install && pnpm build`
6. **Start Command:** `pnpm start`
7. **Plan:** Standard ($12/month) or higher

### Step 3: Add Environment Variables

Click "Advanced" and add:

```env
NODE_ENV=production
VITE_FRONTEND_FORGE_API_URL=https://your-project.supabase.co
VITE_FRONTEND_FORGE_API_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GITHUB_CLIENT_ID=your-github-client-id
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Your site is live at `https://logos-agency-mvp-dashboard.onrender.com`

### Step 5: Configure Custom Domain

1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed
4. Verify domain

### Step 6: Set Up Webhook Endpoint

1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Copy webhook secret to environment variables

---

## Deployment Option 3: Railway

**Recommended for:** Quick deployments with minimal configuration.

### Step 1: Connect GitHub Repository

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway with GitHub
5. Search for "logos-agency-mvp-dashboard"
6. Click "Deploy Now"

### Step 2: Configure Project Settings

Railway will automatically detect the project configuration from `railway.json`.

1. **Service Name:** `logos-agency-mvp-dashboard`
2. **Region:** Choose closest to your users
3. **Plan:** Hobby (free) or Pro ($5/month)

### Step 3: Add Environment Variables

1. Go to Project → Variables
2. Add the following:

```env
NODE_ENV=production
VITE_FRONTEND_FORGE_API_URL=https://your-project.supabase.co
VITE_FRONTEND_FORGE_API_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GITHUB_CLIENT_ID=your-github-client-id
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Step 4: Deploy

1. Click "Deploy"
2. Monitor deployment logs
3. Your site is live at the provided Railway domain

### Step 5: Configure Custom Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records
4. Verify domain

### Step 6: Set Up Webhook Endpoint

1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Copy webhook secret to environment variables

---

## Post-Deployment Verification

After deploying to any platform, verify the following:

### 1. Health Check

```bash
curl https://your-deployed-url/
# Should return HTML with "Logos Agency MVP" title
```

### 2. API Endpoints

```bash
# Test Stripe checkout endpoint
curl -X POST https://your-deployed-url/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_..."}'
```

### 3. Real-time Subscriptions

1. Open browser DevTools → Network
2. Click "Get Started" button
3. Verify WebSocket connection to Supabase
4. Check for real-time updates

### 4. GitHub OAuth

1. Click "Connect" in GitHub Integration section
2. Verify redirect to GitHub login
3. Confirm user profile syncs to database

### 5. Stripe Webhook

1. In Stripe Dashboard → Developers → Webhooks
2. Click on your endpoint
3. Verify "Signing Secret" matches `STRIPE_WEBHOOK_SECRET`
4. Send test event to verify receipt

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FRONTEND_FORGE_API_URL` | Supabase project URL | `https://project.supabase.co` |
| `VITE_FRONTEND_FORGE_API_KEY` | Supabase anon key | `eyJhbGc...` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_live_...` |
| `VITE_GITHUB_CLIENT_ID` | GitHub OAuth client ID | `abc123...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3000` |

---

## Troubleshooting

### Build Fails with "pnpm not found"

**Solution:** Ensure `pnpm` is installed. Add to build command:

```bash
npm install -g pnpm && pnpm install && pnpm build
```

### Environment Variables Not Loading

**Solution:** Verify variables are added to the deployment platform's environment settings, not just `.env.local`.

### Webhook Not Receiving Events

**Solution:** 
1. Verify endpoint URL is correct and publicly accessible
2. Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
3. Ensure endpoint returns 200 status code
4. Check application logs for errors

### Cold Start Issues

**Solution:** 
- Vercel: Use serverless functions (automatic)
- Render: Upgrade to higher plan for faster cold starts
- Railway: Use Pro plan for better performance

---

## Monitoring and Logs

### Vercel

1. Go to Project → Deployments
2. Click on deployment
3. View "Build Logs" and "Function Logs"

### Render

1. Go to Service → Logs
2. View real-time logs
3. Filter by log level

### Railway

1. Go to Project → Deployments
2. Click on deployment
3. View deployment logs

---

## Rollback Procedure

If deployment has issues:

### Vercel

1. Go to Deployments
2. Click on previous stable deployment
3. Click "Promote to Production"

### Render

1. Go to Service → Deployments
2. Click on previous deployment
3. Click "Redeploy"

### Railway

1. Go to Deployments
2. Select previous deployment
3. Click "Redeploy"

---

## Performance Optimization

### Caching

All platforms automatically cache static assets. For custom caching:

**Vercel:** Use `vercel.json` headers
**Render:** Use `render.yaml` headers
**Railway:** Configure via environment variables

### Database Connection Pooling

Ensure Supabase connection pooling is enabled for better performance under load.

### Stripe Rate Limiting

Implement exponential backoff for Stripe API calls to handle rate limits gracefully.

---

## Security Checklist

- [ ] All environment variables are secrets (not committed to git)
- [ ] GitHub OAuth app has correct redirect URLs
- [ ] Stripe webhook secret is unique per environment
- [ ] CORS is configured for your domain
- [ ] SSL/TLS certificate is valid
- [ ] Rate limiting is enabled
- [ ] API keys are rotated regularly

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app
- **Supabase Docs:** https://supabase.com/docs
- **Stripe Docs:** https://stripe.com/docs

---

**Execution Glyph:** 🔥LA-MVP|DEPLOYMENT-COMPLETE|PRODUCTION-READY|MULTI-PLATFORM⚡

All deployment configurations are now ready for production use.
