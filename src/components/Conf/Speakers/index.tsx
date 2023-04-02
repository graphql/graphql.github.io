import React from "react"

interface Speaker {
  name: string
  title: string
  twitter: string
  image: string
}

//TODO: Add title to speakers

const speakers: Speaker[] = [
  {
    name: "Lee Byron",
    title: "Title Missing",
    twitter: "https://twitter.com/leeb",
    image:
      "https://pbs.twimg.com/profile_images/826651806696501248/TOro78hz_400x400.jpg",
  },
  {
    name: "Idit Levine",
    title: "Title Missing",
    twitter: "https://twitter.com/idit_levine",
    image:
      "https://pbs.twimg.com/profile_images/922586508871139330/60rIRufM_400x400.jpg",
  },
  {
    name: "Matteo Collina",
    title: "Co-Founder, GraphQL",
    twitter: "https://twitter.com/matteocollina",
    image:
      "https://pbs.twimg.com/profile_images/1541698320443314179/4Cp5IrGB_400x400.jpg",
  },
  {
    name: "Uri Goldshtein",
    title: "Title Missing",
    twitter: "https://twitter.com/UriGoldshtein",
    image:
      "https://pbs.twimg.com/profile_images/842775577761386497/sjLkh27C_400x400.jpg",
  },
  {
    name: "Marc-André Giroux",
    title: "Title Missing",
    twitter: "https://twitter.com/__xuorig__",
    image:
      "https://pbs.twimg.com/profile_images/1448627465895690240/JBNdJiLf_400x400.jpg",
  },
]

const SpeakersConf = () => {
  return (
    <div className=" bg-[#2a3746] w-full">
      <div className="flex flex-col text-center w-full">
        <h1 className="text-4xl title-font text-white font-bold">SPEAKERS</h1>
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
  )
}

export default SpeakersConf
