#!/bin/bash
# First Build Script for PartyConnect

echo "🚀 PartyConnect - First Build Setup"
echo "===================================="
echo ""

# Check if logged in
if ! npx eas-cli whoami &> /dev/null; then
    echo "❌ Not logged in to EAS"
    echo "📝 Please run: npx eas-cli login"
    echo ""
    read -p "Press Enter after logging in, or Ctrl+C to exit..."
fi

# Check if configured
if [ ! -f "eas.json" ]; then
    echo "⚙️  Configuring EAS Build..."
    npx eas-cli build:configure
fi

echo ""
echo "📦 Starting build..."
echo ""
echo "Choose build type:"
echo "1) Android Preview (APK) - Recommended for first build"
echo "2) iOS Preview"
echo "3) Android Production"
echo "4) iOS Production"
echo "5) Both platforms (Preview)"
echo ""
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        echo "Building Android Preview..."
        npx eas-cli build --platform android --profile preview
        ;;
    2)
        echo "Building iOS Preview..."
        npx eas-cli build --platform ios --profile preview
        ;;
    3)
        echo "Building Android Production..."
        npx eas-cli build --platform android --profile production
        ;;
    4)
        echo "Building iOS Production..."
        npx eas-cli build --platform ios --profile production
        ;;
    5)
        echo "Building both platforms (Preview)..."
        npx eas-cli build --platform all --profile preview
        ;;
    *)
        echo "Invalid choice. Building Android Preview..."
        npx eas-cli build --platform android --profile preview
        ;;
esac

echo ""
echo "✅ Build started! Check status with: npx eas-cli build:list"
echo "📥 Download with: npx eas-cli build:download"

