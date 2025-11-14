# 🎨 Deploy to Render (Free Alternative)

## Quick Setup - 5 Minutes

### Step 1: Create Account
1. Go to https://render.com
2. Sign up with GitHub (easiest)

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `partyconnect-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or Starter for $7/month)

### Step 3: Add Environment Variables
In Render dashboard → Your service → **Environment**:

Add all 15 variables (same as Railway):
- MONGODB_URI
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY
- STRIPE_SECRET_KEY
- STRIPE_PUBLISHABLE_KEY
- PAYPAL_CLIENT_ID
- PAYPAL_SECRET
- PAYPAL_MODE=live
- JWT_SECRET
- NODE_ENV=production
- PORT=3000
- COMMISSION_RATE=0.05
- ESCROW_AUTO_RELEASE_HOURS=24
- ALLOWED_ORIGINS=*

### Step 4: Deploy
- Render auto-deploys when you save
- Wait 2-5 minutes
- Get your URL: `https://your-service.onrender.com`

### Step 5: Update Mobile App
Update `.env` file:
```bash
EXPO_PUBLIC_API_URL=https://your-service.onrender.com/api
```

---

## ✅ Advantages
- ✅ Free tier available
- ✅ No payment required
- ✅ Auto-deploy from Git
- ✅ Easy setup

---

## ⚠️ Free Tier Limitations
- Service sleeps after 15 min inactivity
- First request after sleep takes ~30 seconds
- Upgrade to Starter ($7/month) for always-on

---

## 🎯 Quick Decision

**Railway** (if you add payment):
- ✅ Already set up
- ✅ $5 free credit
- ✅ Better performance

**Render** (if you want free):
- ✅ No payment needed
- ✅ Free tier works
- ✅ Easy migration

Choose one and let's deploy! 🚀

