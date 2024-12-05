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
import { Rubik } from 'next/font/google'

const rubik = Rubik({
  weight: ['700','600','500','400' ,'300'],
  subsets: ["latin"]
})

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
    <div className={clsx("flex gap-6", className)}>
      {items.map(({ link, icon, name }, i) => (
        <a
          key={i}
          className={clsx(
            "relative shrink-0 rounded-md",
            "flex justify-center",
            "items-center", // fix vertical align in Safari/iOS
            "border border-solid border-transparent hover:border-primary focus:border-primary",
            "transition-colors",
            "hover:shadow-primary/20 focus:shadow-primary/20 shadow-md outline-none",
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
          <span className="font-sans absolute right-5 top-5 leading-none text-white lg:text-2xl">
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
  title: "text-white conf-heading mb-12",
}

export function Sponsors() {
  return (
    <div id="sponsors" className="bg-conf-black" style={{
       fontFamily: rubik.style.fontFamily,
    }}>
      <div className="container conf-block">
        <h1 className={classes.title}>Thanks to our 2024 sponsors!</h1>
        {sponsorDiamond.length && (
          <>
            <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-[rgba(255,255,255,0.4)]">
  <div className="size-2.5 bg-[#E10098]"></div>
  <h3 className="text-white font-medium">DIAMOND</h3>
</div>
            <List
              items={sponsorDiamond}
              className="flex"
              linkClassName="p-8 lg:p-16 h-28 lg:h-[220px]"
            />
          </>
        )}
        {sponsorPlatinum.length && (
          <>
            <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-[rgba(255,255,255,0.4)]">
  <div className="size-2.5 bg-[#E10098]"></div>
  <h3 className="text-white font-medium">PLATINUM</h3>
</div>
            <List
              items={sponsorPlatinum}
              className="flex"
              linkClassName="p-8 lg:py-14 h-28 lg:h-[210px]"
            />{" "}
          </>
        )}
        {sponsorGold.length && (
          <>
             <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-[rgba(255,255,255,0.4)]">
  <div className="size-2.5 bg-[#E10098]"></div>
  <h3 className="text-white font-medium">GOLD</h3>
</div>
            <List
              items={sponsorGold}
              className="flex"
              linkClassName="p-8 lg:py-14 h-28 lg:h-[170px]"
            />
          </>
        )}
        {sponsorSilver.length && (
          <>
             <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-[rgba(255,255,255,0.4)]">
  <div className="size-2.5 bg-[#E10098]"></div>
  <h3 className="text-white font-medium">SILVER</h3>
</div>
            <List
              items={sponsorSilver}
              className="flex"
              linkClassName="p-6 lg:p-10 h-28 lg:h-[155px]"
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
