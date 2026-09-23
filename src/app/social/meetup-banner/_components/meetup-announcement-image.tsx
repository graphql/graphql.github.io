import {
  colors,
  fonts,
  RIGHT_COLUMN_WIDTH_PX,
} from "@/app/conf/2026/components/og-images/speaker-opengraph-image"
import { BannerQrCode } from "./banner-qr-code"
import { MeetupBannerHeader } from "./meetup-banner-header"
import { SponsoredByApollo } from "./sponsored-by-apollo"

export interface MeetupAnnouncementImageProps {
  title: string
  date: string
  location: string
  host: string
  eventLink: string
}

export function MeetupAnnouncementImage({
  title,
  date,
  location,
  host,
  eventLink,
}: MeetupAnnouncementImageProps) {
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
            {host}
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: fonts.sans,
              lineHeight: "1.25",
              color: colors.neu900,
              fontSize: "56px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: `2px solid ${colors.neu600}`,
            width: RIGHT_COLUMN_WIDTH_PX + 2,
          }}
        >
          <BannerQrCode value={eventLink} caption="Scan to register" />
        </div>
      </div>

      <SponsoredByApollo />
    </article>
  )
}
