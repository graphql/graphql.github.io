import { fontFamily } from "tailwindcss/defaultTheme"
import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"
import plugin from "tailwindcss/plugin"
import containerQueries from "@tailwindcss/container-queries"
import browserPlugin from "@igorkowalczyk/is-browser"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./theme.config.tsx"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      ringColor({ theme }) {
        return {
          arguments: theme("colors.primary"),
        }
      },
      fontFamily: {
        sans: [
          `var(--font-sans, ${fontFamily.sans.slice(0, 3).join(", ")})`,
          ...fontFamily.sans,
        ],
        mono: [
          `var(--font-mono, ${fontFamily.mono.slice(0, 3).join(", ")})`,
          ...fontFamily.mono,
        ],
      },
      screens: {
        xs: "394px",
        "3xl": "1920px",
      },
      colors: {
        primary: "#e10098",
        "conf-black": "#0e031c",
        black: "#1b1b1b",

        // #region new design system colors
        "pri-lightest": "hsl(var(--color-pri-lightest) / <alpha-value>)",
        "pri-lighter": "hsl(var(--color-pri-lighter) / <alpha-value>)",
        "pri-light": "hsl(var(--color-pri-light) / <alpha-value>)",
        "pri-base": "hsl(var(--color-pri-base) / <alpha-value>)",
        "pri-dark": "hsl(var(--color-pri-dark) / <alpha-value>)",
        "pri-darker": "hsl(var(--color-pri-darker) / <alpha-value>)",

        "sec-lighter": "hsl(var(--color-sec-lighter) / <alpha-value>)",
        "sec-light": "hsl(var(--color-sec-light) / <alpha-value>)",
        "sec-base": "hsl(var(--color-sec-base) / <alpha-value>)",
        "sec-dark": "hsl(var(--color-sec-dark) / <alpha-value>)",
        "sec-darker": "hsl(var(--color-sec-darker) / <alpha-value>)",

        // We're using 3-letter color names to avoid conflicting
        // with the old `neutral` color.
        "neu-0": "hsl(var(--color-neu-0) / <alpha-value>)",
        "neu-50": "hsl(var(--color-neu-50) / <alpha-value>)",
        "neu-100": "hsl(var(--color-neu-100) / <alpha-value>)",
        "neu-200": "hsl(var(--color-neu-200) / <alpha-value>)",
        "neu-300": "hsl(var(--color-neu-300) / <alpha-value>)",
        "neu-400": "hsl(var(--color-neu-400) / <alpha-value>)",
        "neu-500": "hsl(var(--color-neu-500) / <alpha-value>)",
        "neu-600": "hsl(var(--color-neu-600) / <alpha-value>)",
        "neu-700": "hsl(var(--color-neu-700) / <alpha-value>)",
        "neu-800": "hsl(var(--color-neu-800) / <alpha-value>)",
        "neu-900": "hsl(var(--color-neu-900) / <alpha-value>)",

        blk: "#000",

        /**
         * GraphQL Rhodamine as per the trademark guidelines
         * https://www.graphql.org/brand/
         */
        rhodamine: "#e10098",
        // #endregion new design system colors
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "arrow-left":
          "arrow-left var(--animation-duration, .75s) var(--animation-direction, forwards) ease infinite",
        "show-overflow":
          "show-overflow var(--animation-duration, 12s) var(--animation-delay, 1s) var(--animation-direction, forwards) ease infinite",
        "fade-in": "fade-in var(--animation-duration, 200ms) ease-out forwards",
        "fade-out":
          "fade-out var(--animation-duration, 200ms) ease-out forwards",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - .25rem))",
          },
        },
        "arrow-left": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(var(--arrow-left-x,-1.5px))",
          },
        },
        "show-overflow": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "25%, 75%": {
            transform: "translateX(var(--delta-x))",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          to: { opacity: "0" },
        },
      },
    },
  },
  plugins: [
    typography,
    containerQueries,
    plugin(({ addBase }) => {
      // heading styles
      addBase({
        ".typography-d1, .typography-h1, .typography-h2, .typography-h3": {
          lineHeight: "1.2",
        },
        ".typography-d1": {
          fontSize: "48px",
          "@screen lg": {
            fontSize: "96px",
          },
        },
        ".typography-h1": {
          fontSize: "40px",
          "@screen lg": {
            fontSize: "72px",
          },
        },
        ".typography-h2": {
          fontSize: "32px",
          "@screen md": {
            fontSize: "48px",
          },
        },
        ".typography-h3": {
          fontSize: "24px",
          "@screen md": {
            fontSize: "32px",
          },
        },
      })

      // paragraph styles
      addBase({
        ".typography-body-lg, .typography-body-md, .typography-body-sm, .typography-body-xs":
          {
            lineHeight: "1.5",
          },
        ".typography-body-lg": {
          fontSize: "16px",
          "@screen md": {
            fontSize: "20px",
          },
        },
        ".typography-body-md": {
          fontSize: "14px",
          "@screen md": {
            fontSize: "16px",
          },
        },
        ".typography-body-sm": {
          fontSize: "12px",
          "@screen md": {
            fontSize: "14px",
          },
        },
        ".typography-body-xs": {
          fontSize: "10px",
          "@screen md": {
            fontSize: "12px",
          },
        },
      })

      // other text styles
      addBase({
        ".typography-button, .typography-tagline": {
          fontSize: "16px",
          lineHeight: "1",
        },
        ".typography-tagline": {
          textTransform: "uppercase",
        },
        ".typography-menu": {
          fontFamily: "var(--font-mono)",
          fontSize: "14px",
          lineHeight: "1",
          textTransform: "uppercase",
        },
      })

      addBase({
        ".typography-link": {
          color: "hsl(var(--color-neu-900) / var(--tw-text-opacity, 1))",
          textDecoration: "underline",
          "&:hover": {
            textDecoration: "none",
          },
        },
      })

      addBase({
        ".gql-focus-outline": {
          "outline-style": "solid",
          "outline-width": "3px",
          "outline-offset": "5px",
          "outline-color": "hsl(var(--color-neu-900))",
        },
      })
    }),
    tailwindMediaHover(),
    prefersContrastPlugin(),
    scrollStartPlugin(),
    scrollviewFadePlugin(),
    browserPlugin,
  ],
  darkMode: ["class", 'html[class~="dark"]'],
}

