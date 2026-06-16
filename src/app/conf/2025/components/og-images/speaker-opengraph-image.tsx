import type { SchedSpeaker } from "@/app/conf/2023/types"
import { formatSpeakerPosition } from "../format-speaker-position"
import { normalizeProtocolRelativeUrl } from "./normalize-protocol-relative-url"
import { OpengraphImageFooter } from "./opengraph-image-footer"
import { ConferenceOpengraphImageHeader } from "./conference-opengraph-image-header"

/**
 * We can't use CSS variables and Tailwind classes here because we're rendering an image.
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

export const RIGHT_COLUMN_WIDTH_PX = 476

export interface SpeakerOpengraphImageProps
  extends React.HTMLAttributes<HTMLElement> {
  speaker: SchedSpeaker
  date: string
  year: string
  location: string
}

export function SpeakerOpengraphImage({
  speaker,
  date,
  year,
  location,
  ...rest
}: SpeakerOpengraphImageProps) {
  return (
    <article
      style={{
        display: "flex",
        height: "630px",
        width: "1200px",
        flexDirection: "column",
        overflow: "hidden",
        borderWidth: "2px",
        backgroundColor: colors.neu100,
        borderColor: colors.neu600,
        fontFamily: fonts.sans,
      }}
      {...rest}
    >
      <ConferenceOpengraphImageHeader
        year={year}
        date={date}
        location={location}
      />

      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              gap: "2.5rem",
              padding: "2.5rem",
              paddingRight: "4rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "88px",
                  fontWeight: "normal",
                  lineHeight: "1.25",
                  color: colors.neu900,
                }}
              >
                {speaker.name}
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: "32px",
                    fontWeight: "normal",
                    lineHeight: "1.25",
                    color: colors.neu700,
                  }}
                >
                  {formatSpeakerPosition(speaker)}
                </span>
              </div>
            </div>
          </div>

          <OpengraphImageFooter>Speakers</OpengraphImageFooter>
        </div>

        {speaker.avatar && (
          <div
            style={{
              position: "relative",
              display: "flex",
              overflow: "hidden",
              borderLeft: `2px solid ${colors.neu600}`,
              width: RIGHT_COLUMN_WIDTH_PX + 2,
              height: RIGHT_COLUMN_WIDTH_PX,
            }}
          >
            <img
              src={normalizeProtocolRelativeUrl(speaker.avatar)}
              alt=""
              style={{
                objectFit: "cover",
                // @vercel/og doesn't support mix blend mode
                // and SVG `<image>` is crashing similarly to
                // https://github.com/vercel/satori/issues/650.
                // So we use `sepia` and `hue-rotate` to change
                // the hue to around 79deg from the design system's
                // secondary color (yellowish green).
                filter: "sepia(1) hue-rotate(37.5deg)",
              }}
              width={RIGHT_COLUMN_WIDTH_PX}
              height={RIGHT_COLUMN_WIDTH_PX}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: RIGHT_COLUMN_WIDTH_PX,
                height: RIGHT_COLUMN_WIDTH_PX,
                backgroundColor: colors.secLighter,
                opacity: 0.25,
              }}
            />
          </div>
        )}
      </div>
    </article>
  )
}
