/* eslint-disable tailwindcss/no-custom-classname */
import React from "react"
import { ReactComponent as Stellate } from "../../../../static/img/conf/Sponsors/Stellate.svg"
import { ReactComponent as Postman } from "../../../../static/img/conf/Sponsors/Postman.svg"
import { ReactComponent as Solo } from "../../../../static/img/conf/Sponsors/Solo.svg"
import { ReactComponent as Hasura } from "../../../../static/img/conf/Sponsors/Hasura.svg"
import { ReactComponent as TheGraph } from "../../../../static/img/conf/Sponsors/TheGraph.svg"
import { ReactComponent as TheGuild } from "../../../../static/img/conf/Sponsors/TheGuild.svg"
import { ReactComponent as Hygraph } from "../../../../static/img/conf/Sponsors/Hygraph.svg"
import { ReactComponent as StepZen } from "../../../../static/img/conf/Sponsors/StepZen.svg"

interface Image {
  iconPath: string
  name: string
  link: string
}

function alphabetSort(a: Image, b: Image) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

const sponsorDiamond: Image[] = [
  {
    iconPath: TheGuild,
    name: "The Guild",
    link: "https://the-guild.dev/",
  },
  {
    iconPath: Postman,
    name: "Postman",
    link: "https://www.postman.com/",
  },
  {
    iconPath: Hasura,
    name: "Hasura",
    link: "https://hasura.io/",
  },
]

const sponsorPlatinum: Image[] = [
  {
    iconPath: Solo,
    name: "Solo.io",
    link: "https://www.solo.io/",
  },
  {
    iconPath: Hygraph,
    name: "Hygraph",
    link: "https://hygraph.com/",
  },
]

const sponsorGold: Image[] = [
  {
    iconPath: TheGraph,
    name: "The Graph",
    link: "https://thegraph.com/",
  },
  {
    iconPath: StepZen,
    name: "StepZen",
    link: "https://stepzen.com/",
  },
]

const sponsorSilver: Image[] = [
  {
    iconPath: Stellate,
    name: "Stellate",
    link: "https://stellate.co/",
  },
]

const workshopDaySponsors: Image[] = [
  {
    iconPath: TheGuild,
    name: "The Guild",
    link: "https://the-guild.dev/",
  },
]

const SponsersConf = () => {
  return (
    <div id="sponsors" className="bg-white py-10 static">
      <h1 className="text-center text-4xl text-[#171E26] font-bold my-8">
        Sponsors
      </h1>
      <h3 className="text-center text-[--rhodamine] font-bold my-10 underline underline-offset-8">
        DIAMOND
      </h3>
      <div className="flex justify-center items-center flex-wrap gap-[40px]">
        {sponsorDiamond.map((sponsor, i) => (
          <a
            key={i}
            className="zoom-diamond flex flex-col items-center text-center w-full h-full"
            href={sponsor.link}
            target="_blank"
          >
            <sponsor.iconPath />
          </a>
        ))}
      </div>
      <h3 className="text-center text-[--rhodamine] font-bold my-10 underline underline-offset-8">
        PLATINUM
      </h3>
      <div className="flex justify-center items-center flex-wrap gap-[20px]">
        {sponsorPlatinum
          .sort((a, b) => alphabetSort(a, b))
          .map((sponsor, i) => (
            <a
              key={i}
              className="zoom-platinum self-center flex flex-col text-center w-full"
              href={sponsor.link}
              target="_blank"
            >
              <sponsor.iconPath />
            </a>
          ))}
      </div>

      <h3 className="text-center text-[--rhodamine] font-bold my-10 underline underline-offset-8">
        GOLD
      </h3>
      <div className="flex justify-center items-start flex-wrap gap-[40px]">
        {sponsorGold
          .sort((a, b) => alphabetSort(a, b))
          .map((sponsor, i) => (
            <a
              key={i}
              className="zoom-gold flex flex-col items-center text-center w-full h-full"
              href={sponsor.link}
              target="_blank"
            >
              <sponsor.iconPath />
            </a>
          ))}
      </div>

      <h3 className="text-center text-[--rhodamine] font-bold my-10 underline underline-offset-8">
        SILVER
      </h3>
      <div className="flex justify-center items-start flex-wrap gap-[20px]">
        {sponsorSilver
          .sort((a, b) => alphabetSort(a, b))
          .map((sponsor, i) => (
            <a
              key={i}
              className="zoom-silver flex flex-col items-center text-center w-full h-full"
              href={sponsor.link}
              target="_blank"
            >
              <sponsor.iconPath />
            </a>
          ))}
      </div>

      <h3 className="text-center text-[--rhodamine] font-bold my-10 underline underline-offset-8">
        Workshop Day Sponsor
      </h3>
      <div className="flex justify-center items-center flex-wrap gap-[40px] h-[70%]">
        {workshopDaySponsors.map((sponsor, i) => (
          <a
            key={i}
            className="zoom-platinum flex flex-col items-center text-center"
            href={sponsor.link}
            target="_blank"
          >
            <sponsor.iconPath />
          </a>
        ))}
      </div>
    </div>
  )
}

export default SponsersConf
