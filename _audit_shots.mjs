import { chromium } from "@playwright/test";
import fs from "node:fs";
fs.mkdirSync("_audit", { recursive: true });
const base = "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "chrome", args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const out = [];
async function run(name, viewport, fn) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) errors.push(`${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("requestfailed", (r) => errors.push("requestfailed: " + r.url()));
  page.on("response", (r) => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
  const t0 = Date.now();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await fn(page);
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const res = performance.getEntriesByType("resource");
    return {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
      load: Math.round(nav.loadEventEnd),
      transferKB: Math.round(res.reduce((s, r) => s + (r.transferSize || 0), 0) / 1024),
      resources: res.length,
      webglUnavailable: document.querySelector(".game-world")?.dataset.webglUnavailable || null,
      canvas: !!document.querySelector("canvas.game-world-canvas"),
      h1: document.querySelector("h1")?.textContent,
      lang: document.documentElement.lang,
      title: document.title,
    };
  });
  out.push({ name, metrics, errors: [...new Set(errors)] });
  await ctx.close();
}

await run("desktop-hero", { width: 1440, height: 900 }, async (p) => { await p.screenshot({ path: "_audit/desktop-hero.png" }); });
await run("desktop-projects-branch", { width: 1440, height: 900 }, async (p) => {
  await p.getByRole("button", { name: /Projects/i }).first().click().catch(() => {});
  await p.waitForTimeout(5000);
  await p.screenshot({ path: "_audit/desktop-projects.png" });
});
await run("desktop-contact", { width: 1440, height: 900 }, async (p) => {
  await p.locator(".nav-link", { hasText: "Contact" }).click();
  await p.waitForTimeout(3000);
  await p.screenshot({ path: "_audit/desktop-contact.png" });
  await p.screenshot({ path: "_audit/desktop-contact-full.png", fullPage: false });
});
await run("mobile-hero", { width: 390, height: 844 }, async (p) => { await p.screenshot({ path: "_audit/mobile-hero.png" }); });
await run("mobile-scroll", { width: 390, height: 844 }, async (p) => { await p.evaluate(() => window.scrollTo(0, 900)); await p.waitForTimeout(800); await p.screenshot({ path: "_audit/mobile-scroll.png" }); });
await run("fr", { width: 1440, height: 900 }, async (p) => { await p.getByRole("button", { name: /français/i }).click(); await p.waitForTimeout(1500); await p.screenshot({ path: "_audit/desktop-fr.png" }); });
await browser.close();
console.log(JSON.stringify(out, null, 2));
