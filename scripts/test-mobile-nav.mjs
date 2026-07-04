import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on("pageerror", (err) => console.log("PAGEERROR:", String(err)));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

const before = await page.evaluate(() => {
  const btn = document.querySelector('button[aria-label="Open menu"]');
  const panel = document.getElementById("mobile-nav-panel");
  return { hasButton: Boolean(btn), ariaExpanded: btn?.getAttribute("aria-expanded"), panelExists: Boolean(panel) };
});
console.log("before open:", before);

await page.click('button[aria-label="Open menu"]');
await page.waitForTimeout(500);

const after = await page.evaluate(() => {
  const panel = document.getElementById("mobile-nav-panel");
  const links = panel ? Array.from(panel.querySelectorAll("a")).map((a) => a.textContent) : [];
  const btn = document.querySelector('button[aria-label="Close menu"]');
  return { panelVisible: panel ? getComputedStyle(panel).height !== "0px" : false, links, ariaExpanded: btn?.getAttribute("aria-expanded") };
});
console.log("after open:", after);

await page.screenshot({ path: "mobile-nav-open.png" });

await page.click('button[aria-label="Close menu"]');
await page.waitForTimeout(500);
const closed = await page.evaluate(() => {
  const panel = document.getElementById("mobile-nav-panel");
  return { panelGone: !panel };
});
console.log("after close:", closed);

await browser.close();
