import React from "react"
import ButtonConf from "../Button"
import { ReactComponent as TwitterIcon } from "../../../../static/img/logos/twitter.svg"
import { ReactComponent as LinkedInIcon } from "../../../../static/img/logos/linkedin.svg"
import Lee from "../../../../static/img/conf/speakers/leebyron.jpg"
import Marc from "../../../../static/img/conf/speakers/marcandre.jpg"

interface Speaker {
  name: string
  title: string
  twitter: string
  image: string
  linkedin: string
}

const speakers: Speaker[] = [
  {
    name: "Lee Byron",
    title: "Co-creator of GraphQL, Director of the GraphQL Foundation",
    twitter: "https://twitter.com/leeb",
    image: Lee,
    linkedin: "https://linkedin.com/in/lee-byron",
  },
  {
    name: "Idit Levine",
    title: "Founder of Solo.io",
    twitter: "https://twitter.com/idit_levine",
    image:
      "https://pbs.twimg.com/profile_images/922586508871139330/60rIRufM_400x400.jpg",
    linkedin: "https://linkedin.com/in/iditlevine",
  },
  {
    name: "Marc-André Giroux",
    title: "Author of Production Ready GraphQL, GraphQL TSC",
    twitter: "https://twitter.com/__xuorig__",
    image: Marc,
    linkedin: "https://linkedin.com/in/magiroux",
  },
  {
    name: "Uri Goldshtein",
    title: "Founder of The Guild, GraphQL TSC",
    twitter: "https://twitter.com/UriGoldshtein",
    image:
      "https://pbs.twimg.com/profile_images/842775577761386497/sjLkh27C_400x400.jpg",
    linkedin: "https://linkedin.com/in/urigo",
  },
]

export default function SpeakersConf() {
  return (
    // Invisible padding so anchor links align to the header menu
    <div id="speakers" className="bg-[#0e031c] text-white py-24">
      <div className="container">
        <h1 className="md:text-center text-4xl text-white font-bold mt-0">
          Speakers
        </h1>
        <div className="flex max-md:flex-col justify-around items-start flex-wrap gap-10 lg:px-24 my-10 md:my-20">
          {speakers.map((speaker, i) => (
            <div
              key={i}
              className="md:p-4 md:w-[220px] h-full flex md:flex-col md:items-center md:text-center gap-7"
            >
              <img
                alt={speaker.name}
                src={speaker.image}
                className="shrink-0 rounded-full h-36 w-36 object-cover object-center"
              />
              <div>
                <div className="text-lg text-white font-bold mt-3">
                  {speaker.name}
                </div>
                <div className="text-sm my-2">{speaker.title}</div>
                <div className="flex gap-2 md:justify-center">
                  <a
                    href={speaker.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-current"
                  >
                    <TwitterIcon width="17" height="17" />
                  </a>
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-current"
                  >
                    <LinkedInIcon width="17" height="17" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <p className="max-w-[600px] text-center mt-0 mb-10">
            GraphQLConf brings together the creators of some of the most
            important technologies behind GraphQL. These speakers will share
            their experience, insights and knowledge as they discuss the
            challenges facing the growing GraphQL ecosystem.
          </p>
          <ButtonConf href="/conf/speakers/">See all speakers</ButtonConf>
        </div>
      </div>
    </div>
  )
}

export { speakers as keynoteSpeakers }
