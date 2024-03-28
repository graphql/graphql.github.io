module.exports = {
  root: true,
  overrides: [
    {
      files: ["website/**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
      extends: ["plugin:tailwindcss/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
      rules: {
        "tailwindcss/classnames-order": "off",
      },
      settings: {
        tailwindcss: {
          config: "website/tailwind.config.ts",
          cssFiles: [
            "website/node_modules/nextra-theme-docs/dist/style.css",
            "website/src/globals.css",
          ],
          whitelist: ["roboto-mono"],
        },
      },
    },
  ],
}
