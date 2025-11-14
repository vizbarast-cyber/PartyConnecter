# 🚀 Backend Deployment Guide

Complete guide to deploy the PartyConnect backend to production.

## 📋 Prerequisites

- [ ] Node.js 18+ installed locally
- [ ] Git repository initialized
- [ ] MongoDB Atlas account (or other MongoDB hosting)
- [ ] Firebase Admin SDK credentials
- [ ] Stripe and PayPal production keys
- [ ] Hosting account (Heroku, AWS, DigitalOcean, etc.)

## 🎯 Quick Start - Choose Your Platform

### Option 1: Heroku (Easiest) ⭐ Recommended
- **Cost**: Free tier available, then ~$7/month
- **Setup Time**: 15-30 minutes
- **Best for**: Quick deployment, easy scaling

### Option 2: Railway
- **Cost**: Free tier available, then ~$5/month
- **Setup Time**: 10-20 minutes
- **Best for**: Modern, simple deployment

### Option 3: Render
- **Cost**: Free tier available, then ~$7/month
- **Setup Time**: 15-30 minutes
- **Best for**: Simple, reliable hosting

### Option 4: AWS/DigitalOcean (Advanced)
- **Cost**: Varies (~$5-20/month)
- **Setup Time**: 1-2 hours
- **Best for**: Full control, custom configurations

---

## 🚀 Option 1: Deploy to Heroku

### Step 1: Install Heroku CLI
```bash
# Windows (PowerShell)
winget install Heroku.HerokuCLI

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
cd backend
heroku create partyconnect-api
# Note: Replace 'partyconnect-api' with your desired app name
```

### Step 4: Set Environment Variables
```bash
# MongoDB
heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"

# Firebase
heroku config:set FIREBASE_PROJECT_ID="party-connect-q8z7m3"
heroku config:set FIREBASE_PRIVATE_KEY="your-private-key"
heroku config:set FIREBASE_CLIENT_EMAIL="your-client-email"

# Stripe (LIVE keys)
heroku config:set STRIPE_SECRET_KEY="sk_live_..."
heroku config:set STRIPE_PUBLISHABLE_KEY="pk_live_..."
heroku config:set STRIPE_WEBHOOK_SECRET="whsec_..."

# PayPal (LIVE)
heroku config:set PAYPAL_CLIENT_ID="your-live-client-id"
heroku config:set PAYPAL_SECRET="your-live-secret"
heroku config:set PAYPAL_MODE="live"

# JWT
heroku config:set JWT_SECRET="your-strong-random-secret"

# Other
heroku config:set NODE_ENV="production"
heroku config:set PORT="3000"
heroku config:set COMMISSION_RATE="0.05"
heroku config:set ESCROW_AUTO_RELEASE_HOURS="24"
heroku config:set ALLOWED_ORIGINS="https://your-app-domain.com"
```

### Step 5: Deploy
```bash
# Make sure you're in the backend directory
git add .
git commit -m "Prepare for deployment"
git push heroku main
```

### Step 6: Verify Deployment
```bash
# Check logs
heroku logs --tail

# Test health endpoint
heroku open
# Visit: https://your-app-name.herokuapp.com/api/health
```

### Step 7: Set Up Webhooks
1. **Stripe Webhook**:
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-app-name.herokuapp.com/api/payments/webhook/stripe`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

2. **PayPal Webhook**:
   - Go to PayPal Developer Dashboard
   - Add webhook URL: `https://your-app-name.herokuapp.com/api/payments/webhook/paypal`

---

## 🚂 Option 2: Deploy to Railway

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login
```bash
railway login
```

### Step 3: Initialize Project
```bash
cd backend
railway init
```

### Step 4: Set Environment Variables
```bash
# Use Railway dashboard or CLI
railway variables set MONGODB_URI="your-connection-string"
railway variables set FIREBASE_PROJECT_ID="party-connect-q8z7m3"
# ... (set all variables from Heroku section above)
```

### Step 5: Deploy
```bash
railway up
```

### Step 6: Get Your URL
```bash
railway domain
```

---

## 🎨 Option 3: Deploy to Render

### Step 1: Create Account
- Go to https://render.com
- Sign up with GitHub

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the `backend` folder
4. Configure:
   - **Name**: `partyconnect-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free or Starter

### Step 3: Set Environment Variables
In Render dashboard → Environment:
- Add all variables from Heroku section above

### Step 4: Deploy
- Render will auto-deploy on git push
- Or click "Manual Deploy"

---

## ☁️ Option 4: Deploy to AWS/DigitalOcean

See `DEPLOYMENT_AWS.md` or `DEPLOYMENT_DIGITALOCEAN.md` for detailed instructions.

---

## 🔧 Post-Deployment Checklist

### 1. Test API Endpoints
```bash
# Health check
curl https://your-api-url.com/api/health

# Should return:
# {"status":"ok","timestamp":"...","environment":"production"}
```

### 2. Test Authentication
- Test user signup
- Test user login
- Test Google sign-in

### 3. Test Party Creation
- Create a test party
- Verify images upload correctly
- Check database entries

### 4. Test Payments (Carefully!)
- Use Stripe test mode first
- Test with small amounts
- Verify webhooks work

### 5. Set Up Monitoring
- Enable Heroku/Railway/Render monitoring
- Set up error alerts
- Monitor database connections

### 6. Update Mobile App
Update your `.env` file:
```bash
EXPO_PUBLIC_API_URL=https://your-api-url.com/api
```

---

## 🐛 Troubleshooting

### Issue: "MongoDB connection failed"
- **Fix**: Check MongoDB Atlas network access (whitelist 0.0.0.0/0 for production)
- Verify connection string is correct

### Issue: "Firebase Admin initialization error"
- **Fix**: Check `FIREBASE_PRIVATE_KEY` - make sure newlines are preserved
- In Heroku: Use `heroku config:set FIREBASE_PRIVATE_KEY="$(cat path/to/key.json | jq -r .private_key)"`

### Issue: "Port already in use"
- **Fix**: Use `process.env.PORT || 3000` (already configured)

### Issue: "Webhook signature verification failed"
- **Fix**: Check webhook secret matches Stripe/PayPal dashboard
- Verify webhook URL is correct

---

## 📝 Environment Variables Reference

Copy this template and fill in your values:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/partyconnect?retryWrites=true&w=majority

# Firebase
FIREBASE_PROJECT_ID=party-connect-q8z7m3
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@party-connect-q8z7m3.iam.gserviceaccount.com

# Stripe (LIVE)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal (LIVE)
PAYPAL_CLIENT_ID=your-live-client-id
PAYPAL_SECRET=your-live-secret
PAYPAL_MODE=live

# Security
JWT_SECRET=generate-with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
NODE_ENV=production

# Server
PORT=3000
ALLOWED_ORIGINS=https://your-app-domain.com

# Business Logic
COMMISSION_RATE=0.05
ESCROW_AUTO_RELEASE_HOURS=24
```

---

## ✅ Success!

Once deployed, your API will be available at:
- **Heroku**: `https://your-app-name.herokuapp.com/api`
- **Railway**: `https://your-app-name.up.railway.app/api`
- **Render**: `https://your-app-name.onrender.com/api`

Update your mobile app's `EXPO_PUBLIC_API_URL` and you're ready to go! 🎉

