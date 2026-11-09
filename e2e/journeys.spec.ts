import { expect, test } from "./fixtures";

test("browse from home to a movie, then to a cast member", async ({ page }) => {
  await page.goto("/");
  const latest = page.getByRole("list", { name: "Latest movies" });
  await latest.getByRole("link", { name: /Dune: Part Two/ }).click();

  await expect(page).toHaveURL(/\/movies\/[a-f0-9]{24}$/);
  await expect(page.getByRole("heading", { level: 1, name: "Dune: Part Two" })).toBeVisible();
  await expect(page).toHaveTitle("Dune: Part Two · TEF Movies");

  await page.getByRole("list", { name: "Cast" }).getByRole("link").first().click();
  await expect(page).toHaveURL(/\/people\//);
  await expect(page.getByRole("list", { name: /movies$/ })).toContainText("Dune: Part Two");
});

test("plays a trailer in the shared player", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Play trailer: Dune: Part Two/ }).click();

  const dialog = page.getByRole("dialog", { name: /Trailer/ });
  await expect(dialog.locator("iframe")).toHaveAttribute("src", /youtube-nocookie\.com\/embed\//);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("TV show season guide switches seasons", async ({ page }) => {
  await page.goto("/search?q=Breaking Bad");
  await page
    .getByRole("list", { name: "TV show results" })
    .getByRole("link", { name: /Breaking Bad/ })
    .click();

  await expect(page.getByText("1. Pilot")).toBeVisible();
  await page.getByRole("combobox", { name: "Season" }).selectOption("2");
  await expect(page.getByText("1. Seven Thirty-Seven")).toBeVisible();
});

test("search results are shareable through the URL", async ({ page }) => {
  await page.goto("/search");
  await page.getByRole("searchbox").fill("nolan");

  await expect(page).toHaveURL(/\?q=nolan$/);
  const results = page.getByRole("list", { name: "Movie results" });
  await expect(results).toContainText("Inception");

  await page.reload();
  await expect(results).toContainText("Inception");
  await expect(page.getByRole("searchbox")).toHaveValue("nolan");
});

test("genre tile opens the genre page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("list", { name: "Genres" }).getByRole("link", { name: "Horror" }).click();

  await expect(page.getByRole("heading", { level: 1, name: "Horror" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Horror movies" })).toContainText("Night of the Living Dead");
});

test("browse page filters by genre", async ({ page }) => {
  await page.goto("/movies/browse");
  await page.getByRole("button", { name: "Comedy" }).click();

  await expect(page).toHaveURL(/genre=Comedy/);
  const grid = page.getByRole("list", { name: "Popular movies" });
  await expect(grid).toContainText("3 Idiots");
  await expect(grid).not.toContainText("Oppenheimer");
});

test("theme choice survives a reload", async ({ page }) => {
  await page.goto("/about");
  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: "Dark mode" });

  const wasDark = (await toggle.getAttribute("aria-pressed")) === "true";
  await toggle.click();
  await expect(html).toHaveClass(wasDark ? "" : "dark");

  await page.reload();
  await expect(html).toHaveClass(wasDark ? "" : "dark");
});

test("unknown pages and ids show not found", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { name: "Not found" })).toBeVisible();

  await page.goto("/movies/000000000000000000000000");
  await expect(page.getByText("We couldn't find that movie.")).toBeVisible();
});
