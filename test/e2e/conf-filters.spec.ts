import { test, expect } from "@playwright/test"

test("conference schedule filter combinations and results", async ({
  page,
}) => {
  await page.goto("/conf/2025/schedule")
  await page.waitForLoadState("networkidle")

  const comboboxOptions = page.locator('[role="listbox"]')

  const sessionFormatCombobox = page.getByRole("combobox", {
    name: "Session Format",
  })
  await expect(sessionFormatCombobox).toBeVisible()

  await sessionFormatCombobox.click()
  await expect(comboboxOptions).toBeVisible()

  const graphqlProductionOption = comboboxOptions.locator(
    '[role="option"]:has-text("GraphQL in Production")',
  )
  await expect(graphqlProductionOption).toBeVisible()
  await graphqlProductionOption.click()

  await page.keyboard.press("Escape")
  await expect(comboboxOptions).not.toBeVisible()

  const talkCategoryCombobox = page.getByRole("combobox", {
    name: "Talk Category",
  })
  await expect(talkCategoryCombobox).toBeVisible()

  await talkCategoryCombobox.click()
  await expect(comboboxOptions).toBeVisible()

  const securityOption = comboboxOptions.locator(
    '[role="option"]:has-text("Security")',
  )
  await expect(securityOption).toBeVisible()
  await securityOption.click()

  await page.keyboard.press("Escape")
  await expect(comboboxOptions).not.toBeVisible()

  const audienceCombobox = page.getByRole("combobox", { name: "Audience" })
  await expect(audienceCombobox).toBeVisible()

  await audienceCombobox.click()
  await expect(comboboxOptions).toBeVisible()

  const allAudienceOptions = comboboxOptions.locator('[role="option"]')
  const audienceOptionCount = await allAudienceOptions.count()

  expect(audienceOptionCount).toBeGreaterThan(0)

  const intermediateOption = comboboxOptions.locator(
    '[role="option"]:has-text("Intermediate")',
  )
  await expect(intermediateOption).toBeVisible()
  await expect(intermediateOption).not.toHaveAttribute("aria-disabled", "true")

  const beginnerOption = comboboxOptions.locator(
    '[role="option"]:has-text("Beginner")',
  )
  await expect(beginnerOption).toBeVisible()
  await expect(beginnerOption).toHaveAttribute("aria-disabled", "true")

  await page.keyboard.press("Escape")
  await expect(comboboxOptions).not.toBeVisible()

  await page.keyboard.press("Escape")

  const sessionLink = page.locator(
    'a[aria-label*="Unlocking Federation Security at Scale in Booking"]',
  )
  await expect(sessionLink).toBeVisible()
})

test("talk category multi-selection and escape key functionality", async ({
  page,
}) => {
  await page.goto("/conf/2025/schedule")
  await page.waitForLoadState("networkidle")

  const comboboxOptions = page.locator('[role="listbox"]')

  const talkCategoryCombobox = page.getByRole("combobox", {
    name: "Talk Category",
  })
  await expect(talkCategoryCombobox).toBeVisible()

  await talkCategoryCombobox.click()
  await expect(comboboxOptions).toBeVisible()

  const backendOption = comboboxOptions.locator(
    '[role="option"]:has-text("Backend")',
  )
  const scalingOption = comboboxOptions.locator(
    '[role="option"]:has-text("Scaling")',
  )

  await expect(backendOption).toBeVisible()
  await expect(scalingOption).toBeVisible()

  await backendOption.click()

  await talkCategoryCombobox.click()
  await expect(comboboxOptions).toBeVisible()
  await scalingOption.click()

  await talkCategoryCombobox.click()
  await expect(comboboxOptions).toBeVisible()

  await page.keyboard.press("Escape")
  await expect(comboboxOptions).not.toBeVisible()
})
