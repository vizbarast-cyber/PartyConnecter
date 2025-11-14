# 🚀 Build Instructions - Step by Step

## Current Issue

The build is asking for Android application ID interactively. Here's how to fix it:

## Solution 1: Use Interactive Mode (Recommended)

Run the build command and when prompted, enter:
```
com.mycompany.partyconnect
```

```bash
npx eas-cli build --platform android --profile preview
```

When it asks: **"What would you like your Android application id to be?"**
Answer: **`com.mycompany.partyconnect`**

## Solution 2: Set Environment Variable First

```bash
# Set the package name
$env:EXPO_PUBLIC_ANDROID_PACKAGE="com.mycompany.partyconnect"

# Then build
npx eas-cli build --platform android --profile preview
```

## Solution 3: Update app.config.js (Already Done)

The `app.config.js` already has:
```javascript
package: process.env.EXPO_PUBLIC_ANDROID_PACKAGE || "com.mycompany.partyconnect"
```

So it should work. Try running the build again:

```bash
npx eas-cli build --platform android --profile preview
```

And when prompted, just press Enter (it will use the default) or type: `com.mycompany.partyconnect`

## What Happens Next

1. **First time**: EAS will ask to generate Android keystore - say **"Yes"**
2. **Build starts**: Takes 10-20 minutes
3. **You'll get**: A download link when complete

## Check Build Status

```bash
npx eas-cli build:list
```

## After Build Completes

You'll get an APK file that you can:
- Download to your computer
- Install on Android devices
- Test the app

---

## Quick Command

Just run this and follow the prompts:

```bash
npx eas-cli build --platform android --profile preview
```

**When asked for Android application id**: Type `com.mycompany.partyconnect` or press Enter

**When asked to generate keystore**: Type `Yes`

Then wait for the build to complete! 🎉

