import { test, expect } from "@playwright/test"

test("icon buttons on the code page render visible non-zero SVGs for each link type", async ({
  page,
}) => {
  await page.goto("/community/tools-and-libraries/")

  await page.waitForSelector("article header", { timeout: 10000 })

  const headers = page.locator("article header")
  const headerCount = await headers.count()
  expect(headerCount).toBeGreaterThan(0)

  type IconType = "site" | "github" | "npm" | "gem"
  const collected = new Map<
    IconType,
    { href: string; width: number; height: number }
  >()
  let firstHeaderWithAnyIconIndex: number | null = null

  const haveAll = () =>
    collected.has("site") &&
    collected.has("github") &&
    collected.has("npm") &&
    collected.has("gem")

  for (let i = 0; i < headerCount; i++) {
    if (haveAll()) break

    const header = headers.nth(i)

    const githubLink = header.locator(
      'a[data-variant=tertiary][href*="github.com"]:has(svg)',
    )
    const npmLink = header.locator(
      'a[data-variant=tertiary][href*="npmjs.com/package/"]:has(svg)',
    )
    const gemLink = header.locator(
      'a[data-variant=tertiary][href*="rubygems.org/gems/"]:has(svg)',
    )
    const siteLink = header.locator(
      'a[data-variant=tertiary][href^="http"]:not([href*="github.com"]):not([href*="npmjs.com/package/"]):not([href*="rubygems.org/gems/"]):has(svg)',
    )

    const process = async (
      loc: ReturnType<typeof header.locator>,
      type: IconType,
    ) => {
      if (collected.has(type)) return
      if (await loc.count()) {
        const btn = loc.first()
        await btn.scrollIntoViewIfNeeded()
        const svg = btn.locator("svg").first()
        const box = await svg.boundingBox()
        const href = await btn.getAttribute("href")
        expect(
          box,
          `${type} icon SVG should have a bounding box`,
        ).not.toBeNull()
        expect(
          box!.width,
          `${type} icon SVG width should be > 0 (${href})`,
        ).toBeGreaterThan(0)
        expect(
          box!.height,
          `${type} icon SVG height should be > 0 (${href})`,
        ).toBeGreaterThan(0)
        collected.set(type, {
          href: href || "",
          width: box!.width,
          height: box!.height,
        })
        if (firstHeaderWithAnyIconIndex === null) {
          firstHeaderWithAnyIconIndex = i
        }
      }
    }

    await process(siteLink, "site")
    await process(githubLink, "github")
    await process(npmLink, "npm")
    await process(gemLink, "gem")
  }

  const missing: IconType[] = []
  for (const t of ["site", "github", "npm", "gem"] as IconType[]) {
    if (!collected.has(t)) missing.push(t)
  }

  expect(
    missing,
    missing.length
      ? `Missing icon types: ${missing.join(", ")}.\nCollected: ${JSON.stringify(
          Object.fromEntries(collected),
          null,
          2,
        )}`
      : "All icon types collected.",
  ).toHaveLength(0)

  expect(firstHeaderWithAnyIconIndex).not.toBeNull()
  const headerForScreenshot = headers.nth(firstHeaderWithAnyIconIndex!)
  const headerScreenshot = await headerForScreenshot.screenshot()
  expect(
    headerScreenshot.length,
    // we had a bug where SVGs were rendered at 0x0 px.
    "Screenshot should be visually visible",
  ).toBeGreaterThan(100)
})
