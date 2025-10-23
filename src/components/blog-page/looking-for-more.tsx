import { Anchor } from "@/app/conf/_design-system/anchor"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

export function LookingForMore() {
  return (
    <section className="gql-section max-sm:px-0 lg:pb-16 lg:max-xl:px-0 xl:pb-24">
      <div className="gql-container typography-body-lg flex bg-pri-dark text-white dark:bg-pri-darker max-lg:flex-col">
        <div className="border-pri-light p-6 max-lg:border-b lg:border-r lg:p-16">
          <h2 className="typography-h2 text-balance">Looking for more?</h2>
          <p className="mt-8">
            Explore learning guides and best practices — or browse for tools,
            libraries and other resources.
          </p>
        </div>
        <div className="flex flex-col *:flex-1">
          <Anchor
            href="/learn"
            className="flex items-center justify-between gap-4 whitespace-pre border-b border-pri-light px-6 py-8 hover:bg-white/10 lg:h-1/3 lg:px-8 lg:pr-12 xl:gap-6"
          >
            Learn
            <ArrowDownIcon className="size-10 -rotate-90 text-pri-light" />
          </Anchor>
          <Anchor
            // TODO: Change to /resources when the Resources landing is implemented
            href="/community/resources/official-channels"
            className="flex items-center justify-between gap-4 whitespace-pre border-pri-light px-6 py-8 hover:bg-white/10 lg:h-1/3 lg:px-8 lg:pr-12 xl:gap-6"
          >
            Resources
            <ArrowDownIcon className="size-10 -rotate-90 text-pri-light" />
          </Anchor>
        </div>
      </div>
    </section>
  )
}
