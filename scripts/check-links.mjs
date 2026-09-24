import { chromium } from "playwright";

const startUrl = process.argv[2];
if (!startUrl) {
  console.error("Usage: node scripts/check-links.mjs <production-url>");
  process.exit(1);
}

const origin = new URL(startUrl).origin;
const queue = [startUrl];
const visited = new Set();
const broken = [];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage();

while (queue.length > 0) {
  const url = queue.shift();
  if (visited.has(url)) continue;
  visited.add(url);

  const response = await page.goto(url, { waitUntil: "domcontentloaded" });
  if (!response || response.status() >= 400) {
    broken.push({ source: url, target: url, status: response?.status() ?? 0 });
    continue;
  }

  const links = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.href));
  for (const link of links) {
    const target = new URL(link);
    if (target.origin === origin && !target.hash && !visited.has(target.href)) queue.push(target.href);
  }
}

await browser.close();

if (broken.length > 0) {
  console.error(JSON.stringify(broken, null, 2));
  process.exit(1);
}

console.log(`Link check OK: ${visited.size} same-origin URL(s) crawled.`);
