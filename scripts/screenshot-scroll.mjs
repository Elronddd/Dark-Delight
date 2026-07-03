import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const outPath = process.argv[3] || "screenshot.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// Simulate a real user scrolling down (wheel events, not window.scrollTo) so
// Lenis + GSAP ScrollTrigger reveal animations actually fire before capture.
const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
let scrolled = 0;
while (scrolled < scrollHeight) {
  await page.mouse.wheel(0, 400);
  scrolled += 400;
  await page.waitForTimeout(120);
}
await page.waitForTimeout(800);

await page.screenshot({ path: outPath, fullPage: true });
console.log("CONSOLE_ERRORS:", JSON.stringify(consoleErrors));
await browser.close();
