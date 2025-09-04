import { colors, fonts } from "./speaker-opengraph-image"
import {
  ConferenceOpengraphImageHeader,
  OG_IMAGE_HEADER_HEIGHT,
} from "./conference-opengraph-image-header"

import graphqlLogoStripes from "./graphql-logo-stripes.png"

export interface GenericOpengraphImageProps
  extends React.HTMLAttributes<HTMLElement> {
  date: string
  year: string
  location: string
  pageTitle: string
}

export function GenericOpengraphImage({
  date,
  location,
  year,
  pageTitle,
  ...rest
}: GenericOpengraphImageProps) {
  const basePath =
    `https://${process.env.VERCEL_URL}` || process.env.__NEXT_PRIVATE_ORIGIN

  const height = 630

  return (
    <article
      style={{
        display: "flex",
        height,
        width: "1200px",
        flexDirection: "column",
        overflow: "hidden",
        borderWidth: "2px",
        borderColor: colors.neu600,
        backgroundColor: colors.neu100,
        fontFamily: fonts.sans,
      }}
      {...rest}
    >
      <ConferenceOpengraphImageHeader
        year={year}
        date={date}
        location={location}
      />

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "2.5rem",
          position: "relative",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: fonts.sans,
            lineHeight: "1.25",
            color: colors.neu900,
            fontSize: "96px",
          }}
        >
          {pageTitle}
        </h1>
        <img
          src={`${basePath}${graphqlLogoStripes.src}`}
          style={{ position: "absolute", right: 0, bottom: -5 }}
          height={height - OG_IMAGE_HEADER_HEIGHT}
          width={673}
        />
      </div>
    </article>
  )
}
