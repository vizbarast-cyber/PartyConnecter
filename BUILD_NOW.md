# 🚀 Build Your App - Quick Guide

## Step 1: Set Your API URL (If Backend is Deployed)

If your Railway backend is already deployed, get the URL and set it:

```bash
# Get Railway URL
cd backend
railway domain

# Set as EAS secret (replace with your actual URL)
npx eas-cli secret:create --scope project --name EXPO_PUBLIC_API_URL --value "https://your-app.up.railway.app/api"
```

**Or** create/update `.env` file in root:
```bash
EXPO_PUBLIC_API_URL=https://your-app.up.railway.app/api
```

## Step 2: Build Android (Recommended First)

```bash
npx eas-cli build --platform android --profile preview
```

This will:
- Create an APK file for testing
- Take 10-20 minutes (first time)
- Ask to generate Android keystore (say "Yes")

## Step 3: Build iOS (If Needed)

```bash
npx eas-cli build --platform ios --profile preview
```

**Note**: Requires Apple Developer account ($99/year)

## Step 4: Check Build Status

```bash
npx eas-cli build:list
```

## Step 5: Download Build

When build completes, you'll get a download link. Or:

```bash
npx eas-cli build:view [BUILD_ID]
```

---

## Quick Commands

```bash
# Android Preview (APK - for testing)
npm run build:android

# iOS Preview (IPA - for testing)
npm run build:ios

# Both platforms
npm run build:all
```

---

## ⚠️ Important Notes

1. **First Build**: Takes longer, generates keystore
2. **API URL**: Make sure it's set before building
3. **Keystore**: EAS manages it securely - don't worry about it
4. **Build Time**: 10-20 minutes typically

---

## 🎯 Recommended: Start with Android Preview

```bash
npx eas-cli build --platform android --profile preview
```

Then test the APK on your Android device!
