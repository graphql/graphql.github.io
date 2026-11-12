---
name: graphql.org
description: The GraphQL Foundation's site — flat, high-contrast, hairline-ruled.
colors:
  pri-lightest: hsl(319 100% 96%)
  pri-lighter: hsl(319 100% 90%)
  pri-light: hsl(318 100% 80%)
  pri-base: hsl(319 100% 44.1%)
  pri-dark: hsl(319 100% 30%)
  pri-darker: hsl(319 100% 20%)
  sec-lighter: hsl(79 80% 90%)
  sec-light: hsl(79 82% 80%)
  sec-base: hsl(79 90% 65%)
  sec-dark: hsl(79 98% 37%)
  sec-darker: hsl(79 98% 23%)
  neu-0: hsl(0 0% 100%)
  neu-50: hsl(75 57% 97%)
  neu-100: hsl(75 15% 95%)
  neu-200: hsl(77 14% 90%)
  neu-300: hsl(76 14% 85%)
  neu-400: hsl(77 14% 80%)
  neu-500: hsl(74 14% 70%)
  neu-600: hsl(76 15% 60%)
  neu-700: hsl(76 15% 40%)
  neu-800: hsl(77 14% 20%)
  neu-900: hsl(75 15% 5%)
typography:
  display:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "48px"
    lineHeight: "1"
  headline:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "40px"
  title:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "32px"
  body:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    lineHeight: "1.5"
  label:
    fontFamily: "Commit Mono, ui-monospace, monospace"
    fontSize: "14px"
    lineHeight: "1"
rounded:
  none: "0"
  md: "6px"
  full: "9999px"
spacing:
  section-y: "2rem"
  section-x: "1rem"
  container: "120rem"
components:
  button-primary:
    backgroundColor: "{colors.neu-900}"
    textColor: "{colors.neu-0}"
    rounded: "{rounded.none}"
    height: "56px"
    padding: "0 32px"
  button-primary-hover:
    backgroundColor: "{colors.neu-800}"
  button-secondary:
    backgroundColor: "{colors.neu-100}"
    textColor: "{colors.neu-900}"
    rounded: "{rounded.none}"
  button-tertiary:
    backgroundColor: "{colors.neu-100}"
    textColor: "{colors.neu-900}"
    rounded: "{rounded.none}"
  code-block:
    rounded: "{rounded.md}"
    typography: "{typography.label}"
  tag:
    backgroundColor: "{colors.sec-light}"
    textColor: "{colors.neu-900}"
    rounded: "{rounded.none}"
---

# graphql.org design

## Overview

This is the specification's own site, run by a foundation. It is a reference,
not a product being sold, and it gets cited. Restraint is the brand: flat
surfaces, hairline rules, one accent used sparingly, and claims that survive a
skeptical reader.

Two families carry everything. Magenta (`pri-*`) is GraphQL's colour and marks
the primary or active thing. Lime (`sec-*`) is the accent, for confirmation and
highlights. Everything else is `neu-*`.

## Colors

Semantic tokens only, defined as HSL triples in `src/app/colors.css` and
exposed through `tailwind.config.ts`.

The `neu-*` ramp inverts between light and dark automatically — `neu-0` is
white in light mode and near-black in dark. So `text-neu-900` is the correct
foreground in both modes and needs no `dark:` variant. Reach for `dark:` only
when the semantic token is genuinely wrong for one mode.

`pri-*` and `sec-*` do not invert. A magenta surface stays magenta.

Never write a hex value in a component.

## Typography

`Host Grotesk` for text, `Commit Mono` for code, both loaded as CSS variables
in `src/app/fonts`.

Use the `typography-*` utilities, never raw `text-[NNpx]`. Each carries its own
responsive step — `typography-h2` is 32px on mobile and 48px from `md` up. That
step is the design; a hand-rolled size breaks it. The full scale is `d1`, `h1`
through `h4`, `body-lg` through `body-xs`, plus `button`, `menu` and `tagline`.

