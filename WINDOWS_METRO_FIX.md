# 🔧 Windows Metro Bundler Fix

## Error
```
Error: ENOENT: no such file or directory, mkdir 'C:\Users\...\.expo\metro\externals\node:sea'
```

## Problem
Metro bundler is trying to create a directory with `node:sea` which contains a colon (`:`). Windows doesn't allow colons in directory names, causing this error.

## Solution Applied

1. ✅ **Created `metro.config.js`** with Windows-specific workarounds
2. ✅ **Updated Expo packages** to compatible versions
3. ✅ **Cleaned `.expo` directory** to remove corrupted cache

## What Changed

### metro.config.js
- Added `unstable_enablePackageExports: false` to prevent Node.js internal module handling
- Added blockList to prevent Metro from processing `node:*` modules
- Configured watchFolders properly

### Package Updates
- Updated `expo-auth-session` to compatible version
- Updated `expo-web-browser` to compatible version
- Installed `@expo/metro-config`

## Try Again

1. **Clear cache and restart:**
   ```bash
   npx expo start --clear
   ```

2. **If it still fails**, try:
   ```bash
   # Delete .expo directory completely
   Remove-Item -Recurse -Force .expo
   
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   npm install
   
   # Try again
   npx expo start --clear
   ```

## Alternative: Use Tunnel Mode

If the issue persists, try using tunnel mode:
```bash
npx expo start --tunnel --clear
```

## Alternative: Skip Metro Cache

```bash
npx expo start --no-dev --minify --clear
```

## If Still Not Working

This is a known Windows issue with Metro bundler. You can:

1. **Use WSL (Windows Subsystem for Linux)** - Run Expo in WSL where paths work correctly
2. **Use EAS Build** - Build in the cloud instead of locally
3. **Wait for Expo Update** - This is a known bug that may be fixed in future versions

## For Now

The app should still build successfully using EAS Build even if local Metro has issues:
```bash
npx eas-cli build --platform android --profile preview
```

The Metro error only affects local development, not production builds.

