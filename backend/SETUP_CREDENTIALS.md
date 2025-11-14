# 🔐 Production Credentials Setup Guide

Complete guide to set up all production credentials for deployment.

## 🔥 Firebase Credentials (Already Extracted)

From your Firebase service account JSON file, here are your credentials:

### Environment Variables to Set:

```bash
FIREBASE_PROJECT_ID=party-connect-q8z7m3
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDe/z+E5LqlsCc3\nJkGSvKx/RTwEdJ3Qwei6oP+fGM2eC8M6OJTg6zKeba1uoZbmrNYlsRRTD+dBH38t\nxtEgHKKOX7MJ3Vi6iOsZy5zrnQFSREF1SLSMAVWTffCTXrnEQ4InHRNmF6NhY5ma\n9pl4t/4p7dYjdW8oN6WlVpgSBb6f8uYVC/dYOO3LFsCv/Yb/MPnEG6Oc6NE3fAyZ\ngf9jsuet8jhWEmASYyLxyBoPK2uKHF+tOZ6nLc0P72DExCB2N7mdWiUi3VMVx6vd\nzB4c6UlzGdrKNpJr5K4VGtsd5GbdiyxO0FxL0pmAGvpnFde2ZVzgOsP5O2VnnLG9\nNYCgdCXHAgMBAAECggEAJwxjPw4ecO0LsOiOCvfm7NJe1Bjnmaqa6jNPD7j0KHy+\nzu8hgtEsp/lkqT66geI6DZeYi4L5Z7nwNz/dVtYs0OmJHG0aIG/hWz8AV3HCzXkO\nTU9R7kI9jfo7qlKoDOoVXGwG/ZWeEmuydiRAc5ckdosjOEpUEKLN6snjDyTaYH+A\ngGzdPrEVHVPepLpH4T5j4MM8QI080QmWmxWzn04JoGAhF6OSqV5l/i0tXaxZzn/p\n2VwWToHGDYDXabETTbo2YepQmS3ReyhFKDynIIX8xxhsTk9yYwaI1b7FmmfjMk+6\n7fd/TVMSW6o9v9SUJzcuJ3A5kw2S/rUS54gMhB7GQQKBgQDz/sbQyUFR97yK1Wji\nS6jot/K6ZSHwOSYs/hgnPAI/lykjnavznpjHCBP5ojksIA/o2xMKUuzjo2fL82of\naoBbmzdm0CJvXQB11v/Ji4SRVyHp81RkAcjgE/Pdat/AmEs1AQByG0+SKudsqS8g\nGStR3MLI0rr1FIJJ0rnoEUxQ2QKBgQDp9/2j76PqYhkSxfKti682odFaojHVsyaA\nHcVsQP6IiX7l+BhitIwuIBAh99av9WMZMMe8VdufpalKKk19XpOsQotDu5w5cyPT\nDzwPY4EniHHuXoSnLSToxGVJslw8wIABWVuexaajbHoaUlPYdI2IDh+IJkDFtg6u\nTf9MQ5gHnwKBgDyR2a8I1uNPOYnJcpECsTqcN3BYHLWyqixvI3XR6sj4cGj8Aiyn\nCUwXUEYfJEw05V4rzC066r2T2feCRKzp1lVnUbh/IJ0+nBekuLjCnrUpySx3kFKH\nMuOVcGtd1Y/M/pZ42jB5YSZq6ipKUX2JYfyfbedGkMy4O6Ox4R6f9K75AoGBAMlV\nykJkWZ28RO9OwAJvjZtprIpdwJywyZS+CcGaPG6qQzUKRZHK5EZc+QUCDRDmDR0E\nSRzclV3QZNmZhY048cLukID81PbrCgz5syla6y1l0QTa+TQTOQvE1ZSRk6YD0SNY\nDeuXEkrXcktsRRKjWZeW77Ntl5eLjx6Xp/WsxQrpAoGBANEslAHPzuA1OEqktCR+\nv+858nZUnoPJ5O4MmhZhdGj+o/vc/GcTCysv7Ft69R1cYYMW4vppyizqBm+eOyRX\nRwb/XpHstwbWMooLsVatry/dzzFD+ODzDsRXJVSxHxer4txsiugQQjYnCAErZe0V\nXCn2NZRvGNVk0YBsLn9v6K7S\n-----END PRIVATE KEY-----\n"
```

