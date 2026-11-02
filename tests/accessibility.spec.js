import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.setTimeout(90_000);

async function expectNoOverlappingLabels(page, selector) {
  const overlaps = await page.locator(selector).evaluateAll((labels) => {
    const boxes = labels.map((label) => {
      const { left, right, top, bottom } = label.getBoundingClientRect();
      return { label: label.innerText.trim(), left, right, top, bottom };
    });

    return boxes.flatMap((box, index) => boxes.slice(index + 1)
      .filter((other) => box.left < other.right && box.right > other.left && box.top < other.bottom && box.bottom > other.top)
      .map((other) => `${box.label} / ${other.label}`));
  });
  expect(overlaps).toEqual([]);
}

async function expectLabelsCenteredOnAnchors(page, selector) {
  const offsets = await page.locator(selector).evaluateAll((labels) => labels.map((label) => {
    const overlay = label.parentElement.getBoundingClientRect();
    const bounds = label.getBoundingClientRect();
    return {
      x: Math.abs(bounds.left + bounds.width / 2 - overlay.left - Number.parseFloat(label.style.left)),
      y: Math.abs(bounds.top + bounds.height / 2 - overlay.top - Number.parseFloat(label.style.top)),
    };
  }));
  expect(offsets.every(({ x, y }) => x < 1 && y < 1)).toBe(true);
}

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

test("the About chapter features the same accessible profile portrait as the hero", async ({ page }) => {
  await page.goto("/");
  const portrait = page.locator("#about .about-portrait img");
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveAttribute("src", "/assets/Zaineb.webp");
  await expect(portrait).toHaveAttribute("alt", "Portrait of Zaineb Messaoudi");
  const portraitFrame = page.locator("#about .about-portrait");
  expect(Number.parseFloat(await portraitFrame.evaluate((frame) => getComputedStyle(frame).width))).toBeGreaterThan(252);
});

test("the hero resume link opens the supplied PDF in a browser tab", async ({ page }) => {
  await page.goto("/");
  const resumeLink = page.getByRole("link", { name: /view my resume/i });
  await expect(resumeLink).toHaveAttribute("href", "/assets/cv/zaineb-messaoudi-resume-en.pdf");
  await expect(resumeLink).toHaveAttribute("target", "_blank");
  await expect(resumeLink).not.toHaveAttribute("download", "");
});

test("the journey HUD collapses while visitors read the scrollable sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Back to the 3D world" })).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, document.querySelector("#about").offsetTop));
  await expect(page.locator(".game-portfolio")).toHaveClass(/is-reading/);
  await expect(page.locator(".journey-hud-controls")).toBeHidden();
  await expect(page.getByRole("button", { name: "Open the journey map" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Back to the 3D world" })).toBeVisible();
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
  await expect(page.locator(".world-branch-label[data-branch-id^='projects:']")).toHaveCount(6);
});

test("3D landmarks expose selectable portfolio stops", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".world-stop-label:not(.world-branch-label)")).toHaveCount(8);
  expect(await page.locator(".world-stop-label:not(.world-branch-label):visible").count()).toBeLessThan(8);
  await expect(page.locator(".game-world-canvas")).toHaveAttribute("data-camera-mode", "route");
  await expectNoOverlappingLabels(page, ".world-stop-label:not(.world-branch-label):visible");
  await expectLabelsCenteredOnAnchors(page, ".world-stop-label:not(.world-branch-label):visible");
  const aboutLandmark = page.getByRole("button", { name: "Explore About" });
  await expect(aboutLandmark).toBeVisible();
  await aboutLandmark.click();
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-current", "about");
});

test("SolarShare is included with its CV details and GitHub source", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();

  const solarShare = page.locator(".project-card").filter({ has: page.getByRole("heading", { name: "SolarShare" }) });
  await expect(solarShare).toBeVisible();
  await expect(solarShare).toContainText("Laravel 12");
  await expect(solarShare.locator("a[aria-label='SolarShare source code on GitHub']")).toHaveAttribute(
    "href",
    "https://github.com/Zaineb-Messaoudi/projet_laravel_5twin7"
  );
  await expect(page.locator(".project-card")).toHaveCount(6);
  await solarShare.getByRole("button", { name: /SolarShare/ }).click();
  await expect(page.locator(".project-details")).toContainText("70 tests and 1,007 assertions");
});

test("unavailable project and internship images show branded fallbacks", async ({ page }) => {
  await page.route("**/assets/projects/oralis-preview.png", (route) => route.abort());
  await page.route("**/assets/I-WAY.jpg", (route) => route.abort());
  await page.goto("/");

  const experience = page.locator("#experience");
  await experience.scrollIntoViewIfNeeded();
  await experience.locator(".experience-card").nth(3).scrollIntoViewIfNeeded();
  await expect(experience.locator(".experience-logo img").nth(3)).toBeHidden();
  await expect(experience.locator(".experience-logo").nth(3)).toContainText("IW");

  const projects = page.locator("#projects");
  await projects.scrollIntoViewIfNeeded();
  const oralis = page.locator(".project-card").filter({ has: page.getByRole("heading", { name: "Oralis" }) });
  await oralis.scrollIntoViewIfNeeded();
  await expect(oralis.locator(".project-media-placeholder")).toBeVisible();
  await expect(oralis.locator(".project-media-placeholder")).toContainText("Oralis");
});

