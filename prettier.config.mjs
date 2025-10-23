import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import("prettier").Config}
 */
export default {
  arrowParens: "avoid",
  semi: false,
  singleQuote: false,
  useTabs: false,
  tabWidth: 2,
  overrides: [
    {
      files: "*.svg",
      options: { parser: "html" },
    },
    {
      files: "*.mdx",
      options: {
        proseWrap: "always",
        semi: false,
        trailingComma: "none",
      },
    },
  ],
  plugins: ["prettier-plugin-pkg", "prettier-plugin-tailwindcss"],
  // We need this to ensure classes format the same across CI and editors.
  tailwindConfig: resolve(__dirname, "./tailwind.config.ts"),
}
