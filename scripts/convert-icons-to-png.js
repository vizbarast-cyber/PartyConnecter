// Script to convert SVG icons to PNG
// Requires: npm install sharp

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('❌ Sharp library not installed.');
  console.log('\nTo convert SVG to PNG, install sharp:');
  console.log('  npm install sharp\n');
  console.log('Or use one of these alternatives:');
  console.log('  1. Online: https://cloudconvert.com/svg-to-png');
  console.log('  2. Inkscape: Open SVG > Export PNG');
  console.log('  3. ImageMagick: magick icon.svg icon.png\n');
  process.exit(1);
}

const assetsDir = path.join(__dirname, '..', 'assets');

const conversions = [
  { svg: 'icon.svg', png: 'icon.png', size: 1024 },
  { svg: 'splash.svg', png: 'splash.png', size: 2048 },
  { svg: 'adaptive-icon.svg', png: 'adaptive-icon.png', size: 1024 },
  { svg: 'favicon.svg', png: 'favicon.png', size: 512 },
];

async function convertIcons() {
  console.log('🔄 Converting SVG icons to PNG...\n');
  
  for (const { svg, png, size } of conversions) {
    const svgPath = path.join(assetsDir, svg);
    const pngPath = path.join(assetsDir, png);
    
    if (!fs.existsSync(svgPath)) {
      console.log(`⚠️  ${svg} not found, skipping...`);
      continue;
    }
    
    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath);
      
      console.log(`✅ Converted ${svg} → ${png} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Error converting ${svg}:`, error.message);
    }
  }
  
  console.log('\n✨ Conversion complete!');
  console.log('\nNext step: Uncomment icon paths in app.config.js\n');
}

convertIcons().catch(console.error);

