import React from "react"
import ButtonConf from "../Button"

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
    <div id="speakers" className="pt-32 -mt-32">
      <div className="bg-[#0E031C] w-full">
        <div className="flex flex-col text-center mx-auto max-w-prose text-white px-4">
          <h1 className="text-4xl text-white font-bold mb-6">Speakers</h1>
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
        <div className="flex flex-wrap justify-center">
          {speakers.map((speaker, i) => (
            <div key={i} className="p-4 lg:w-1/5 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt={speaker.name}
                  className="flex-shrink-0 rounded-lg w-full h-36 object-cover object-center"
                  src={speaker.image}
                />
                <div className="w-full">
                  <div className="title-font text-lg text-white font-bold mt-3">
                    {speaker.name}
                  </div>
                  <div className="text-gray-400 mt-1">{speaker.title}</div>
                  <span className="inline-flex mt-3">
                    <a
                      href={speaker.twitter}
                      className=" text-gray-500 hover:text-white"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                  </span>
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
