# 🚂 Add Service to Railway - Quick Fix

## The Issue
Railway dashboard is only showing "Database" option. You need to add a **Service** (not database) for your backend.

## Solution: Use CLI to Add Service

Since the dashboard isn't showing the right options, use the terminal:

### Step 1: Link Your Backend Folder to Railway

```powershell
# Make sure you're in the backend folder
cd backend

# Link to your Railway project
railway link
```

This will:
- Ask you to select a project → Choose **"poetic-light"**
- Link your local backend folder to Railway

### Step 2: Deploy the Service

```powershell
# Deploy your backend
railway up
```

This will:
- Create a service in Railway
- Build and deploy your backend
- Give you a URL when done

### Step 3: Set Environment Variables

**Before or after deployment**, set your environment variables:

```powershell
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

### Step 4: Get Your Railway URL

After deployment completes:

```powershell
railway domain
```

This will show your Railway URL (e.g., `https://your-service.up.railway.app`)

---

## Alternative: Try Dashboard Again

Sometimes refreshing helps. Try:

1. **Refresh the page** (F5)
2. Click **"+ Create"** button again
3. Look for **"Empty Service"** or **"GitHub Repo"** options
4. If you see "GitHub Repo", you can connect your GitHub repository

---

## Quick Command Summary

```powershell
# 1. Go to backend folder
cd backend

# 2. Link to Railway
railway link

# 3. Set variables (replace with your actual values)
railway variables set MONGODB_URI="your-mongodb-uri"
railway variables set FIREBASE_PROJECT_ID="party-connect-q8z7m3"
# ... (add all other variables)

# 4. Deploy
railway up

# 5. Get URL
railway domain
```

---

## What Happens Next

1. Railway will create a service
2. Build your Node.js backend
3. Deploy it
4. Give you a URL
5. You can then update your EAS secret and build the app!

**Start with `railway link` in the backend folder!** 🚀

