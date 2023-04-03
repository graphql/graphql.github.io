import React from "react"
import ButtonConf from "../Button"
import { TwitterLogoIcon } from "@radix-ui/react-icons"

interface Speaker {
  name: string
  title: string
  twitter: string
  image: string
}

const speakers: Speaker[] = [
  {
    name: "Lee Byron",
    title: "Co-creator of GraphQL, Director of the GraphQL Foundation",
    twitter: "https://twitter.com/leeb",
    image: "/img/conf/speakers/leebyron.jpg",
  },
  {
    name: "Idit Levine",
    title: "Founder of Solo.io",
    twitter: "https://twitter.com/idit_levine",
    image:
      "https://pbs.twimg.com/profile_images/922586508871139330/60rIRufM_400x400.jpg",
  },
  {
    name: "Matteo Collina",
    title: "Creator of Fastify, Platformatic CTO, Node TSC",
    twitter: "https://twitter.com/matteocollina",
    image:
      "https://pbs.twimg.com/profile_images/1541698320443314179/4Cp5IrGB_400x400.jpg",
  },
  {
    name: "Marc-André Giroux",
    title: "Author of Production Ready GraphQL, GraphQL TSC",
    twitter: "https://twitter.com/__xuorig__",
    image: "/img/conf/speakers/marcandre.jpg",
  },
  {
    name: "Uri Goldshtein",
    title: "Founder of The Guild, GraphQL TSC",
    twitter: "https://twitter.com/UriGoldshtein",
    image:
      "https://pbs.twimg.com/profile_images/842775577761386497/sjLkh27C_400x400.jpg",
  },
]

const SpeakersConf = () => {
  return (
    <div id="speakers">
      <div className="bg-[#0E031C] w-full">
        <div className="flex flex-col text-center mx-auto max-w-[80ch] text-white px-4">
          <h1 className="text-4xl text-white font-bold">Speakers</h1>
          <p>
            GraphQLConf brings together the creators of some of the most
            important technologies behind GraphQL. These speakers will share
            their experience, insights and knowledge as they discuss the
            challenges facing the growing GraphQL ecosystem. If you have
            something worth sharing, submit an application to speak!
          </p>
          <p>
            <ButtonConf
              className="mx-auto"
              text="Submit to Speak"
              href="/conf/speak/"
            />
          </p>
        </div>
        <div className="flex justify-center items-center md:items-start flex-col md:flex-row flex-wrap gap-0 md:gap-4">
          {speakers.map((speaker, i) => (
            <div key={i} className="p-4 w-[220px]">
              <div className="h-full flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    alt={speaker.name}
                    className="flex-shrink-0 rounded-full h-36 w-36 object-cover object-center"
                    src={speaker.image}
                  />
                  <div className="bg-[#55ACEF] h-8 w-8 flex items-center justify-center rounded-full absolute bottom-0 right-0">
                    <a href={speaker.twitter} target="_blank">
                      <TwitterLogoIcon
                        className="text-white"
                        width={20}
                        height={20}
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-lg text-white font-bold mt-3">
                    {speaker.name}
                  </div>
                  <div className="text-gray-400 text-sm mt-2 mb-2">{speaker.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpeakersConf
