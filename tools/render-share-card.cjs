// Run with Playwright available on NODE_PATH, while the local website server is running.
// Edit docs/design/site-theme/share-card.html, then regenerate the versioned JPEG.
const {chromium} = require('playwright');
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 try {
  const page = await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await page.goto((process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:8765') + '/docs/design/site-theme/share-card.html');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await page.screenshot({path:'assets/social/zeropoint-range-days-v1.jpg',type:'jpeg',quality:93});
 } finally { await browser.close(); }
})();
