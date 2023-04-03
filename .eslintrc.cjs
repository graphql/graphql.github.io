module.exports = {
  root: true,
  overrides: [
    {
      files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
      extends: ["plugin:tailwindcss/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
      rules: {
        "tailwindcss/classnames-order": "off",
      },
    },
  ],
}
