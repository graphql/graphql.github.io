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
    // Invisible padding so anchor links align to the header menu
    <div id="speakers" className="-mt-16 pt-16">
      <div className="bg-[#171E26] w-full mt-8">
        <div className="text-center mx-auto text-white">
          <h1 className="text-4xl text-white font-bold my-4">Speakers</h1>
        </div>
        <div className="flex justify-center items-start flex-wrap">
          {speakers.map((speaker, i) => (
            <div key={i} className="p-4 w-[220px]">
              <div className="h-full flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    alt={speaker.name}
                    src={speaker.image}
                    className="shrink-0 rounded-full h-36 w-36 object-cover object-center"
                  />
                  <div className="bg-[#55ACEF] h-8 w-8 flex items-center justify-center rounded-full absolute bottom-0 right-0">
                    <a
                      href={speaker.twitter}
                      target="_blank"
                      className="h-[20px]"
                    >
                      <TwitterLogoIcon className="text-white h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div className="text-lg text-white font-bold mt-3">
                  {speaker.name}
                </div>
                <div className="text-gray-400 text-sm my-2">
                  {speaker.title}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center flex-wrap py-6">
          <ButtonConf href="/conf/speakers/">See all speakers</ButtonConf>
        </div>
        <div className="flex flex-col text-center mx-auto max-w-prose text-white px-4">
          <p>
            GraphQLConf brings together the creators of some of the most
            important technologies behind GraphQL. These speakers will share
            their experience, insights and knowledge as they discuss the
            challenges facing the growing GraphQL ecosystem.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpeakersConf

export { speakers as keynoteSpeakers }
