import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const outPath = process.argv[3] || "screenshot.png";
const waitForText = process.argv[4];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(url, { waitUntil: "networkidle" });
if (waitForText) {
  await page.waitForSelector(`text=${waitForText}`, { timeout: 10000 });
}
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
