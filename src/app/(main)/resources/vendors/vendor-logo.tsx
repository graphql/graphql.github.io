import HasuraWordmark from "public/img/vendors/hasura.svg?svgr"
import HygraphWordmark from "public/img/vendors/hygraph.svg?svgr"
import TheGuildWordmark from "public/img/vendors/the-guild.svg?svgr"
import TykWordmark from "public/img/vendors/tyk.svg?svgr"
import WundergraphMark from "public/img/vendors/wundergraph.svg?svgr"

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
  wundergraph: WundergraphMark,
}

const wordmarkLogos: Record<string, LogoComponent> = {
  hasura: HasuraWordmark,
  "the-guild": TheGuildWordmark,
  hygraph: HygraphWordmark,
  tyk: TykWordmark,
}

const logoClassName = "shrink-0"

export function hasVendorLogo(slug: string) {
  return slug in iconLogos || slug in wordmarkLogos
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

  return null
}
