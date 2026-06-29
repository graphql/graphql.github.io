import GrafbaseWordmark from "public/img/vendors/grafbase.svg?svgr"
import HasuraWordmark from "public/img/vendors/hasura.svg?svgr"
import HygraphWordmark from "public/img/vendors/hygraph.svg?svgr"
import TheGuildWordmark from "public/img/vendors/the-guild.svg?svgr"
import TykWordmark from "public/img/vendors/tyk.svg?svgr"

import {
  ApolloIcon,
  ChillicreamIcon,
  GraphileIcon,
  StellateIcon,
} from "@/icons"

type LogoComponent = ({ className }: { className?: string }) => React.ReactNode

const iconLogos: Record<string, LogoComponent> = {
  apollo: ApolloIcon,
  chillicream: ChillicreamIcon,
  graphile: GraphileIcon,
  stellate: StellateIcon,
}

const wordmarkLogos: Record<string, LogoComponent> = {
  hasura: HasuraWordmark,
  "the-guild": TheGuildWordmark,
  hygraph: HygraphWordmark,
  grafbase: GrafbaseWordmark,
  tyk: TykWordmark,
}

/** Brand marks with native color — no filter. */
const coloredWordmarkSlugs: Record<string, string> = {
  wundergraph: "/img/vendors/wundergraph-graded.svg",
}

const logoClassName = "shrink-0"

export function hasVendorLogo(slug: string) {
  return (
    slug in iconLogos ||
    slug in wordmarkLogos ||
    slug in coloredWordmarkSlugs
  )
}

export function VendorLogo({ slug }: { slug: string }) {
  const Icon = iconLogos[slug]

  if (Icon) {
    return <Icon className={`size-8 ${logoClassName}`} aria-hidden />
  }

  const Wordmark = wordmarkLogos[slug]
  if (Wordmark) {
    return (
      <Wordmark
        className={`h-6 w-auto max-w-[80px] text-neu-900 ${logoClassName}`}
        aria-hidden
      />
    )
  }

  const coloredSrc = coloredWordmarkSlugs[slug]
  if (coloredSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={coloredSrc}
        alt=""
        className="h-7 w-auto max-w-[80px] shrink-0 object-contain object-left"
      />
    )
  }

  return null
}
