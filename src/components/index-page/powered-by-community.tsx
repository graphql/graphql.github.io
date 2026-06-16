import { Anchor } from "@/app/conf/_design-system/anchor"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

export function PoweredByCommunity() {
  return (
    <section className="gql-section max-sm:px-0 lg:pb-16 lg:max-xl:px-0 xl:pb-24">
      <div className="gql-container dark typography-body-lg flex bg-pri-darker text-neu-900 max-lg:flex-col">
        <div className="border-pri-light p-6 max-lg:border-b lg:border-r lg:p-16">
          <h2 className="typography-h2 text-balance">
            Powered by the community
          </h2>
          <p className="mt-8">
            GraphQL is an ecosystem shaped by thousands of collaborating
            developers and companies around the world. From solo contributors to
            full-time maintainers, the GraphQL community builds libraries, runs
            meetups, funds innovation and helps move the technology forward.
          </p>
        </div>
        <div>
          <Anchor
            href="/community/tools-and-libraries"
            className="flex items-center justify-between gap-4 whitespace-pre border-b border-pri-light px-6 py-8 hover:bg-white/10 focus-visible:!-outline-offset-8 lg:h-1/3 lg:px-8 lg:pr-12 xl:gap-6"
          >
            Browse libraries
            <ArrowDownIcon className="size-10 -rotate-90 text-pri-light" />
          </Anchor>
          <Anchor
            href="/community/events"
            className="flex items-center justify-between gap-4 whitespace-pre border-b border-pri-light px-6 py-8 hover:bg-white/10 focus-visible:!-outline-offset-8 lg:h-1/3 lg:px-8 lg:pr-12 xl:gap-6"
          >
            Explore events & meetups
            <ArrowDownIcon className="size-10 -rotate-90 text-pri-light" />
          </Anchor>
          <Anchor
            href="/community/foundation"
            className="flex items-center justify-between gap-4 whitespace-pre px-6 py-8 hover:bg-white/10 focus-visible:!-outline-offset-8 lg:h-1/3 lg:px-8 lg:pr-12 xl:gap-6"
          >
            Learn about the GraphQL Foundation
            <ArrowDownIcon className="size-10 -rotate-90 text-pri-light" />
          </Anchor>
        </div>
      </div>
    </section>
  )
}
