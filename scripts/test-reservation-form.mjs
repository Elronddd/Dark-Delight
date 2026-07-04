import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("http://localhost:3001/reservations", { waitUntil: "networkidle" });

await page.fill("#name", "Rahul Kumar");
await page.selectOption("#partySize", "4");
await page.fill("#date", "2026-07-10");
await page.fill("#time", "19:30");

const [popup] = await Promise.all([
  context.waitForEvent("page"),
  page.click('button:has-text("Send via WhatsApp")'),
]);
await popup.waitForLoadState("domcontentloaded").catch(() => {});
console.log("Reservation link opened:", popup.url());
await browser.close();
