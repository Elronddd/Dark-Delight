import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
const early = await page.evaluate(() => document.body.getAttribute("style"));
await page.waitForTimeout(1000);
const late = await page.evaluate(() => document.body.getAttribute("style"));
console.log("style right after DOMContentLoaded:", JSON.stringify(early));
console.log("style 1s later:", JSON.stringify(late));
await browser.close();
