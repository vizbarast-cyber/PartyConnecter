# 🚀 Deploy Backend to Railway - Quick Guide

## Current Status
- ✅ Railway project created
- ✅ Domain exists
- ❌ **No service deployed yet** - This is why you get 404

## Quick Fix: Deploy Service Now

### Option 1: Railway Dashboard (Easiest) ⭐

1. Go to https://railway.app
2. Open project `poetic-light`
3. Click **"+ Create"** button (top right)
4. Select **"GitHub Repo"** (if code is on GitHub) OR **"Empty Service"**
5. If GitHub:
   - Select your repository
   - Select `backend` folder
   - Railway auto-detects Node.js
6. If Empty Service:
   - Railway creates empty service
   - You'll need to connect code manually

### Option 2: CLI (If Dashboard Doesn't Work)

```powershell
# Go to backend folder
cd backend

# Link to Railway project
railway link

# When prompted, select: poetic-light

# Deploy
railway up
```

---

## Step 2: Set Environment Variables

**Before or after deployment**, set all variables in Railway dashboard:

1. Go to Railway dashboard → Your service → **Variables** tab
2. Add all these variables (see list below)

**Or use CLI:**
```powershell
cd backend

# MongoDB (get from MongoDB Atlas)
railway variables set MONGODB_URI="your-mongodb-connection-string"

# Firebase
railway variables set FIREBASE_PROJECT_ID="party-connect-q8z7m3"
railway variables set FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com"
railway variables set FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDe/z+E5LqlsCc3\nJkGSvKx/RTwEdJ3Qwei6oP+fGM2eC8M6OJTg6zKeba1uoZbmrNYlsRRTD+dBH38t\nxtEgHKKOX7MJ3Vi6iOsZy5zrnQFSREF1SLSMAVWTffCTXrnEQ4InHRNmF6NhY5ma\n9pl4t/4p7dYjdW8oN6WlVpgSBb6f8uYVC/dYOO3LFsCv/Yb/MPnEG6Oc6NE3fAyZ\ngf9jsuet8jhWEmASYyLxyBoPK2uKHF+tOZ6nLc0P72DExCB2N7mdWiUi3VMVx6vd\nzB4c6UlzGdrKNpJr5K4VGtsd5GbdiyxO0FxL0pmAGvpnFde2ZVzgOsP5O2VnnLG9\nNYCgdCXHAgMBAAECggEAJwxjPw4ecO0LsOiOCvfm7NJe1Bjnmaqa6jNPD7j0KHy+\nzu8hgtEsp/lkqT66geI6DZeYi4L5Z7nwNz/dVtYs0OmJHG0aIG/hWz8AV3HCzXkO\nTU9R7kI9jfo7qlKoDOoVXGwG/ZWeEmuydiRAc5ckdosjOEpUEKLN6snjDyTaYH+A\ngGzdPrEVHVPepLpH4T5j4MM8QI080QmWmxWzn04JoGAhF6OSqV5l/i0tXaxZzn/p\n2VwWToHGDYDXabETTbo2YepQmS3ReyhFKDynIIX8xxhsTk9yYwaI1b7FmmfjMk+6\n7fd/TVMSW6o9v9SUJzcuJ3A5kw2S/rUS54gMhB7GQQKBgQDz/sbQyUFR97yK1Wji\nS6jot/K6ZSHwOSYs/hgnPAI/lykjnavznpjHCBP5ojksIA/o2xMKUuzjo2fL82of\naoBbmzdm0CJvXQB11v/Ji4SRVyHp81RkAcjgE/Pdat/AmEs1AQByG0+SKudsqS8g\nGStR3MLI0rr1FIJJ0rnoEUxQ2QKBgQDp9/2j76PqYhkSxfKti682odFaojHVsyaA\nHcVsQP6IiX7l+BhitIwuIBAh99av9WMZMMe8VdufpalKKk19XpOsQotDu5w5cyPT\nDzwPY4EniHHuXoSnLSToxGVJslw8wIABWVuexaajbHoaUlPYdI2IDh+IJkDFtg6u\nTf9MQ5gHnwKBgDyR2a8I1uNPOYnJcpECsTqcN3BYHLWyqixvI3XR6sj4cGj8Aiyn\nCUwXUEYfJEw05V4rzC066r2T2feCRKzp1lVnUbh/IJ0+nBekuLjCnrUpySx3kFKH\nMuOVcGtd1Y/M/pZ42jB5YSZq6ipKUX2JYfyfbedGkMy4O6Ox4R6f9K75AoGBAMlV\nykJkWZ28RO9OwAJvjZtprIpdwJywyZS+CcGaPG6qQzUKRZHK5EZc+QUCDRDmDR0E\nSRzclV3QZNmZhY048cLukID81PbrCgz5syla6y1l0QTa+TQTOQvE1ZSRk6YD0SNY\nDeuXEkrXcktsRRKjWZeW77Ntl5eLjx6Xp/WsxQrpAoGBANEslAHPzuA1OEqktCR+\nv+858nZUnoPJ5O4MmhZhdGj+o/vc/GcTCysv7Ft69R1cYYMW4vppyizqBm+eOyRX\nRwb/XpHstwbWMooLsVatry/dzzFD+ODzDsRXJVSxHxer4txsiugQQjYnCAErZe0V\nXCn2NZRvGNVk0YBsLn9v6K7S\n-----END PRIVATE KEY-----\n"

# Stripe (Your actual LIVE keys - replace with your real keys)
railway variables set STRIPE_SECRET_KEY="sk_live_YOUR_ACTUAL_KEY"
railway variables set STRIPE_PUBLISHABLE_KEY="pk_live_YOUR_ACTUAL_KEY"

# PayPal (Your actual LIVE credentials - replace with your real values)
railway variables set PAYPAL_CLIENT_ID="YOUR_ACTUAL_CLIENT_ID"
railway variables set PAYPAL_SECRET="YOUR_ACTUAL_SECRET"
railway variables set PAYPAL_MODE="live"

# Security
railway variables set JWT_SECRET="9201d07faad672a17cc424e9ed2db0fcf921961280b312984b9636f9b14fe151"
railway variables set NODE_ENV="production"
railway variables set PORT="3000"
railway variables set COMMISSION_RATE="0.05"
railway variables set ESCROW_AUTO_RELEASE_HOURS="24"
```

---

## Step 3: Verify Deployment

After deployment (2-5 minutes):

```powershell
# Test health endpoint
curl https://poetic-light-production.up.railway.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production",
  "uptime": ...
}
```

---

## ✅ Backend is Good When:

- [ ] Service shows as "Active" in Railway dashboard
- [ ] Health endpoint returns 200 OK (not 404)
- [ ] Logs show "🚀 Server running on port 3000"
- [ ] Logs show "MongoDB connected"
- [ ] Logs show "Firebase Admin initialized"
- [ ] No errors in logs

---

## 🎯 Summary

**Current Status:**
- ❌ Backend NOT deployed (no service)
- ✅ Project exists
- ✅ Domain exists
- ✅ Environment variables ready (need to be set)

**What You Need:**
1. Add service to Railway (dashboard or CLI)
2. Set environment variables
3. Wait for deployment
4. Test health endpoint

**Then** your backend will be good! 🚀

