import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { colors, fonts } from "./speaker-opengraph-image"
import {
  ConferenceOpengraphImageHeader,
  OG_IMAGE_HEADER_HEIGHT,
} from "./conference-opengraph-image-header"

const graphqlLogoStripesDataUri = `data:image/png;base64,${readFileSync(
  resolve(
    process.cwd(),
    "src/app/conf/2026/components/og-images/graphql-logo-stripes.png",
  ),
).toString("base64")}`

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
          src={graphqlLogoStripesDataUri}
          style={{ position: "absolute", right: 0, bottom: -5 }}
          height={height - OG_IMAGE_HEADER_HEIGHT}
          width={673}
        />
      </div>
    </article>
  )
}
