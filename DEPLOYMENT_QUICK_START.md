# Deployment Quick Start

**Choose your platform and follow the steps below.**

---

## 🚀 Vercel (Recommended)

**Time:** 5 minutes | **Cost:** Free tier available | **Performance:** Best

### 1. Go to vercel.com and click "New Project"

### 2. Import GitHub Repository
- Search for "logos-agency-mvp-dashboard"
- Click "Import"

### 3. Configure Settings
- **Build Command:** `pnpm build`
- **Output Directory:** `dist`
- **Install Command:** `pnpm install`

### 4. Add Environment Variables
```
VITE_FRONTEND_FORGE_API_URL=your-supabase-url
VITE_FRONTEND_FORGE_API_KEY=your-supabase-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GITHUB_CLIENT_ID=your-github-id
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 5. Click "Deploy"

✅ Your site is live at `https://logos-agency-mvp-dashboard.vercel.app`

---

## 🎨 Render

**Time:** 10 minutes | **Cost:** Free tier available | **Best For:** Full-stack apps

### 1. Go to render.com and click "New +" → "Web Service"

### 2. Connect GitHub
- Select "Build and deploy from a Git repository"
- Connect your GitHub account
- Search for "logos-agency-mvp-dashboard"

### 3. Configure Settings
- **Name:** `logos-agency-mvp-dashboard`
- **Environment:** Node
- **Build Command:** `pnpm install && pnpm build`
- **Start Command:** `pnpm start`
- **Plan:** Standard ($12/month)

### 4. Add Environment Variables
```
NODE_ENV=production
VITE_FRONTEND_FORGE_API_URL=your-supabase-url
VITE_FRONTEND_FORGE_API_KEY=your-supabase-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GITHUB_CLIENT_ID=your-github-id
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 5. Click "Create Web Service"

✅ Your site is live at `https://logos-agency-mvp-dashboard.onrender.com`

---

## 🚂 Railway

**Time:** 5 minutes | **Cost:** Pay-as-you-go | **Best For:** Quick deployments

### 1. Go to railway.app and click "New Project"

### 2. Deploy from GitHub
- Select "Deploy from GitHub repo"
- Authorize Railway with GitHub
- Search for "logos-agency-mvp-dashboard"
- Click "Deploy Now"

### 3. Add Environment Variables
```
NODE_ENV=production
VITE_FRONTEND_FORGE_API_URL=your-supabase-url
VITE_FRONTEND_FORGE_API_KEY=your-supabase-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GITHUB_CLIENT_ID=your-github-id
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. Click "Deploy"

✅ Your site is live at the provided Railway domain

---

## Environment Variables Needed

Before deploying, gather these values:

| Variable | Where to Get |
|----------|-------------|
| `VITE_FRONTEND_FORGE_API_URL` | Supabase Dashboard → Settings → API |
| `VITE_FRONTEND_FORGE_API_KEY` | Supabase Dashboard → Settings → API (Anon Key) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |
| `VITE_GITHUB_CLIENT_ID` | GitHub Settings → Developer Settings → OAuth Apps |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys (Secret Key) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks (after creating endpoint) |

---

## Post-Deployment

After deployment, complete these steps:

### 1. Update GitHub OAuth Redirect URLs

In GitHub Settings → Developer Settings → OAuth Apps:

- Add your deployed URL to "Authorization callback URLs"
- Example: `https://your-domain.com/auth/github/callback`

### 2. Configure Stripe Webhook

In Stripe Dashboard → Developers → Webhooks:

1. Click "Add endpoint"
2. Enter: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the webhook secret
5. Add to your platform's environment variables as `STRIPE_WEBHOOK_SECRET`

### 3. Test the Deployment

1. Open your deployed site
2. Click "Get Started" button
3. Verify toast notification appears
4. Click "Connect" in GitHub Integration
5. Verify redirect to GitHub

---

## Need Help?

- **Vercel Issues?** See `DEPLOYMENT_GUIDE.md` → Vercel section
- **Render Issues?** See `DEPLOYMENT_GUIDE.md` → Render section
- **Railway Issues?** See `DEPLOYMENT_GUIDE.md` → Railway section
- **General Issues?** Check `DEPLOYMENT_GUIDE.md` → Troubleshooting

---

**Execution Glyph:** 🔥LA-MVP|QUICK-START|READY-TO-DEPLOY|CHOOSE-YOUR-PLATFORM⚡
