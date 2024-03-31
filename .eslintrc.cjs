/* eslint-env node */

const CODE_EXT = "js,jsx,cjs,mjs,ts,tsx,cts,mts"

const MARKDOWN_EXT = "md,mdx"

module.exports = {
  root: true,
  overrides: [
    {
      files: [`**/*.{${CODE_EXT}}`],
      // TODO: extract graphql documents from code files
      // to lint graphql documents marked with /* GraphQL */ comments inside js/ts codeblocks in markdown
      // processor: '@graphql-eslint/graphql',
      // plugins: ['@graphql-eslint'],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:tailwindcss/recommended",
        "prettier",
      ],
      rules: {
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
        // TODO: fix below
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
      },
    },
    {
      files: [`**/*.{${MARKDOWN_EXT}}`],
      parser: "eslint-mdx",
      processor: "mdx/remark",
      plugins: ["mdx"],
      parserOptions: {
        ecmaVersion: 13,
        sourceType: "module",
      },
      settings: {
        "mdx/code-blocks": true,
      },
      rules: {
        "mdx/remark": "error",
      },
    },
    {
      files: [`**/*.{${MARKDOWN_EXT}}/*.{${CODE_EXT}}`],
      rules: {
        "no-unused-labels": "off",
        "no-undef": "off",
        "no-redeclare": "off",
        "no-import-assign": "off",
        "no-prototype-builtins": "off",
      },
    },
    {
      files: [
        `src/pages/blog/**/*.{${MARKDOWN_EXT}}`,
        `src/code/**/*.{${MARKDOWN_EXT}}`,
      ],
      rules: {
        // Disable `remark-lint-first-heading-level` since in blogs we don't want to enforce the first heading to be an `h1`
        "mdx/remark": "off",
      },
    },
    {
      files: ["**/*.graphql"],
      parser: "@graphql-eslint/eslint-plugin",
    },
  ],
}
