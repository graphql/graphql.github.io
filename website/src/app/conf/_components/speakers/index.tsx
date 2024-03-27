import { Button } from "../button"
import leeImage from "public/img/conf/speakers/leebyron.jpg"
import marcImage from "public/img/conf/speakers/marcandre.jpg"
import iditImage from "public/img/conf/speakers/idit.jpg"
import uriImage from "public/img/conf/speakers/uri.jpg"
import { LinkedInIcon, TwitterIcon } from "@/icons"
import NextImage, { StaticImageData } from "next/image"
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
    <div id="speakers" className="bg-conf-black text-white conf-block">
      <div className="container">
        <h1 className="md:text-center text-white conf-heading">Speakers</h1>
        <div className="flex max-md:flex-col justify-around items-start flex-wrap gap-10 lg:px-24 my-10 md:my-20">
          {speakers.map((speaker, i) => (
            <div
              key={i}
              className="md:p-4 md:w-[220px] h-full flex md:flex-col items-center md:text-center gap-5"
            >
              <NextLink
                href={`/conf/2023/speakers/${speaker.url}`}
                className="[&:hover+div>a>span]:text-primary shrink-0"
              >
                <NextImage
                  alt={speaker.name}
                  src={speaker.image}
                  className="shrink-0 rounded-full size-36 object-cover object-center border-2 border-transparent hover:border-primary transition-colors"
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
                  <div className="text-sm my-2">{speaker.title}</div>
                </NextLink>
                <div className="flex gap-2 md:justify-center">
                  <a
                    href={speaker.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-current hover:text-primary transition-colors"
                  >
                    <TwitterIcon width="17" height="17" />
                  </a>
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-current hover:text-primary transition-colors"
                  >
                    <LinkedInIcon width="17" height="17" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <p className="max-w-[600px] text-center mb-10">
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
