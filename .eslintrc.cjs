/* eslint-env node */

module.exports = {
  root: true,
  overrides: [
    {
      files: '*.md{,x}',
      parser: 'eslint-mdx',
      processor: 'mdx/remark',
      plugins: ['mdx'],
      extends: ['./base', './react-base'],
      parserOptions: {
        ecmaVersion: 13,
      },
      rules: {

      },
      settings: {
        'mdx/code-blocks': true,
      },
    },
    {
      files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
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
        // TODO: fix below
        "no-var": "off",
        "no-useless-escape": "off",
        "prefer-const": "off",
        "prefer-rest-params": "off",
        "prefer-spread": "off",
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
  ],
}
