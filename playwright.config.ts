import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Run tests in files in parallel */
  fullyParallel: true,
  outputDir: "./test-artifacts/playwright/test-results",
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] }
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }
    }
  ],
  reporter: [
    ["html", { open: "never", outputDir: "./test-artifacts/playwright/report" }]
  ],
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  testDir: "./src",
  /* Match test files using this regular expression */
  testMatch: /.*(spec)\.(js|ts|mjs)/,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: "only-on-failure",
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry"
  },
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined
});
