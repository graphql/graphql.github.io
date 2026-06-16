/**
 * Renders the /conf/conference-kit/ banners as high-res PNGs and packages
 * them into public/conference-kit/conference-kit.zip. Expects a dev/prod server to
 * already be running on $URL (default http://localhost:3000) — invoke after
 * `pnpm dev` is up, or against a `pnpm start` instance. Override SCALE for
 * print-grade output. SCALE=11 is the practical maximum: headless Chromium's
 * compositor caps GPU textures at 16 384 px, and the banner height at SCALE=12
 * (1412×12=16 944 px) exceeds that, causing partial renders. SCALE=11 gives
 * 6 600×15 532 px ≈ 197 dpi at 850×2000 mm, which large-format print shops
 * accept without complaint.
 *
 * Only the zip is written to public/. Loose PNGs land in a tmp dir and are
 * cleaned up so the served directory stays minimal.
 */

import path from "node:path"
import os from "node:os"
import { mkdir, mkdtemp, rm } from "node:fs/promises"
import { execFile } from "node:child_process"
import { promisify } from "node:util"
import { chromium } from "playwright"

const exec = promisify(execFile)

const URL = process.env.URL ?? "http://localhost:3000"
const PAGE = `${URL}/conf/conference-kit/`
const PUBLIC_DIR = path.resolve(process.cwd(), "public/conference-kit")
const SCALE = Number(process.env.SCALE ?? 11)

type ColorScheme = "light" | "dark"

const BANNERS: ReadonlyArray<{ slug: string; colorScheme: ColorScheme }> = [
  { slug: "amsterdam", colorScheme: "light" },
  { slug: "nyc", colorScheme: "light" },
  // The language banner's inline `getCity` snippet uses shiki's dark token
  // colors; next-themes flips html.dark when prefers-color-scheme matches.
  { slug: "language", colorScheme: "dark" },
  { slug: "ai-hero", colorScheme: "light" },
]

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true })
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "conference-kit-"))

  try {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      deviceScaleFactor: SCALE,
      // Wide enough that both banners render side-by-side without wrapping;
      // the screenshot itself is scoped to a single banner element.
      viewport: { width: 1600, height: 1600 },
      colorScheme: "light",
    })
    const page = await context.newPage()

    console.log(`[conference-kit] loading ${PAGE}`)
    await page.goto(PAGE, { waitUntil: "networkidle" })
    await page.evaluate(() => document.fonts.ready)

    for (const { slug, colorScheme } of BANNERS) {
      await page.emulateMedia({ colorScheme })
      // next-themes listens for the prefers-color-scheme change and toggles
      // html.dark; wait for that to settle before screenshotting.
      await page.waitForFunction(
        expected =>
          document.documentElement.classList.contains("dark") ===
          (expected === "dark"),
        colorScheme,
        { timeout: 2000 },
      )
      const target = page.locator(`[data-print-banner="${slug}"]`)
      await target.waitFor({ state: "visible" })
      await target.screenshot({ path: path.join(tmpDir, `${slug}.png`) })
    }

    await browser.close()

    const zipPath = path.join(PUBLIC_DIR, "conference-kit.zip")
    await rm(zipPath, { force: true })
    await exec("zip", [
      "-j",
      zipPath,
      ...BANNERS.map(b => path.join(tmpDir, `${b.slug}.png`)),
    ])
    console.log(
      `[conference-kit] wrote ${path.relative(process.cwd(), zipPath)}`,
    )
  } finally {
    await rm(tmpDir, { recursive: true, force: true })
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
