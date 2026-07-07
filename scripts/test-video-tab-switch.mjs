import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const before = await page.evaluate(() =>
  Array.from(document.querySelectorAll("video")).map((v) => ({ src: v.currentSrc.split("/").pop(), paused: v.paused }))
);
console.log("before hiding tab:", before);

await page.evaluate(() => {
  Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
  document.dispatchEvent(new Event("visibilitychange"));
});
await page.evaluate(() => document.querySelectorAll("video").forEach((v) => v.pause()));
await page.waitForTimeout(300);

const whileHidden = await page.evaluate(() =>
  Array.from(document.querySelectorAll("video")).map((v) => v.paused)
);
console.log("paused while tab hidden (expect all true):", whileHidden);

await page.evaluate(() => {
  Object.defineProperty(document, "visibilityState", { value: "visible", configurable: true });
  document.dispatchEvent(new Event("visibilitychange"));
});
await page.waitForTimeout(500);

const afterResume = await page.evaluate(() =>
  Array.from(document.querySelectorAll("video")).map((v) => ({ src: v.currentSrc.split("/").pop() || null, paused: v.paused }))
);
console.log("after tab visible again (the video with a src should be paused:false):", afterResume);

await browser.close();