export default config

function tailwindMediaHover() {
  return plugin(({ addVariant }) => {
    addVariant("hover-hover", "@media (hover: hover)")
    addVariant("hover-none", "@media (hover: none)")
  })
}

function prefersContrastPlugin() {
  return plugin(({ addVariant }) => {
    addVariant("contrast-more", "@media (prefers-contrast: more)")
  })
}

function scrollStartPlugin() {
  return plugin(({ addBase, matchUtilities, theme }) => {
    addBase({
      "@keyframes --scroll-start-snap-y": {
        to: { width: "0" },
      },
      "@keyframes --scroll-start-snap-x": {
        to: { height: "0" },
      },
    })

    addBase({
      ".scroll-start-y": {
        position: "absolute",
        width: "1px",
        top: "var(--scroll-start-y)",
        containerType: "size",
        visibility: "hidden",
        animation: "--scroll-start-snap-y 0.01s both",
      },
      ".scroll-start-y::before": {
        content: '""',
        height: "1px",
        display: "block",
      },
      "@container (width: 1px)": {
        ".scroll-start-y::before": {
          scrollSnapAlign: "start",
        },
      },
    })

    addBase({
      ".scroll-start-x": {
        position: "absolute",
        height: "1px",
        left: "var(--scroll-start-x)",
        containerType: "size",
        visibility: "hidden",
        animation: "--scroll-start-snap-x 0.01s both",
      },
      ".scroll-start-x::before": {
        content: '""',
        width: "1px",
        display: "block",
      },
      "@container (height: 1px)": {
        ".scroll-start-x::before": {
          scrollSnapAlign: "start",
        },
      },
    })

    matchUtilities(
      {
        "scroll-start-y": value => ({
          "--scroll-start-y": value,
        }),
      },
      {
        values: theme("spacing"),
        type: ["length", "percentage"],
      },
    )

    matchUtilities(
      {
        "scroll-start-x": value => ({
          "--scroll-start-x": value,
        }),
      },
      {
        values: theme("spacing"),
        type: ["length", "percentage"],
      },
    )
  })
}

