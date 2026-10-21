import { expect, test } from "@playwright/test"
import { JSDOM } from "jsdom"
import sharp from "sharp"

import { getBlogPattern } from "../../src/components/blog-page/blog-card-pattern"

const mainPages = [
  "/",
  "/learn/",
  "/learn/queries/",
  "/learn/schema/",
  "/faq/",
  "/blog/",
  "/tags/announcements/",
  "/blog/2025-07-17-graphiql-5/",
  "/resources/",
  "/resources/frontend/",
  "/resources/reading/books/",
  "/ai/",
  "/community/events/",
  "/community/team/",
  "/community/foundation/",
  "/brand/",
  "/users/",
  "/codeofconduct/",
  "/day/",
  "/conf/conference-kit/",
]

for (const path of mainPages) {
  test(`serves a page-specific card to crawlers at ${path}`, async ({
    request,
  }) => {
    const response = await request.get(path, {
      headers: { "User-Agent": "Twitterbot/1.0" },
    })
    expect(response.ok()).toBeTruthy()
    const document = new JSDOM(await response.text()).window.document
    const meta = (key: string) =>
      document
        .querySelector(`meta[property="${key}"], meta[name="${key}"]`)
        ?.getAttribute("content")
    expect(meta("og:title")).toBeTruthy()
    expect(meta("og:description")).toBeTruthy()
    expect(meta("twitter:site")).toBe("@graphql")
    expect(meta("twitter:card")).toBe("summary_large_image")
    expect(meta("twitter:title")).toBe(meta("og:title"))
    expect(meta("twitter:description")).toBe(meta("og:description"))
    expect(meta("twitter:image")).toBe(meta("og:image"))
    expect(meta("og:image:width")).toBe("1200")
    expect(meta("og:image:height")).toBe("630")
    expect(meta("og:image:alt")).toBeTruthy()
    expect(document.querySelectorAll('meta[property="og:image"]')).toHaveLength(
      1,
    )
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(
      1,
    )
    const imageUrl = new URL(meta("og:image")!)
    expect(imageUrl.origin).toBe("https://graphql.org")
    expect(imageUrl.pathname).toBe("/og/")
    expect(imageUrl.searchParams.get("path")).toBe(path)
    const imageResponse = await request.get(imageUrl.pathname + imageUrl.search)
    expect(imageResponse.ok()).toBeTruthy()
    expect(imageResponse.headers()["content-type"]).toContain("image/png")
    const body = await imageResponse.body()
    const image = await sharp(body).metadata()
    expect([image.width, image.height]).toEqual([1200, 630])

    if (path === "/") {
      const { data, info } = await sharp(body)
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })
      const bands: { start: number; end: number }[] = []
      for (let y = 150; y < 560; y++) {
        let ink = 0
        for (let x = 40; x < 1160; x++) {
          const offset = (y * info.width + x) * info.channels
          if (
            data[offset] < 50 &&
            data[offset + 1] < 50 &&
            data[offset + 2] < 50
          )
            ink++
        }
        if (ink <= 15) continue
        const previous = bands.at(-1)
        if (previous && y - previous.end <= 8) previous.end = y
        else bands.push({ start: y, end: y })
      }
      expect(
        bands,
        "homepage headline must render as two distinct lines",
      ).toHaveLength(2)
      expect(bands[1].start - bands[0].end).toBeGreaterThan(10)
      expect(bands.every(band => band.end - band.start > 60)).toBeTruthy()
    }
    if (path === "/blog/") expect(meta("og:type")).toBe("website")
    if (path.startsWith("/blog/2025")) {
      expect(meta("og:type")).toBe("article")
      const { data, info } = await sharp(body)
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })
      const cells = getBlogPattern(
        imageUrl.searchParams.get("title")!,
        548,
        478,
      )
      for (const index of [0, 70, 400]) {
        const cell = cells[index]
        const x = 650 + cell.x + Math.floor(cell.width / 2)
        const y = 98 + cell.y + Math.floor(cell.height / 2)
        const pixel = [
          ...data.subarray(
            (y * info.width + x) * info.channels,
            (y * info.width + x) * info.channels + 3,
          ),
        ]
        expect(pixel).toEqual(cell.color.match(/\d+/g)!.map(Number))
      }
    }
    if (path === "/learn/queries/") {
      const { data, info } = await sharp(body)
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })
      const pixel = (x: number, y: number) => [
        ...data.subarray(
          (y * info.width + x) * info.channels,
          (y * info.width + x) * info.channels + 3,
        ),
      ]
      expect(pixel(650, 50)).toEqual(pixel(650, 220))
      expect(pixel(650, 50)).not.toEqual(pixel(640, 50))
      expect(pixel(650, 220)).not.toEqual(pixel(660, 220))
    }
  })
}

