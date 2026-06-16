import { expect, test } from "@playwright/test"

const pages = [
  "/resources",
  "/resources/frontend",
  "/resources/backend",
  "/resources/federation",
  "/resources/ai",
  "/resources/security",
  "/resources/monitoring",
  "/code",
  "/conf",
  "/resources/reading",
  "/resources/video",
]

test.describe("Resource hub pages exist", () => {
  for (const path of pages) {
    test(`renders ${path}`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.ok()).toBeTruthy()
    })
  }
})
