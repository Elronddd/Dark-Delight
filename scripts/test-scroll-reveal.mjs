import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (err) => console.log("PAGEERROR:", String(err)));
page.on("console", (msg) => { if (msg.type() === "error") console.log("CONSOLE ERROR:", msg.text()); });

await page.goto(url, { waitUntil: "networkidle" });

const height = await page.evaluate(() => document.body.scrollHeight);
console.log("document height:", height);

for (let y = 0; y < height; y += 350) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(180);
}
await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  return Array.from(document.querySelectorAll("[data-reveal]")).map((el) => {
    const cs = getComputedStyle(el);
    return {
      text: (el.textContent || "").trim().slice(0, 30),
      opacity: cs.opacity,
      filter: cs.filter,
      clipPath: cs.clipPath,
    };
  });
});
console.log("data-reveal states after real scroll:", JSON.stringify(info, null, 2));

await browser.close();
