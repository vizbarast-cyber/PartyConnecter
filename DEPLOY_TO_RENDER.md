# 🚀 Deploy to Render - Complete Guide

## Prerequisites
1. ✅ GitHub account (free)
2. ✅ Your code pushed to GitHub (see below if not done)

---

## Step 1: Push Code to GitHub (If Not Done)

### 1.1 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `PartyConnect`
3. Choose **Private** or **Public**
4. **DO NOT** check "Initialize with README"
5. Click **"Create repository"**

### 1.2 Push Your Code
Run these commands in your terminal:

```bash
# Make sure you're in the project root
cd C:\Users\vizba\Downloads\PartyConnect

# Add all files
git add .

# Commit
git commit -m "Initial commit - PartyConnect app"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/PartyConnect.git

# Push to GitHub
git push -u origin master
```

**Note**: If asked for password, use a GitHub Personal Access Token:
- Go to: https://github.com/settings/tokens
- Generate new token (classic)
- Check `repo` scope
- Use token as password

---

## Step 2: Deploy to Render

### 2.1 Sign Up / Sign In
1. Go to https://render.com
2. Click **"Get Started"** (or **"Sign In"**)
3. Click **"Sign up with GitHub"** (recommended - connects automatically)

### 2.2 Create Web Service
1. After signing in, click **"New +"** button (top right)
2. Select **"Web Service"**
3. If prompted, connect your GitHub account
4. Find and select your **PartyConnect** repository
5. Click **"Connect"**

### 2.3 Configure Service
Fill in these settings:

- **Name**: `partyconnect-api`
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `master` (or `main` if that's your default)
- **Root Directory**: `backend` ⚠️ **IMPORTANT!**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Plan**: **Free** (or Starter $7/month for always-on)

### 2.4 Add Environment Variables
Scroll down to **"Environment Variables"** section and click **"Add Environment Variable"** for each:

**Add these 15 variables:**

1. **Key**: `MONGODB_URI`
   **Value**: `mongodb+srv://vizbarast_db_user:UQrFXHI8dvXz1vIe@partyconnect.b32nyge.mongodb.net/partyconnect?retryWrites=true&w=majority`

2. **Key**: `FIREBASE_PROJECT_ID`
   **Value**: `party-connect-q8z7m3`

3. **Key**: `FIREBASE_CLIENT_EMAIL`
   **Value**: `firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com`

4. **Key**: `FIREBASE_PRIVATE_KEY`
   **Value**: (paste entire key from your Firebase JSON - see note below)

5. **Key**: `STRIPE_SECRET_KEY`
   **Value**: `your_stripe_secret_key_here`

6. **Key**: `STRIPE_PUBLISHABLE_KEY`
   **Value**: `pk_live_51OMCDWGYSmJketTkw3nnIbyDg54BFBIG8zjxm3UIh7RvSTVetC0bOzcqvfvmWdkWknz8g2qxMc8dalNfu5xHrwUW00ONoP1mId`

7. **Key**: `PAYPAL_CLIENT_ID`
   **Value**: `AQG6uInwsAVbZ-tSOvGSUg0stYzx0LUcFUWFlh_liD2ce1DYDnYMeXFlvBWLj6mSRbF-F-aAOqfy-gXS`

8. **Key**: `PAYPAL_SECRET`
   **Value**: `ECmeLOih1RvgeHc9NsOc2226D3Tex7K8dEzyPNc0nCAlBR8LqdvXxgfxubV60aZsBRyzmcYjSYCYIuz5`

9. **Key**: `PAYPAL_MODE`
   **Value**: `live`

10. **Key**: `JWT_SECRET`
    **Value**: `9201d07faad672a17cc424e9ed2db0fcf921961280b312984b9636f9b14fe151`

11. **Key**: `NODE_ENV`
    **Value**: `production`

12. **Key**: `PORT`
    **Value**: `3000`

13. **Key**: `COMMISSION_RATE`
    **Value**: `0.05`

14. **Key**: `ESCROW_AUTO_RELEASE_HOURS`
    **Value**: `24`

15. **Key**: `ALLOWED_ORIGINS`
    **Value**: `*`

**Firebase Private Key Note**: 
- Open your Firebase service account JSON file
- Find the `private_key` field
- Copy the ENTIRE value (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
- Paste it exactly as shown (with newlines)

### 2.5 Deploy
1. Scroll to bottom
2. Click **"Create Web Service"**
3. Render will start building (2-5 minutes)
4. Watch the **"Logs"** tab for progress

### 2.6 Get Your URL
Once deployed, you'll see:
- **Service URL**: `https://partyconnect-api.onrender.com` (or similar)
- **API URL**: `https://partyconnect-api.onrender.com/api`

---

## Step 3: Test Your Backend

Visit: `https://your-service.onrender.com/api/health`

Should return: `{"status":"ok"}`

---

## Step 4: Update Mobile App

Update your `.env` file in the project root:

```bash
EXPO_PUBLIC_API_URL=https://your-service.onrender.com/api
```

Replace `your-service` with your actual Render service name.

---

## ✅ Done!

Your backend is now live on Render! 🎉

---

## 📝 Notes

### Free Tier Limitations
- Service sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Upgrade to Starter ($7/month) for always-on service

### Auto-Deploy
- Render automatically deploys when you push to GitHub
- No need to manually redeploy!

### View Logs
- Go to your service in Render dashboard
- Click **"Logs"** tab to see real-time logs

---

## 🆘 Troubleshooting

**Build fails?**
- Check logs in Render dashboard
- Make sure `Root Directory` is set to `backend`
- Verify all environment variables are set

**Service won't start?**
- Check logs for errors
- Verify MongoDB connection string is correct
- Check Firebase credentials

**Health check returns 404?**
- Make sure service is deployed (not just building)
- Wait a few minutes after deployment
- Check the service URL is correct

---

## 🎯 Next Steps

1. ✅ Backend deployed
2. Update mobile app `.env` with new API URL
3. Test the app
4. Set up webhooks (see `backend/WEBHOOK_SETUP.md`)

