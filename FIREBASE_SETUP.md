# Firebase Setup Guide for PartyConnect

This guide will walk you through getting all the Firebase credentials and configuration you need.

## Step 1: Access Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Select your project: **party-connect-q8z7m3** (or create a new one)

## Step 2: Get Firebase Admin SDK Credentials (Backend)

These are needed for `backend/.env`:

### Option A: Download Service Account Key (Recommended)

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Go to the **Service accounts** tab
4. Click **Generate new private key**
5. Click **Generate key** in the popup
6. A JSON file will download (e.g., `party-connect-q8z7m3-firebase-adminsdk-xxxxx.json`)

**Extract these values for `backend/.env`:**
```json
{
  "project_id": "party-connect-q8z7m3",  // → FIREBASE_PROJECT_ID
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",  // → FIREBASE_PRIVATE_KEY
  "client_email": "firebase-adminsdk-xxxxx@party-connect-q8z7m3.iam.gserviceaccount.com"  // → FIREBASE_CLIENT_EMAIL
}
```

**Important:** 
- Copy the entire `private_key` value including the `\n` characters
- In `.env`, you can keep the `\n` as-is or replace them with actual newlines

### Option B: Manual Entry

If you prefer, you can manually copy:
- **Project ID**: Found in Project Settings → General → Your apps
- **Private Key**: From the service account JSON file
- **Client Email**: From the service account JSON file

## Step 3: Get Client Configuration (Already Done)

You already have these files, but here's where they came from:

### For Android (`google-services.json`)

1. Firebase Console → Project Settings
2. Scroll down to **Your apps** section
3. Click on your Android app (or add one if needed)
4. Download `google-services.json`
5. Place it in the **root** of your project

### For iOS (`GoogleService-Info.plist`)

1. Firebase Console → Project Settings
2. Scroll down to **Your apps** section
3. Click on your iOS app (or add one if needed)
4. Download `GoogleService-Info.plist`
5. Place it in the **root** of your project

## Step 4: Enable Firebase Services

### 4.1 Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Enable these sign-in methods:
   - **Email/Password** → Enable
   - **Google** → Enable (add your OAuth client IDs)

### 4.2 Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location (choose closest to your users)
5. Click **Enable**

**Security Rules** (for production, update these):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4.3 Cloud Storage

1. Go to **Storage**
2. Click **Get started**
3. Choose **Start in test mode** (for development)
4. Select a location (same as Firestore)
5. Click **Done**

**Security Rules** (for production):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024; // 5MB limit
    }
  }
}
```

### 4.4 Cloud Messaging (FCM)

1. Go to **Cloud Messaging**
2. No setup needed - it's automatically enabled
3. For push notifications, you'll need:
   - **Server Key**: Project Settings → Cloud Messaging → Cloud Messaging API (Legacy) → Server key
   - **Sender ID**: Project Settings → Cloud Messaging → Cloud Messaging API (Legacy) → Sender ID

## Step 5: Get API Keys and Configuration

### Web API Key

1. Firebase Console → Project Settings → General
2. Scroll to **Your apps** section
3. Find **Web API Key** (starts with `AIza...`)
4. This is already in your `google-services.json` and `GoogleService-Info.plist`

### OAuth Client IDs (for Google Sign-In)

1. Firebase Console → Project Settings → General
2. Scroll to **Your apps** → Web app
3. Find **OAuth client IDs**:
   - Web client ID (for server-side)
   - Android client ID (already in your config)
   - iOS client ID (already in your config)

## Step 6: Update Backend .env File

Create `backend/.env` with:

```env
# Firebase Admin SDK (from Step 2)
FIREBASE_PROJECT_ID=party-connect-q8z7m3
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@party-connect-q8z7m3.iam.gserviceaccount.com

# MongoDB (your MongoDB connection string)
MONGODB_URI=mongodb://localhost:27017/partyconnect

# Server
PORT=3000

# Payment Providers (get from your Stripe dashboard)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
PAYPAL_CLIENT_ID=AQG6uInwsAVbZ-tSOvGSUg0stYzx0LUcFUWFlh_liD2ce1DYDnYMeXFlvBWLj6mSRbF-F-aAOqfy-gXS
PAYPAL_SECRET=ECmeLOih1RvgeHc9NsOc2226D3Tex7K8dEzyPNc0nCAlBR8LqdvXxgfxubV60aZsBRyzmcYjSYCYIuz5
PAYPAL_MODE=sandbox

# Other
JWT_SECRET=your-secret-key-change-in-production
COMMISSION_RATE=0.05
ESCROW_AUTO_RELEASE_HOURS=24
```

## Step 7: Verify Your Setup

### Check Firebase Admin SDK

1. Make sure the service account JSON file downloaded correctly
2. Verify the private key is complete (should start with `-----BEGIN PRIVATE KEY-----`)
3. Check that `client_email` matches the service account email

### Test Authentication

1. Try creating a user in Firebase Console → Authentication
2. Verify the user appears in your MongoDB database

### Test Storage

1. Try uploading a test image through your app
2. Check Firebase Console → Storage to see if it appears

## Common Issues

### Issue: "Firebase Admin initialization error"

**Solution:**
- Check that `FIREBASE_PRIVATE_KEY` includes the full key with `\n` characters
- Make sure there are no extra spaces or quotes around the values
- Verify the service account has proper permissions

### Issue: "Permission denied" errors

**Solution:**
- Update Firestore and Storage security rules (see Step 4)
- Make sure users are authenticated before accessing resources

### Issue: Google Sign-In not working

**Solution:**
- Enable Google Sign-In in Authentication → Sign-in method
- Add OAuth client IDs in Firebase Console
- For Expo, you may need to use `expo-auth-session` instead of `@react-native-google-signin/google-signin`

## Quick Reference: Where to Find Everything

| What You Need | Where to Find It |
|--------------|------------------|
| **Project ID** | Project Settings → General → Project ID |
| **Private Key** | Project Settings → Service Accounts → Generate new private key |
| **Client Email** | Project Settings → Service Accounts → Service account email |
| **Web API Key** | Project Settings → General → Your apps → Web API Key |
| **Storage Bucket** | Project Settings → General → Your apps → Storage bucket |
| **OAuth Client IDs** | Project Settings → General → Your apps → OAuth client IDs |
| **Server Key (FCM)** | Project Settings → Cloud Messaging → Server key |

## Next Steps

1. ✅ Download service account JSON
2. ✅ Extract credentials to `backend/.env`
3. ✅ Enable Authentication, Firestore, Storage
4. ✅ Update security rules for production
5. ✅ Test the connection

## Security Notes

⚠️ **Important:**
- Never commit `.env` files to Git
- Never share your private keys
- Use environment variables in production
- Update security rules before going live
- Enable App Check for additional security

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Admin SDK Setup](https://firebase.google.com/docs/admin/setup)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

