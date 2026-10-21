import { readFileSync } from "node:fs"
import { resolve } from "node:path"

export const logoStripes = `data:image/png;base64,${readFileSync(
  resolve(process.cwd(), "src/components/og-image/graphql-logo-stripes.png"),
).toString("base64")}`
