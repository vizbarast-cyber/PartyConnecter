# First Build Guide

## Prerequisites

1. **Expo Account**: Sign up at [expo.dev](https://expo.dev) if you don't have one
2. **EAS CLI**: Already installed ✅
3. **Dependencies**: Already installed ✅

## Step-by-Step Build Process

### 1. Login to EAS

```bash
npx eas-cli login
```

You'll be prompted to:
- Enter your email or username
- Choose login method (email/password or GitHub)

### 2. Configure EAS Build

```bash
npx eas-cli build:configure
```

This will:
- Create/update `eas.json`
- Link your project to EAS
- Set up build profiles

### 3. Choose Your First Build

#### Option A: Preview Build (Recommended for First Build)
```bash
# Android APK (easier to test)
npx eas-cli build --platform android --profile preview

# iOS (requires Apple Developer account)
npx eas-cli build --platform ios --profile preview
```

#### Option B: Production Build
```bash
# Android App Bundle (for Google Play)
npx eas-cli build --platform android --profile production

# iOS (for App Store)
npx eas-cli build --platform ios --profile production
```

### 4. Build Process

The build will:
1. Upload your project to EAS servers
2. Build the app in the cloud
3. Provide a download link when complete

**Build time**: Usually 10-20 minutes

## Quick Commands

```bash
# Login
npx eas-cli login

# Configure (first time only)
npx eas-cli build:configure

# Build Android Preview
npx eas-cli build --platform android --profile preview

# Build iOS Preview
npx eas-cli build --platform ios --profile preview

# Build both platforms
npx eas-cli build --platform all --profile preview

# Check build status
npx eas-cli build:list

# Download build
npx eas-cli build:download
```

## Troubleshooting

### "Not logged in" error
```bash
npx eas-cli login
```

### "Project not linked" error
```bash
npx eas-cli build:configure
```

### Build fails
- Check `eas.json` configuration
- Ensure all dependencies are in `package.json`
- Check for missing assets (icons, splash screens)

### Missing app icons
Create these files:
- `assets/icon.png` (1024x1024)
- `assets/adaptive-icon.png` (Android)
- `assets/splash.png` (splash screen)

## What Happens After Build

1. **Preview Build**: Get APK/IPA file to test on device
2. **Production Build**: Ready to submit to app stores

## Next Steps After First Build

1. Test the APK/IPA on a real device
2. Fix any issues found
3. Create production build
4. Submit to app stores (see `DEPLOYMENT.md`)

