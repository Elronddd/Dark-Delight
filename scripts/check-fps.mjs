import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3001";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(3500); // let auto-downgrade fully settle first

const result = await page.evaluate(() => {
  return new Promise((resolve) => {
    let frames = 0;
    const start = performance.now();
    function tick() {
      frames++;
      const elapsed = performance.now() - start;
      if (elapsed < 2500) requestAnimationFrame(tick);
      else resolve({ frames, elapsed, fps: Math.round((frames / elapsed) * 1000) });
    }
    requestAnimationFrame(tick);
  });
});
console.log("Settled FPS:", JSON.stringify(result));
await browser.close();