## Layout

`.gql-container` centres content at a 120rem maximum. `.gql-section` supplies
horizontal and vertical rhythm, stepping up at `lg` and `xl`. Compose the two
rather than reinventing padding.

Breakpoints are Tailwind's, plus `xs` at 394px and `3xl` at 1920px.

Write one markup tree that reflows. A `md:hidden` block beside a
`hidden md:block` block is two things to keep in sync and two things to forget.

## Elevation & Depth

Depth comes from hairlines and tonal steps, not shadows. A 1px `neu-200` border
(`neu-100` in dark), or adjacent background steps — `neu-0` against `neu-50`. A
card grid is `gap-px` over a `neu-200` background so the gaps read as rules.

There is no elevation ladder. Across 408 component files the whole codebase
uses about 40 shadows, nearly all decorative glows on marketing surfaces, and
none of the design-system primitives use one. There is no `sm`/`md`/`lg` scale
to reach for, so don't reach.

## Shapes

Square is the default, and it is load-bearing. Buttons, cards, tags and section
panels carry no radius. Across 408 component files there are roughly 80
`rounded-*` usages in total — a rounded corner here is an exception, not a
texture.

Three radii are sanctioned:

- `rounded-none` — buttons, cards, tags, panels. The default.
- `rounded-md` — code blocks, via `@/components/pre`.
- `rounded-full` — status dots, avatars, bullets, and genuine pills.

Anything else is drift. If a new surface wants `rounded-lg`, the answer is
square.

## Components

Reach for what exists before writing a new one:

| Need                      | Use                                                                 |
| ------------------------- | ------------------------------------------------------------------- |
| Button or link-as-button  | `@/app/conf/_design-system/button`                                  |
| Internal or external link | `@/app/conf/_design-system/anchor`                                  |
| Section eyebrow           | `_design-system/section-label` or `@/_design-system/eyebrow`        |
| Code block                | `.mdx` partial + `@/components/pre` and `nextra/components`' `Code` |
| Runnable GraphQL          | `@/components/interactive-code-block`                               |
| Icon                      | `**/pixelarticons/*.svg?svgr`                                       |
| Horizontal card row       | `EventsScrollview`                                                  |

Buttons come in `primary`, `secondary` and `tertiary`, at `md` and `lg`. They
are square, 56px tall (48px at `md`), and pick their element from the props:
`href` renders an anchor, otherwise a `button`.

Code blocks are highlighted at build time by Shiki using the themes in
`src/_design-system/syntax/`. That is the only highlighter. Don't add a second
one, and don't put `dangerouslySetInnerHTML` on a `<pre>`.

Every interactive element gets `gql-focus-visible`, which applies the shared
`gql-focus-outline` on `:focus-visible`.

## Motion

Motion is decoration and must be optional. Every animation carries a
`motion-reduce:` variant, and anything driven by JavaScript checks
`prefers-reduced-motion` before it starts.

Nothing animates forever. A loop that runs while off screen or in a background
tab is a bug; gate it on an `IntersectionObserver` and `visibilitychange`.

Never simulate work. If the answer is already known, render it. Artificial
delay, fake progress and typewriter effects spend the reader's time to look
busy.

New keyframes belong in `theme.extend.keyframes`, not loose in `globals.css`.

## Do's and Don'ts

**Do**

- Use semantic colour tokens and let `neu-*` invert.
- Use the `typography-*` scale.
- Separate with hairlines and background steps.
- Give every interactive element a visible focus state.
- Say what is true. This site gets cited; an uncited number costs more than it
  earns.

**Don't**

- Add a radius or a shadow to a new surface without being asked.
- Hardcode a hex, a pixel font size, or a breakpoint.
- Ship a second solution for a problem the repo already solves.
- Build separate mobile and desktop trees.
- Animate without a reduced-motion path.
