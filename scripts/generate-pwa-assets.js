const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { width: 16, height: 16, name: 'favicon-16x16.png' },
  { width: 32, height: 32, name: 'favicon-32x32.png' },
  { width: 192, height: 192, name: 'android-chrome-192x192.png' },
  { width: 512, height: 512, name: 'android-chrome-512x512.png' },
  { width: 512, height: 512, name: 'maskable-icon.png', maskable: true },
  { width: 180, height: 180, name: 'apple-touch-icon.png' },
  { width: 32, height: 32, name: 'favicon.ico' }
];

const sourceImage = path.join(__dirname, '../public/CAIPOnew.png');
const outputDir = path.join(__dirname, '../public');

async function generateAssets() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const size of sizes) {
    try {
      let image = sharp(sourceImage);

      // For maskable icon, add padding to ensure safe zone
      if (size.maskable) {
        const padding = Math.floor(size.width * 0.1);
        const innerSize = size.width - (padding * 2);
        
        image = image.resize(innerSize, innerSize, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }).extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        });
      } else {
        image = image.resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        });
      }

      // For favicon.ico, we need to convert to ICO format
      if (size.name === 'favicon.ico') {
        await image.toFile(path.join(outputDir, 'favicon-32x32.png'));
        // Note: ICO conversion would require additional package
      } else {
        await image.toFile(path.join(outputDir, size.name));
      }

      console.log(`Generated ${size.name}`);
    } catch (error) {
      console.error(`Error generating ${size.name}:`, error);
    }
  }
}

generateAssets().catch(console.error); 