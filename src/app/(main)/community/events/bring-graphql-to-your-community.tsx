import { Button } from "../../../conf/_design-system/button"
import { StripesDecoration } from "../../../conf/_design-system/stripes-decoration"

export function BringGraphQLToYourCommunity() {
  return (
    <section className="gql-section gql-container">
      <div className="relative flex gap-8 border border-sec-dark bg-sec-lighter px-6 py-10 dark:border-sec-base/40 dark:bg-sec-darker/20 max-lg:flex-col sm:px-10 md:gap-12 lg:flex-row lg:items-center lg:gap-16 lg:px-16 xl:gap-24">
        <Stripes />
        <div>
          <h2 className="typography-h2">Bring GraphQL to your community</h2>
          <p className="typography-body-lg mt-6">
            Learn how to start a local initiative and create your own – host
            events, share knowledge, and grow the GraphQL community where you
            live.
          </p>
        </div>
        <div className="mt-auto flex shrink-0 flex-col gap-2 lg:w-[324px]">
          <Button
            href={
              "#"
              // TODO: Where does this link? Docs?
            }
            variant="primary"
          >
            Learn more
          </Button>
          <Button
            href="/community/foundation/local-initiative/"
            variant="tertiary"
            className="[.light_&]:bg-white"
          >
            Start GraphQL Local
          </Button>
        </div>
      </div>
    </section>
  )
}

function Stripes() {
  const mask = "linear-gradient(20deg, transparent 80%, rgb(0 0 0 / 0.6))"
  return (
    <div
      className="absolute inset-0"
      role="presentation"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <StripesDecoration oddClassName="bg-gradient-to-b from-sec-dark to-sec-base/10" />
    </div>
  )
}
