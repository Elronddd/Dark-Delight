import { chromium } from "playwright";

const browser = await chromium.launch();

// Test 1: keyboard tab order reaches skip link, nav links, and CTA.
const page = await browser.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
const focusedSequence = [];
for (let i = 0; i < 6; i++) {
  await page.keyboard.press("Tab");
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    return el ? `${el.tagName}:${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}` : "none";
  });
  focusedSequence.push(info);
}
console.log("Tab sequence:", JSON.stringify(focusedSequence, null, 2));

// Test 2: reduced-motion — reveal sections should be visible immediately, no opacity:0 stuck state.
const page2 = await browser.newPage();
await page2.emulateMedia({ reducedMotion: "reduce" });
await page2.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page2.waitForTimeout(500);
const opacities = await page2.evaluate(() =>
  Array.from(document.querySelectorAll("[data-reveal]")).map(
    (el) => getComputedStyle(el).opacity
  )
);
console.log("Reduced-motion [data-reveal] opacities (should all be 1):", opacities);

await browser.close();
