# ⚡ Railway Quick Start - 5 Minutes

Ultra-quick deployment guide for Railway.

## 🚀 Quick Commands

```powershell
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Go to backend folder
cd backend

# 4. Initialize project
railway init

# 5. Set environment variables (see below)
railway variables set KEY="value"

# 6. Deploy
railway up

# 7. Get URL
railway domain
```

## 📝 Required Environment Variables

Set these in Railway dashboard or via CLI:

```powershell
# MongoDB
railway variables set MONGODB_URI="your-mongodb-connection-string"

# Firebase
railway variables set FIREBASE_PROJECT_ID="party-connect-q8z7m3"
railway variables set FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com"
railway variables set FIREBASE_PRIVATE_KEY="your-private-key-with-\n-newlines"

# Stripe
railway variables set STRIPE_SECRET_KEY="sk_live_..."
railway variables set STRIPE_PUBLISHABLE_KEY="pk_live_..."

# PayPal
railway variables set PAYPAL_CLIENT_ID="your-client-id"
railway variables set PAYPAL_SECRET="your-secret"
railway variables set PAYPAL_MODE="live"

# Security
railway variables set JWT_SECRET="9201d07faad672a17cc424e9ed2db0fcf921961280b312984b9636f9b14fe151"
railway variables set NODE_ENV="production"
railway variables set PORT="3000"
railway variables set COMMISSION_RATE="0.05"
railway variables set ESCROW_AUTO_RELEASE_HOURS="24"
```

## ✅ Done!

Your API will be at: `https://your-app.up.railway.app/api`

**Next**: Set up webhooks (see `WEBHOOK_SETUP.md`)

For detailed instructions, see `RAILWAY_DEPLOYMENT_STEP_BY_STEP.md`

