import { test, expect } from "@playwright/test";

const viewports = [
  { name: "iphone-se", width: 320, height: 568 },
  { name: "iphone-14", width: 390, height: 844 },
  { name: "folded-closed", width: 280, height: 653 },
  { name: "folded-open", width: 717, height: 512 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "tv", width: 1920, height: 1080 },
  { name: "projector", width: 3840, height: 2160 },
];

for (const viewport of viewports) {
  test(`renders without overflow at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator(".profile-image")).toHaveAttribute("src", "/assets/Zaineb.webp");

    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      bodyHeight: document.body.scrollHeight,
    }));

    expect(dimensions.documentWidth, "horizontal overflow detected").toBeLessThanOrEqual(dimensions.viewportWidth + 1);
    expect(dimensions.bodyHeight).toBeGreaterThan(viewport.height);
  });
}

test("mobile navigation remains keyboard reachable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: /open navigation menu/i });
  await menu.focus();
  await expect(menu).toBeFocused();
  await menu.press("Enter");
  await expect(page.getByRole("dialog", { name: /mobile navigation menu/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Projects", exact: true })).toBeVisible();
});

for (const viewport of [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "tablet-landscape", width: 1023, height: 768 },
]) {
  test(`keeps the 3D road full-screen and usable at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.locator(".loading-overlay")).toBeHidden();

    const layout = await page.evaluate(() => {
      const world = document.querySelector(".game-world").getBoundingClientRect();
      const hero = document.querySelector(".game-hero").getBoundingClientRect();
      const intro = document.querySelector(".game-hero-copy").getBoundingClientRect();
      const hud = document.querySelector(".journey-hud").getBoundingClientRect();
      return {
        worldTop: world.top,
        worldBottom: world.bottom,
        worldHeight: world.height,
        heroHeight: hero.height,
        introBottom: intro.bottom,
        hudHeight: hud.height,
      };
    });

    expect(layout.worldTop).toBeLessThanOrEqual(1);
    expect(layout.worldHeight).toBeGreaterThanOrEqual(viewport.height - 1);
    expect(layout.worldBottom).toBeGreaterThanOrEqual(layout.heroHeight - 1);
    expect(layout.introBottom).toBeLessThan(layout.heroHeight);
    expect(layout.hudHeight).toBeLessThan(140);
    expect(layout.heroHeight).toBeGreaterThanOrEqual(viewport.height - 1);

    await page.getByRole("button", { name: /open the journey map/i }).click();
    await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Internships" }).click();
    await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-branch", "experience");
    await expect(page.locator(".game-world-canvas")).toHaveAttribute("data-camera-mode", "branch");
    await expect(page.locator(".world-branch-label[data-branch-id^='experience:']:visible")).toHaveCount(4);
    const branchMapHeight = await page.locator(".game-world").evaluate((world) => world.getBoundingClientRect().height);
    expect(branchMapHeight).toBeGreaterThanOrEqual(350);
  });
}
