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
import { ReactComponent as Inigo } from "../../../../static/img/conf/Sponsors/Inigo.svg"
import { ReactComponent as Neo4j } from "../../../../static/img/conf/Sponsors/Neo4j.svg"
import { ReactComponent as WunderGraph } from "../../../../static/img/conf/Sponsors/WunderGraph.svg"
import { ReactComponent as Graphabase } from "../../../../static/img/conf/Sponsors/Graphabase.svg"
import { ReactComponent as GraphQLWeekly } from "../../../../static/img/conf/Partners/GraphQLWeekly.svg"
import { ReactComponent as GraphQLWTF } from "../../../../static/img/conf/Partners/GraphQLwtf.svg"
import { ReactComponent as EscapeTechnologies } from "../../../../static/img/conf/Partners/EscapeTechnologies.svg"
import { ReactComponent as AmsterdamGraphQL } from "../../../../static/img/conf/Partners/AmsterdamGraphQL.svg"
import { ReactComponent as BangkokGraphQL } from "../../../../static/img/conf/Partners/BangkokGraphQL.svg"
import { ReactComponent as TypeGraphQL } from "../../../../static/img/conf/Partners/TypeGraphQL.svg"
import { clsx } from "clsx"

interface Image {
  icon: string
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
  { icon: TheGuild, name: "The Guild", link: "https://the-guild.dev" },
  { icon: Postman, name: "Postman", link: "https://postman.com" },
  { icon: Hasura, name: "Hasura", link: "https://hasura.io" },
]

const sponsorPlatinum: Image[] = [
  { icon: Solo, name: "Solo.io", link: "https://solo.io" },
  { icon: Hygraph, name: "Hygraph", link: "https://hygraph.com" },
]

const sponsorGold: Image[] = [
  { icon: TheGraph, name: "The Graph", link: "https://thegraph.com" },
  { icon: StepZen, name: "StepZen", link: "https://stepzen.com" },
  { icon: Inigo, name: "Inigo", link: "https://inigo.io" },
]

const sponsorSilver: Image[] = [
  { icon: Neo4j, name: "Neo4j", link: "https://neo4j.com" },
  { icon: WunderGraph, name: "WunderGraph", link: "https://wundergraph.com" },
  { icon: Stellate, name: "Stellate", link: "https://stellate.co" },
  { icon: Graphabase, name: "Graphabase", link: "https://graphabase.com" },
]

const workshopDaySponsors: Image[] = [
  { icon: TheGuild, name: "The Guild", link: "https://the-guild.dev" },
]

const mediaPartners: Image[] = [
  {
    icon: GraphQLWeekly,
    name: "GraphQLWeekly",
    link: "https://graphqlweekly.com",
  },
  { icon: GraphQLWTF, name: "GraphQLWTF", link: "https://graphql.wtf" },
]

const communityPartners: Image[] = [
  {
    icon: EscapeTechnologies,
    name: "EscapeTechnologies",
    link: "https://escape.tech",
  },
  {
    icon: AmsterdamGraphQL,
    name: "Amsterdam GraphQL",
    link: "https://meetup.com/amsterdam-graphql-meetup",
  },
  {
    icon: BangkokGraphQL,
    name: "Bangkok GraphQL",
    link: "https://meetup.com/graphql-bangkok",
  },
  { icon: TypeGraphQL, name: "TypeGraphQL", link: "https://typegraphql.com" },
]

function List({
  items,
  className,
  linkClassName,
}: {
  className?: string
  items: Image[]
  linkClassName?: string
}) {
  return (
    <div className={clsx("grid gap-5 w-full", className)}>
      {items
        .sort((a, b) => alphabetSort(a, b))
        .map(({ link, icon: Icon }, i) => (
          <a
            key={i}
            className={clsx(
              "relative shrink-0 bg-[#251f30] rounded-md",
              "border border-solid border-transparent hover:border-[#e535ab]",
              "transition-colors",
              "hover:no-underline focus:no-underline",
              linkClassName
            )}
            href={link}
            target="_blank"
          >
            <Icon width="auto" height="auto" />
            <span className="font-sans absolute right-5 top-5 leading-none text-white text-2xl">
              ↗
            </span>
          </a>
        ))}
    </div>
  )
}

const classes = {
  heading: "text-[#ea75c3] text-3xl font-bold mb-6 text-center",
  title: "text-center text-4xl text-white font-bold my-8",
}

export default function SponsersConf() {
  return (
    <div id="sponsors" className="bg-[#0e031c] py-10">
      <div className="container">
        <h1 className={classes.title}>Sponsors</h1>
        <h3 className={classes.heading}>Diamond</h3>
        <List
          items={sponsorDiamond}
          className="grid-cols-1"
          linkClassName="p-14 h-[220px]"
        />
        <h3 className={classes.heading}>Platinum</h3>
        <List
          items={sponsorPlatinum}
          className="grid-cols-2"
          linkClassName="p-14 h-[210px]"
        />
        <h3 className={classes.heading}>Gold</h3>
        <List
          items={sponsorGold}
          className="grid-cols-3"
          linkClassName="p-14 h-[170px]"
        />
        <h3 className={classes.heading}>Silver</h3>
        <List
          items={sponsorSilver}
          className="grid-cols-4"
          linkClassName="p-12 h-[155px]"
        />
        <h3 className={classes.heading}>Workshop Day Sponsor</h3>
        <List
          items={workshopDaySponsors}
          className="justify-center"
          linkClassName="p-14 h-[155px]"
        />
        <h1 className={classes.title}>Partners</h1>
        <h3 className={classes.heading}>Media Partners</h3>
        <List
          items={mediaPartners}
          className="grid-flow-col justify-center"
          linkClassName="p-14 h-[155px]"
        />
        <h3 className={classes.heading}>Community Partners</h3>
        <List
          items={communityPartners}
          className="grid-cols-4"
          linkClassName="p-10 px-14 h-[155px]"
        />
      </div>
    </div>
  )
}
