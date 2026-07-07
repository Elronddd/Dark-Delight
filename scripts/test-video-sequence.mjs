import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (err) => console.log("PAGEERROR:", String(err)));
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

const check = async (label) => {
  const state = await page.evaluate(() => {
    const videos = Array.from(document.querySelectorAll("video"));
    return videos.map((v) => ({
      src: v.currentSrc.split("/").pop(),
      opacity: getComputedStyle(v).opacity,
      currentTime: Math.round(v.currentTime * 10) / 10,
      paused: v.paused,
    }));
  });
  console.log(label, JSON.stringify(state));
};

await check("t=0s   ");
await page.waitForTimeout(3600);
await check("t=3.6s ");
await page.waitForTimeout(1000);
await check("t=4.6s "); // should have crossfaded to clip 2 by now
await page.waitForTimeout(7500);
await check("t=12.1s"); // should be near/into clip 3 or looped back to clip 1

await browser.close();
