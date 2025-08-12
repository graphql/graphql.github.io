import Grafbase from "public/img/conf/Sponsors/Grafbase.svg?svgr"
import Apollo from "public/img/conf/Sponsors/Apollo.svg?svgr"
import Netflix from "public/img/conf/Sponsors/Netflix.svg?svgr"

import { clsx } from "clsx"
import { ChevronRight } from "../../_design-system/pixelarticons/chevron-right"
import { ComponentPropsWithoutRef } from "react"

interface Sponsor {
  icon:
    | React.FC<React.SVGProps<SVGElement>>
    | React.FC<React.ImgHTMLAttributes<HTMLImageElement>>
    | React.FC<React.HTMLAttributes<HTMLDivElement>>
  name: string
  link: string
}

const sponsorDiamond: Sponsor[] = []

const sponsorPlatinum: Sponsor[] = []

const sponsorGold: Sponsor[] = [
  {
    icon: (props: React.SVGProps<SVGElement>) => (
      <Apollo
        {...props}
        className={clsx(
          props.className,
          "[&_path]:fill-[#15252D] dark:[&_path]:fill-white",
        )}
      />
    ),
    name: "Apollo",
    link: "https://www.apollographql.com",
  },
]

const sponsorSilver: Sponsor[] = [
  {
    icon: (props: React.SVGProps<SVGElement>) => (
      <Grafbase
        {...props}
        className={clsx(
          props.className,
          "[&_path]:fill-blk dark:[&_path]:fill-white",
        )}
      />
    ),
    name: "Grafbase",
    link: "https://grafbase.com/",
  },
  {
    icon: (props: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props} className={clsx(props.className, "relative")}>
        <img
          src={
            new URL("/public/img/conf/Sponsors/Meta.svg", import.meta.url).href
          }
          className="absolute inset-0 dark:hidden"
        />
        <img
          src={
            new URL("/public/img/conf/Sponsors/Meta-dark.svg", import.meta.url)
              .href
          }
          className="absolute inset-0 hidden dark:block"
        />
      </div>
    ),
    name: "Meta",
    link: "https://about.facebook.com/meta/",
  },
  {
    icon: (props: React.SVGProps<SVGElement>) => (
      <Netflix {...props} className={clsx(props.className)} />
    ),
    name: "Netflix",
    link: "https://netflix.com",
  },
]

export interface SponsorsProps {
  heading?: string
}

interface Tier {
  name: string
  items: Sponsor[]
}

const sponsorTiers: Tier[] = [
  {
    name: "Diamond",
    items: sponsorDiamond,
  },
  {
    name: "Platinum",
    items: sponsorPlatinum,
  },
  {
    name: "Gold",
    items: sponsorGold,
  },
  {
    name: "Silver",
    items: sponsorSilver,
  },
]

export function Sponsors({ heading }: SponsorsProps) {
  return (
    <section className="gql-conf-section mx-auto py-16">
      <h1 className="typography-h2">{heading}</h1>

      <div className="mt-10 md:mt-16">
        {sponsorTiers.map(
          tier =>
            tier.items.length > 0 && (
              <Tier
                key={tier.name}
                tier={tier}
                logoHeight={220 - sponsorTiers.indexOf(tier) * 24}
              />
            ),
        )}
      </div>
    </section>
  )
}

function Tier({ tier, logoHeight }: { tier: Tier; logoHeight: number }) {
  return (
    <div className="flex gap-x-12 gap-y-4 border-t border-neu-200 py-4 dark:border-neu-50 max-md:flex-col">
      <h3 className="flex w-[80px] shrink-0 items-center gap-1 self-start whitespace-nowrap font-mono text-sm/none font-normal uppercase text-pri-base">
        <ChevronRight className="shrink-0 translate-y-[-0.5px]" />
        {tier.name}
      </h3>
      <div className="flex flex-wrap justify-center gap-y-4">
        {tier.items.map(({ link, icon: Icon, name }, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noreferrer"
            title={name}
            className="group flex min-h-24 items-center justify-center hover:bg-neu-500/10 dark:opacity-90 dark:hover:opacity-100"
          >
            <Icon
              className="aspect-[3] w-auto max-w-[80%] shrink-0"
              style={{
                height: logoHeight,
              }}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
