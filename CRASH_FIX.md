# 🔧 App Crash Fix

## Issue
App instantly crashes on startup.

## Fixes Applied

1. ✅ **Added error handling in App.js**
   - Wrapped Firebase auth initialization in try-catch
   - Added error handling for dev mode check

2. ✅ **Added error handling in PaymentScreen.js**
   - Check if Stripe key is valid before initializing
   - Show error message instead of crashing

## Common Crash Causes

### 1. Stripe Native Module (Most Likely)
`@stripe/stripe-react-native` requires native code compilation. Preview builds might not include it properly.

**Solution**: Use a development build instead:
```powershell
$env:EAS_NO_VCS=1
npx eas-cli build --platform android --profile development
```

### 2. Missing Environment Variables
If Firebase or API URLs are missing, the app might crash.

**Check**: Make sure `.env` file has:
- `EXPO_PUBLIC_API_URL`
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID`
- `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 3. Firebase Configuration
If Firebase isn't properly initialized, auth will fail.

**Check**: Verify `config/firebase.js` has correct Firebase config.

## Next Steps

1. **Try Development Build** (if Stripe is the issue):
   ```powershell
   $env:EAS_NO_VCS=1
   npx eas-cli build --platform android --profile development
   ```

2. **Check Logs**: 
   - Connect device via USB
   - Run: `npx react-native log-android` (or use Android Studio Logcat)
   - Look for the actual error message

3. **Test Locally First**:
   ```powershell
   npx expo start
   ```
   This will show errors in the terminal before building.

## If Still Crashing

Share the error logs from:
- Android Studio Logcat, or
- `adb logcat` command, or
- Expo Go error screen

This will show the exact error causing the crash.

