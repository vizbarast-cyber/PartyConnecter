# 📝 .env File Guide

## ✅ Your Complete .env File

I've created your `.env` file with all the essential variables. Here's what's included:

### Required Variables (Already Set)

```bash
# API URL - Your Railway backend
EXPO_PUBLIC_API_URL=https://poetic-light-production.up.railway.app/api

# Google Sign-In - Web Client ID
EXPO_PUBLIC_GOOGLE_CLIENT_ID=982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com
```

### Optional Variables (Commented Out - Uncomment if Needed)

These have defaults in `app.config.js`, but you can override them:

```bash
# App Identifiers
EXPO_PUBLIC_BUNDLE_ID=com.mycompany.partyconnect
EXPO_PUBLIC_ANDROID_PACKAGE=com.mycompany.partyconnect

# Build Numbers
EXPO_PUBLIC_IOS_BUILD_NUMBER=1
EXPO_PUBLIC_ANDROID_VERSION_CODE=1

# Legal URLs (update when you create these pages)
EXPO_PUBLIC_PRIVACY_POLICY_URL=https://partyconnect.app/privacy-policy
EXPO_PUBLIC_TERMS_URL=https://partyconnect.app/terms-of-service
EXPO_PUBLIC_SUPPORT_EMAIL=support@partyconnect.app
EXPO_PUBLIC_WEBSITE_URL=https://partyconnect.app

# Environment
EXPO_PUBLIC_ENV=production
```

---

## 📋 What Each Variable Does

### `EXPO_PUBLIC_API_URL` ✅ REQUIRED
- **What**: Your backend API URL
- **Current Value**: `https://poetic-light-production.up.railway.app/api`
- **Used By**: All API calls in the app
- **Status**: ✅ Set correctly

### `EXPO_PUBLIC_GOOGLE_CLIENT_ID` ✅ REQUIRED
- **What**: Google Sign-In Web Client ID
- **Current Value**: `982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com`
- **Used By**: Google authentication
- **Status**: ✅ Set correctly

### Optional Variables (Have Defaults)

These are optional because `app.config.js` has fallback values:

- **Bundle/Package IDs**: Defaults to `com.mycompany.partyconnect`
- **Build Numbers**: Defaults to `1`
- **Legal URLs**: Defaults to `https://partyconnect.app/...`
- **Support Email**: Defaults to `support@partyconnect.app`

---

## 🔒 Security Notes

1. **Never commit `.env` to Git** - It's already in `.gitignore`
2. **`.env.example`** - Safe to commit (no real values)
3. **EAS Secrets** - For production builds, also set these in EAS dashboard

---

## ✅ Your .env File is Ready!

The `.env` file has been created with:
- ✅ Your Railway API URL
- ✅ Google Client ID
- ✅ All optional variables commented (ready to uncomment if needed)

**You're all set!** You can now build your app. 🚀

---

## 🚀 Next Step: Build

```powershell
npx eas-cli build --platform android --profile preview
```

The app will automatically use the values from your `.env` file!

