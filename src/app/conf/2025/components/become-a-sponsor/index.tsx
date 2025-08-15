import clsx from "clsx"

import { Button } from "../../../_design-system/button"

import blurBlob from "./blur-blob.webp"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

export function BecomeASponsor() {
  return (
    <section className="relative overflow-hidden">
      <Stripes />
      <div className="gql-conf-container gql-conf-section xl:py-16">
        <header className="flex flex-col gap-x-48 gap-y-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="typography-h2">Become a Sponsor</h2>
            <p className="typography-body-lg mt-6 text-pretty">
              Connect with the global GraphQL community and showcase your brand
              to industry leaders and decision-makers.
            </p>
          </div>
          <Button
            variant="primary"
            href="https://events.linuxfoundation.org/sponsor-GraphQLConf-25?utm_source=graphql_conf_2025&utm_medium=website&utm_campaign=sponsor_section"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 opacity-55"
            disabled
          >
            Sponsor Sales Closed
          </Button>
        </header>
        <dl className="relative z-10 mt-10 border border-neu-300 md:backdrop-blur-[6.4px] xl:mt-16">
          <DefinitionListItem
            term="Brand Visibility"
            definition="Showcase your brand to thousands of GraphQL enthusiasts and decision-makers."
          />
          <DefinitionListItem
            term="Lead Generation"
            definition="Connect with potential customers and partners in the GraphQL ecosystem."
          />
          <DefinitionListItem
            term="Thought Leadership"
            definition="Position your company as a leader in the GraphQL space."
          />
          <DefinitionListItem
            term="Talent Acquisition"
            definition="Meet and recruit top GraphQL developers and engineers."
          />
          <DefinitionListItem
            term="Product Feedback"
            definition="Gather valuable feedback from the GraphQL community."
          />
          <DefinitionListItem
            term="Community Impact"
            definition="Support and shape the future of GraphQL technology."
          />
        </dl>
      </div>
    </section>
  )
}

function DefinitionListItem({
  className,
  term,
  definition,
}: {
  className?: string
  term: string
  definition: string
}) {
  return (
    <div
      className={clsx(
        className,
        "flex border-b border-neu-300 last:border-b-0 max-sm:flex-col",
      )}
    >
      <dt className="typography-body-lg flex min-w-[320px] shrink-0 items-center whitespace-pre border-b border-neu-300 p-4 max-sm:w-full sm:border-b-0 sm:border-r">
        {term}
      </dt>
      <dd className="typography-body-md flex items-center p-4">{definition}</dd>
    </div>
  )
}

function Stripes() {
  return (
    <div
      role="presentation"
      // prettier-ignore
      // false positive
      // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className="pointer-events-none absolute inset-0
        [--start-1:hsl(var(--color-sec-lighter))]
        [--end-1:hsl(hsl(320deg_100%_96%/.8)]
        dark:[--start-1:hsl(var(--color-sec-lighter))]
        dark:[--end-1:hsl(var(--color-pri-lighter)/.2)]

        [--start-2:#FFEAF8]
        [--end-2:hsl(var(--color-neu-0))]
        dark:[--start-2:rgba(255,204,239,.1)]
        dark:[--end-2:hsl(var(--color-pri-lighter)/.4)]

        translate-y-12

        [mask-size:120%]
        3xl:[mask-size:2000px] 2xl:opacity-50
        max-md:[mask-size:600%] max-md:opacity-50
      "
      style={{
        maskImage: `url(${blurBlob.src})`,
        WebkitMaskImage: `url(${blurBlob.src})`,
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(180deg,var(--start-1)_-200%,var(--end-1)_100%)]"
        oddClassName="bg-[linear-gradient(180deg,var(--start-2)_0%,var(--end-2)_100%)]"
      />
    </div>
  )
}
