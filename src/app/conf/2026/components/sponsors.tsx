import { clsx } from "clsx"
import { ChevronRight } from "../../_design-system/pixelarticons/chevron-right"
import TheGuild from "public/img/conf/Sponsors/TheGuild.svg?svgr"
import Apollo from "public/img/conf/Sponsors/Apollo.svg?svgr"
import Wundergraph from "public/img/conf/Sponsors/WunderGraph-graded.svg?svgr"
import Grafast from "public/img/conf/Sponsors/Grafast.svg?svgr"
import Chillicream from "public/img/conf/Sponsors/Chillicream.svg?svgr"
import Airbnb from "public/img/conf/Sponsors/airbnb.svg?svgr"

interface Sponsor {
  icon:
    | React.FC<React.SVGProps<SVGElement>>
    | React.FC<React.ImgHTMLAttributes<HTMLImageElement>>
    | React.FC<React.HTMLAttributes<HTMLDivElement>>
  name: string
  link: string
  // Per-logo size override appended after the tier classes; use sparingly to
  // even out logos with extreme aspect ratios within the same tier.
  sizeOverride?: string
}

const sponsorPlatinum: Sponsor[] = [
  {
    icon: ({ className }: React.HTMLAttributes<HTMLElement>) => (
      <>
        <img
          src={
            new URL("/public/img/conf/Sponsors/Meta.svg", import.meta.url).href
          }
          className={clsx(className, "dark:hidden")}
        />
        <img
          src={
            new URL("/public/img/conf/Sponsors/Meta-dark.svg", import.meta.url)
              .href
          }
          className={clsx(className, "hidden dark:block")}
        />
      </>
    ),
    name: "Meta",
    link: "https://about.facebook.com/meta/",
  },
]

const sponsorGold: Sponsor[] = [
  {
    icon: (props: React.SVGProps<SVGElement>) => (
      <Wundergraph
        {...props}
        className={clsx(
          props.className,
          "[&_path]:fill-[#15252D] dark:[&_path]:fill-white",
        )}
      />
    ),
    name: "Wundergraph",
    link: "https://wundergraph.com/",
  },
  {
    icon: (props: React.SVGProps<SVGElement>) => (
      <TheGuild
        {...props}
        className={clsx(
          props.className,
          "[&_path]:fill-[#15252D] dark:[&_path]:fill-white",
        )}
      />
    ),
    name: "The Guild",
    link: "https://the-guild.dev/graphql/hive",
  },
]

const sponsorSilver: Sponsor[] = [
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
  {
    icon: (props: React.SVGProps<SVGElement>) => (
      <Chillicream
        {...props}
        className={clsx(
          props.className,
          "[&_path]:fill-[#15252D] dark:[&_path]:fill-white",
        )}
      />
    ),
    name: "Chillicream",
    link: "https://chillicream.com/",
    // Square logo — needs more height to feel comparable to wide silver logos.
    sizeOverride: "md:max-h-36 md:max-w-[200px]",
  },
]

const sponsorBronze: Sponsor[] = [
  {
    icon: (props: React.SVGProps<SVGElement>) => (
      <Grafast
        {...props}
        viewBox="2.5 4 80 24"
        className={clsx(
          props.className,
          "[&_path]:fill-[#15252D] dark:[&_path]:fill-white",
        )}
      />
    ),
    name: "Grafast",
    link: "https://grafast.org/",
    sizeOverride: "md:max-h-[72px] md:max-w-[280px]",
  },
]

const sponsorCommunity: Sponsor[] = [
  {
    icon: (props: React.SVGProps<SVGElement>) => <Airbnb {...props} />,
    name: "Airbnb",
    link: "https://www.airbnb.com/",
    // Tall stacked logo — bump height to match silver visual weight.
    sizeOverride: "md:max-h-[76px] md:max-w-[230px]",
  },
]

export interface SponsorsProps {
  heading?: string
}

interface Tier {
  rank: number
  name: string
  items: Sponsor[]
  logoClass: string
}

// Tier envelopes: cap glyph height and width per breakpoint so visual hierarchy
// stays Platinum > Gold > Silver/Community > Bronze regardless of each logo's
// intrinsic aspect ratio.
const sponsorTiers: Tier[] = [
  {
    rank: 0,
    name: "Platinum",
    items: sponsorPlatinum,
    logoClass: "max-h-20 max-w-[320px] md:max-h-24 md:max-w-[420px]",
  },
  {
    rank: 1,
    name: "Gold",
    items: sponsorGold,
    logoClass: "max-h-16 max-w-[260px] md:max-h-24 md:max-w-[340px]",
  },
  {
    rank: 2,
    name: "Silver",
    items: sponsorSilver,
    logoClass: "max-h-14 max-w-[220px] md:max-h-[76px] md:max-w-[280px]",
  },
  {
    rank: 2,
    name: "Open Source Community Sponsor",
    items: sponsorCommunity,
    logoClass: "max-h-14 max-w-[220px] md:max-h-[76px] md:max-w-[280px]",
  },
  {
    rank: 3,
    name: "Bronze",
    items: sponsorBronze,
    logoClass: "max-h-12 max-w-[200px] md:max-h-16 md:max-w-[240px]",
  },
]

export function Sponsors({ heading }: SponsorsProps) {
  return (
    <section id="sponsors" className="gql-section mx-auto py-16">
      <h1 className="typography-h2">{heading}</h1>

      <div className="mt-10 md:mt-16">
        {sponsorTiers.map(
          tier => tier.items.length > 0 && <Tier key={tier.name} tier={tier} />,
        )}
      </div>
    </section>
  )
}

function Tier({ tier }: { tier: Tier }) {
  return (
    <div className="relative flex gap-y-4 border-t border-neu-200 py-4 pb-12 dark:border-neu-50 max-md:flex-col">
      <h3 className="flex shrink-0 items-center gap-1 self-start whitespace-nowrap font-mono text-sm/none font-normal uppercase text-pri-base md:absolute md:left-0 md:top-4">
        <ChevronRight className="shrink-0 translate-y-[-0.5px]" />
        {tier.name}
      </h3>
      <div className="flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-4 pt-6 lg:gap-x-20">
        {tier.items.map(({ link, icon: Icon, name, sizeOverride }, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noreferrer"
            title={name}
            className="group flex min-h-24 items-center justify-center px-6 hover:bg-neu-500/10 dark:opacity-90 dark:hover:opacity-100"
          >
            <Icon
              className={clsx(
                "h-auto w-auto shrink-0 object-contain",
                tier.logoClass,
                sizeOverride,
              )}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
