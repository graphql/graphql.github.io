import Stellate from "public/img/conf/Sponsors/Stellate.svg"
import Hasura from "public/img/conf/Sponsors/Hasura.svg"
import TheGuild from "public/img/conf/Sponsors/TheGuild.svg"
import Apollo from "public/img/conf/Sponsors/Apollo.svg"
import Tyk from "public/img/conf/Sponsors/Tyk.svg"
import IBM from "public/img/conf/Sponsors/IBM.svg"
import Graphweaver from "public/img/conf/Sponsors/Graphweaver.svg"

import { clsx } from "clsx"
import NextImage from "next-image-export-optimizer"
import { Rubik } from "next/font/google"
import { InfoGrid } from "../_components/info-grid"

const rubik = Rubik({
  weight: ["700", "600", "500", "400", "300"],
  subsets: ["latin"],
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
    <div className={clsx("flex gap-6 flex-col md:flex-row", className)}>
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
          <span className="group-hover:block hidden font-sans absolute right-5 top-5 leading-none text-white lg:text-2xl">
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
    <div
      className="bg-conf-black"
      style={{
        fontFamily: rubik.style.fontFamily,
      }}
    >
      <div className="container conf-block">
        <h1 className={classes.title}>Thanks to our 2024 sponsors!</h1>
        {sponsorDiamond.length && (
          <>
            <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-white/40">
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
            <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-white/40">
              <div className="size-2.5 bg-[#E10098]"></div>
              <h3 className="text-white font-medium">PLATINUM</h3>
            </div>
            <List
              items={sponsorPlatinum}
              className="flex"
              linkClassName="p-8 lg:py-14 h-28 lg:h-[210px]"
            />
          </>
        )}
        {sponsorGold.length && (
          <>
            <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-white/40">
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
            <div className="flex items-center gap-2 mb-2 border-b-2 border-dotted pb-1.5 border-white/40">
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

      <div className="container py-24" id="sponsors">
        <InfoGrid
          title="Why Sponsor?"
          subtitle="Connect with the global GraphQL community and showcase your brand to industry leaders and decision-makers."
          listItems={[
            {
              title: "Brand Visibility",
              description:
                "Showcase your brand to thousands of GraphQL enthusiasts and decision-makers.",
            },

            {
              title: "Lead Generation",
              description:
                "Connect with potential customers and partners in the GraphQL ecosystem.",
            },
            {
              title: "Thought Leadership",
              description:
                "Position your company as a leader in the GraphQL space.",
            },
            {
              title: "Talent Acquisition",
              description:
                "Meet and recruit top GraphQL developers and engineers.",
            },
            {
              title: "Product Feedback",
              description:
                "Gather valuable feedback from the GraphQL community.",
            },
            {
              title: "Community Impact",
              description:
                "Support and shape the future of GraphQL technology.",
            },
          ]}
        />

        <div className="flex justify-center my-14">
          <a
            href="https://events.linuxfoundation.org/wp-content/uploads/2024/12/sponsor_GraphQLConf_2025.pdf?utm_source=graphql_conf_2025&utm_medium=website&utm_campaign=sponsor_section"
            target="_blank"
            rel="noreferrer"
            className="relative z-0 px-28 py-4 text-white text-3xl font-semibold bg-[#E10098] hover:bg-[#ef00a3] flex items-center justify-center gap-2"
          >
            Download Prospectus
          </a>
        </div>
      </div>
    </div>
  )
}
