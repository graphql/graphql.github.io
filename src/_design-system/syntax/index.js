// @ts-check

import fs from "fs/promises"

const [dark, light] = await Promise.all([
  fs
    .readFile(new URL("./dark.json", import.meta.url), "utf-8")
    .then(JSON.parse),
  fs
    .readFile(new URL("./light.json", import.meta.url), "utf-8")
    .then(JSON.parse),
])

export const syntaxHighlightingThemes = { light, dark }
