import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000/";
const outPath = process.argv[3] || "screenshot.png";
const width = Number(process.argv[4] || 390);
const height = Number(process.argv[5] || 844);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.screenshot({ path: outPath });
await browser.close();
