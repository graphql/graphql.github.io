import pluginPkg from "prettier-plugin-pkg"

export default {
  arrowParens: "avoid",
  semi: false,
  singleQuote: false,
  overrides: [
    {
      files: "*.svg",
      options: { parser: "html" },
    },
    {
      files: "*.mdx",
      options: {
        proseWrap: "always", // printWidth line breaks in md/mdx
        semi: false,
        trailingComma: "none",
      },
    },
  ],
  plugins: [
    // For sort fields in package.json
    pluginPkg,
  ],
}
