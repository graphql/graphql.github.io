import { normalizeProtocolRelativeUrl } from "@/app/conf/2026/components/og-images/normalize-protocol-relative-url"
import { OpengraphImageFooter } from "@/app/conf/2026/components/og-images/opengraph-image-footer"
import {
  colors,
  fonts,
  RIGHT_COLUMN_WIDTH_PX,
} from "@/app/conf/2026/components/og-images/speaker-opengraph-image"
import { MeetupBannerHeader } from "./meetup-banner-header"
import { SponsoredByApollo } from "./sponsored-by-apollo"

export interface SpeakerSpotlightImageProps {
  name: string
  title?: string
  company?: string
  photo?: string
  talkTitle?: string
  eventName: string
  date: string
  location: string
}

export function SpeakerSpotlightImage({
  name,
  title,
  company,
  photo,
  talkTitle,
  eventName,
  date,
  location,
}: SpeakerSpotlightImageProps) {
  const position = [title, company].filter(Boolean).join(" · ")

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
    >
      <MeetupBannerHeader date={date} location={location} />

      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              gap: "1.5rem",
              padding: "2.5rem",
              paddingRight: "4rem",
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: "1.5rem",
                fontWeight: "normal",
                textTransform: "uppercase",
                lineHeight: "1",
                color: colors.priBase,
              }}
            >
              Speaker Spotlight
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "72px",
                  fontWeight: "normal",
                  lineHeight: "1.25",
                  color: colors.neu900,
                }}
              >
                {name}
              </h3>

              {position && (
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: "32px",
                    fontWeight: "normal",
                    lineHeight: "1.25",
                    color: colors.neu700,
                  }}
                >
                  {position}
                </span>
              )}

              {talkTitle && (
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: "28px",
                    fontWeight: "normal",
                    lineHeight: "1.4",
                    color: colors.neu900,
                  }}
                >
                  “{talkTitle}”
                </span>
              )}
            </div>
          </div>

          <OpengraphImageFooter>{eventName}</OpengraphImageFooter>

          <SponsoredByApollo />
        </div>

        {photo && (
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
              src={normalizeProtocolRelativeUrl(photo)}
              alt=""
              style={{
                objectFit: "cover",
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