function scrollviewFadePlugin() {
  return plugin(({ addUtilities, matchUtilities, theme, addBase }) => {
    matchUtilities(
      {
        "scrollview-fade-x": value => ({
          "--fade-angle": "90deg",
          "--fade-size-start": value,
          "--fade-size-end": value,
          "--fade-axis": "x",
        }),
        "scrollview-fade-y": value => ({
          "--fade-angle": "180deg",
          "--fade-size-start": value,
          "--fade-size-end": value,
          "--fade-axis": "y",
        }),
        "scrollview-fade-left": value => ({
          "--fade-angle": "90deg",
          "--fade-size-start": value,
          "--fade-axis": "x",
        }),
        "scrollview-fade-right": value => ({
          "--fade-angle": "90deg",
          "--fade-size-end": value,
          "--fade-axis": "x",
        }),
        "scrollview-fade-top": value => ({
          "--fade-angle": "180deg",
          "--fade-size-start": value,
          "--fade-axis": "y",
        }),
        "scrollview-fade-bottom": value => ({
          "--fade-angle": "180deg",
          "--fade-size-end": value,
          "--fade-axis": "y",
        }),
      },
      {
        supportsNegativeValues: false,
        values: theme("spacing"),
        type: ["length", "percentage"],
      },
    )

    addBase({
      "@property --fade-start-opacity": {
        syntax: '"<number>"',
        initialValue: "1",
        inherits: "false",
      },
      "@property --fade-end-opacity": {
        syntax: '"<number>"',
        initialValue: "1",
        inherits: "false",
      },
    })

    addUtilities({
      ".scrollview-fade": {
        position: "relative",
        scrollTimeline: "--scroll-timeline var(--fade-axis)",
        "--fade-start-opacity": "1",
        "--fade-end-opacity": "1",
        maskImage: `
          linear-gradient(var(--fade-angle), 
            hsl(0 0% 0% / var(--fade-start-opacity)), 
            black var(--fade-size-start,0), 
            black calc(100% - var(--fade-size-end,0)), 
            hsl(0 0% 0% / var(--fade-end-opacity))
          )
        `,
        WebkitMaskImage: `
          linear-gradient(var(--fade-angle), 
            hsl(0 0% 0% / var(--fade-start-opacity)), 
            black var(--fade-size-start,0), 
            black calc(100% - var(--fade-size-end,0)), 
            hsl(0 0% 0% / var(--fade-end-opacity))
          )
        `,
        animation:
          "scrollview-fade-start 10s ease-out both, scrollview-fade-end 10s ease-out both",
        animationTimeline: "--scroll-timeline, --scroll-timeline",
        animationRange: "0 2em, calc(100% - 2em) 100%",
      },
      "@keyframes scrollview-fade-start": {
        from: { "--fade-start-opacity": "1" },
        to: { "--fade-start-opacity": "0" },
      },
      "@keyframes scrollview-fade-end": {
        from: { "--fade-end-opacity": "0" },
        to: { "--fade-end-opacity": "1" },
      },
      "@keyframes sheen": {
        "0%, 100%": { backgroundPosition: "0%" },
        "50%": { backgroundPosition: "100%" },
      },
    })
  })
}
