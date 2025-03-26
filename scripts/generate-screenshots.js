const sharp = require('sharp');
const path = require('path');

const screenshots = [
  {
    name: 'home.jpg',
    text: 'CAIPO Home Screen',
    width: 1280,
    height: 720
  },
  {
    name: 'features.jpg',
    text: 'CAIPO Features',
    width: 1280,
    height: 720
  }
];

async function generateScreenshots() {
  for (const screenshot of screenshots) {
    try {
      // Create a simple placeholder with text
      const svg = `
        <svg width="${screenshot.width}" height="${screenshot.height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#1a1a1a"/>
          <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">
            ${screenshot.text}
          </text>
        </svg>
      `;

      await sharp(Buffer.from(svg))
        .jpeg()
        .toFile(path.join(__dirname, '../public/screenshots', screenshot.name));

      console.log(`Generated ${screenshot.name}`);
    } catch (error) {
      console.error(`Error generating ${screenshot.name}:`, error);
    }
  }
}

generateScreenshots().catch(console.error); 