**⚠️ Important**: When setting `FIREBASE_PRIVATE_KEY` in hosting platforms:
- Preserve the `\n` characters (they represent newlines)
- Keep the quotes around the entire key
- Some platforms may require escaping - check platform documentation

---

## 💳 Stripe LIVE Keys Setup

### Step 1: Switch to Live Mode
1. Go to https://dashboard.stripe.com
2. Click the **"Test mode"** toggle in the top right
3. Switch to **"Live mode"** (toggle will show "Live mode")

### Step 2: Get Your LIVE Keys
1. In Stripe Dashboard, go to **Developers** → **API keys**
2. You'll see two keys:
   - **Publishable key** (starts with `pk_live_...`)
   - **Secret key** (starts with `sk_live_...`) - Click "Reveal test key" to see it

### Step 3: Set Environment Variables
```bash
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
```

### Step 4: Set Up Webhook (After Deployment)
1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **"Add endpoint"**
3. Enter your API URL: `https://your-api-url.com/api/payments/webhook/stripe`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the **Webhook signing secret** (starts with `whsec_...`)
6. Set environment variable:
```bash
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

**⚠️ Important**: 
- Use **LIVE** keys, not test keys (test keys start with `sk_test_` and `pk_test_`)
- Webhook secret is different from API keys
- Set up webhook AFTER you have your production API URL

---

## 💰 PayPal LIVE Credentials Setup

### Step 1: Switch to Live Mode
1. Go to https://developer.paypal.com
2. Log in with your PayPal business account
3. Click on your app in the dashboard
4. Toggle from **"Sandbox"** to **"Live"** mode

### Step 2: Get Your LIVE Credentials
1. In PayPal Developer Dashboard, go to your app
2. Make sure you're in **"Live"** mode (not Sandbox)
3. You'll see:
   - **Client ID** (long string)
   - **Secret** (click "Show" to reveal)

### Step 3: Set Environment Variables
```bash
PAYPAL_CLIENT_ID=YOUR_LIVE_CLIENT_ID_HERE
PAYPAL_SECRET=YOUR_LIVE_SECRET_HERE
PAYPAL_MODE=live
```

**⚠️ Important**:
- Make sure `PAYPAL_MODE=live` (not `sandbox`)
- Use credentials from **Live** mode, not Sandbox
- You need a PayPal Business account for live mode

### Step 4: Set Up Webhook (After Deployment)
1. In PayPal Dashboard, go to **My Apps & Credentials**
2. Click on your app → **Webhooks**
3. Click **"Add Webhook"**
4. Enter webhook URL: `https://your-api-url.com/api/payments/webhook/paypal`
5. Select events:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `PAYMENT.CAPTURE.REFUNDED`
6. Save the webhook

---

## 🔑 JWT Secret Generation

Generate a strong random secret for JWT:

### Using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Using PowerShell:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### Or use online generator:
- https://randomkeygen.com/

Then set:
```bash
JWT_SECRET=your-generated-secret-here
```

---

## 📋 Complete Environment Variables Checklist

Copy this template and fill in all values:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/partyconnect?retryWrites=true&w=majority

