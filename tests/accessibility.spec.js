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
  await expect(page.locator("#journey-map-title")).toContainText("route");
  await expect(page.locator("#experience-title")).toContainText("stages");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("the 3D journey includes every original section and recent GitHub projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".game-world-canvas")).toHaveCount(1);
  for (const id of ["about", "summary", "experience", "education", "projects", "skills", "contact"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.getByRole("heading", { name: "LegalGraph" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Learnwise" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Oralis" })).toBeAttached();
  await expect(page.locator("#experience .experience-card")).toHaveCount(4);
});

test("journey map walks to a section, then scrolls the normal page to it", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: /Projects/ }).click();
  await expect(page.locator("#projects")).toHaveClass(/is-game-active/);
  await expect(page.locator("#projects-title")).toBeVisible();
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-branch", "projects");
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-current", "projects");
  await expect(page.locator("#hero")).toBeInViewport();
  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(20);
  await expect(page.locator(".world-branch-label[data-branch-id^='projects:']")).toHaveCount(5);
});

test("3D landmarks expose selectable portfolio stops", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".world-stop-label:not(.world-branch-label)")).toHaveCount(8);
  const projectLandmark = page.getByRole("button", { name: "Explore Projects" });
  await expect(projectLandmark).toBeVisible();
  await projectLandmark.click();
  await expect(page.locator("#projects")).toHaveClass(/is-game-active/);
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-branch", "projects");
});

test("the full-page quest HUD follows the visitor between game chapters", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const hud = page.getByRole("complementary", { name: "Journey controls" });
  await expect(hud).toBeVisible();
  await hud.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Projects" }).click();
  await expect(page.locator("#projects")).toHaveClass(/is-game-active/);
  await expect(hud.getByText("Projects", { exact: true })).toBeVisible();

  const chapterStyles = await page.locator(".game-portfolio .section").evaluateAll((sections) =>
    sections.map((section) => ({
      chapter: section.dataset.worldChapter,
      background: getComputedStyle(section).backgroundImage,
      title: Boolean(section.querySelector(".chapter-banner")),
    }))
  );
  expect(chapterStyles).toHaveLength(7);
  expect(chapterStyles.every((section) => section.background !== "none" && section.title)).toBe(true);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

test("internship branch reveals the selected internship after travel", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Internships" }).click();
  await expect(page.locator("#experience")).toHaveClass(/is-game-active/);
  await expect(page.locator(".world-branch-label[data-branch-id^='experience:']")).toHaveCount(4);
  await expect(page.locator("#experience .experience-card")).toHaveCount(4);

  await page.getByRole("button", { name: "Walk to QCMed" }).click();
  await expect(page.locator("#experience .experience-card")).toHaveCount(1);
  await expect(page.locator("#experience .experience-card")).toContainText("QCMed");

  await page.getByRole("button", { name: "Back to internship trail" }).click();
  await expect(page.locator("#experience .experience-card")).toHaveCount(4);
});

test("project branch reveals full inline project details after travel", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Projects" }).click();
  await expect(page.locator("#projects")).toHaveClass(/is-game-active/);

  await page.getByRole("button", { name: "Walk to LegalGraph" }).click();
  await expect(page.locator(".project-details")).toBeVisible();
  await expect(page.locator(".project-details")).toContainText("LegalGraph");
  await expect(page.locator(".project-details")).toContainText("Decisions & trade-offs");
});

test("desktop arrow keys move between landmarks and reveal a selected branch", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-current", "about");
  await expect(page.locator("#about")).toHaveClass(/is-game-active/);
  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Internships" }).click();
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-branch", "experience");

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-traveling", "true");
  await page.waitForFunction(() => document.querySelector(".game-portfolio")?.dataset.gameTraveling === "false", { timeout: 20000 });
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#experience .experience-card")).toHaveCount(1);
  await expect(page.locator("#experience .experience-card")).toContainText("QCMed");
});

test("starts in dark mode for a new visitor", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
