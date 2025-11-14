# 🚀 Production Configuration Guide

This guide helps you configure PartyConnect for production deployment.

## ✅ What's Already Configured

- ✅ Google Sign-In (all Client IDs configured)
- ✅ Firebase project configured
- ✅ Stripe & PayPal in live mode (as per your confirmation)
- ✅ App icons and splash screens
- ✅ EAS build configuration
- ✅ Security middleware
- ✅ Legal screens with links

## 🔧 Required Configuration Steps

### 1. Update API URL

**When your backend is deployed**, update the API URL:

**Option A: Environment Variable (Recommended)**
```bash
# In .env file
EXPO_PUBLIC_API_URL=https://your-actual-api-domain.com/api
```

**Option B: Update app.config.js**
```javascript
// In app.config.js, line 61
apiUrl: process.env.EXPO_PUBLIC_API_URL || (isDev ? 'http://localhost:3000/api' : 'https://your-actual-api-domain.com/api'),
```

**Option C: Update services/api.js**
```javascript
// In services/api.js, line 26
: 'https://your-actual-api-domain.com/api'; // Update this
```

### 2. Update Legal URLs

**Create your legal pages** and update URLs:

**Option A: Environment Variables (Recommended)**
```bash
# In .env file
EXPO_PUBLIC_PRIVACY_POLICY_URL=https://yourdomain.com/privacy-policy
EXPO_PUBLIC_TERMS_URL=https://yourdomain.com/terms-of-service
EXPO_PUBLIC_SUPPORT_EMAIL=support@yourdomain.com
EXPO_PUBLIC_WEBSITE_URL=https://yourdomain.com
```

**Option B: Update config/legal.js**
```javascript
// In config/legal.js, update the default URLs
return 'https://yourdomain.com/privacy-policy'; // Line 12
return 'https://yourdomain.com/terms-of-service'; // Line 22
```

### 3. Update Bundle Identifiers (If Needed)

If you want to use different bundle identifiers:

```bash
# In .env file
EXPO_PUBLIC_BUNDLE_ID=com.yourcompany.partyconnect
EXPO_PUBLIC_ANDROID_PACKAGE=com.yourcompany.partyconnect
```

**Note**: Default is `com.partyconnect.app` which should work for most cases.

### 4. Build Numbers

For each new release, increment:

```bash
# iOS Build Number
EXPO_PUBLIC_IOS_BUILD_NUMBER=2

# Android Version Code
EXPO_PUBLIC_ANDROID_VERSION_CODE=2
```

## 📱 App Store Configuration

### iOS (App Store Connect)

1. **Update eas.json** with your Apple credentials:
```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-actual-apple-id@example.com",
        "ascAppId": "your-actual-app-store-connect-app-id",
        "appleTeamId": "your-actual-team-id"
      }
    }
  }
}
```

2. **Create App Store listing**:
   - App name: PartyConnect
   - Category: Social Networking
   - Privacy Policy URL: (from your .env)
   - Terms of Service URL: (from your .env)
   - Screenshots (required)

### Android (Google Play Console)

1. **Create Google Play listing**:
   - App name: PartyConnect
   - Category: Social
   - Privacy Policy URL: (from your .env)
   - Terms of Service URL: (from your .env)
   - Screenshots (required)

2. **Service Account** (for automated submission):
   - Create service account in Google Cloud Console
   - Download JSON key
   - Save as `google-service-account.json` in project root
   - Grant Play Console access

## 🔐 Environment Variables Summary

### Required for Production

```bash
# API
EXPO_PUBLIC_API_URL=https://api.yourdomain.com/api

# Legal (Required by app stores)
EXPO_PUBLIC_PRIVACY_POLICY_URL=https://yourdomain.com/privacy-policy
EXPO_PUBLIC_TERMS_URL=https://yourdomain.com/terms-of-service
EXPO_PUBLIC_SUPPORT_EMAIL=support@yourdomain.com
```

### Optional (Have Defaults)

```bash
# Google OAuth (already configured)
EXPO_PUBLIC_GOOGLE_CLIENT_ID=982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com

# Bundle IDs (default: com.partyconnect.app)
EXPO_PUBLIC_BUNDLE_ID=com.partyconnect.app
EXPO_PUBLIC_ANDROID_PACKAGE=com.partyconnect.app

# Build numbers (default: 1)
EXPO_PUBLIC_IOS_BUILD_NUMBER=1
EXPO_PUBLIC_ANDROID_VERSION_CODE=1
```

## 🏗️ Building for Production

### 1. Set Environment Variables

Create `.env` file with production values:
```bash
cp .env.example .env
# Edit .env with your production values
```

### 2. Build

```bash
# Android
npm run build:android -- --profile production

# iOS
npm run build:ios -- --profile production

# Both
npm run build:all -- --profile production
```

### 3. Submit to Stores

```bash
# Android
npm run submit:android

# iOS
npm run submit:ios
```

## ✅ Pre-Publish Checklist

- [ ] Backend deployed and API URL updated
- [ ] Privacy Policy URL updated and accessible
- [ ] Terms of Service URL updated and accessible
- [ ] Support email configured
- [ ] Bundle identifiers configured (if custom)
- [ ] App Store Connect / Google Play Console accounts set up
- [ ] App screenshots prepared
- [ ] App descriptions written
- [ ] Test production build on real devices
- [ ] All payment flows tested in production
- [ ] Legal pages accessible and complete

## 🎯 Quick Start

1. **Deploy backend** → Get API URL
2. **Create legal pages** → Get URLs
3. **Update .env** with production values
4. **Build** → `npm run build:all -- --profile production`
5. **Submit** → `npm run submit:android` / `npm run submit:ios`

## 📞 Need Help?

- Check `PUBLISH_CHECKLIST.md` for detailed checklist
- Check `DEPLOYMENT.md` for backend deployment
- Check `GOOGLE_SIGNIN_SETUP.md` for Google Sign-In issues

---

**Current Status**: App is configured and ready for production once you:
1. Deploy backend and update API URL
2. Create legal pages and update URLs
3. Complete app store listings