# Firebase (✅ Already have these)
FIREBASE_PROJECT_ID=party-connect-q8z7m3
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDe/z+E5LqlsCc3\nJkGSvKx/RTwEdJ3Qwei6oP+fGM2eC8M6OJTg6zKeba1uoZbmrNYlsRRTD+dBH38t\nxtEgHKKOX7MJ3Vi6iOsZy5zrnQFSREF1SLSMAVWTffCTXrnEQ4InHRNmF6NhY5ma\n9pl4t/4p7dYjdW8oN6WlVpgSBb6f8uYVC/dYOO3LFsCv/Yb/MPnEG6Oc6NE3fAyZ\ngf9jsuet8jhWEmASYyLxyBoPK2uKHF+tOZ6nLc0P72DExCB2N7mdWiUi3VMVx6vd\nzB4c6UlzGdrKNpJr5K4VGtsd5GbdiyxO0FxL0pmAGvpnFde2ZVzgOsP5O2VnnLG9\nNYCgdCXHAgMBAAECggEAJwxjPw4ecO0LsOiOCvfm7NJe1Bjnmaqa6jNPD7j0KHy+\nzu8hgtEsp/lkqT66geI6DZeYi4L5Z7nwNz/dVtYs0OmJHG0aIG/hWz8AV3HCzXkO\nTU9R7kI9jfo7qlKoDOoVXGwG/ZWeEmuydiRAc5ckdosjOEpUEKLN6snjDyTaYH+A\ngGzdPrEVHVPepLpH4T5j4MM8QI080QmWmxWzn04JoGAhF6OSqV5l/i0tXaxZzn/p\n2VwWToHGDYDXabETTbo2YepQmS3ReyhFKDynIIX8xxhsTk9yYwaI1b7FmmfjMk+6\n7fd/TVMSW6o9v9SUJzcuJ3A5kw2S/rUS54gMhB7GQQKBgQDz/sbQyUFR97yK1Wji\nS6jot/K6ZSHwOSYs/hgnPAI/lykjnavznpjHCBP5ojksIA/o2xMKUuzjo2fL82of\naoBbmzdm0CJvXQB11v/Ji4SRVyHp81RkAcjgE/Pdat/AmEs1AQByG0+SKudsqS8g\nGStR3MLI0rr1FIJJ0rnoEUxQ2QKBgQDp9/2j76PqYhkSxfKti682odFaojHVsyaA\nHcVsQP6IiX7l+BhitIwuIBAh99av9WMZMMe8VdufpalKKk19XpOsQotDu5w5cyPT\nDzwPY4EniHHuXoSnLSToxGVJslw8wIABWVuexaajbHoaUlPYdI2IDh+IJkDFtg6u\nTf9MQ5gHnwKBgDyR2a8I1uNPOYnJcpECsTqcN3BYHLWyqixvI3XR6sj4cGj8Aiyn\nCUwXUEYfJEw05V4rzC066r2T2feCRKzp1lVnUbh/IJ0+nBekuLjCnrUpySx3kFKH\nMuOVcGtd1Y/M/pZ42jB5YSZq6ipKUX2JYfyfbedGkMy4O6Ox4R6f9K75AoGBAMlV\nykJkWZ28RO9OwAJvjZtprIpdwJywyZS+CcGaPG6qQzUKRZHK5EZc+QUCDRDmDR0E\nSRzclV3QZNmZhY048cLukID81PbrCgz5syla6y1l0QTa+TQTOQvE1ZSRk6YD0SNY\nDeuXEkrXcktsRRKjWZeW77Ntl5eLjx6Xp/WsxQrpAoGBANEslAHPzuA1OEqktCR+\nv+858nZUnoPJ5O4MmhZhdGj+o/vc/GcTCysv7Ft69R1cYYMW4vppyizqBm+eOyRX\nRwb/XpHstwbWMooLsVatry/dzzFD+ODzDsRXJVSxHxer4txsiugQQjYnCAErZe0V\nXCn2NZRvGNVk0YBsLn9v6K7S\n-----END PRIVATE KEY-----\n"

# Stripe (LIVE - Get from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_live_YOUR_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# PayPal (LIVE - Get from PayPal Developer Dashboard)
PAYPAL_CLIENT_ID=YOUR_LIVE_CLIENT_ID_HERE
PAYPAL_SECRET=YOUR_LIVE_SECRET_HERE
PAYPAL_MODE=live

# Security
JWT_SECRET=your-generated-secret-here
NODE_ENV=production

# Server
PORT=3000
ALLOWED_ORIGINS=https://your-app-domain.com

# Business Logic
COMMISSION_RATE=0.05
ESCROW_AUTO_RELEASE_HOURS=24
```

---

## ✅ Quick Setup Steps

1. **Firebase** ✅ - Already extracted (see above)
2. **Stripe** - Go to dashboard, switch to Live, copy keys
3. **PayPal** - Go to developer dashboard, switch to Live, copy credentials
4. **JWT Secret** - Generate using command above
5. **MongoDB** - Get connection string from MongoDB Atlas

---

## 🚨 Security Reminders

- ⚠️ **Never commit** these credentials to Git
- ⚠️ **Use LIVE keys** for production (not test/sandbox)
- ⚠️ **Keep secrets secure** - use environment variables, not code
- ⚠️ **Rotate secrets** if they're ever exposed
- ⚠️ **Test with small amounts** first in production

---

## 📝 Next Steps

1. Get Stripe LIVE keys from dashboard
2. Get PayPal LIVE credentials from developer dashboard
3. Generate JWT secret
4. Get MongoDB connection string
5. Set all variables in your hosting platform
6. Deploy!

See `DEPLOYMENT_QUICKSTART.md` for deployment steps.

