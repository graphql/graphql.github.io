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
  ],
  plugins: [
    // For sort fields in package.json
    pluginPkg,
  ],
}
