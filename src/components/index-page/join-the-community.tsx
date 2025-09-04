import { Anchor } from "@/app/conf/_design-system/anchor"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { DiscordIcon } from "@/icons"

export function JoinTheCommunity() {
  return (
    <section className="gql-section max-sm:px-0 lg:pb-16 lg:max-xl:px-0 xl:pb-24">
      <div className="gql-container typography-body-lg flex bg-pri-dark text-white dark:bg-pri-darker max-lg:flex-col">
        <div className="border-pri-light p-6 max-lg:border-b lg:border-r lg:p-16">
          <h2 className="typography-h2 text-balance">Join the community</h2>
          <p className="mt-8">
            GraphQL is community-driven, backed by thousands of developers and
            companies worldwide. Become part of a network shaping the future of
            API development.
          </p>
        </div>
        <div className="flex flex-col *:flex-1">
          <Anchor
            href="/community/tools-and-libraries"
            className="flex items-center justify-between gap-4 whitespace-pre border-b border-pri-light px-6 py-8 hover:bg-white/10 lg:h-1/3 lg:px-8 lg:pr-12 xl:gap-6"
          >
            Discord
            <DiscordIcon className="size-8 fill-white" />
          </Anchor>
          <Anchor
            href="/community/events"
            className="flex items-center justify-between gap-4 whitespace-pre border-pri-light px-6 py-8 hover:bg-white/10 lg:h-1/3 lg:px-8 lg:pr-12 xl:gap-6"
          >
            Explore community resources
            <ArrowDownIcon className="size-10 -rotate-90 text-pri-light" />
          </Anchor>
        </div>
      </div>
    </section>
  )
}
