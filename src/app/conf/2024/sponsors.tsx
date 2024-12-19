import Stellate from "public/img/conf/Sponsors/Stellate.svg"
import Hasura from "public/img/conf/Sponsors/Hasura.svg"
import TheGuild from "public/img/conf/Sponsors/TheGuild.svg"
import Apollo from "public/img/conf/Sponsors/Apollo.svg"
import Tyk from "public/img/conf/Sponsors/Tyk.svg"
import IBM from "public/img/conf/Sponsors/IBM.svg"
import Graphweaver from "public/img/conf/Sponsors/Graphweaver.svg"
import Intuit from "public/img/conf/Sponsors/Intuit.svg"

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

const workshopDaySponsors: Image[] = []

const mediaPartners: Image[] = [
  {
    icon: Intuit,
    name: "Intuit",
    link: "https://opensource.intuit.com/intuit-open-source/open-source",
  },
]

const communityPartners: Image[] = []

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
    <div className={clsx("grid w-full flex-1 gap-7", className)}>
      {items.map(({ link, icon, name }, i) => (
        <a
          key={i}
          className={clsx(
            "relative shrink-0 rounded-md bg-[#251f30]",
            "flex justify-center",
            "items-center", // fix vertical align in Safari/iOS
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
            className="max-h-full lg:w-auto lg:max-w-60"
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
        <h1 className={classes.title}>Thanks to our 2024 sponsors!</h1>
        {sponsorDiamond.length && (
          <>
            <h3 className={classes.heading}>Diamond</h3>
            <List
              items={sponsorDiamond}
              className="flex"
              linkClassName="p-8 lg:p-16 h-28 lg:h-[220px]"
            />
          </>
        )}
        {sponsorPlatinum.length && (
          <>
            <h3 className={classes.heading}>Platinum</h3>
            <List
              items={sponsorPlatinum}
              className="flex"
              linkClassName="p-8 lg:py-14 h-28 lg:h-[210px]"
            />{" "}
          </>
        )}
        {sponsorGold.length && (
          <>
            <h3 className={classes.heading}>Gold</h3>
            <List
              items={sponsorGold}
              className="flex"
              linkClassName="p-8 lg:py-14 h-28 lg:h-[170px]"
            />
          </>
        )}
        {sponsorSilver.length && (
          <>
            <h3 className={classes.heading}>Silver</h3>
            <List
              items={sponsorSilver}
              className="flex"
              linkClassName="p-6 lg:p-10 h-28 lg:h-[155px]"
            />
          </>
        )}
        {workshopDaySponsors.length && (
          <>
            <h3 className={classes.heading}>Workshop Day Sponsor</h3>
            <List
              items={workshopDaySponsors}
              className="flex"
              linkClassName="p-8 lg:p-10 h-28 lg:h-[155px]"
            />
          </>
        )}
      </div>
      {/* <div className="container py-24">
        <h1 className={classes.title}>Partners</h1>
        <h3 className={classes.heading}>Media Partners</h3>
        <List
          items={mediaPartners}
          className="grid-cols-2 xl:w-1/2 mx-auto"
          linkClassName="p-9 lg:p-12 h-28 lg:h-[155px]"
        />
        <h3 className={classes.heading}>Community Partners</h3>
        <List
          items={communityPartners}
          className="grid-cols-2 xl:grid-cols-4"
          linkClassName="p-6 lg:p-10 h-28 lg:h-[155px]"
        />
      </div> */}
    </div>
  )
}
