/* eslint-disable tailwindcss/no-custom-classname */
import React from "react"
import { ReactComponent as GraphQLWeekly } from "../../../../static/img/conf/Partners/GraphQLWeekly.svg"
import { ReactComponent as GraphQLWTF } from "../../../../static/img/conf/Partners/GraphQLwtf.svg"
import { ReactComponent as EscapeTechnologies } from "../../../../static/img/conf/Partners/EscapeTechnologies.svg"
import { ReactComponent as AmsterdamGraphQL } from "../../../../static/img/conf/Partners/AmsterdamGraphQL.svg"
import { ReactComponent as BangkokGraphQL } from "../../../../static/img/conf/Partners/BangkokGraphQL.svg"
import { ReactComponent as TypeGraphQL } from "../../../../static/img/conf/Partners/TypeGraphQL.svg"
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

const mediaPartners: Image[] = [
  {
    iconPath: GraphQLWeekly,
    name: "GraphQLWeekly",
    link: "https://www.graphqlweekly.com/",
  },
  {
    iconPath: GraphQLWTF,
    name: "GraphQLWTF",
    link: "https://graphql.wtf/",
  },
]

const communityPartners: Image[] = [
  {
    iconPath: EscapeTechnologies,
    name: "EscapeTechnologies",
    link: "https://escape.tech/",
  },
  {
    iconPath: AmsterdamGraphQL,
    name: "Amsterdam GraphQL",
    link: "https://www.meetup.com/amsterdam-graphql-meetup/",
  },
  {
    iconPath: BangkokGraphQL,
    name: "Bangkok GraphQL",
    link: "https://www.meetup.com/graphql-bangkok/",
  },
  {
    iconPath: TypeGraphQL,
    name: "TypeGraphQL",
    link: "https://typegraphql.com/",
  },
]

const PartnersConf = () => {
  return (
    <div id="partners" className="bg-white py-10 static">
      <h1 className="text-center text-4xl text-[#171E26] font-bold my-8">
        Partners
      </h1>
      <h3 className="text-center text-[--rhodamine] font-bold my-10 underline underline-offset-8">
        MEDIA PARTNERS
      </h3>
      <div className="flex justify-center items-start flex-wrap gap-[20px]">
        {mediaPartners
          .sort((a, b) => alphabetSort(a, b))
          .map((partner, i) => (
            <a
              key={i}
              className="zoom-partner flex flex-col items-center text-center w-full h-full"
              href={partner.link}
              target="_blank"
            >
              <partner.iconPath />
            </a>
          ))}
      </div>
      <h3 className="text-center text-[--rhodamine] font-bold my-20 underline underline-offset-8">
        COMMUNITY PARTNERS
      </h3>
      <div className="flex justify-center items-start flex-wrap gap-[20px]">
        {communityPartners
          .sort((a, b) => alphabetSort(a, b))
          .map((partner, i) => (
            <a
              key={i}
              className="zoom-partner flex flex-col justify-center items-center text-center w-full h-full"
              href={partner.link}
              target="_blank"
            >
              <partner.iconPath />
            </a>
          ))}
      </div>
    </div>
  )
}

export default PartnersConf
