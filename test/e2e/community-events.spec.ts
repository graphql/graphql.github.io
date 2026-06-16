import { test, expect, type Locator } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/community/events")
})

test("Zurich meetup link works", async ({ page }) => {
  if (process.env.CI) test.skip()

  const link = page.getByRole("link", { name: /Zurich/i }).first()
  await link.scrollIntoViewIfNeeded()

  await link.click()

  const pagePromise = page.context().waitForEvent("page")
  await link.click()
  const newPage = await pagePromise

  await newPage.waitForLoadState("domcontentloaded", { timeout: 10000 })
  expect(newPage.url()).toContain("meetup.com/graphql-zurich")
})

test("map matches screenshot", async ({ page }) => {
  if (process.env.CI) test.skip()

  const mapContainer = page.locator("#meetups-map").first()
  await mapContainer.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500) // we need to wait until Playwright finishes scrolling...

  const mapCanvas = page.locator("canvas").first()

  if (!process.env.CI) {
    await expect
      .poll(
        async () => {
          const box = await mapCanvas.boundingBox()
          return box && box.width > 100 && box.height > 100
        },
        { timeout: 15_000 },
      )
      .toBe(true)
  }

  await expect(mapContainer.locator("canvas").first()).toHaveScreenshot(
    "meetups-map.png",
    { timeout: 30_000, maxDiffPixelRatio: 0.015 },
  )
})

test("map tooltip appears on marker hover", async ({ page }) => {
  if (process.env.CI) test.skip()

  const mapContainer = page.locator("#meetups-map").first()
  await mapContainer.scrollIntoViewIfNeeded()
  await expect(mapContainer).toBeVisible({ timeout: 10000 })

  if (!process.env.CI) {
    await expect
      .poll(async () => {
        const box = await mapContainer.boundingBox()
        return Boolean(box && box.width > 100 && box.height > 100)
      })
      .toBe(true)
  }

  const tooltip = page.getByRole("tooltip")
  await expect(tooltip).toHaveCount(0)
  const mapCanvas = mapContainer.locator("canvas").first()
  await mapCanvas.hover()
  await page.waitForTimeout(2000) // we need to wait until Playwright finishes scrolling...
  const { clientX, clientY } = await page.evaluate(() => {
    const canvas = document.querySelector(
      "#meetups-map canvas",
    ) as HTMLCanvasElement | null
    if (!canvas) throw new Error("Canvas not found")
    const targetLat = 51.51
    const targetLon = -0.12
    const aspectRatio = 1.65
    const cellSize = 8
    const mercatorLimit = 85.05112878
    const minDisplayedLatitude = -60
    const baseLatitudeOffset = 4
    const baseLongitudeOffset = 0.1
    const clamp01 = (value: number) => {
      if (value <= 0) return 0
      if (value >= 1) return 1
      return value
    }
    const normalizeLongitude = (value: number) => {
      let lon = value
      while (lon <= -180) lon += 360
      while (lon > 180) lon -= 360
      return lon
    }
    const latToRawV = (lat: number) => {
      const clampedLat = Math.max(-mercatorLimit, Math.min(mercatorLimit, lat))
      const rad = (clampedLat * Math.PI) / 180
      return (
        0.5 - Math.log(Math.tan(Math.PI * 0.25 + rad * 0.5)) / (2 * Math.PI)
      )
    }
    const maxProjectedV = latToRawV(mercatorLimit)
    const minProjectedV = latToRawV(minDisplayedLatitude)
    const lonLatToUV = (lon: number, lat: number) => {
      const adjustedLon = normalizeLongitude(lon + baseLongitudeOffset)
      const u = (adjustedLon + 180) / 360
      const adjustedLat = Math.max(
        minDisplayedLatitude,
        Math.min(mercatorLimit, lat + baseLatitudeOffset),
      )
      const rawV = latToRawV(adjustedLat)
      const normalizedV = clamp01(
        (rawV - maxProjectedV) / (minProjectedV - maxProjectedV),
      )
      return [u, normalizedV] as const
    }
    const { width, height } = canvas
    const pixelRatio = window.devicePixelRatio || 1
    const worldHeight = Math.min(width / aspectRatio, height)
    const worldWidth = worldHeight * aspectRatio
    const panX = width * 0.5 - worldWidth * 0.5
    const panY = height * 0.5 - worldHeight * 0.5
    const [u, v] = lonLatToUV(targetLon, targetLat)
    const markerY = 1 - v
    const screenX = panX + u * worldWidth
    const screenY = panY + markerY * worldHeight
    const deviceCell = cellSize * pixelRatio
    const cellX = Math.floor(screenX / deviceCell)
    const cellY = Math.floor(screenY / deviceCell)
    const centerX = (cellX + 0.5) * deviceCell
    const centerY = (cellY + 0.5) * deviceCell
    const rect = canvas.getBoundingClientRect()
    const clientX = rect.left + centerX / pixelRatio
    const clientY = rect.bottom - centerY / pixelRatio
    return { clientX, clientY }
  })
  await page.mouse.move(clientX, clientY)
  await expect(tooltip).toHaveText("London GraphQL", { timeout: 5000 })
  await expect(tooltip).toBeVisible()
})

