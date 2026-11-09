import { defineConfig, devices } from "@playwright/test";

const API_PORT = 4400;
const WEB_PORT = 4500;
const isCI = !!process.env.CI;

/**
 * End-to-end tests run against the real stack: the API (in-memory MongoDB,
 * seeded) and the production build of the client.
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${WEB_PORT}`,
    trace: "retain-on-failure",
    // Locally use the installed Chrome; CI installs Playwright's Chromium.
    channel: isCI ? undefined : "chrome",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: isCI ? undefined : "chrome" } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: isCI ? undefined : "chrome" } },
  ],
  webServer: [
    {
      command: "npm exec --workspace server -- tsx src/server.ts",
      url: `http://localhost:${API_PORT}/health`,
      env: { PORT: String(API_PORT), LOG_LEVEL: "warn", NODE_ENV: "test" },
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
    {
      command: `npm run build -w client && npm run preview -w client -- --port ${WEB_PORT} --strictPort`,
      url: `http://localhost:${WEB_PORT}`,
      env: { VITE_API_URL: `http://localhost:${API_PORT}/graphql` },
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
  ],
});
