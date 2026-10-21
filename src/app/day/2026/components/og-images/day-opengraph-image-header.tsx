import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"

import { colors, fonts } from "@/components/og-image/styles"

import { GraphQLDayLogo } from "../graphql-day-logo-link"

export const OG_IMAGE_HEADER_HEIGHT = 154
export const RIGHT_COLUMN_WIDTH_PX = 476

export function DayOpengraphImageHeader({
  city,
  date,
  location,
}: {
  city: string
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>GraphQL Day</span>
            <span style={{ color: colors.priBase }}>2026</span>
          </div>
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
