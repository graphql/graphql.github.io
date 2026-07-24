import { Anchor } from "@/app/conf/_design-system/anchor"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { DiscordIcon } from "@/icons"

export function CTACommunity() {
  return (
    <section className="gql-section max-sm:px-0 lg:pb-16 lg:max-xl:px-0 xl:pb-24">
      <div className="gql-container typography-body-lg flex bg-pri-dark text-white dark:bg-pri-darker max-lg:flex-col">
        <div className="border-pri-light p-6 max-lg:border-b lg:border-r lg:p-16">
          <h2 className="typography-h2 text-balance">
            Shape the future of
            <br />
            GraphQL & AI
          </h2>
          <p className="mt-8">
            The GraphQL AI Working Group is open to everyone. Help define how
            GraphQL powers the next generation of intelligent systems —
            contribute to specs, share use cases, and collaborate with the
            community.
          </p>
        </div>
        <div className="flex flex-col *:flex-1">
          <Anchor
            href="https://discord.graphql.org/"
            className="flex items-center justify-between gap-4 whitespace-pre border-b border-pri-light px-6 py-8 hover:bg-white/10 lg:h-1/2 lg:px-8 lg:pr-12 xl:gap-6"
          >
            Join the Discord
            <DiscordIcon className="size-8 fill-white" />
          </Anchor>
          <Anchor
            href="https://github.com/graphql/ai-wg"
            className="flex items-center justify-between gap-4 whitespace-pre px-6 py-8 hover:bg-white/10 lg:h-1/2 lg:px-8 lg:pr-12 xl:gap-6"
          >
            AI Working Group on GitHub
            <ArrowDownIcon className="size-10 -rotate-90 text-pri-light" />
          </Anchor>
        </div>
      </div>
    </section>
  )
}
