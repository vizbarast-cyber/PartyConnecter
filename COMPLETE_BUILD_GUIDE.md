# 🚀 Complete Build Guide - Step by Step

## Current Status
- ✅ Railway project created: `poetic-light`
- ✅ EAS secret created (but needs real URL)
- ⚠️ Railway backend not deployed yet (no services)
- ⚠️ Need to build mobile app

## Step 1: Deploy Backend to Railway First

You need to deploy your backend to get the API URL before building the app.

### Option A: Using Railway Dashboard (Easiest)

1. Go to https://railway.app
2. Open your project `poetic-light`
3. Click **"+ Create"** button (top right)
4. Select **"GitHub Repo"** (if your code is on GitHub) OR **"Empty Service"**
5. If GitHub: Select your repo and the `backend` folder
6. Railway will auto-detect Node.js and deploy
7. Wait for deployment (2-5 minutes)
8. Click on your service → **Settings** → **Domains**
9. Copy your Railway URL (e.g., `https://your-app.up.railway.app`)

### Option B: Using CLI

```powershell
# Make sure you're in the backend folder
cd backend

# Link to Railway project
railway link

# Deploy
railway up

# Get URL
railway domain
```

**Important**: Set all environment variables in Railway dashboard before deploying!

---

## Step 2: Update EAS Secret with Real URL

Once you have your Railway URL:

```powershell
# Delete the old placeholder secret
npx eas-cli env:delete --scope project --name EXPO_PUBLIC_API_URL

# Create new one with real URL (replace with your actual Railway URL)
npx eas-cli env:create --scope project --name EXPO_PUBLIC_API_URL --value "https://your-actual-railway-url.up.railway.app/api" --type string
```

---

## Step 3: Build the Mobile App

### For Android (Recommended First):

```powershell
# Make sure you're in the root directory (not backend)
cd ..

# Build Android APK
npx eas-cli build --platform android --profile preview
```

**When prompted:**
- **Android application id**: Type `com.mycompany.partyconnect` and press Enter
- **Generate keystore**: Type `Yes` and press Enter

### Build will:
- Take 10-20 minutes (first time)
- Generate Android keystore automatically
- Create an APK file you can download
- Give you a download link when complete

### Check Build Status:

```powershell
npx eas-cli build:list
```

### Download Build:

When complete, you'll get a download link. Or:

```powershell
npx eas-cli build:view [BUILD_ID]
```

---

## Step 4: Test Your App

1. Download the APK file
2. Transfer to your Android device
3. Install (enable "Install from unknown sources" if needed)
4. Test all features
5. Make sure API calls work (check if backend URL is correct)

---

## Quick Checklist

- [ ] Deploy backend to Railway
- [ ] Get Railway API URL
- [ ] Update EAS secret with real URL
- [ ] Build Android app
- [ ] Download and test APK
- [ ] Verify API connectivity

---

## Troubleshooting

### "Project does not have any services"
→ You need to add a service in Railway dashboard first (Step 1)

### "Input is required, but stdin is not readable"
→ The command needs interactive input. Make sure you're running in a terminal that supports input.

### Build fails
→ Check:
1. API URL is set correctly in EAS
2. All required files exist (app.config.js, package.json, etc.)
3. Check build logs: `npx eas-cli build:view [BUILD_ID]`

---

## Next Steps After Build

1. Test the APK on your device
2. If API doesn't work, check Railway logs
3. Set up webhooks (see `backend/WEBHOOK_SETUP.md`)
4. Build production version when ready

---

## 🎯 Recommended Order

1. **First**: Deploy backend to Railway (get URL)
2. **Second**: Update EAS secret with real URL
3. **Third**: Build mobile app
4. **Fourth**: Test everything

You're currently at step 1 - need to deploy the backend first! 🚀

