# 🎨 How to Add Icons and App Logo

## Required Icon Files

You need to create the following icon files and place them in the `assets/` directory:

### 1. **App Icon** (`icon.png`)
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Usage**: Main app icon for iOS and Android
- **Design**: Use your dark purple glowy theme (#9D4EDD)

### 2. **Splash Screen** (`splash.png`)
- **Size**: 2048x2048 pixels (or 2732x2732 for better quality)
- **Format**: PNG
- **Usage**: Loading screen shown when app starts
- **Design**: Should match your app's branding

### 3. **Android Adaptive Icon** (`adaptive-icon.png`)
- **Size**: 1024x1024 pixels
- **Format**: PNG
- **Usage**: Android adaptive icon (shows on home screen)
- **Design**: Should work well in circular, rounded square, and square shapes

### 4. **Favicon** (`favicon.png`) - Optional
- **Size**: 48x48 pixels (or 512x512 for better quality)
- **Format**: PNG
- **Usage**: Web favicon
- **Design**: Simplified version of your icon

## Quick Steps

### Step 1: Create Your Icons

You can create icons using:

1. **Online Tools**:
   - [Canva](https://www.canva.com) - Free, easy to use
   - [Figma](https://www.figma.com) - Professional design tool
   - [AppIcon.co](https://www.appicon.co) - Generates all sizes automatically

2. **Design Software**:
   - Adobe Illustrator
   - Photoshop
   - Sketch

3. **AI Tools**:
   - DALL-E
   - Midjourney
   - Stable Diffusion

### Step 2: Design Guidelines

**For PartyConnect with Dark Purple Glowy Theme:**

- **Primary Color**: #9D4EDD (Purple)
- **Accent Color**: #E0AAFF (Light Purple)
- **Background**: #0A0A0F (Dark)
- **Style**: Modern, glowy, party-themed
- **Elements**: Consider party-related icons (confetti, disco ball, music note, etc.)

**Icon Design Tips:**
- Keep it simple and recognizable at small sizes
- Use high contrast for visibility
- Avoid text (it won't be readable at small sizes)
- Test how it looks at 48x48 pixels (minimum size)

### Step 3: Place Files in Assets Directory

1. Create the `assets/` directory if it doesn't exist:
   ```bash
   mkdir assets
   ```

2. Place your icon files:
   ```
   assets/
   ├── icon.png (1024x1024)
   ├── splash.png (2048x2048)
   ├── adaptive-icon.png (1024x1024)
   └── favicon.png (48x48 or 512x512)
   ```

### Step 4: Update app.config.js

Once you have your icon files, uncomment the icon paths in `app.config.js`:

```javascript
icon: "./assets/icon.png",
splash: {
  image: "./assets/splash.png",
  resizeMode: "contain",
  backgroundColor: "#0A0A0F"
},
android: {
  adaptiveIcon: {
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundColor: "#0A0A0F"
  },
  // ...
},
web: {
  favicon: "./assets/favicon.png"
}
```

### Step 5: Test Your Icons

1. **Clear cache and rebuild**:
   ```bash
   npx expo start --clear
   ```

2. **Test on device/emulator** to see how icons appear

## Quick Icon Generation Script

I'll create a script to help you generate placeholder icons if you need them quickly for testing.

## Using Online Icon Generators

### Option 1: AppIcon.co (Recommended)
1. Go to https://www.appicon.co
2. Upload a 1024x1024 image
3. Download the generated icon set
4. Extract and place files in `assets/` directory

### Option 2: Expo Icon Generator
1. Use Expo's built-in icon generator (if available)
2. Or use third-party tools

## Example Icon Specifications

### icon.png
- **Dimensions**: 1024x1024
- **Background**: Transparent or solid color
- **Content**: Your app logo/icon
- **Padding**: Leave 10% padding (safe area)

### splash.png
- **Dimensions**: 2048x2048
- **Background**: #0A0A0F (dark purple theme)
- **Content**: App logo centered
- **Text**: Optional "PartyConnect" text

### adaptive-icon.png
- **Dimensions**: 1024x1024
- **Safe Area**: Keep important content in center 66% (Android will crop edges)
- **Background**: #0A0A0F
- **Content**: Icon that works in circle and square

## After Adding Icons

1. **Update app.config.js** (uncomment icon paths)
2. **Restart Expo**:
   ```bash
   npx expo start --clear
   ```
3. **Rebuild app** (icons only show in production builds):
   ```bash
   npx eas-cli build --platform android --profile preview
   ```

## Troubleshooting

- **Icons not showing**: Make sure paths in `app.config.js` are correct
- **Wrong size**: Use image editing software to resize to exact dimensions
- **Not updating**: Clear cache with `--clear` flag
- **Build errors**: Ensure all required icon files exist

## Need Help?

If you need help creating icons, you can:
1. Use AI image generators with prompts like "modern app icon purple glowy party theme"
2. Hire a designer on Fiverr or Upwork
3. Use free icon templates and customize them

