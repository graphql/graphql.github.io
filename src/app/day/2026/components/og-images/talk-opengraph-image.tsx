import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import type { StaticImageData } from "next/image"

import { loadFontsForOG } from "@/app/fonts/og/load-fonts-for-og"

import type { DayEvent } from "../../day-events"
import type { EventSession } from "../event-schedule-section"
import {
  colors,
  DayOpengraphImageHeader,
  fonts,
} from "./day-opengraph-image-header"

export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

/**
 * Satori needs the image bytes. Imported images point at the copy Next emits
 * to `.next/static/media`, which exists when OG images are prerendered.
 */
function avatarDataUri(avatar: StaticImageData) {
  const file = join(
    process.cwd(),
    ".next",
    avatar.src.replace(/^\/_next\//, ""),
  )
  const type = avatar.src.endsWith(".png") ? "png" : "jpeg"
  return `data:image/${type};base64,${readFileSync(file).toString("base64")}`
}

export async function TalkOpengraphImage({
  event,
  session,
}: {
  event: DayEvent
  session: EventSession
}) {
  const ogFonts = loadFontsForOG()
  const { title, speakers } = session

  return new ImageResponse(
    (
      <article
        style={{
          display: "flex",
          height: size.height,
          width: size.width,
          flexDirection: "column",
          overflow: "hidden",
          borderWidth: "2px",
          borderColor: colors.neu600,
          backgroundColor: colors.neu100,
          fontFamily: fonts.sans,
        }}
      >
        <DayOpengraphImageHeader
          city={event.city}
          date={event.date}
          location={event.location}
        />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2.5rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: "1.25rem",
                textTransform: "uppercase",
                color: colors.priBase,
              }}
            >
              GraphQL Day at FOST {event.city}
            </span>
            <h1
              style={{
                margin: 0,
                fontFamily: fonts.sans,
                fontWeight: "bold",
                lineHeight: "1.2",
                color: colors.neu900,
                fontSize:
                  title.length <= 30
                    ? "72px"
                    : title.length <= 60
                      ? "56px"
                      : "44px",
              }}
            >
              {title}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "3rem" }}>
            {speakers.map(speaker => (
              <div
                key={speaker.id}
                style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
              >
                {speaker.avatar && (
                  <img
                    src={avatarDataUri(speaker.avatar)}
                    alt=""
                    width={96}
                    height={96}
                    style={{
                      objectFit: "cover",
                      filter: "grayscale(0.9)",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: speakers.length > 1 ? "32px" : "40px",
                      lineHeight: "1",
                      color: colors.neu900,
                    }}
                  >
                    {speaker.name}
                  </span>
                  {speaker.company && speaker.company !== "-" && (
                    <span
                      style={{
                        fontSize: "24px",
                        lineHeight: "1",
                        color: colors.neu700,
                      }}
                    >
                      {speaker.company}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    ),
    {
      ...size,
      fonts: await ogFonts,
    },
  )
}
