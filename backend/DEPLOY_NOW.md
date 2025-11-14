# 🚀 Deploy Backend NOW - Render (Free)

## The Problem
Railway free tier only allows databases, not web services.

## The Solution
**Use Render** - Free web service deployment!

## Quick Steps (5 minutes)

### 1. Go to Render
👉 https://render.com

### 2. Sign Up
- Click "Get Started"
- Sign up with **GitHub** (connects your repo automatically)

### 3. Create Web Service
- Click **"New +"** → **"Web Service"**
- Select your GitHub repository
- **IMPORTANT Settings:**
  - **Name**: `partyconnect-api`
  - **Root Directory**: `backend` ⚠️ **MUST SET THIS!**
  - **Environment**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `node server.js`
  - **Plan**: **Free**

### 4. Add Environment Variables
In the **Environment** tab, add these 15 variables:

**Quick Copy-Paste List:**
1. `MONGODB_URI` = `mongodb+srv://vizbarast_db_user:UQrFXHI8dvXz1vIe@partyconnect.b32nyge.mongodb.net/partyconnect?retryWrites=true&w=majority`
2. `FIREBASE_PROJECT_ID` = `party-connect-q8z7m3`
3. `FIREBASE_CLIENT_EMAIL` = `firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com`
4. `FIREBASE_PRIVATE_KEY` = (paste from your Firebase JSON file)
5. `STRIPE_SECRET_KEY` = `your_stripe_secret_key_here`
6. `STRIPE_PUBLISHABLE_KEY` = `pk_live_51OMCDWGYSmJketTkw3nnIbyDg54BFBIG8zjxm3UIh7RvSTVetC0bOzcqvfvmWdkWknz8g2qxMc8dalNfu5xHrwUW00ONoP1mId`
7. `PAYPAL_CLIENT_ID` = `AQG6uInwsAVbZ-tSOvGSUg0stYzx0LUcFUWFlh_liD2ce1DYDnYMeXFlvBWLj6mSRbF-F-aAOqfy-gXS`
8. `PAYPAL_SECRET` = `ECmeLOih1RvgeHc9NsOc2226D3Tex7K8dEzyPNc0nCAlBR8LqdvXxgfxubV60aZsBRyzmcYjSYCYIuz5`
9. `PAYPAL_MODE` = `live`
10. `JWT_SECRET` = `9201d07faad672a17cc424e9ed2db0fcf921961280b312984b9636f9b14fe151`
11. `NODE_ENV` = `production`
12. `PORT` = `3000`
13. `COMMISSION_RATE` = `0.05`
14. `ESCROW_AUTO_RELEASE_HOURS` = `24`
15. `ALLOWED_ORIGINS` = `*`

**For Firebase Private Key**, copy the entire key from your Firebase JSON file (the value between quotes for `private_key`).

### 5. Deploy
- Click **"Create Web Service"**
- Wait 2-5 minutes
- Watch the **Logs** tab
- When done, you'll see: `https://your-service.onrender.com`

### 6. Test
Visit: `https://your-service.onrender.com/api/health`
Should return: `{"status":"ok"}`

### 7. Update Mobile App
Update your `.env` file:
```bash
EXPO_PUBLIC_API_URL=https://your-service.onrender.com/api
```

---

## ✅ Done!
Your backend is now live on Render! 🎉

**Note**: Free tier sleeps after 15 min inactivity. First request after sleep takes ~30 seconds. Upgrade to Starter ($7/month) for always-on.

---

## Need Help?
- See `SWITCH_TO_RENDER.md` for detailed instructions
- See `RENDER_QUICK_START.md` for quick reference

