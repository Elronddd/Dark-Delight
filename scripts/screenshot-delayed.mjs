import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const outPath = process.argv[3] || "screenshot.png";
const waitMs = Number(process.argv[4] || 2500);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(waitMs); // let auto-downgrade settle before capturing
await page.screenshot({ path: outPath });
console.log("CONSOLE_ERRORS:", JSON.stringify(consoleErrors));
await browser.close();
