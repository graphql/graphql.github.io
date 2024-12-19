import Stellate from "public/img/conf/Sponsors/Stellate.svg"
import Postman from "public/img/conf/Sponsors/Postman.svg"
import Solo from "public/img/conf/Sponsors/Solo.svg"
import Hasura from "public/img/conf/Sponsors/Hasura.svg"
import TheGraph from "public/img/conf/Sponsors/TheGraph.svg"
import TheGuild from "public/img/conf/Sponsors/TheGuild.svg"
import Hygraph from "public/img/conf/Sponsors/Hygraph.svg"
import StepZen from "public/img/conf/Sponsors/StepZen.svg"
import Inigo from "public/img/conf/Sponsors/Inigo.svg"
import Neo4j from "public/img/conf/Sponsors/Neo4j.svg"
import WunderGraph from "public/img/conf/Sponsors/WunderGraph.svg"
import Graphabase from "public/img/conf/Sponsors/Graphabase.svg"
import GraphQLWeekly from "public/img/conf/Partners/GraphQLWeekly.svg"
import GraphQLWTF from "public/img/conf/Partners/GraphQLwtf.svg"
import EscapeTechnologies from "public/img/conf/Partners/EscapeTechnologies.svg"
import AmsterdamGraphQL from "public/img/conf/Partners/AmsterdamGraphQL.svg"
import BangkokGraphQL from "public/img/conf/Partners/BangkokGraphQL.svg"
import TypeGraphQL from "public/img/conf/Partners/TypeGraphQL.svg"
import { clsx } from "clsx"
import NextImage from "next-image-export-optimizer"

interface Image {
  icon: string
  name: string
  link: string
}

const sponsorDiamond: Image[] = [
  { icon: Hasura, name: "Hasura", link: "https://hasura.io" },
  { icon: Postman, name: "Postman", link: "https://postman.com" },
  { icon: TheGuild, name: "The Guild", link: "https://the-guild.dev" },
]

const sponsorPlatinum: Image[] = [
  { icon: Hygraph, name: "Hygraph", link: "https://hygraph.com" },
  { icon: Solo, name: "Solo.io", link: "https://solo.io" },
]

const sponsorGold: Image[] = [
  { icon: StepZen, name: "StepZen", link: "https://stepzen.com" },
  { icon: Inigo, name: "Inigo", link: "https://inigo.io" },
  { icon: TheGraph, name: "The Graph", link: "https://thegraph.com" },
]

const sponsorSilver: Image[] = [
  { icon: Graphabase, name: "Graphabase", link: "https://graphabase.com" },
  { icon: Neo4j, name: "Neo4j", link: "https://neo4j.com" },
  { icon: Stellate, name: "Stellate", link: "https://stellate.co" },
  { icon: WunderGraph, name: "WunderGraph", link: "https://wundergraph.com" },
]

const workshopDaySponsors: Image[] = [
  { icon: TheGuild, name: "The Guild", link: "https://the-guild.dev" },
]

const mediaPartners: Image[] = [
  { icon: GraphQLWTF, name: "GraphQLWTF", link: "https://graphql.wtf" },
  {
    icon: GraphQLWeekly,
    name: "GraphQLWeekly",
    link: "https://graphqlweekly.com",
  },
]

const communityPartners: Image[] = [
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
  {
    icon: EscapeTechnologies,
    name: "EscapeTechnologies",
    link: "https://escape.tech",
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
    <div className={clsx("grid w-full gap-7", className)}>
      {items.map(({ link, icon, name }, i) => (
        <a
          key={i}
          className={clsx(
            "relative shrink-0 rounded-md bg-[#251f30]",
            "flex justify-center",
            "border border-solid border-transparent hover:border-primary focus:border-primary",
            "transition-colors",
            "shadow-md outline-none hover:shadow-primary/20 focus:shadow-primary/20",
            linkClassName,
          )}
          href={link}
          target="_blank"
          rel="noreferrer"
          title={name}
        >
          <NextImage
            alt={`${name} logo`}
            src={icon}
            className="h-auto shrink lg:max-w-60"
          />
          <span className="absolute right-5 top-5 font-sans leading-none text-white lg:text-2xl">
            ↗
          </span>
        </a>
      ))}
    </div>
  )
}

const classes = {
  heading:
    "text-center text-primary text-2xl lg:text-3xl font-bold mb-10 mt-20",
  title: "md:text-center text-white conf-heading",
}

export function Sponsors() {
  return (
    <div id="sponsors" className="bg-conf-black">
      <div className="conf-block container">
        <h1 className={classes.title}>Sponsors</h1>
        <h3 className={classes.heading}>Diamond</h3>
        <List
          items={sponsorDiamond}
          className="grid-cols-1"
          linkClassName="p-8 lg:p-16 h-28 lg:h-[220px]"
        />
        <h3 className={classes.heading}>Platinum</h3>
        <List
          items={sponsorPlatinum}
          className="grid-cols-2"
          linkClassName="p-8 lg:py-14 h-28 lg:h-[210px]"
        />
        <h3 className={classes.heading}>Gold</h3>
        <List
          items={sponsorGold}
          className="grid-cols-2 xl:grid-cols-3"
          linkClassName="p-8 lg:py-14 h-28 lg:h-[170px]"
        />
        <h3 className={classes.heading}>Silver</h3>
        <List
          items={sponsorSilver}
          className="grid-cols-2 xl:grid-cols-4"
          linkClassName="p-6 lg:p-10 h-28 lg:h-[155px]"
        />
        <h3 className={classes.heading}>Workshop Day Sponsor</h3>
        <List
          items={workshopDaySponsors}
          className="mx-auto grid-cols-2 lg:w-1/2 lg:grid-cols-1"
          linkClassName="p-8 lg:p-10 h-28 lg:h-[155px]"
        />
      </div>
      <div className="container py-24">
        <h1 className={classes.title}>Partners</h1>
        <h3 className={classes.heading}>Media Partners</h3>
        <List
          items={mediaPartners}
          className="mx-auto grid-cols-2 xl:w-1/2"
          linkClassName="p-9 lg:p-12 h-28 lg:h-[155px]"
        />
        <h3 className={classes.heading}>Community Partners</h3>
        <List
          items={communityPartners}
          className="grid-cols-2 xl:grid-cols-4"
          linkClassName="p-6 lg:p-10 h-28 lg:h-[155px]"
        />
      </div>
    </div>
  )
}
