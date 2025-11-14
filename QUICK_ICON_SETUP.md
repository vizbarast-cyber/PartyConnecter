# 🚀 Quick Icon Setup Guide

## Step-by-Step Instructions

### Step 1: Create Your Icon Files

You need 4 icon files. Here are the easiest ways to create them:

#### Option A: Use AppIcon.co (Easiest - Recommended)
1. Go to https://www.appicon.co
2. Upload a 1024x1024 image (or create one in Canva/Figma)
3. Download the generated icon set
4. Extract the files

#### Option B: Use AI Image Generator
1. Use DALL-E, Midjourney, or similar
2. Prompt: "modern app icon purple glowy party theme, dark background, 1024x1024, high quality, simple design"
3. Download the generated image
4. Resize to required dimensions using an image editor

#### Option C: Design in Canva
1. Go to https://www.canva.com
2. Create a new design: 1024x1024 pixels
3. Design your icon using:
   - Background: #0A0A0F (dark)
   - Primary color: #9D4EDD (purple)
   - Add glowy effects
4. Export as PNG
5. Create variations for other sizes

### Step 2: Required Files and Sizes

Create these files and save them in the `assets/` folder:

| File | Size | Description |
|------|------|-------------|
| `icon.png` | 1024x1024 | Main app icon |
| `splash.png` | 2048x2048 | Splash screen (loading screen) |
| `adaptive-icon.png` | 1024x1024 | Android adaptive icon |
| `favicon.png` | 512x512 | Web favicon (optional) |

### Step 3: Place Files in Assets Directory

1. Make sure you have an `assets/` folder in your project root
2. Copy your icon files into it:
   ```
   PartyConnect/
   └── assets/
       ├── icon.png
       ├── splash.png
       ├── adaptive-icon.png
       └── favicon.png
   ```

### Step 4: Update app.config.js

Open `app.config.js` and uncomment the icon paths:

**Find this section (around line 8):**
```javascript
// icon: "./assets/icon.png", // Uncomment when you have the icon file
```

**Change to:**
```javascript
icon: "./assets/icon.png",
```

**Find this section (around line 11):**
```javascript
splash: {
  // image: "./assets/splash.png", // Uncomment when you have the splash file
  resizeMode: "contain",
  backgroundColor: "#0A0A0F"
},
```

**Change to:**
```javascript
splash: {
  image: "./assets/splash.png",
  resizeMode: "contain",
  backgroundColor: "#0A0A0F"
},
```

**Find this section (around line 31):**
```javascript
android: {
  // adaptiveIcon: {
  //   foregroundImage: "./assets/adaptive-icon.png",
  //   backgroundColor: "#0A0A0F"
  // },
```

**Change to:**
```javascript
android: {
  adaptiveIcon: {
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundColor: "#0A0A0F"
  },
```

**Find this section (around line 46):**
```javascript
// web: {
//   favicon: "./assets/favicon.png"
// },
```

**Change to:**
```javascript
web: {
  favicon: "./assets/favicon.png"
},
```

### Step 5: Test Your Icons

1. **Clear cache and restart Expo:**
   ```bash
   npx expo start --clear
   ```

2. **Test in development:**
   - Icons may not show in Expo Go
   - You need to build the app to see icons

3. **Build to see icons:**
   ```bash
   npx eas-cli build --platform android --profile preview
   ```

## Design Tips for PartyConnect

### Color Palette
- **Primary**: #9D4EDD (Purple)
- **Secondary**: #E0AAFF (Light Purple)
- **Background**: #0A0A0F (Dark)
- **Accent**: #FF6B9D (Pink)

### Icon Ideas
- 🎉 Confetti
- 🎵 Music note
- 🎊 Party hat
- 💜 Purple heart
- ✨ Sparkles/stars
- 🎭 Masquerade mask
- 🎪 Party tent

### Design Principles
- **Keep it simple** - Icons are small, details get lost
- **High contrast** - Make sure it's visible on dark backgrounds
- **No text** - Text won't be readable at small sizes
- **Test at 48x48** - If it looks good at 48px, it'll work everywhere

## Quick Test Without Icons

If you want to test the app without icons first:
1. Keep the icon paths commented in `app.config.js`
2. The app will use default Expo icons
3. Add your icons later when ready

## Troubleshooting

**Icons not showing?**
- Check file paths are correct
- Ensure files exist in `assets/` folder
- Clear cache: `npx expo start --clear`
- Rebuild the app (icons only show in builds, not Expo Go)

**Wrong size?**
- Use an image editor to resize
- Make sure dimensions are exact (1024x1024, 2048x2048, etc.)

**Build errors?**
- Check file names match exactly (case-sensitive)
- Ensure all required files exist
- Check file formats are PNG

## Need Help Creating Icons?

1. **Free Online Tools:**
   - Canva.com (easiest)
   - Figma.com (professional)
   - AppIcon.co (auto-generates all sizes)

2. **AI Generators:**
   - DALL-E
   - Midjourney
   - Stable Diffusion

3. **Hire a Designer:**
   - Fiverr.com
   - Upwork.com
   - 99designs.com

## Example app.config.js (After Adding Icons)

```javascript
export default {
  expo: {
    name: "PartyConnect",
    slug: "partyconnect",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png", // ✅ Uncommented
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash.png", // ✅ Uncommented
      resizeMode: "contain",
      backgroundColor: "#0A0A0F"
    },
    // ... rest of config
    android: {
      adaptiveIcon: { // ✅ Uncommented
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0A0A0F"
      },
      // ... rest of android config
    },
    web: { // ✅ Uncommented
      favicon: "./assets/favicon.png"
    },
  }
};
```

That's it! Once you have your icon files and uncomment the paths, your icons will appear in the app! 🎉