const generatedCardPages = [
  "/conf/2023/speakers/lee_byron.25krdom6/",
  "/conf/2024/speakers/aditi_rajawat/",
  "/conf/2024/speakers/an.ngo/",
  "/conf/2025/",
  "/conf/2026/",
  "/conf/2026/resources/",
  "/conf/2026/wg-day/",
  "/conf/2026/speakers/janettelc/",
  "/conf/2026/schedule/aa8a73420ecf7386cb2a3b52570d338b/",
  "/day/2026/paris/",
  "/day/2026/nyc/talks/built-to-evolve-13-years-of-graphql/",
]

for (const path of generatedCardPages) {
  test(`serves the generated event card at ${path}`, async ({ request }) => {
    const response = await request.get(path, {
      headers: { "User-Agent": "Twitterbot/1.0" },
    })
    expect(response.ok()).toBeTruthy()
    const document = new JSDOM(await response.text()).window.document
    const ogImage = document
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content")
    const twitterImage = document
      .querySelector('meta[name="twitter:image"]')
      ?.getAttribute("content")
    expect(ogImage).toContain("/opengraph-image")
    expect(twitterImage).toBe(ogImage)
    expect(ogImage).not.toContain("vercel.app")
    expect(ogImage).not.toContain("undefined")
    const imageUrl = new URL(ogImage!)
    const imageResponse = await request.get(imageUrl.pathname + imageUrl.search)
    expect(imageResponse.ok()).toBeTruthy()
    expect(imageResponse.headers()["content-type"]).toContain("image/png")
    const body = await imageResponse.body()
    const image = await sharp(body).metadata()
    expect([image.width, image.height]).toEqual([1200, 630])
    if (path === "/conf/2025/" || path === "/conf/2026/") {
      const pixels = await sharp(body)
        .extract({ left: 900, top: 200, width: 300, height: 400 })
        .removeAlpha()
        .raw()
        .toBuffer()
      let pinkPixels = 0
      for (let i = 0; i < pixels.length; i += 3) {
        if (
          pixels[i] > pixels[i + 1] + 15 &&
          pixels[i + 2] > pixels[i + 1] + 10
        )
          pinkPixels++
      }
      expect(
        pinkPixels,
        "conference stripe artwork must not disappear",
      ).toBeGreaterThan(1000)
    }
  })
}

test("missing archived session art falls back to its own conference year", async ({
  request,
}) => {
  const response = await request.get(
    "/conf/2024/schedule/7a165daf8a2402b63ced2f6b49ce9155/",
  )
  expect(response.ok()).toBeTruthy()
  const document = new JSDOM(await response.text()).window.document
  const image = new URL(
    document
      .querySelector('meta[property="og:image"]')!
      .getAttribute("content")!,
  )
  expect(image.pathname).toBe("/img/og-graphql-conf-2024.jpeg")
  const imageResponse = await request.get(image.pathname)
  expect(imageResponse.ok()).toBeTruthy()
  expect(imageResponse.headers()["content-type"]).toContain("image/jpeg")
})

test("image endpoint rejects oversized input and traversal paths", async ({
  request,
}) => {
  for (const params of [
    { path: "/learn/../../package/", title: "Queries" },
    { path: "/", title: "x".repeat(301) },
  ]) {
    const response = await request.get(`/og/?${new URLSearchParams(params)}`)
    expect(response.status()).toBe(400)
  }
})

test("long authored article titles still produce a valid card", async ({
  request,
}) => {
  const response = await request.get(
    "/og/?" +
      new URLSearchParams({
        path: "/blog/2026-06-24-better-together-design-systems-graphql-part-1/",
        title:
          "Better Together: Cross-Functional Collaboration at the Intersection of Design Systems and GraphQL APIs - Part 1 of 2",
        byline: "Amanda Olsen, Sam Combs",
        date: "2026-06-24",
      }),
  )
  expect(response.ok()).toBeTruthy()
  const image = await sharp(await response.body()).metadata()
  expect([image.width, image.height]).toEqual([1200, 630])
})
