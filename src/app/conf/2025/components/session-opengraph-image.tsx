import type { SchedSpeaker, ScheduleSession } from "@/app/conf/2023/types"
import {
  ConferenceOpengraphImageHeader,
  normalizeProtocolRelativeUrl,
  colors,
  OpengraphImageFooter,
  fonts,
} from "./speaker-opengraph-image"
import { getEventTitle } from "../utils"
import { formatSpeakerPosition } from "./format-speaker-position"
import { speakers as allSpeakers } from "../_data"

export interface SessionOpengraphImageProps
  extends React.HTMLAttributes<HTMLElement> {
  session: Pick<
    ScheduleSession,
    "name" | "speakers" | "event_type" | "event_subtype"
  >
  date: string
  year: string
  location: string
}

function isString(x: unknown): x is string {
  return Object.prototype.toString.call(x) === "[object String]"
}

export function SessionOpengraphImage({
  session,
  date,
  location,
  year,
  ...rest
}: SessionOpengraphImageProps) {
  const speakers = session.speakers
    ? isString(session.speakers)
      ? (session.speakers as string)
          .split(",")
          .map(name => ({ name, username: "", avatar: "" }))
      : session.speakers.map(speaker => {
          return (
            allSpeakers.find(s => s.username === speaker.username) || speaker
          )
        })
    : []

  const eventTitle = getEventTitle(
    session,
    speakers.map(s => s.name),
  )

  return (
    <article
      style={{
        display: "flex",
        height: "630px",
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
          justifyContent: "space-between",
          padding: "2.5rem",
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
              fontFamily: fonts.sans,
              lineHeight: "1.25",
              color: colors.neu900,
              fontSize: eventTitle.length <= 32 ? "72px" : "32px",
            }}
          >
            {eventTitle}
          </h3>
        </div>

        {speakers.length === 1 && speakers[0] && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2.5rem",
            }}
          >
            {speakers[0]?.avatar && (
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                <img
                  src={normalizeProtocolRelativeUrl(speakers[0].avatar)}
                  alt=""
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    filter: "sepia(1) hue-rotate(37.5deg)",
                  }}
                  width={120}
                  height={120}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "120px",
                    height: "120px",
                    backgroundColor: colors.secLighter,
                    opacity: 0.25,
                  }}
                />
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontFamily: fonts.sans,
                  fontSize: "48px",
                  fontWeight: "normal",
                  lineHeight: "1",
                  color: colors.neu900,
                }}
              >
                {speakers[0].name}
              </h4>
              {"company" in speakers[0] && speakers[0].company && (
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: "32px",
                    fontWeight: "normal",
                    lineHeight: "1",
                    color: colors.neu700,
                  }}
                >
                  {formatSpeakerPosition(speakers[0] as SchedSpeaker)}
                </span>
              )}
            </div>
          </div>
        )}

        {speakers.length > 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h4
              style={{
                margin: 0,
                fontFamily: fonts.sans,
                fontWeight: "normal",
                lineHeight: "1.25",
                color: colors.neu900,
                fontSize: speakers.length < 4 ? "48px" : "32px",
              }}
            >
              {speakers.map(s => s.name).join(", ")}
            </h4>
          </div>
        )}
      </div>

      {(session.event_type || session.event_subtype) && (
        <OpengraphImageFooter>
          {[session.event_type, session.event_subtype]
            .filter(Boolean)
            .join(" — ")}
        </OpengraphImageFooter>
      )}
    </article>
  )
}
