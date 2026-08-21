import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import { Button } from "@/app/conf/_design-system/button"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import blurBean from "@/components/blog-page/blur-bean.webp"

import { SchemaGrid } from "./hero-schema-grid"

const highlights = [
  "Self-describing schemas let agents discover your API",
  "Invalid queries fail validation before they execute",
  "Field selection keeps responses to what the query asked for",
]

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-pri-dark text-white dark:bg-pri-darker">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: `url(${blurBean.src})`,
          WebkitMaskImage: `url(${blurBean.src})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center top",
          WebkitMaskPosition: "center top",
          maskSize: "cover",
          WebkitMaskSize: "cover",
        }}
      >
        <StripesDecoration
          stripeWidth="8px"
          evenClassName="bg-[linear-gradient(180deg,hsl(var(--color-pri-light)/.5)_0%,transparent_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-pri-light)/0.25)_0%,transparent_100%)]"
          oddClassName="bg-[linear-gradient(180deg,hsl(var(--color-pri-dark)/0.15)_0%,transparent_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-neu-0)/0.12)_0%,transparent_100%)]"
        />
      </div>
      <SchemaGrid />
      <div className="gql-container relative">
        <div className="flex flex-col items-center px-4 pb-16 pt-24 text-center lg:min-h-[640px] lg:justify-center lg:pb-24 lg:pt-32 xl:min-h-[720px] xl:px-24 xl:pt-40">
          <a
            href="https://github.com/graphql/ai-wg/"
            className="mb-8 inline-flex items-center gap-2 border border-sec-light/30 bg-sec-light/10 px-3 py-1 backdrop-blur-sm transition-colors hover:bg-sec-light/20 hover:duration-0"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-sec-base opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-sec-base" />
            </span>
            <span className="typography-body-sm font-medium text-sec-light">
              GraphQL AI Working Group · open to all
            </span>
          </a>

          <h1 className="typography-h1 max-w-4xl text-balance leading-[1.05]">
            The API language
            <br />
            <span className="text-sec-light">for humans and agents</span>
          </h1>

          <p className="typography-body-lg mt-6 max-w-2xl text-pretty text-white/80">
            An agent that can reach a GraphQL endpoint can read its types, its
            field arguments and its documentation, then ask for exactly the
            fields it needs. Nothing to publish alongside it and keep in sync.
          </p>

          <ul className="mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-2">
            {highlights.map((item, index) => (
              <li key={index} className="flex items-start gap-1.5">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-sec-base" />
                <span className="typography-body-sm text-white/80">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="#interactive-demo" variant="primary">
              Try the live demo
              <ArrowDownIcon className="size-5 shrink-0 text-neu-0" />
            </Button>
            <Button
              href="/blog/2025-07-03-graphql-supercharging-ai/"
              variant="secondary"
            >
              Read the blog post
            </Button>
            <Button href="/resources/ai" variant="tertiary">
              Explore AI resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
