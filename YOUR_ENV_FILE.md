# 📝 Your .env File Content

## ✅ Copy This to Your .env File

Create or update `.env` file in the **root directory** (same level as `package.json`) with this content:

```bash
# ============================================
# REQUIRED - API Configuration
# ============================================
EXPO_PUBLIC_API_URL=https://poetic-light-production.up.railway.app/api

# ============================================
# REQUIRED - Google Sign-In
# ============================================
EXPO_PUBLIC_GOOGLE_CLIENT_ID=982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com
```

---

## 📋 Complete .env File (With Optional Variables)

If you want to include optional variables (they have defaults, but you can override):

```bash
# ============================================
# REQUIRED - API Configuration
# ============================================
EXPO_PUBLIC_API_URL=https://poetic-light-production.up.railway.app/api

# ============================================
# REQUIRED - Google Sign-In
# ============================================
EXPO_PUBLIC_GOOGLE_CLIENT_ID=982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com

# ============================================
# OPTIONAL - App Configuration
# ============================================
# Uncomment to override defaults
# EXPO_PUBLIC_BUNDLE_ID=com.mycompany.partyconnect
# EXPO_PUBLIC_ANDROID_PACKAGE=com.mycompany.partyconnect
# EXPO_PUBLIC_IOS_BUILD_NUMBER=1
# EXPO_PUBLIC_ANDROID_VERSION_CODE=1

# ============================================
# OPTIONAL - Legal URLs
# ============================================
# Update when you create these pages
# EXPO_PUBLIC_PRIVACY_POLICY_URL=https://partyconnect.app/privacy-policy
# EXPO_PUBLIC_TERMS_URL=https://partyconnect.app/terms-of-service
# EXPO_PUBLIC_SUPPORT_EMAIL=support@partyconnect.app
# EXPO_PUBLIC_WEBSITE_URL=https://partyconnect.app

# ============================================
# OPTIONAL - Environment
# ============================================
# EXPO_PUBLIC_ENV=production
```

---

## ✅ Minimum Required (What You Need)

**Just these 2 lines are required:**

```bash
EXPO_PUBLIC_API_URL=https://poetic-light-production.up.railway.app/api
EXPO_PUBLIC_GOOGLE_CLIENT_ID=982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com
```

Everything else has defaults in `app.config.js`.

---

## 📍 Where to Put It

- **File**: `.env` (in the root directory, same folder as `package.json`)
- **Location**: `C:\Users\vizba\Downloads\PartyConnect\.env`

---

## ✅ Status

- ✅ API URL: Set to your Railway backend
- ✅ Google Client ID: Set to your Web Client ID
- ✅ All other variables: Have defaults, optional to override

**Your .env file is ready!** You can now build your app. 🚀

