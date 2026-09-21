import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import {
  colors,
  DayOpengraphImageHeader,
  fonts,
  OG_IMAGE_HEADER_HEIGHT,
} from "./day-opengraph-image-header"

const graphqlLogoStripesDataUri = `data:image/png;base64,${readFileSync(
  resolve(
    process.cwd(),
    "src/app/day/2026/components/og-images/graphql-logo-stripes.png",
  ),
).toString("base64")}`

export interface GenericDayOpengraphImageProps
  extends React.HTMLAttributes<HTMLElement> {
  pageTitle: string
  date: string
  location: string
}

export function GenericDayOpengraphImage({
  pageTitle,
  date,
  location,
  ...rest
}: GenericDayOpengraphImageProps) {
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
      <DayOpengraphImageHeader
        city={pageTitle}
        date={date}
        location={location}
      />

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "2.5rem",
          position: "relative",
        }}
      >
        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            fontFamily: fonts.sans,
            lineHeight: "1.25",
            fontWeight: "bold",
            fontSize: "72px",
          }}
        >
          <span style={{ color: colors.neu900 }}>GraphQL Day</span>
          <span style={{ color: colors.priBase }}>at FOST {pageTitle}</span>
        </h1>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            marginTop: "2.5rem",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.neu900,
            color: colors.neu0,
            fontFamily: fonts.sans,
            fontSize: "1.75rem",
            height: "4.5rem",
            padding: "0 2.5rem",
          }}
        >
          Register now
        </div>
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
