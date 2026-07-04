import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (err) => console.log("PAGEERROR:", String(err)));

await page.goto("http://localhost:3000/menu", { waitUntil: "networkidle" });

const before = await page.evaluate(() => document.querySelectorAll(".item-enter").length);
console.log("items before filter:", before);

await page.fill('input[aria-label="Search the menu"]', "chicken");
await page.waitForTimeout(300);

const after = await page.evaluate(() =>
  Array.from(document.querySelectorAll(".item-enter")).map((el) => el.textContent?.trim())
);
console.log("items after searching 'chicken':", after.length, after.slice(0, 5));

await page.fill('input[aria-label="Search the menu"]', "zzz-no-match");
await page.waitForTimeout(300);
const empty = await page.evaluate(() => document.body.textContent?.includes("No dishes match your search."));
console.log("empty state shown:", empty);

await browser.close();
