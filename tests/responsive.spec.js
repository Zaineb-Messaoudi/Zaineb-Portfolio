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
  await expect(page.getByRole("button", { name: "Projects" })).toBeVisible();
});
