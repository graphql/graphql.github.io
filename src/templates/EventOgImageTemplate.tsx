import React from "react"
import { PageProps } from "gatsby"
import { ScheduleSession } from "../components/Conf/Schedule/ScheduleList"
import { SchedSpeaker } from "../components/Conf/Speakers/Speaker"
import { format, parseISO } from "date-fns"

const EventOgImageTemplate = ({
  pageContext,
}: PageProps<{}, { event: ScheduleSession; speakers: SchedSpeaker[] }>) => {
  const speakers = pageContext.speakers.map(speaker => ({
    name: speaker.name,
    avatar: speaker.avatar,
    company: speaker.company,
    position: speaker.position,
  }))
  const { name, event_type, event_start: eventDate } = pageContext.event

  const eventType = event_type.endsWith("s")
    ? event_type.slice(0, -1)
    : event_type

  const eventTitle =
    speakers.length > 0
      ? name.substring(0, name.indexOf(`${speakers[0].name}`) - 3)
      : name

  return (
    <div
      style={{
        fontFamily: "Rubik, Roboto, sans-serif",
        backgroundColor: "black",
        backgroundImage:
          "linear-gradient(to right, black, black, transparent), url(https://graphql.org/img/conf/graphql-conf-bg.png)",
        border: "transparent",
        margin: -8,
        color: "white",
        minHeight: 630,
        width: 1200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "100%",
          padding: "82px 105px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: "white",
              paddingTop: 0,
              marginTop: 0,
              fontSize: "40px",
              fontWeight: "bold",
              marginBottom: "70px",
            }}
          >
            <span style={{ fontWeight: "bolder" }}>GraphQLConf</span>
            <span style={{ fontWeight: "normal" }}>2023</span>
            <span
              style={{
                backgroundColor: "#F5009B",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                padding: "18px 20px",
                marginLeft: "30px",
                alignSelf: "center",
                borderRadius: "30px",
              }}
            >
              {eventType.toUpperCase()}
            </span>
          </h1>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "35px",
              marginBottom: "6px",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "36px",
              color: "white",
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                style={{ marginRight: "14px", marginBottom: "2px" }}
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                <path
                  fill="white"
                  d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                />
              </svg>

              {format(parseISO(eventDate), "EEEE, MMM d")}
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                style={{ marginRight: "14px", marginBottom: "2px" }}
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                <path
                  fill="white"
                  d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                />
              </svg>

              {format(parseISO(eventDate), "hh:mmaaaa 'PDT'")}
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              padding: 0,
              color: "#FFF",
              fontSize: "46px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "64px",
            }}
          >
            {eventTitle}
          </h1>
        </div>
        <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
          {speakers.map(speaker => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
              }}
            >
              {speaker.avatar && (
                <img
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                    border: "1.5px solid white",
                    width: "100px",
                    height: "100px",
                    borderRadius: "9999px",
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                  src={speaker.avatar}
                  alt={speaker.name}
                />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "30px",
                    lineHeight: "46px",
                  }}
                >
                  {speaker.name}
                </span>
                <span
                  style={{
                    paddingTop: "7px",
                    fontSize: "22px",
                    lineHeight: "36px",
                  }}
                >
                  {speaker.company}
                  {speaker.position ? " " + speaker.position : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventOgImageTemplate
