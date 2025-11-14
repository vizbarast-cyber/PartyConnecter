# 🚀 Next Steps - Deploy Backend First

## Current Status
- ✅ Railway project created: `poetic-light`
- ✅ EAS secret created (but has placeholder URL)
- ⚠️ **No services deployed yet** - This is why `railway domain` shows "Project does not have any services"

## What You Need to Do

### Step 1: Add a Service to Railway

You have two options:

#### Option A: Using Railway Dashboard (Easiest) ⭐

1. Go to https://railway.app
2. Open your project `poetic-light`
3. Click **"+ Create"** button (top right)
4. Select **"GitHub Repo"** (if your code is on GitHub) OR **"Empty Service"**
5. If GitHub:
   - Select your repository
   - Select the `backend` folder
   - Railway will auto-detect Node.js
6. If Empty Service:
   - Railway will create an empty service
   - You'll need to connect it to your code

#### Option B: Using CLI

```powershell
# Make sure you're in the backend folder
cd backend

# Link to your Railway project
railway link

# This will ask you to select the project - choose "poetic-light"

# Deploy
railway up
```

### Step 2: Set Environment Variables in Railway

**Before deploying**, set all your environment variables in Railway dashboard:

1. Go to Railway dashboard → Your Service → **Variables** tab
2. Add all variables (see list below)

**Or use CLI:**
```powershell
cd backend

# MongoDB (get from MongoDB Atlas)
railway variables set MONGODB_URI="your-mongodb-connection-string"

# Firebase
railway variables set FIREBASE_PROJECT_ID="party-connect-q8z7m3"
railway variables set FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com"
railway variables set FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDe/z+E5LqlsCc3\nJkGSvKx/RTwEdJ3Qwei6oP+fGM2eC8M6OJTg6zKeba1uoZbmrNYlsRRTD+dBH38t\nxtEgHKKOX7MJ3Vi6iOsZy5zrnQFSREF1SLSMAVWTffCTXrnEQ4InHRNmF6NhY5ma\n9pl4t/4p7dYjdW8oN6WlVpgSBb6f8uYVC/dYOO3LFsCv/Yb/MPnEG6Oc6NE3fAyZ\ngf9jsuet8jhWEmASYyLxyBoPK2uKHF+tOZ6nLc0P72DExCB2N7mdWiUi3VMVx6vd\nzB4c6UlzGdrKNpJr5K4VGtsd5GbdiyxO0FxL0pmAGvpnFde2ZVzgOsP5O2VnnLG9\nNYCgdCXHAgMBAAECggEAJwxjPw4ecO0LsOiOCvfm7NJe1Bjnmaqa6jNPD7j0KHy+\nzu8hgtEsp/lkqT66geI6DZeYi4L5Z7nwNz/dVtYs0OmJHG0aIG/hWz8AV3HCzXkO\nTU9R7kI9jfo7qlKoDOoVXGwG/ZWeEmuydiRAc5ckdosjOEpUEKLN6snjDyTaYH+A\ngGzdPrEVHVPepLpH4T5j4MM8QI080QmWmxWzn04JoGAhF6OSqV5l/i0tXaxZzn/p\n2VwWToHGDYDXabETTbo2YepQmS3ReyhFKDynIIX8xxhsTk9yYwaI1b7FmmfjMk+6\n7fd/TVMSW6o9v9SUJzcuJ3A5kw2S/rUS54gMhB7GQQKBgQDz/sbQyUFR97yK1Wji\nS6jot/K6ZSHwOSYs/hgnPAI/lykjnavznpjHCBP5ojksIA/o2xMKUuzjo2fL82of\naoBbmzdm0CJvXQB11v/Ji4SRVyHp81RkAcjgE/Pdat/AmEs1AQByG0+SKudsqS8g\nGStR3MLI0rr1FIJJ0rnoEUxQ2QKBgQDp9/2j76PqYhkSxfKti682odFaojHVsyaA\nHcVsQP6IiX7l+BhitIwuIBAh99av9WMZMMe8VdufpalKKk19XpOsQotDu5w5cyPT\nDzwPY4EniHHuXoSnLSToxGVJslw8wIABWVuexaajbHoaUlPYdI2IDh+IJkDFtg6u\nTf9MQ5gHnwKBgDyR2a8I1uNPOYnJcpECsTqcN3BYHLWyqixvI3XR6sj4cGj8Aiyn\nCUwXUEYfJEw05V4rzC066r2T2feCRKzp1lVnUbh/IJ0+nBekuLjCnrUpySx3kFKH\nMuOVcGtd1Y/M/pZ42jB5YSZq6ipKUX2JYfyfbedGkMy4O6Ox4R6f9K75AoGBAMlV\nykJkWZ28RO9OwAJvjZtprIpdwJywyZS+CcGaPG6qQzUKRZHK5EZc+QUCDRDmDR0E\nSRzclV3QZNmZhY048cLukID81PbrCgz5syla6y1l0QTa+TQTOQvE1ZSRk6YD0SNY\nDeuXEkrXcktsRRKjWZeW77Ntl5eLjx6Xp/WsxQrpAoGBANEslAHPzuA1OEqktCR+\nv+858nZUnoPJ5O4MmhZhdGj+o/vc/GcTCysv7Ft69R1cYYMW4vppyizqBm+eOyRX\nRwb/XpHstwbWMooLsVatry/dzzFD+ODzDsRXJVSxHxer4txsiugQQjYnCAErZe0V\nXCn2NZRvGNVk0YBsLn9v6K7S\n-----END PRIVATE KEY-----\n"

# Stripe (Your actual LIVE keys)
railway variables set STRIPE_SECRET_KEY="sk_live_YOUR_ACTUAL_KEY"
railway variables set STRIPE_PUBLISHABLE_KEY="pk_live_YOUR_ACTUAL_KEY"

# PayPal (Your actual LIVE credentials)
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

### Step 3: Wait for Deployment

- Railway will build and deploy your backend
- Takes 2-5 minutes
- Watch the logs in Railway dashboard

### Step 4: Get Your Railway URL

Once deployed:

```powershell
cd backend
railway domain
```

Or in Railway dashboard:
- Click on your service
- Go to **Settings** → **Domains**
- Copy the URL (e.g., `https://your-service.up.railway.app`)

### Step 5: Update EAS Secret with Real URL

```powershell
# Go back to root directory
cd ..

# Delete old placeholder secret
npx eas-cli env:delete --scope project --name EXPO_PUBLIC_API_URL

# Create new one with REAL Railway URL (replace with your actual URL)
npx eas-cli env:create --scope project --name EXPO_PUBLIC_API_URL --value "https://YOUR_ACTUAL_RAILWAY_URL.up.railway.app/api" --type string
```

### Step 6: Build Your App

Now you can build:

```powershell
npx eas-cli build --platform android --profile preview
```

When prompted:
- **Android application id**: `com.mycompany.partyconnect`
- **Generate keystore**: `Yes`

---

## 🎯 Quick Summary

1. **Add service** to Railway (dashboard or CLI)
2. **Set environment variables** (all your credentials)
3. **Deploy** (Railway does this automatically)
4. **Get URL** (`railway domain`)
5. **Update EAS secret** with real URL
6. **Build app** (`npx eas-cli build`)

---

## ⚠️ Important

You **must** deploy the backend first before building the app, because:
- The app needs the real API URL
- The backend must be running for the app to work
- You can't test without a live backend

**Start with Step 1** - Add a service to Railway! 🚀

