import Stellate from "public/img/conf/Sponsors/Stellate.svg"
import Hasura from "public/img/conf/Sponsors/Hasura.svg"
import TheGuild from "public/img/conf/Sponsors/TheGuild.svg"
import Apollo from "public/img/conf/Sponsors/Apollo.svg"
import Tyk from "public/img/conf/Sponsors/Tyk.svg"
import IBM from "public/img/conf/Sponsors/IBM.svg"
import Graphweaver from "public/img/conf/Sponsors/Graphweaver.svg"

import { clsx } from "clsx"
import NextImage from "next-image-export-optimizer"

type LogosType = {
  icon: string
  name: string
  link: string
}

const SPONSORS: Array<{
  title: string
  logos: Array<LogosType>
}> = [
  {
    title: "Diamond",
    logos: [
      { icon: TheGuild, name: "The Guild", link: "https://the-guild.dev" },
      {
        icon: IBM,
        name: "IBM",
        link: "https://www.ibm.com/products/api-connect",
      },
    ],
  },
  {
    title: "Gold",
    logos: [
      { icon: Apollo, name: "Apollo", link: "https://www.apollographql.com/" },
      {
        icon: Graphweaver,
        name: "Graphweaver",
        link: "https://graphweaver.com",
      },
      { icon: Hasura, name: "Hasura", link: "https://hasura.io" },
    ],
  },
  {
    title: "Silver",
    logos: [
      { icon: Stellate, name: "Stellate", link: "https://stellate.co" },
      { icon: Tyk, name: "Tyk", link: "https://tyk.io/" },
    ],
  },
]

function List({
  items,
  className,
  linkClassName,
}: {
  className?: string
  items: Array<LogosType>
  linkClassName?: string
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
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
            "shadow-md outline-none focus:shadow-primary/20 group-hover:shadow-primary/20",
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
          <span className="absolute right-5 top-5 hidden font-sans leading-none group-hover:block lg:text-2xl">
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
      {SPONSORS.map(({ title, logos }, i) => (
        <>
          <div className="mb-2 flex items-center gap-2 border-b-2 border-dotted border-white/40 pb-1.5">
            {/* Square box */}
            <div className="size-2.5 bg-primary" />
            <h3 className="font-medium uppercase">{title}</h3>
          </div>
          <List
            items={logos}
            className="flex"
            linkClassName="p-8 lg:p-16 h-28 lg:h-[220px]"
          />
        </>
      ))}
    </section>
  )
}
