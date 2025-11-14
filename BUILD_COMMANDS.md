# 🚀 Build Commands

## Prerequisites
- Make sure you're logged in: `npx eas-cli login` (already logged in as: tomelis)
- Make sure you have a Git repository initialized (already done)

## Build Commands

### For Testing (Preview Build - APK)
```bash
npx eas-cli build --platform android --profile preview
```
- Creates an APK file for testing
- Can be installed directly on Android devices
- Answer "Yes" when asked to generate a new Android Keystore (first time only)

### For Production (App Bundle - AAB)
```bash
npx eas-cli build --platform android --profile production
```
- Creates an AAB file for Google Play Store submission
- Requires production credentials

### For iOS (Preview)
```bash
npx eas-cli build --platform ios --profile preview
```
- Creates an IPA file for testing
- Requires Apple Developer account

### For iOS (Production)
```bash
npx eas-cli build --platform ios --profile production
```
- Creates an IPA file for App Store submission
- Requires Apple Developer account and certificates

### Build Both Platforms
```bash
npx eas-cli build --platform all --profile preview
```

## Using NPM Scripts (Alternative)

You can also use the npm scripts defined in `package.json`:

```bash
# Android preview build
npm run build:android

# iOS preview build
npm run build:ios

# Both platforms
npm run build:all
```

## Build Status

After starting a build, you can:
- Check build status: `npx eas-cli build:list`
- View build logs: `npx eas-cli build:view [BUILD_ID]`
- Download build: The build URL will be provided when complete

## First Build Notes

1. **Android Keystore**: On first Android build, you'll be asked to generate a keystore. Answer "Yes" - EAS will manage it securely.

2. **iOS Certificates**: For iOS, you'll need:
   - Apple Developer account
   - App Store Connect app created
   - Certificates configured (EAS can auto-generate)

3. **Build Time**: First build takes longer (10-20 minutes). Subsequent builds are faster.

4. **Environment Variables**: If you have `.env` file, make sure to set environment variables in EAS:
   ```bash
   npx eas-cli secret:create --scope project --name EXPO_PUBLIC_API_URL --value "your-api-url"
   ```

## Quick Start (Recommended)

For your first build, use:
```bash
npx eas-cli build --platform android --profile preview
```

Then follow the prompts to generate the keystore.