test("tablet landmark labels stay centered and avoid collisions", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 768 });
  await page.goto("/");
  await expect(page.locator(".loading-overlay")).toBeHidden();
  await expectNoOverlappingLabels(page, ".world-stop-label:not(.world-branch-label):visible");
  await expectLabelsCenteredOnAnchors(page, ".world-stop-label:not(.world-branch-label):visible");
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
  await expect(page.locator(".world-intro")).toBeHidden();
  await expect(page.locator(".game-world-canvas")).toHaveAttribute("data-camera-mode", "branch");
  await expect(page.locator(".world-branch-label[data-branch-id^='experience:']")).toHaveCount(4);
  await expect(page.locator(".world-branch-label[data-branch-id^='experience:']:visible")).toHaveCount(4);
  await expect(page.locator(".world-stop-label:not(.world-branch-label):visible")).toHaveCount(0);
  await expectNoOverlappingLabels(page, ".world-branch-label:visible");
  await expectLabelsCenteredOnAnchors(page, ".world-branch-label:visible");
  await expect(page.locator("#experience .experience-card")).toHaveCount(4);

  await page.getByRole("button", { name: "Walk to QCMed" }).click();
  await expect(page.locator("#experience .experience-card")).toHaveCount(1);
  await expect(page.locator("#experience .experience-card")).toContainText("QCMed");

  await page.getByRole("button", { name: "Back to internship trail" }).click();
  await expect(page.locator("#experience .experience-card")).toHaveCount(4);
});

test("BCT reveals its exact details after a one-second arrival pause and can return to the main road", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Internships" }).click();
  await expect(page.locator(".world-branch-label[data-branch-id^='experience:']:visible")).toHaveCount(4);
  const selectedAt = Date.now();
  await page.getByRole("button", { name: /Walk to .*BCT/ }).click();
  await expect(page.locator("#experience")).toBeInViewport({ timeout: 1500 });
  expect(Date.now() - selectedAt).toBeGreaterThanOrEqual(1000);
  await expect(page.locator("#experience .experience-card")).toHaveCount(1);
  await expect(page.locator("#experience .experience-card")).toContainText("BCT");

  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("button", { name: "Return to the main road" }).click();
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-branch", "");
  await expect(page.locator(".world-stop-label:not(.world-branch-label)")).toHaveCount(8);
  await expect(page.locator(".world-branch-label:visible")).toHaveCount(0);
});

test("project branch reveals full inline project details after travel", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Projects" }).click();
  await expect(page.locator("#projects")).toHaveClass(/is-game-active/);
  await expect(page.locator(".game-world-canvas")).toHaveAttribute("data-camera-mode", "branch");
  await expect(page.locator(".world-branch-label[data-branch-id^='projects:']:visible")).toHaveCount(6);
  await expectNoOverlappingLabels(page, ".world-branch-label:visible");
  await expectLabelsCenteredOnAnchors(page, ".world-branch-label:visible");

  await page.getByRole("button", { name: "Walk to LegalGraph" }).click();
  await expect(page.locator(".project-details")).toBeVisible();
  await expect(page.locator(".project-details")).toContainText("LegalGraph");
  await expect(page.locator(".project-details")).toContainText("Decisions & trade-offs");

  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("button", { name: "Return to the main road" }).click();
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-branch", "");
  await expect(page.locator(".world-stop-label:not(.world-branch-label)")).toHaveCount(8);
});

test("navbar destinations jump directly to their content sections", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expect(page.locator(".navbar-wrap")).toHaveCSS("position", "fixed");
  await page.locator(".navbar").getByRole("button", { name: "Skills" }).click();
  await expect(page.locator("#skills")).toBeInViewport();
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-current", "skills");
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-branch", "");
});

test("mobile project branch labels remain readable without collisions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Projects" }).click();
  await expect(page.locator(".world-branch-label[data-branch-id^='projects:']")).toHaveCount(6);
  await expect(page.locator(".world-branch-label[data-branch-id^='projects:']:visible").first()).toBeVisible();
  await expectNoOverlappingLabels(page, ".world-branch-label:visible");
  await expectLabelsCenteredOnAnchors(page, ".world-branch-label:visible");
});

test("desktop arrow keys move between landmarks and reveal a selected branch", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.keyboard.down("ArrowRight");
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-current", "about");
  await page.keyboard.down("ArrowRight");
  await page.keyboard.up("ArrowRight");
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-current", "about");
  await page.waitForFunction(() => document.querySelector(".game-portfolio")?.dataset.gameTraveling === "false", { timeout: 20000 });
  await expect(page.locator("#about")).toHaveClass(/is-game-active/);
  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Internships" }).click();
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-branch", "experience");

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".world-branch-label[data-current='true']")).toHaveCount(1);
  await page.waitForFunction(() => document.querySelector(".game-portfolio")?.dataset.gameTraveling === "false", { timeout: 20000 });
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#experience .experience-card")).toHaveCount(1);
  await expect(page.locator("#experience .experience-card")).toContainText("QCMed");
});

test("reduced-motion visitors arrive at selected stops without travel animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open the journey map" }).click();
  await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "About me" }).click();
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-current", "about");
  await expect(page.locator(".game-portfolio")).toHaveAttribute("data-game-traveling", "false");
  await expect(page.locator("#about")).toHaveClass(/is-game-active/);
});

test("starts in dark mode for a new visitor", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
