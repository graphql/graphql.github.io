/* eslint-env node */

const CODE_EXT = "js,jsx,cjs,mjs,ts,tsx,cts,mts"
const MARKDOWN_EXT = "md,mdx"

module.exports = {
  root: true,
  plugins: [
    "@graphql-eslint",
    "mdx",
    "@typescript-eslint",
    "tailwindcss",
    "react",
    "@next/next",
    "react-hooks",
  ],
  overrides: [
    {
      files: [`**/*.{${CODE_EXT}}`],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:tailwindcss/recommended",
        "prettier",
        "plugin:@next/next/recommended",
        "plugin:react-hooks/recommended-legacy",
        "plugin:react/recommended",
      ],
      rules: {
        "react/react-in-jsx-scope": "off", // TS checks this
        "react/prop-types": "off", // and this
        "no-undef": "off", // and this too
        // This is type checking for projects without `@types/react`. Disabled due to false positives.
        "react/no-unknown-property": "off",

        "react/no-unescaped-entities": [
          "warn", // quotes and apostrophes are okay
          {
            forbid: [
              {
                char: "<",
                alternatives: ["&lt;"],
              },
              {
                char: ">",
                alternatives: ["&gt;"],
              },
              {
                char: "{",
                alternatives: ["&#123;"],
              },
              {
                char: "}",
                alternatives: ["&#125;"],
              },
            ],
          },
        ],
        "@next/next/no-img-element": "off", // straight up upsell, small `img`s actually don't need optimization

        "tailwindcss/classnames-order": "off",
        "@typescript-eslint/no-restricted-imports": [
          "error",
          {
            paths: [
              {
                name: "next/image",
                message: "Please use `next-image-export-optimizer` instead",
                allowTypeImports: true,
              },
            ],
          },
        ],
        "prefer-const": ["error", { destructuring: "all" }],
        "prefer-rest-params": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/ban-types": "off",
      },
      settings: {
        tailwindcss: {
          whitelist: ["roboto-mono"],
        },
        react: {
          version: "detect",
        },
      },
    },
    {
      files: [`**/*.{${MARKDOWN_EXT}}`],
      parser: "eslint-mdx",
      extends: ["plugin:mdx/recommended"],
      processor: "mdx/remark",
      parserOptions: {
        ecmaVersion: 13,
        sourceType: "module",
      },
      settings: {
        "mdx/code-blocks": true,
        "mdx/language-mapper": {
          js: "espree",
          graphql: "@graphql-eslint/parser",
          ts: "@typescript-eslint/parser",
          typescript: "@typescript-eslint/parser",
        },
      },
      rules: {
        "mdx/remark": "error",
        "no-unused-expressions": "off",
        "react/jsx-no-undef": "off",
      },
    },
    {
      files: ["**/*.graphql"],
      parser: "@graphql-eslint/parser",
      rules: {
        "@graphql-eslint/no-syntax-errors": "error",
        "@graphql-eslint/unique-operation-name": "error",
        "@graphql-eslint/unique-fragment-name": "error",
        "@graphql-eslint/no-anonymous-operations": "warn",
        "@graphql-eslint/lone-anonymous-operation": "error",
        "@graphql-eslint/no-duplicate-fields": "error",
        "@graphql-eslint/no-unused-fragments": "warn",
        "@graphql-eslint/no-duplicate-fragment-names": "error",
        "@graphql-eslint/no-undefined-variables": "error",
        "@graphql-eslint/unique-variable-names": "error",
      },
    },
    {
      files: [`**/*.{${CODE_EXT}}`, `**/*.{${MARKDOWN_EXT}}`],
      parserOptions: {
        plugins: ["graphql"],
      },
    },
    {
      files: [
        `src/pages/blog/**/*.{${MARKDOWN_EXT}}`,
        `src/pages/graphql-js/running-an-express-graphql-server.mdx`,
        `src/code/**/*.{${MARKDOWN_EXT}}`,
        `src/app/conf/**/*.{${MARKDOWN_EXT}}`,
      ],
      rules: {
        // Disable `remark-lint-first-heading-level` since in blogs we don't want to enforce the first heading to be an `h1`
        "mdx/remark": "off",
      },
    },
  ],
}
