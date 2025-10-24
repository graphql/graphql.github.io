import { test, expect } from "@playwright/test"

test("opens and dismisses calendar menu, all links match expectation", async ({
  page,
}) => {
  await page.goto("/conf/2025/schedule")
  await page.waitForLoadState("networkidle")

  const calendarButton = page
    .locator('button:has-text("Add to calendar")')
    .first()

  if ((await calendarButton.count()) === 0) {
    test.skip()
  }

  await calendarButton.scrollIntoViewIfNeeded()
  await expect(calendarButton).toBeVisible()

  // Test aria-expanded attribute
  await expect(calendarButton).toHaveAttribute("aria-expanded", "false")

  // Test opening menu
  const menuItems = page.locator('[role="menu"]')
  await expect(menuItems).not.toBeVisible()

  await calendarButton.click()
  await expect(menuItems).toBeVisible()
  await expect(calendarButton).toHaveAttribute("aria-expanded", "true")

  // Test menu contains correct links
  const icsLink = menuItems.locator('a:has-text("ICS")')
  const googleLink = menuItems.locator('a:has-text("Google")')
  const outlookLink = menuItems.locator('a:has-text("Outlook")')

  await expect(icsLink).toBeVisible()
  await expect(googleLink).toBeVisible()
  await expect(outlookLink).toBeVisible()

  await expect(icsLink).toHaveAttribute("href", /data:text\/calendar/)
  await expect(googleLink).toHaveAttribute("href", /google\.com/)
  await expect(outlookLink).toHaveAttribute("href", /outlook\./)

  // Test closing menu by clicking outside
  await page.mouse.click(10, 10)
  await expect(menuItems).not.toBeVisible()
  await expect(calendarButton).toHaveAttribute("aria-expanded", "false")
})
