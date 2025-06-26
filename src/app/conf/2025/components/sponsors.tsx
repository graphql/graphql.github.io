import Grafbase from "public/img/conf/Sponsors/Grafbase.svg?svgr"
import Apollo from "public/img/conf/Sponsors/Apollo.svg?svgr"

import { clsx } from "clsx"
import { ChevronRight } from "../../_design-system/pixelarticons/chevron-right"

interface Sponsor {
  icon: React.FC<React.SVGProps<SVGElement>>
  name: string
  link: string
}

const sponsorDiamond: Sponsor[] = []

const sponsorPlatinum: Sponsor[] = []

const sponsorGold: Sponsor[] = [
  { icon: Apollo, name: "Apollo", link: "https://www.apollographql.com" },
]

const sponsorSilver: Sponsor[] = [
  { icon: Grafbase, name: "Grafbase", link: "https://grafbase.com/" },
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
      <h3 className="flex w-[80px] shrink-0 items-center gap-1 self-start whitespace-nowrap font-mono text-sm/none font-normal uppercase text-primary">
        <ChevronRight className="shrink-0 translate-y-[-0.5px]" />
        {tier.name}
      </h3>
      <div
        className={clsx(
          "grid justify-center gap-x-8 gap-y-4",
          tier.items.length > 2 && "sm:grid-cols-2 xl:grid-cols-3",
        )}
      >
        {tier.items.map(({ link, icon: Icon, name }, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noreferrer"
            title={name}
            className="group flex min-h-24 items-center justify-center opacity-75 [--fill:hsl(var(--color-neu-700))] hover:bg-neu-500/10 hover:[--fill:hsl(var(--color-neu-800))] dark:opacity-90"
          >
            <Icon
              className="aspect-[3] w-auto max-w-[80%] shrink-0 fill-[--fill] [&_path]:fill-[--fill]"
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
