import { defineConfig, devices } from "@playwright/test"

const JSON_REPORT = process.env.JSON_REPORT === "1"
const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT || 3000

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./test/e2e",
  outputDir: "./test/out",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: JSON_REPORT
    ? [["list"], ["json", { outputFile: "./test/test-results.json" }]]
    : [["html"]],
  use: {
    baseURL: `http://localhost:${DEV_SERVER_PORT}`,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: `http://localhost:${DEV_SERVER_PORT}`,
    reuseExistingServer: !process.env.CI,
  },
})
