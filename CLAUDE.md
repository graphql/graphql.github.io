# CLAUDE.md

graphql.org source. Next.js 14 — App Router in `src/app/`, Pages Router in
`src/pages/` for the Nextra docs. TypeScript, Tailwind, pnpm.

Main branch `source`. Trailing slashes enforced. Redirects in `vercel.json`.

Commands live in `package.json`.

Design rules: @DESIGN.md.

## Rules

Rules people break. Everything else should match surrounding code.

**React**

- No `useCallback`. React Compiler ready. `useMemo` only if measured.
- No `renderX()`. No two-line helpers. No extracting single-use code. Inline
  it.
- `"use client"` costs bytes. Push it to the leaf that needs the handler. Rest
  stays on the server.
- Heavy things — CodeMirror, schemas, editors — load through `next/dynamic`
  plus a viewport check, never at module scope. See
  `src/components/index-page/how-it-works/index.tsx`.

**Content**

People cite this site. A number needs a source you can link, or it stays off
the page. Uncited "up to N%" is worse than silence. Reviewers catch it.

**TypeScript**

`@/` alias for `src`. Strict. Named exports. No explicit return types.

## Working here

Dev server may already run on :3000. Check first. Leave it up.

## Gotchas

- `nextra`, `nextra-theme-docs` and `mermaid-isomorphic` are patched. Check
  `patches/`.
- SVGs in `src/icons/` and `**/pixelarticons/` import as components with
  `?svgr`. `.mdx?raw` gives raw source to a server component.
- `prebuild` fetches GitHub stats and syncs the landing schema and working
  groups. Cold build needs network, takes minutes.
