# 🚂 Railway Deployment - Step by Step Guide

Complete step-by-step guide to deploy your PartyConnect backend to Railway.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js installed on your computer
- [ ] Git repository initialized
- [ ] All credentials ready (see `CREDENTIALS_STATUS.md`)
- [ ] Railway account (we'll create one if needed)

---

## Step 1: Install Railway CLI

### Windows (PowerShell):
```powershell
npm install -g @railway/cli
```

### Verify Installation:
```powershell
railway --version
```

You should see the Railway version number.

---

## Step 2: Login to Railway

### Option A: Login via Browser (Recommended)
```powershell
railway login
```

This will:
1. Open your browser
2. Ask you to sign in with GitHub/Google/Email
3. Authorize Railway CLI
4. Return to terminal when done

### Option B: Login with Token
1. Go to https://railway.app
2. Sign up/Login
3. Go to Account Settings → Tokens
4. Create a new token
5. Use: `railway login --browserless`

---

## Step 3: Navigate to Backend Directory

```powershell
cd backend
```

Make sure you're in the `backend` folder where `server.js` is located.

---

## Step 4: Initialize Railway Project

```powershell
railway init
```

This will:
1. Ask: "What is your project name?" → Enter: `partyconnect-api` (or any name)
2. Ask: "Would you like to set up a new project?" → Type: `y` (yes)
3. Ask: "Would you like to add a database?" → Type: `n` (no, we're using MongoDB Atlas)

Railway will create a new project and link it to your current directory.

---

## Step 5: Set Up Environment Variables

Now we'll add all your credentials. Railway will open a browser window or you can use the dashboard.

### Option A: Using Railway Dashboard (Easier)

1. Go to https://railway.app
2. Click on your project (`partyconnect-api`)
3. Click on your service (the one that was just created)
4. Click on the **"Variables"** tab
5. Click **"New Variable"** for each one below

### Option B: Using CLI

Use these commands one by one (replace values with your actual credentials):

```powershell
# MongoDB (Get from MongoDB Atlas)
railway variables set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/partyconnect?retryWrites=true&w=majority"

# Firebase
railway variables set FIREBASE_PROJECT_ID="party-connect-q8z7m3"
railway variables set FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com"
railway variables set FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDe/z+E5LqlsCc3\nJkGSvKx/RTwEdJ3Qwei6oP+fGM2eC8M6OJTg6zKeba1uoZbmrNYlsRRTD+dBH38t\nxtEgHKKOX7MJ3Vi6iOsZy5zrnQFSREF1SLSMAVWTffCTXrnEQ4InHRNmF6NhY5ma\n9pl4t/4p7dYjdW8oN6WlVpgSBb6f8uYVC/dYOO3LFsCv/Yb/MPnEG6Oc6NE3fAyZ\ngf9jsuet8jhWEmASYyLxyBoPK2uKHF+tOZ6nLc0P72DExCB2N7mdWiUi3VMVx6vd\nzB4c6UlzGdrKNpJr5K4VGtsd5GbdiyxO0FxL0pmAGvpnFde2ZVzgOsP5O2VnnLG9\nNYCgdCXHAgMBAAECggEAJwxjPw4ecO0LsOiOCvfm7NJe1Bjnmaqa6jNPD7j0KHy+\nzu8hgtEsp/lkqT66geI6DZeYi4L5Z7nwNz/dVtYs0OmJHG0aIG/hWz8AV3HCzXkO\nTU9R7kI9jfo7qlKoDOoVXGwG/ZWeEmuydiRAc5ckdosjOEpUEKLN6snjDyTaYH+A\ngGzdPrEVHVPepLpH4T5j4MM8QI080QmWmxWzn04JoGAhF6OSqV5l/i0tXaxZzn/p\n2VwWToHGDYDXabETTbo2YepQmS3ReyhFKDynIIX8xxhsTk9yYwaI1b7FmmfjMk+6\n7fd/TVMSW6o9v9SUJzcuJ3A5kw2S/rUS54gMhB7GQQKBgQDz/sbQyUFR97yK1Wji\nS6jot/K6ZSHwOSYs/hgnPAI/lykjnavznpjHCBP5ojksIA/o2xMKUuzjo2fL82of\naoBbmzdm0CJvXQB11v/Ji4SRVyHp81RkAcjgE/Pdat/AmEs1AQByG0+SKudsqS8g\nGStR3MLI0rr1FIJJ0rnoEUxQ2QKBgQDp9/2j76PqYhkSxfKti682odFaojHVsyaA\nHcVsQP6IiX7l+BhitIwuIBAh99av9WMZMMe8VdufpalKKk19XpOsQotDu5w5cyPT\nDzwPY4EniHHuXoSnLSToxGVJslw8wIABWVuexaajbHoaUlPYdI2IDh+IJkDFtg6u\nTf9MQ5gHnwKBgDyR2a8I1uNPOYnJcpECsTqcN3BYHLWyqixvI3XR6sj4cGj8Aiyn\nCUwXUEYfJEw05V4rzC066r2T2feCRKzp1lVnUbh/IJ0+nBekuLjCnrUpySx3kFKH\nMuOVcGtd1Y/M/pZ42jB5YSZq6ipKUX2JYfyfbedGkMy4O6Ox4R6f9K75AoGBAMlV\nykJkWZ28RO9OwAJvjZtprIpdwJywyZS+CcGaPG6qQzUKRZHK5EZc+QUCDRDmDR0E\nSRzclV3QZNmZhY048cLukID81PbrCgz5syla6y1l0QTa+TQTOQvE1ZSRk6YD0SNY\nDeuXEkrXcktsRRKjWZeW77Ntl5eLjx6Xp/WsxQrpAoGBANEslAHPzuA1OEqktCR+\nv+858nZUnoPJ5O4MmhZhdGj+o/vc/GcTCysv7Ft69R1cYYMW4vppyizqBm+eOyRX\nRwb/XpHstwbWMooLsVatry/dzzFD+ODzDsRXJVSxHxer4txsiugQQjYnCAErZe0V\nXCn2NZRvGNVk0YBsLn9v6K7S\n-----END PRIVATE KEY-----\n"

# Stripe (Your LIVE keys)
railway variables set STRIPE_SECRET_KEY="sk_live_YOUR_ACTUAL_KEY"
railway variables set STRIPE_PUBLISHABLE_KEY="pk_live_YOUR_ACTUAL_KEY"
# Note: STRIPE_WEBHOOK_SECRET will be added after deployment

# PayPal (Your LIVE credentials)
railway variables set PAYPAL_CLIENT_ID="YOUR_ACTUAL_CLIENT_ID"
railway variables set PAYPAL_SECRET="YOUR_ACTUAL_SECRET"
railway variables set PAYPAL_MODE="live"

# Security
railway variables set JWT_SECRET="9201d07faad672a17cc424e9ed2db0fcf921961280b312984b9636f9b14fe151"
railway variables set NODE_ENV="production"

# Server
railway variables set PORT="3000"
railway variables set ALLOWED_ORIGINS="https://your-app-domain.com"

# Business Logic
railway variables set COMMISSION_RATE="0.05"
railway variables set ESCROW_AUTO_RELEASE_HOURS="24"
```

**⚠️ Important**: 
- Replace `YOUR_ACTUAL_KEY`, `YOUR_ACTUAL_CLIENT_ID`, etc. with your real values
- For `MONGODB_URI`, get it from MongoDB Atlas
- For `ALLOWED_ORIGINS`, use your app domain or leave as `*` for now

---

## Step 6: Verify Variables

Check that all variables are set:

```powershell
railway variables
```

Or check in Railway dashboard → Your Service → Variables tab.

---

## Step 7: Deploy to Railway

### Option A: Deploy from Current Directory

```powershell
railway up
```

This will:
1. Build your application
2. Deploy it to Railway
3. Show you the deployment logs
4. Give you a URL when done

### Option B: Deploy via Git (Recommended for updates)

1. Make sure your code is committed:
```powershell
git add .
git commit -m "Ready for Railway deployment"
```

2. Link to Railway (if not already done):
```powershell
railway link
```

3. Railway will auto-deploy on git push, or you can deploy manually:
```powershell
railway up
```

---

## Step 8: Get Your API URL

After deployment completes, get your URL:

```powershell
railway domain
```

Or check in Railway dashboard → Your Service → Settings → Domains.

You'll get a URL like: `https://your-app-name.up.railway.app`

**Your API will be at**: `https://your-app-name.up.railway.app/api`

---

## Step 9: Test Your Deployment

### Test Health Endpoint

Open in browser or use curl:
```
https://your-app-name.up.railway.app/api/health
```

You should see:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production",
  "uptime": ...
}
```

### Check Logs

```powershell
railway logs
```

Or in Railway dashboard → Your Service → Deployments → Click on latest → View Logs

---

## Step 10: Set Up Custom Domain (Optional)

1. In Railway dashboard → Your Service → Settings → Domains
2. Click **"Generate Domain"** or **"Add Custom Domain"**
3. Follow instructions to configure DNS

---

## Step 11: Set Up Webhooks (After Deployment)

Now that you have your API URL, set up webhooks:

1. **Get your webhook URLs**:
   - Stripe: `https://your-app-name.up.railway.app/api/payments/webhook/stripe`
   - PayPal: `https://your-app-name.up.railway.app/api/payments/webhook/paypal`

2. **Follow `WEBHOOK_SETUP.md`** for detailed webhook setup instructions

3. **Add Stripe Webhook Secret**:
   ```powershell
   railway variables set STRIPE_WEBHOOK_SECRET="whsec_YOUR_WEBHOOK_SECRET"
   ```

---

## Step 12: Update Mobile App

Update your mobile app's `.env` file:

```bash
EXPO_PUBLIC_API_URL=https://your-app-name.up.railway.app/api
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Health endpoint returns 200: `/api/health`
- [ ] All environment variables are set correctly
- [ ] No errors in Railway logs
- [ ] API URL is accessible
- [ ] Test user signup works
- [ ] Test user login works
- [ ] Stripe webhook configured (see `WEBHOOK_SETUP.md`)
- [ ] PayPal webhook configured (see `WEBHOOK_SETUP.md`)
- [ ] Mobile app updated with new API URL

---

## 🐛 Troubleshooting

### Issue: "Build failed"

**Check:**
1. Railway logs: `railway logs`
2. Make sure `package.json` has `"start": "node server.js"`
3. Make sure `server.js` exists in backend folder
4. Check that all dependencies are in `package.json`

### Issue: "Application error"

**Check:**
1. Railway logs: `railway logs`
2. Verify all environment variables are set
3. Check MongoDB connection string is correct
4. Verify Firebase credentials are correct

### Issue: "Port already in use"

**Fix:** Railway automatically sets `PORT` environment variable. Your code should use `process.env.PORT || 3000` (already configured ✅)

### Issue: "MongoDB connection failed"

**Fix:**
1. Check MongoDB Atlas network access (allow `0.0.0.0/0`)
2. Verify connection string is correct
3. Check MongoDB Atlas cluster is running

### Issue: "Firebase Admin initialization error"

**Fix:**
1. Check `FIREBASE_PRIVATE_KEY` - make sure newlines (`\n`) are preserved
2. Verify `FIREBASE_CLIENT_EMAIL` is correct
3. Check `FIREBASE_PROJECT_ID` is correct

---

## 📊 Monitoring

### View Logs
```powershell
railway logs
```

### View Metrics
- Go to Railway dashboard → Your Service → Metrics
- See CPU, Memory, Network usage

### Set Up Alerts (Optional)
- Railway dashboard → Your Service → Settings → Alerts
- Configure email/Slack notifications

---

## 🔄 Updating Your Deployment

### Method 1: Auto-deploy from Git
1. Push to your Git repository
2. Railway auto-deploys (if connected)

### Method 2: Manual Deploy
```powershell
cd backend
railway up
```

### Method 3: Deploy Specific Branch
```powershell
railway up --branch production
```

---

## 💰 Railway Pricing

- **Free Tier**: $5 credit/month (enough for small apps)
- **Hobby**: $5/month (after free tier)
- **Pro**: $20/month (for production apps)

Your app should work fine on the free tier initially.

---

## 📚 Next Steps

1. ✅ Deploy to Railway (you're doing this now!)
2. ⏳ Set up webhooks (see `WEBHOOK_SETUP.md`)
3. ⏳ Update mobile app with API URL
4. ⏳ Test all features
5. ⏳ Monitor logs and metrics

---

## 🎉 Success!

Once deployed, your API will be live at:
```
https://your-app-name.up.railway.app/api
```

**Remember to:**
- Set up webhooks (see `WEBHOOK_SETUP.md`)
- Update mobile app `.env` file
- Test all endpoints
- Monitor logs for errors

You're live! 🚀

