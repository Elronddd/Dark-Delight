import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const outPath = process.argv[3] || "screenshot.png";
const waitForText = process.argv[4];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

await page.goto(url, { waitUntil: "networkidle" });
if (waitForText) {
  await page.waitForSelector(`text=${waitForText}`, { timeout: 10000 });
}
await page.screenshot({ path: outPath, fullPage: true });

console.log("CONSOLE_ERRORS:", JSON.stringify(consoleErrors));
await browser.close();
