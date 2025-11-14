// Script to create placeholder icons for PartyConnect
// This creates simple but functional icons with the dark purple glowy theme

const fs = require('fs');
const path = require('path');

// Check if we can use a graphics library
let canUseCanvas = false;
try {
  require.resolve('canvas');
  canUseCanvas = true;
} catch (e) {
  canUseCanvas = false;
}

const assetsDir = path.join(__dirname, '..', 'assets');

// Create assets directory
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Theme colors
const colors = {
  primary: '#9D4EDD',
  primaryLight: '#C77DFF',
  secondary: '#E0AAFF',
  background: '#0A0A0F',
  accent: '#FF6B9D',
};

// SVG template for icon (can be converted to PNG)
const createIconSVG = (size) => {
  const center = size / 2;
  const radius = size * 0.35;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="${colors.background}" rx="${size * 0.2}"/>
  
  <!-- Glow effect circles -->
  <circle cx="${center}" cy="${center}" r="${radius * 1.3}" fill="${colors.primary}" opacity="0.3">
    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="${center}" cy="${center}" r="${radius * 1.1}" fill="${colors.primary}" opacity="0.4">
    <animate attributeName="opacity" values="0.4;0.6;0.4" dur="2s" repeatCount="indefinite"/>
  </circle>
  
  <!-- Main icon - Party symbol (confetti/sparkles) -->
  <g transform="translate(${center}, ${center})">
    <!-- Sparkle 1 -->
    <path d="M 0,-${radius * 0.6} L 5,-${radius * 0.5} L 0,-${radius * 0.4} L -5,-${radius * 0.5} Z" fill="${colors.secondary}"/>
    <path d="M 0,-${radius * 0.4} L 3,-${radius * 0.3} L 0,-${radius * 0.2} L -3,-${radius * 0.3} Z" fill="${colors.primaryLight}"/>
    
    <!-- Sparkle 2 -->
    <path d="M ${radius * 0.4},${radius * 0.4} L ${radius * 0.5},${radius * 0.5 + 5} L ${radius * 0.6},${radius * 0.4} L ${radius * 0.5},${radius * 0.5 - 5} Z" fill="${colors.secondary}"/>
    
    <!-- Sparkle 3 -->
    <path d="M -${radius * 0.4},${radius * 0.4} L -${radius * 0.5},${radius * 0.5 + 5} L -${radius * 0.6},${radius * 0.4} L -${radius * 0.5},${radius * 0.5 - 5} Z" fill="${colors.accent}"/>
    
    <!-- Center circle -->
    <circle cx="0" cy="0" r="${radius * 0.3}" fill="${colors.primary}">
      <animate attributeName="r" values="${radius * 0.3};${radius * 0.35};${radius * 0.3}" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Inner glow -->
    <circle cx="0" cy="0" r="${radius * 0.2}" fill="${colors.primaryLight}" opacity="0.8"/>
  </g>
  
  <!-- Border glow -->
  <rect width="${size}" height="${size}" fill="none" stroke="${colors.primary}" stroke-width="${size * 0.02}" rx="${size * 0.2}" opacity="0.5"/>
</svg>`;
};

const createSplashSVG = (size) => {
  const center = size / 2;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="${colors.background}"/>
  
  <!-- Gradient overlay -->
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%">
      <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${colors.background}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="${center}" cy="${center}" r="${size * 0.5}" fill="url(#glow)"/>
  
  <!-- App name -->
  <text x="${center}" y="${center - size * 0.1}" 
        font-family="Arial, sans-serif" 
        font-size="${size * 0.12}" 
        font-weight="bold" 
        fill="${colors.primary}" 
        text-anchor="middle"
        style="text-shadow: 0 0 ${size * 0.02}px ${colors.primary};">
    PartyConnect
  </text>
  
  <!-- Tagline -->
  <text x="${center}" y="${center + size * 0.05}" 
        font-family="Arial, sans-serif" 
        font-size="${size * 0.04}" 
        fill="${colors.secondary}" 
        text-anchor="middle">
    Connect. Party. Celebrate.
  </text>
  
  <!-- Decorative elements -->
  <circle cx="${center * 0.3}" cy="${center * 0.3}" r="${size * 0.03}" fill="${colors.primaryLight}" opacity="0.6">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="${center * 1.7}" cy="${center * 0.3}" r="${size * 0.025}" fill="${colors.accent}" opacity="0.6">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="${center * 0.3}" cy="${center * 1.7}" r="${size * 0.025}" fill="${colors.secondary}" opacity="0.6">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/>
  </circle>
  <circle cx="${center * 1.7}" cy="${center * 1.7}" r="${size * 0.03}" fill="${colors.primary}" opacity="0.6">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite"/>
  </circle>
</svg>`;
};

