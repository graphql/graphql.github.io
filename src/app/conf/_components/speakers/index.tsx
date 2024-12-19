import { Button } from "../button"
import leeImage from "public/img/conf/speakers/leebyron.jpg"
import marcImage from "public/img/conf/speakers/marcandre.jpg"
import iditImage from "public/img/conf/speakers/idit.jpg"
import uriImage from "public/img/conf/speakers/uri.jpg"
import { LinkedInIcon, TwitterIcon } from "@/icons"
import NextImage from "next-image-export-optimizer"
import type { StaticImageData } from "next/image"
import NextLink from "next/link"

interface Speaker {
  name: string
  title: string
  twitter: string
  image: StaticImageData
  linkedin: string
  url: string
}

const speakers: Speaker[] = [
  {
    name: "Lee Byron",
    title: "Co-creator of GraphQL, Director of the GraphQL Foundation",
    twitter: "https://twitter.com/leeb",
    image: leeImage,
    linkedin: "https://linkedin.com/in/lee-byron",
    url: "lee_byron.25krdom6",
  },
  {
    name: "Idit Levine",
    title: "Founder of Solo.io",
    twitter: "https://twitter.com/idit_levine",
    image: iditImage,
    linkedin: "https://linkedin.com/in/iditlevine",
    url: "idit_levine.25krdj4u",
  },
  {
    name: "Marc-André Giroux",
    title: "Author of Production Ready GraphQL, GraphQL TSC",
    twitter: "https://twitter.com/__xuorig__",
    image: marcImage,
    linkedin: "https://linkedin.com/in/magiroux",
    url: "mgiroux7",
  },
  {
    name: "Uri Goldshtein",
    title: "Founder of The Guild, GraphQL TSC",
    twitter: "https://twitter.com/UriGoldshtein",
    image: uriImage,
    linkedin: "https://linkedin.com/in/urigo",
    url: "uri_goldshtein.23xujj9a",
  },
]

export function Speakers() {
  return (
    // Invisible padding so anchor links align to the header menu
    <div id="speakers" className="conf-block bg-conf-black text-white">
      <div className="container">
        <h1 className="conf-heading text-white md:text-center">Speakers</h1>
        <div className="my-10 flex flex-wrap items-start justify-around gap-10 max-md:flex-col md:my-20 lg:px-24">
          {speakers.map((speaker, i) => (
            <div
              key={i}
              className="flex h-full items-center gap-5 md:w-[220px] md:flex-col md:p-4 md:text-center"
            >
              <NextLink
                href={`/conf/2023/speakers/${speaker.url}`}
                className="shrink-0 [&:hover+div>a>span]:text-primary"
              >
                <NextImage
                  alt={speaker.name}
                  src={speaker.image}
                  className="size-36 shrink-0 rounded-full border-2 border-transparent object-cover object-center transition-colors hover:border-primary"
                />
              </NextLink>
              <div>
                <NextLink
                  href={`/conf/2023/speakers/${speaker.url}`}
                  className="text-white [&:hover>span]:text-primary"
                >
                  <span className="text-lg font-bold transition-colors">
                    {speaker.name}
                  </span>
                  <div className="my-2 text-sm">{speaker.title}</div>
                </NextLink>
                <div className="flex gap-2 md:justify-center">
                  <a
                    href={speaker.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-current transition-colors hover:text-primary"
                  >
                    <TwitterIcon width="17" height="17" />
                  </a>
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-current transition-colors hover:text-primary"
                  >
                    <LinkedInIcon width="17" height="17" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-10 max-w-[600px] text-center">
            GraphQLConf brings together the creators of some of the most
            important technologies behind GraphQL. These speakers will share
            their experience, insights and knowledge as they discuss the
            challenges facing the growing GraphQL ecosystem.
          </p>
          <Button href="/conf/2023/speakers">See all speakers</Button>
        </div>
      </div>
    </div>
  )
}
