const puppeteer = require('puppeteer');
const path = require('path');

async function generateSocialImage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to exact social media dimensions
  await page.setViewport({ width: 1200, height: 630 });
  
  // Navigate to the HTML file
  const htmlPath = path.join(__dirname, '../social-preview.html');
  await page.goto(`file://${htmlPath}`);
  
  // Wait for any animations/fonts to load
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Take screenshot
  await page.screenshot({
    path: path.join(__dirname, '../public/social-link.png'),
    width: 1200,
    height: 630,
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });
  
  await browser.close();
  console.log('Social media image generated successfully!');
}

generateSocialImage().catch(console.error);
