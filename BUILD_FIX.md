# 🔧 Build Failed - Prebuild Error Fix

## Build Logs
Check detailed logs at: https://expo.dev/accounts/tomelis/projects/partyconnect/builds/2dcca654-fa90-4b39-a6b8-31252c4740ef

## Common Prebuild Issues & Fixes

### 1. Missing App Icon
**Error**: Missing `assets/icon.png`

**Fix**: Create a 1024x1024 PNG icon
- Place at: `assets/icon.png`
- Size: 1024x1024 pixels
- Format: PNG

### 2. Missing Splash Screen
**Error**: Missing `assets/splash.png`

**Fix**: Create a splash screen
- Place at: `assets/splash.png`
- Recommended: 1284x2778 pixels (or any size)
- Format: PNG

### 3. Missing Adaptive Icon (Android)
**Error**: Missing `assets/adaptive-icon.png`

**Fix**: Create adaptive icon
- Place at: `assets/adaptive-icon.png`
- Size: 1024x1024 pixels
- Format: PNG

### 4. Configuration Errors
**Error**: Invalid app.json or app.config.js

**Fix**: Run validation
```powershell
npx expo-doctor
```

### 5. Firebase Config Issues
**Error**: Missing or invalid Firebase config files

**Fix**: Ensure these exist:
- `google-services.json` (Android)
- `GoogleService-Info.plist` (iOS)

## Quick Fixes to Try

### Option 1: Create Placeholder Assets
If you don't have assets yet, create simple placeholders:

```powershell
# Create a simple 1024x1024 icon (you'll need an image editor)
# Or download a placeholder from: https://via.placeholder.com/1024
```

### Option 2: Use Expo's Default Assets
Temporarily remove asset references to use defaults:

Edit `app.config.js`:
```javascript
// Comment out icon and splash temporarily
// icon: "./assets/icon.png",
// splash: { ... },
```

### Option 3: Check Build Logs
Visit the build logs URL to see the exact error:
https://expo.dev/accounts/tomelis/projects/partyconnect/builds/2dcca654-fa90-4b39-a6b8-31252c4740ef

## Diagnostic Commands

```powershell
# Check for issues
npx expo-doctor

# Validate config
npx expo config --type public

# Check assets
Test-Path assets/icon.png
Test-Path assets/splash.png
Test-Path assets/adaptive-icon.png
```

## Next Steps

1. **Check the build logs** at the URL above for the exact error
2. **Run diagnostics**: `npx expo-doctor`
3. **Create missing assets** (icon, splash, adaptive-icon)
4. **Fix any configuration errors** shown in logs
5. **Retry the build**

## Most Likely Issue

Based on common prebuild failures, you're probably missing:
- `assets/icon.png` (1024x1024)
- `assets/splash.png`
- `assets/adaptive-icon.png` (1024x1024)

Create these files and try building again!