test("event type filters hide cards and lock the last active tag", async ({
  page,
}) => {
  // TODO: @hasparus figure out why this fails only on CI
  if (process.env.CI) test.skip()

  const pastEventsSection = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", {
        level: 2,
        name: /Past events & meetups/i,
      }),
    })
    .first()

  await pastEventsSection.scrollIntoViewIfNeeded()

  const filterGroup = pastEventsSection.getByRole("group", {
    name: "Event type",
  })

  await expect(filterGroup).toBeVisible()
  const conferenceFilter = filterGroup.getByRole("checkbox", {
    name: /conference/i,
  })
  const meetupFilter = filterGroup.getByRole("checkbox", { name: /meetup/i })
  const workingGroupFilter = filterGroup.getByRole("checkbox", {
    name: /working group/i,
  })
  const conferenceChip = filterGroup
    .locator("label")
    .filter({ hasText: /conference/i })
    .first()
  const meetupChip = filterGroup
    .locator("label")
    .filter({ hasText: /meetup/i })
    .first()
  const workingGroupChip = filterGroup
    .locator("label")
    .filter({ hasText: /working group/i })
    .first()

  const tagBadge = (tag: RegExp) =>
    pastEventsSection.locator("a span:has(.Tag--bg)").filter({ hasText: tag })

  const filterDefinitions = [
    {
      kind: "conference",
      filterName: /conference/i,
      badgeText: /^conference$/i,
      chip: conferenceChip,
      filter: conferenceFilter,
    },
    {
      kind: "meetup",
      filterName: /meetup/i,
      badgeText: /^meetup$/i,
      chip: meetupChip,
      filter: meetupFilter,
    },
    {
      kind: "working group",
      filterName: /working group/i,
      badgeText: /^working group$/i,
      chip: workingGroupChip,
      filter: workingGroupFilter,
    },
  ] as const

  type FilterDefinition = (typeof filterDefinitions)[number]
  type ActiveFilter = FilterDefinition & { badges: Locator }

  const activeFilters: ActiveFilter[] = []
  const toggleableFilters: ActiveFilter[] = []

  for (const definition of filterDefinitions) {
    const badgeLocator = tagBadge(definition.badgeText)
    if ((await definition.filter.count()) === 0) continue
    const filterDefinition = { ...definition, badges: badgeLocator }
    activeFilters.push(filterDefinition)
    if (await definition.filter.isEnabled()) {
      toggleableFilters.push(filterDefinition)
    }
  }

  expect(activeFilters.length).toBeGreaterThan(0)

  for (const activeFilter of activeFilters) {
    await expect(activeFilter.badges.first()).toBeVisible()
  }

  if (toggleableFilters.length === 0) {
    return
  }

  for (const activeFilter of toggleableFilters) {
    await activeFilter.chip.click()
    await expect(activeFilter.filter).not.toBeChecked()
    await expect(activeFilter.badges).toHaveCount(0)
    await activeFilter.chip.click()
    await expect(activeFilter.filter).toBeChecked()
    await expect(activeFilter.badges.first()).toBeVisible()
  }

  if (toggleableFilters.length < 2) {
    return
  }

  const [lockedFilter, ...filtersToToggle] = toggleableFilters

  for (const filter of filtersToToggle) {
    await filter.chip.click()
    await expect(filter.filter).not.toBeChecked()
  }

  await expect(lockedFilter.filter).toBeChecked()
  await expect(lockedFilter.filter).toBeDisabled()
  await expect(lockedFilter.badges.first()).toBeVisible()

  for (const filter of filtersToToggle) {
    await filter.chip.click()
    await expect(filter.filter).toBeChecked()
  }

  await expect(lockedFilter.filter).toBeEnabled()
})

test("upcoming and past sections only show events on the correct side of now", async ({
  page,
}) => {
  // TODO: @hasparus figure out why this fails only on CI
  if (process.env.CI) test.skip()

  const upcomingSection = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", { level: 2, name: /Upcoming events/i }),
    })
    .first()
  const pastEventsSection = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", {
        level: 2,
        name: /Past events & meetups/i,
      }),
    })
    .first()

  await Promise.all([
    upcomingSection.scrollIntoViewIfNeeded(),
    pastEventsSection.scrollIntoViewIfNeeded(),
  ])

  await expect(upcomingSection).toBeVisible()
  await expect(pastEventsSection).toBeVisible()

  const now = Date.now()

  const readSectionDates = async (section: Locator) => {
    const entries = await section.locator("a time").evaluateAll(elements =>
      elements.map(element => ({
        iso: element.getAttribute("datetime") ?? "",
        text: element.textContent?.trim() ?? "",
      })),
    )
    return entries
  }

  const upcomingDates = await readSectionDates(upcomingSection)
  expect(upcomingDates.length).toBeGreaterThan(0)
  upcomingDates.forEach(({ iso, text }) => {
    expect(
      iso.length,
      `${text} is missing a datetime attribute`,
    ).toBeGreaterThan(0)
    const timestamp = Date.parse(iso)
    expect(
      Number.isNaN(timestamp),
      `${text} carries an invalid datetime attribute: ${iso}`,
    ).toBe(false)
    expect(
      timestamp,
      `${text} should be in the future but resolved to ${iso}`,
    ).toBeGreaterThanOrEqual(now)
  })

  const pastDates = await readSectionDates(pastEventsSection)
  expect(pastDates.length).toBeGreaterThan(0)
  pastDates.forEach(({ iso, text }) => {
    expect(
      iso.length,
      `${text} is missing a datetime attribute`,
    ).toBeGreaterThan(0)
    const timestamp = Date.parse(iso)
    expect(
      Number.isNaN(timestamp),
      `${text} carries an invalid datetime attribute: ${iso}`,
    ).toBe(false)
    expect(
      timestamp,
      `${text} should be in the past but resolved to ${iso}`,
    ).toBeLessThan(now)
  })
})
