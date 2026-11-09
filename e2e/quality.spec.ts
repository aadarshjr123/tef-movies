import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const PAGES = ["/", "/movies", "/tv", "/movies/browse", "/search?q=crime", "/about"];

/**
 * Content wider than the screen makes mobile browsers zoom the whole layout
 * out (window.innerWidth grows to match), so compare against the device's
 * viewport, not innerWidth.
 */
const overflowPx = (page: Page) =>
  page.evaluate((viewport) => document.documentElement.scrollWidth - viewport, page.viewportSize()!.width);

test.describe("layout", () => {
  for (const path of PAGES) {
    test(`${path} has no horizontal page overflow`, async ({ page }) => {
      await page.goto(path);
      await page.getByRole("main").getByRole("heading").first().waitFor();
      await page.waitForLoadState("networkidle");

      expect(await overflowPx(page)).toBeLessThanOrEqual(0);
    });
  }

  test("title pages have no horizontal page overflow", async ({ page }) => {
    await page.goto("/search?q=Breaking Bad");
    await page.getByRole("list", { name: "TV show results" }).getByRole("link").first().click();
    await page.getByRole("heading", { level: 1 }).waitFor();
    await page.waitForLoadState("networkidle");

    expect(await overflowPx(page)).toBeLessThanOrEqual(0);
  });
});

const seriousViolations = async (page: Page) => {
  const { violations } = await new AxeBuilder({ page }).analyze();
  return violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.id}: ${v.help} (${v.nodes.length})`);
};

// Both themes are checked: contrast problems often exist in only one.
for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`accessibility (${colorScheme})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ colorScheme });
    });

    for (const path of ["/", "/search?q=nolan", "/about"]) {
      test(`${path} has no serious axe violations`, async ({ page }) => {
        await page.goto(path);
        await page.getByRole("main").getByRole("heading").first().waitFor();

        expect(await seriousViolations(page)).toEqual([]);
      });
    }

    test("a title page has no serious axe violations", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("list", { name: "Latest movies" }).getByRole("link").first().click();
      await page.getByRole("heading", { level: 1 }).waitFor();

      expect(await seriousViolations(page)).toEqual([]);
    });
  });
}
