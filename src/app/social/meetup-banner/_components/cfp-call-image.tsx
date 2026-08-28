import { OpengraphImageFooter } from "@/app/conf/2026/components/og-images/opengraph-image-footer"
import {
  colors,
  fonts,
  RIGHT_COLUMN_WIDTH_PX,
} from "@/app/conf/2026/components/og-images/speaker-opengraph-image"
import { BannerQrCode } from "./banner-qr-code"
import { MeetupBannerHeader } from "./meetup-banner-header"
import { SponsoredByApollo } from "./sponsored-by-apollo"

export interface CfpCallImageProps {
  eventName: string
  date: string
  location: string
  deadline?: string
  link?: string
}

export function CfpCallImage({
  eventName,
  date,
  location,
  deadline,
  link,
}: CfpCallImageProps) {
  return (
    <article
      style={{
        display: "flex",
        height: "630px",
        width: "1200px",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        borderWidth: "2px",
        borderColor: colors.neu600,
        backgroundColor: colors.neu100,
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
            Call for Proposals
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: fonts.sans,
              lineHeight: "1.25",
              color: colors.neu900,
              fontSize: "48px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            Speak at {eventName}
          </h1>
          {deadline && (
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: "32px",
                fontWeight: "normal",
                lineHeight: "1.25",
                color: colors.neu700,
              }}
            >
              Submissions close {deadline}
            </span>
          )}
        </div>

        {link && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: `2px solid ${colors.neu600}`,
              width: RIGHT_COLUMN_WIDTH_PX + 2,
            }}
          >
            <BannerQrCode value={link} caption="Scan to submit a proposal" />
          </div>
        )}
      </div>

      <OpengraphImageFooter>Submit your talk</OpengraphImageFooter>

      <SponsoredByApollo />
    </article>
  )
}
