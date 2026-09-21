import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"

import { GraphQLDayLogo } from "../graphql-day-logo-link"

export const OG_IMAGE_HEADER_HEIGHT = 154
export const RIGHT_COLUMN_WIDTH_PX = 476

/**
 * We can't use CSS variables and Tailwind classes here because we're rendering an image.
 * Mirrors src/app/colors.css.
 */
export const colors = {
  neu0: "hsl(0 0% 100%)",
  neu50: "hsl(75 57% 97%)",
  neu100: "hsl(75 15% 95%)",
  neu200: "hsl(77 14% 90%)",
  neu300: "hsl(76 14% 85%)",
  neu400: "hsl(77 14% 80%)",
  neu500: "hsl(74 14% 70%)",
  neu600: "hsl(76 15% 60%)",
  neu700: "hsl(76 15% 40%)",
  neu800: "hsl(77 14% 20%)",
  neu900: "hsl(75 15% 5%)",
  secLighter: "hsl(79 80% 90%)",
  priBase: "hsl(319 100% 44.1%)",
}

export const fonts = {
  sans: "'Host Grotesk', var(--font-sans)",
  mono: "'Commit Mono', var(--font-mono)",
}

export function DayOpengraphImageHeader({
  date,
  location,
}: {
  date: string
  location: string
}) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: `2px solid ${colors.neu600}`,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          gap: "1.5rem",
          borderRight: `2px solid ${colors.neu600}`,
          padding: "2.5rem",
          paddingRight: "4rem",
          height: OG_IMAGE_HEADER_HEIGHT,
        }}
      >
        <div
          style={{
            display: "flex",
            height: "74px",
            alignItems: "center",
            gap: "1rem",
            fontFamily: fonts.mono,
            fontSize: "40px",
            lineHeight: "1",
            textTransform: "uppercase",
            color: colors.neu900,
          }}
        >
          <GraphQLDayLogo
            style={{
              height: "3rem",
              width: "3rem",
              color: colors.priBase,
              /* hack: satori aligns this SVG differently than browsers, it will look off center in /workroom,
                       but centered in the images */
              marginTop: "-6px",
            }}
          />
          <span>GraphQL Day</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: "100%",
          flexShrink: 0,
          flexDirection: "column",
          justifyContent: "center",
          width: RIGHT_COLUMN_WIDTH_PX,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            borderBottom: `2px solid ${colors.neu600}`,
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "26px",
            paddingBottom: "26px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CalendarIcon
              width="24"
              height="24"
              style={{
                /* hack: different across satori and browsers */
                transform: "translateY(-3px)",
                color: colors.priBase,
              }}
            />
            <span
              style={{
                fontFamily: fonts.mono,
                display: "flex",
                fontSize: "1.25rem",
                fontWeight: "normal",
                textTransform: "uppercase",
                lineHeight: "1.2",
                color: colors.neu900,
              }}
            >
              {date}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "26px",
            paddingBottom: "26px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <PinIcon
              width="24"
              height="24"
              style={{
                /* hack: different across satori and browsers */
                transform: "translateY(-2px)",
                color: colors.priBase,
              }}
            />
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: "1.25rem",
                fontWeight: "normal",
                textTransform: "uppercase",
                lineHeight: "1.2",
                color: colors.neu900,
              }}
            >
              {location}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
