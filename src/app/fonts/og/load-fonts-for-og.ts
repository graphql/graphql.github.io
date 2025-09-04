import type { ImageResponse } from "next/og"

import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

type FontOptions = NonNullable<
  NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"]
>[number]

/**
 * Fonts used in Open Graph images must be .ttf or .woff due to a limitation in opentype.js.
 * @see https://github.com/vercel/satori/discussions/157.
 * Variable fonts are flaky and inconsistent with `@vercel/og`.
 * @see https://github.com/vercel/satori/issues/320
 */
export async function loadFontsForOG(): Promise<FontOptions[]> {
  const cwd = process.cwd()
  const dirname = "src/app/fonts/og"
  return [
    {
      data: await readFile(resolve(cwd, dirname, "HostGrotesk-Regular.ttf")),
      name: "Host Grotesk",
    },
    {
      data: await readFile(resolve(cwd, dirname, "CommitMono-400-Regular.ttf")),
      name: "Commit Mono",
    },
  ]
}
