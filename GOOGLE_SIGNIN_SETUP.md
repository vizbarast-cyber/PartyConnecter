# Google Sign-In Setup Guide

## Why Google Sign-In Might Not Be Working

The most common issues are:

1. **Missing Google Client ID** - The `EXPO_PUBLIC_GOOGLE_CLIENT_ID` environment variable is not set
2. **Google Sign-In not enabled** in Firebase Console
3. **Incorrect Client ID** - Using the wrong type of client ID
4. **Redirect URI mismatch** - The redirect URI doesn't match what's configured in Google Cloud Console

## Step-by-Step Setup

### Step 1: Enable Google Sign-In in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **party-connect-q8z7m3**
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google**
5. Enable it and save
6. Note the **Web client ID** (you'll need this)

### Step 2: Get the Web Client ID

You can get the Web Client ID from two places:

**Option A: From Firebase Console**
1. Firebase Console → Authentication → Sign-in method → Google
2. Copy the **Web client ID** (starts with something like `123456789-abc...apps.googleusercontent.com`)

**Option B: From Google Cloud Console**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Find **OAuth 2.0 Client IDs**
5. Look for the **Web client** (not iOS or Android)
6. Copy the **Client ID**

### Step 3: Configure Redirect URIs

1. In Google Cloud Console → **APIs & Services** → **Credentials**
2. Click on your Web Client ID
3. Under **Authorized redirect URIs**, add:
   - `https://auth.expo.io/@your-username/partyconnect`
   - `partyconnect://`
   - `exp://localhost:8081` (for development)

### Step 4: Add Environment Variable

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_GOOGLE_CLIENT_ID=982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com
```

**Your Client IDs:**
- **Web (for Expo)**: `982593123040-vbjhf65ti83g3evn8n4nirqiuilathao.apps.googleusercontent.com` ✅ Use this one
- **Android**: `982593123040-rg5efsforta6gm396mdjgg793ff9k69b.apps.googleusercontent.com`
- **iOS**: `982593123040-8l4to10lnnb8sp8g1t9ugg63fl56h7jc.apps.googleusercontent.com`

**Important:**
- The variable name MUST start with `EXPO_PUBLIC_` for Expo to expose it
- Use the **Web Client ID** for Expo (it works across all platforms)
- Restart your Expo dev server after adding the variable
- Don't commit `.env` to Git (add it to `.gitignore`)
- The code now has a fallback to the Web Client ID, so it should work even without the .env file

### Step 5: Restart Expo

After adding the environment variable:

```bash
# Stop your current Expo server (Ctrl+C)
# Then restart:
npm start
# or
npx expo start --clear
```

## Testing

1. Try Google Sign-In from the Login screen
2. You should see a Google authentication popup
3. After signing in, you should be redirected back to the app

## Troubleshooting

### Error: "Configuration Error"
- **Solution**: Make sure `EXPO_PUBLIC_GOOGLE_CLIENT_ID` is set in your `.env` file and you've restarted Expo

### Error: "redirect_uri_mismatch"
- **Solution**: Add the redirect URI to Google Cloud Console (see Step 3)

### Error: "invalid_client"
- **Solution**: Check that you're using the **Web Client ID**, not iOS or Android Client ID

### Error: "No ID token received"
- **Solution**: Make sure Google Sign-In is enabled in Firebase Console

### Works in development but not in production
- **Solution**: Make sure to add production redirect URIs in Google Cloud Console

## Quick Check

Run this in your terminal to verify the environment variable is loaded:

```bash
# In Expo, you can check with:
npx expo config --type public
```

You should see `EXPO_PUBLIC_GOOGLE_CLIENT_ID` in the output.

## Alternative: Using Firebase Web SDK

If `expo-auth-session` continues to have issues, you can use Firebase's built-in Google Sign-In:

```javascript
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './config/firebase';

const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
```

However, this requires a web environment and won't work in native apps.

