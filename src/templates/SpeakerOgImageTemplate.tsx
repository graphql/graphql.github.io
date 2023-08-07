import React from "react"
import { PageProps } from "gatsby"
import { SchedSpeaker } from "../components/Conf/Speakers/Speaker"

const SpeakerOgImageTemplate = ({
  pageContext: { speaker },
}: PageProps<{}, { speaker: SchedSpeaker; schedule: any }>) => {
  const { name, company } = speaker

  const positions = speaker.position?.split(",")

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
              marginBottom: "30px",
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
              SPEAKERS
            </span>
          </h1>
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
              September 19-21, 2023
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                style={{ marginRight: "12px", marginBottom: "2px" }}
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                <path
                  fill="white"
                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                />
              </svg>
              SF Bay Area
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            marginTop: "60px",
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
                width: "248px",
                height: "248px",
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
              {name}
            </h1>
            <span
              style={{
                paddingTop: "7px",
                fontSize: "30px",
                lineHeight: "46px",
              }}
            >
              {company}
              {company && positions?.length && ", "}
              {positions?.length === 1
                ? positions[0]
                : positions?.map(position => (
                    <span style={{ display: "block" }}>{position}</span>
                  ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpeakerOgImageTemplate
