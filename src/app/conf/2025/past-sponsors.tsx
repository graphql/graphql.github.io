import Stellate from "public/img/conf/Sponsors/Stellate.svg"
import Hasura from "public/img/conf/Sponsors/Hasura.svg"
import TheGuild from "public/img/conf/Sponsors/TheGuild.svg"
import Apollo from "public/img/conf/Sponsors/Apollo.svg"
import Tyk from "public/img/conf/Sponsors/Tyk.svg"
import IBM from "public/img/conf/Sponsors/IBM.svg"
import Graphweaver from "public/img/conf/Sponsors/Graphweaver.svg"

import { clsx } from "clsx"
import NextImage from "next-image-export-optimizer"

interface Image {
  icon: string
  name: string
  link: string
}

const sponsorDiamond: Image[] = [
  { icon: TheGuild, name: "The Guild", link: "https://the-guild.dev" },
  { icon: IBM, name: "IBM", link: "https://www.ibm.com/products/api-connect" },
]

const sponsorPlatinum: Image[] = []

const sponsorGold: Image[] = [
  { icon: Apollo, name: "Apollo", link: "https://www.apollographql.com/" },
  { icon: Graphweaver, name: "Graphweaver", link: "https://graphweaver.com" },
  { icon: Hasura, name: "Hasura", link: "https://hasura.io" },
]

const sponsorSilver: Image[] = [
  { icon: Stellate, name: "Stellate", link: "https://stellate.co" },
  { icon: Tyk, name: "Tyk", link: "https://tyk.io/" },
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
    <div className={clsx("flex gap-6 max-lg:flex-col", className)}>
      {items.map(({ link, icon, name }, i) => (
        <a
          key={i}
          className={clsx(
            "relative shrink-0",
            "flex justify-center",
            "items-center", // fix vertical align in Safari/iOS
            "border border-solid border-transparent hover:border-primary focus:border-primary",
            "transition-colors",
            "group",
            "group-hover:shadow-primary/20 focus:shadow-primary/20 shadow-md outline-none",
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
            className="lg:w-auto lg:max-w-60 max-h-full"
          />
          <span className="group-hover:block hidden font-sans absolute right-5 top-5 leading-none  lg:text-2xl">
            ↗
          </span>
        </a>
      ))}
    </div>
  )
}

export function PastSponsors() {
  return (
    <section>
      <h1 className="conf-heading mb-12">Thanks to our 2024 sponsors!</h1>
      {sponsorDiamond.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-white/40">
            <div className="size-2.5 bg-[#E10098]"></div>
            <h3 className=" font-medium">DIAMOND</h3>
          </div>
          <List
            items={sponsorDiamond}
            className="flex"
            linkClassName="p-8 lg:p-16 h-28 lg:h-[220px]"
          />
        </>
      )}
      {sponsorPlatinum.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-white/40">
            <div className="size-2.5 bg-[#E10098]"></div>
            <h3 className=" font-medium">PLATINUM</h3>
          </div>
          <List
            items={sponsorPlatinum}
            className="flex"
            linkClassName="p-8 lg:py-14 h-28 lg:h-[210px]"
          />
        </>
      )}
      {sponsorGold.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-white/40">
            <div className="size-2.5 bg-[#E10098]"></div>
            <h3 className=" font-medium">GOLD</h3>
          </div>
          <List
            items={sponsorGold}
            className="flex"
            linkClassName="p-8 lg:py-14 h-28 lg:h-[170px]"
          />
        </>
      )}
      {sponsorSilver.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-white/40">
            <div className="size-2.5 bg-[#E10098]"></div>
            <h3 className="font-medium">SILVER</h3>
          </div>
          <List
            items={sponsorSilver}
            className="flex"
            linkClassName="p-6 lg:p-10 h-28 lg:h-[155px]"
          />
        </>
      )}
    </section>
  )
}