// Create SVG files
console.log('🎨 Creating icon files...\n');

// Icon (1024x1024)
const iconSVG = createIconSVG(1024);
fs.writeFileSync(path.join(assetsDir, 'icon.svg'), iconSVG);
console.log('✅ Created icon.svg (1024x1024)');

// Splash (2048x2048)
const splashSVG = createSplashSVG(2048);
fs.writeFileSync(path.join(assetsDir, 'splash.svg'), splashSVG);
console.log('✅ Created splash.svg (2048x2048)');

// Adaptive icon (1024x1024) - same as icon but with safe area
const adaptiveIconSVG = createIconSVG(1024);
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.svg'), adaptiveIconSVG);
console.log('✅ Created adaptive-icon.svg (1024x1024)');

// Favicon (512x512)
const faviconSVG = createIconSVG(512);
fs.writeFileSync(path.join(assetsDir, 'favicon.svg'), faviconSVG);
console.log('✅ Created favicon.svg (512x512)');

console.log('\n📝 Next Steps:');
console.log('================================\n');
console.log('SVG files have been created. To convert them to PNG:\n');
console.log('Option 1: Use online converter');
console.log('  - Go to https://cloudconvert.com/svg-to-png');
console.log('  - Upload each SVG file');
console.log('  - Set the correct dimensions');
console.log('  - Download as PNG\n');
console.log('Option 2: Use ImageMagick (if installed)');
console.log('  magick icon.svg -resize 1024x1024 icon.png');
console.log('  magick splash.svg -resize 2048x2048 splash.png');
console.log('  magick adaptive-icon.svg -resize 1024x1024 adaptive-icon.png');
console.log('  magick favicon.svg -resize 512x512 favicon.png\n');
console.log('Option 3: Use Inkscape (free, open source)');
console.log('  - Open each SVG');
console.log('  - File > Export PNG Image');
console.log('  - Set dimensions and export\n');
console.log('Option 4: Use design tools');
console.log('  - Open SVG in Figma/Illustrator');
console.log('  - Export as PNG at required sizes\n');
console.log('After converting to PNG, rename files:');
console.log('  icon.svg → icon.png');
console.log('  splash.svg → splash.png');
console.log('  adaptive-icon.svg → adaptive-icon.png');
console.log('  favicon.svg → favicon.png\n');
console.log('Then uncomment icon paths in app.config.js\n');

// Create a simple HTML preview file
const previewHTML = `<!DOCTYPE html>
<html>
<head>
  <title>PartyConnect Icon Preview</title>
  <style>
    body {
      background: #0A0A0F;
      color: #B8B8D1;
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    .preview {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 20px;
    }
    .icon-box {
      background: #1A1A2E;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #3A3A4E;
    }
    .icon-box h3 {
      color: #9D4EDD;
      margin-top: 0;
    }
    img {
      max-width: 200px;
      height: auto;
    }
  </style>
</head>
<body>
  <h1>🎨 PartyConnect Icon Preview</h1>
  <p>Preview of generated icons. Convert SVG to PNG for use in the app.</p>
  
  <div class="preview">
    <div class="icon-box">
      <h3>App Icon (1024x1024)</h3>
      <img src="icon.svg" alt="Icon">
    </div>
    
    <div class="icon-box">
      <h3>Splash Screen (2048x2048)</h3>
      <img src="splash.svg" alt="Splash">
    </div>
    
    <div class="icon-box">
      <h3>Adaptive Icon (1024x1024)</h3>
      <img src="adaptive-icon.svg" alt="Adaptive Icon">
    </div>
    
    <div class="icon-box">
      <h3>Favicon (512x512)</h3>
      <img src="favicon.svg" alt="Favicon">
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(assetsDir, 'preview.html'), previewHTML);
console.log('✅ Created preview.html - Open in browser to preview icons');
