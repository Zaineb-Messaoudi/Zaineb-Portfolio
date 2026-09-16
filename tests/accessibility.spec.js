import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.setTimeout(90_000);

const accessibilityViewports = [
  { name: "small-phone", width: 320, height: 568 },
  { name: "foldable-open", width: 717, height: 512 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const viewport of accessibilityViewports) {
  test(`has no WCAG violations at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator(".loading-overlay")).toBeHidden();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("supports language switching and updates the document language", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("button", { name: "Passer au français" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator("#education-title")).toContainText("formation");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("starts in dark mode for a new visitor", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
