# 🎨 PartyConnect Logo Update Guide

## Overview
Replace the current app icons with the PartyConnect logo (party popper design) styled in dark purple theme colors.

## Required Logo Files

You need to create/update these image files in the `assets/` folder:

### 1. **icon.png** (Main App Icon)
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Design**: PartyConnect logo (party popper with confetti)
- **Colors**: Dark purple theme
  - Primary: `#9D4EDD` (Purple)
  - Background: `#0A0A0F` (Very dark)
  - Accent: `#C77DFF` (Light purple)
  - Confetti: Use purple/pink shades from theme

### 2. **adaptive-icon.png** (Android Adaptive Icon)
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Design**: Same as icon.png but optimized for Android adaptive icons
- **Background Color**: `#0A0A0F` (set in app.config.js)

### 3. **splash.png** (Splash Screen)
- **Size**: 2048x2048 pixels (or 1242x2436 for iPhone)
- **Format**: PNG
- **Design**: PartyConnect logo centered on dark purple background
- **Background Color**: `#0A0A0F`

### 4. **favicon.png** (Web Icon)
- **Size**: 512x512 pixels
- **Format**: PNG
- **Design**: Simplified version of logo

## Design Specifications

### Color Palette (Dark Purple Theme)
```
Primary Purple: #9D4EDD
Light Purple: #C77DFF
Dark Background: #0A0A0F
Accent Pink: #FF6B9D
```

### Logo Elements
- **Party Popper**: Use purple gradient (#9D4EDD to #7B2CBF)
- **Confetti**: Use theme colors (purple, pink, light purple)
- **Text "PartyConnect"**: White or light purple (#E0AAFF)
- **Background**: Dark purple (#0A0A0F) or transparent

## Quick Steps

1. **Design the logo** in your preferred design tool (Figma, Photoshop, etc.)
   - Use the party popper design from your reference
   - Apply dark purple theme colors
   - Export at required sizes

2. **Replace files** in `assets/` folder:
   - `icon.png` → 1024x1024
   - `adaptive-icon.png` → 1024x1024
   - `splash.png` → 2048x2048
   - `favicon.png` → 512x512

3. **Rebuild the app**:
   ```bash
   eas build --platform android --profile preview
   ```

## Current Configuration

The app is already configured to use these files:
- ✅ `app.config.js` points to `./assets/icon.png`
- ✅ `App.js` loads logo from `./assets/icon.png` in loading screen
- ✅ Android adaptive icon uses `./assets/adaptive-icon.png`
- ✅ Splash screen uses `./assets/splash.png`

Once you replace the image files, the app will automatically use the new logo!

## Online Tools

If you need to resize/convert images:
- **Resize**: https://www.iloveimg.com/resize-image
- **Convert**: https://cloudconvert.com/
- **Create Icons**: https://www.appicon.co/

## Notes

- All icons should have rounded corners (handled by Android/iOS)
- Keep important elements in the center (safe zone)
- Test on both light and dark backgrounds
- Ensure text is readable at small sizes

