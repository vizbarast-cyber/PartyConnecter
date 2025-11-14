# 🎨 Switch to Render - Free Web Service Deployment

## Why Render?
- ✅ Free tier for web services (Railway only allows databases on free tier)
- ✅ No payment required
- ✅ Easy setup
- ✅ Auto-deploy from GitHub

## Quick Setup (10 Minutes)

### Step 1: Create Render Account
1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with **GitHub** (easiest - connects your repo)

### Step 2: Create Web Service
1. After signing up, click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub account (if not already)
4. Select your **repository** (PartyConnect)
5. Configure:
   - **Name**: `partyconnect-api`
   - **Root Directory**: `backend` ⚠️ Important!
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: **Free** (or Starter $7/month for always-on)

### Step 3: Add Environment Variables
1. In Render dashboard → Your service → **Environment** tab
2. Click **"Add Environment Variable"** for each one

**Add these 15 variables:**

1. **MONGODB_URI** = `mongodb+srv://vizbarast_db_user:UQrFXHI8dvXz1vIe@partyconnect.b32nyge.mongodb.net/partyconnect?retryWrites=true&w=majority`

2. **FIREBASE_PROJECT_ID** = `party-connect-q8z7m3`

3. **FIREBASE_CLIENT_EMAIL** = `firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com`

4. **FIREBASE_PRIVATE_KEY** = (paste entire key - see below)

5. **STRIPE_SECRET_KEY** = `your_stripe_secret_key_here`

6. **STRIPE_PUBLISHABLE_KEY** = `pk_live_51OMCDWGYSmJketTkw3nnIbyDg54BFBIG8zjxm3UIh7RvSTVetC0bOzcqvfvmWdkWknz8g2qxMc8dalNfu5xHrwUW00ONoP1mId`

7. **PAYPAL_CLIENT_ID** = `AQG6uInwsAVbZ-tSOvGSUg0stYzx0LUcFUWFlh_liD2ce1DYDnYMeXFlvBWLj6mSRbF-F-aAOqfy-gXS`

8. **PAYPAL_SECRET** = `ECmeLOih1RvgeHc9NsOc2226D3Tex7K8dEzyPNc0nCAlBR8LqdvXxgfxubV60aZsBRyzmcYjSYCYIuz5`

9. **PAYPAL_MODE** = `live`

10. **JWT_SECRET** = `9201d07faad672a17cc424e9ed2db0fcf921961280b312984b9636f9b14fe151`

11. **NODE_ENV** = `production`

12. **PORT** = `3000`

13. **COMMISSION_RATE** = `0.05`

14. **ESCROW_AUTO_RELEASE_HOURS** = `24`

15. **ALLOWED_ORIGINS** = `*`

**Firebase Private Key** (paste exactly as shown):
```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDe/z+E5LqlsCc3
JkGSvKx/RTwEdJ3Qwei6oP+fGM2eC8M6OJTg6zKeba1uoZbmrNYlsRRTD+dBH38t
xtEgHKKOX7MJ3Vi6iOsZy5zrnQFSREF1SLSMAVWTffCTXrnEQ4InHRNmF6NhY5ma
9pl4t/4p7dYjdW8oN6WlVpgSBb6f8uYVC/dYOO3LFsCv/Yb/MPnEG6Oc6NE3fAyZ
gf9jsuet8jhWEmASYyLxyBoPK2uKHF+tOZ6nLc0P72DExCB2N7mdWiUi3VMVx6vd
zB4c6UlzGdrKNpJr5K4VGtsd5GbdiyxO0FxL0pmAGvpnFde2ZVzgOsP5O2VnnLG9
NYCgdCXHAgMBAAECggEAJwxjPw4ecO0LsOiOCvfm7NJe1Bjnmaqa6jNPD7j0KHy+
zu8hgtEsp/lkqT66geI6DZeYi4L5Z7nwNz/dVtYs0OmJHG0aIG/hWz8AV3HCzXkO
TU9R7kI9jfo7qlKoDOoVXGwG/ZWeEmuydiRAc5ckdosjOEpUEKLN6snjDyTaYH+A
gGzdPrEVHVPepLpH4T5j4MM8QI080QmWmxWzn04JoGAhF6OSqV5l/i0tXaxZzn/p
2VwWToHGDYDXabETTbo2YepQmS3ReyhFKDynIIX8xxhsTk9yYwaI1b7FmmfjMk+6
7fd/TVMSW6o9v9SUJzcuJ3A5kw2S/rUS54gMhB7GQQKBgQDz/sbQyUFR97yK1Wji
S6jot/K6ZSHwOSYs/hgnPAI/lykjnavznpjHCBP5ojksIA/o2xMKUuzjo2fL82of
aoBbmzdm0CJvXQB11v/Ji4SRVyHp81RkAcjgE/Pdat/AmEs1AQByG0+SKudsqS8g
GStR3MLI0rr1FIJJ0rnoEUxQ2QKBgQDp9/2j76PqYhkSxfKti682odFaojHVsyaA
HcVsQP6IiX7l+BhitIwuIBAh99av9WMZMMe8VdufpalKKk19XpOsQotDu5w5cyPT
DzwPY4EniHHuXoSnLSToxGVJslw8wIABWVuexaajbHoaUlPYdI2IDh+IJkDFtg6u
Tf9MQ5gHnwKBgDyR2a8I1uNPOYnJcpECsTqcN3BYHLWyqixvI3XR6sj4cGj8Aiyn
CUwXUEYfJEw05V4rzC066r2T2feCRKzp1lVnUbh/IJ0+nBekuLjCnrUpySx3kFKH
MuOVcGtd1Y/M/pZ42jB5YSZq6ipKUX2JYfyfbedGkMy4O6Ox4R6f9K75AoGBAMlV
ykJkWZ28RO9OwAJvjZtprIpdwJywyZS+CcGaPG6qQzUKRZHK5EZc+QUCDRDmDR0E
SRzclV3QZNmZhY048cLukID81PbrCgz5syla6y1l0QTa+TQTOQvE1ZSRk6YD0SNY
DeuXEkrXcktsRRKjWZeW77Ntl5eLjx6Xp/WsxQrpAoGBANEslAHPzuA1OEqktCR+
v+858nZUnoPJ5O4MmhZhdGj+o/vc/GcTCysv7Ft69R1cYYMW4vppyizqBm+eOyRX
Rwb/XpHstwbWMooLsVatry/dzzFD+ODzDsRXJVSxHxer4txsiugQQjYnCAErZe0V
XCn2NZRvGNVk0YBsLn9v6K7S
-----END PRIVATE KEY-----
```

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Render will start building (2-5 minutes)
3. Watch the **Logs** tab for progress
4. When done, you'll get a URL: `https://your-service.onrender.com`

### Step 5: Update Mobile App
Update your `.env` file:
```bash
EXPO_PUBLIC_API_URL=https://your-service.onrender.com/api
```

---

## ✅ Advantages of Render
- ✅ Free tier for web services
- ✅ No payment required
- ✅ Auto-deploy from GitHub
- ✅ Easy environment variable management
- ✅ Automatic HTTPS

---

## ⚠️ Free Tier Note
- Service sleeps after 15 min of inactivity
- First request after sleep takes ~30 seconds to wake up
- Upgrade to Starter ($7/month) for always-on service

---

## 🎯 Quick Steps Summary
1. Sign up at render.com with GitHub
2. New → Web Service
3. Connect repo, set root directory to `backend`
4. Add all 15 environment variables
5. Deploy!
6. Update mobile app `.env` with new URL

**This is the easiest free option!** 🚀

