import { test as base, expect } from "@playwright/test";

/**
 * Third-party media (TMDB images, YouTube) is stubbed so the suite is fast
 * and doesn't depend on external services. Images fall back to the local
 * placeholder, which the app already handles.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(/image\.tmdb\.org|i\.ytimg\.com|youtube-nocookie\.com/, (route) => route.abort());
    await use(page);
  },
});

export { expect };
