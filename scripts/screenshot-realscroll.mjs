import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000/";
const outPath = process.argv[3] || "realscroll.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });

const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 350) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(500);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
