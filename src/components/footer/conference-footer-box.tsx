import { clsx } from "clsx"

import { Anchor } from "@/app/conf/_design-system/anchor"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

interface ConferenceFooterBoxProps {
  href: string
  className?: string
}

export function ConferenceFooterBox({
  href,
  className,
}: ConferenceFooterBoxProps) {
  return (
    <Anchor
      href={href}
      className={clsx(
        "dark gql-focus-visible group relative inline-flex flex-col bg-pri-base text-neu-900 after:absolute after:inset-0 hover:after:bg-white/[.025] dark:bg-pri-dark",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-4 border-b border-pri-lighter p-4 dark:border-pri-light/50">
        <h2 className="font-mono text-2xl uppercase leading-none md:text-3xl">
          <span className="max-xs:hidden">Join</span> GraphQLConf 2026
        </h2>
      </div>

      <div className="typography-body-sm flex font-sans">
        <div className="flex-1 justify-center border-r border-pri-lighter p-4 dark:border-pri-light/50">
          May <span className="whitespace-nowrap">19–20</span>
          <br />
          Fremont, California
        </div>

        <div className="flex w-[min(calc(25%-.5px),73.5px)] items-center justify-center">
          <ArrowDownIcon className="size-10 -rotate-90 text-pri-lighter transition group-hover:translate-x-0.5 group-hover:text-neu-900" />
        </div>
      </div>
    </Anchor>
  )
}
