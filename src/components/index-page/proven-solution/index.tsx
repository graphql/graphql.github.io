import { ImageLoaded } from "@/app/conf/2025/components/image-loaded"
import { Button } from "@/app/conf/_design-system/button"
import { SectionLabel } from "@/app/conf/_design-system/section-label"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"

import blurBean from "./blur-bean.webp"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

export function ProvenSolution() {
  return (
    <section className="dark relative overflow-hidden bg-pri-dark text-white dark:bg-pri-darker">
      <Stripes />
      <div className="gql-container py-8 xl:py-16">
        <div className="gql-section relative">
          <SectionLabel className="mb-6 !text-sec-light">
            Business perspective
          </SectionLabel>
          <h2 className="typography-h2 mb-6 lg:mb-16">
            A proven solution for startups and enterprises
          </h2>
          <div className="mb-12 grid gap-y-6 lg:grid-cols-3 lg:backdrop-blur-[6.4px] lg:[&>*:not(:first-child)]:border-l-0">
            <ProvenSolutionCard
              title={
                <>
                  The best user{" "}
                  <br className="@[530px]/card:hidden max-lg:hidden" />
                  experience
                </>
              }
              description="Deliver high-performing user experiences at scale. The world’s leading apps use GraphQL to create faster, more responsive digital experiences."
              bullets={[
                "Faster data retrieval and load times",
                "Improved bandwith efficiency",
              ]}
            />
            <ProvenSolutionCard
              title={
                <>
                  Stability &{" "}
                  <br className="@[530px]/card:hidden max-lg:hidden" />
                  Security
                </>
              }
              description="Protect your APIs while maintaining full visibility into data consumption. GraphQL allows you to monitor, secure, and optimize API usage while ensuring compliance."
              bullets={[
                "Stronger access control",
                "Improved business intelligence & cost analysis",
              ]}
            />
            <ProvenSolutionCard
              title={
                <>
                  Efficient distributed{" "}
                  <br className="@[530px]/card:hidden max-lg:hidden" />
                  development
                </>
              }
              description="Let your teams ship faster with GraphQL’s flexible, decoupled architecture. GraphQL allows frontend and backend teams to work independently and efficiently."
              bullets={[
                "More rapid iterations",
                "Improved cross-team collaboration",
              ]}
            />
          </div>
          <Button
            className="mx-auto mt-8 w-fit lg:mt-16"
            // todo: this should link to the Business Agregator page
            href="/learn"
          >
            Learn more<span className="sr-only"> about GraphQL</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

function ProvenSolutionCard({
  title,
  description,
  bullets,
}: {
  title: React.ReactNode
  description: React.ReactNode
  bullets: string[]
}) {
  return (
    <div className="flex flex-col border border-pri-light bg-pri-lighter/20 @container/card dark:bg-pri-base/20 max-lg:backdrop-blur-[6.4px]">
      <h3 className="border-b border-pri-light p-6 text-2xl @[331px]/card:typography-h3">
        {title}
      </h3>
      <p className="typography-body-lg p-6">{description}</p>
      <ul className="typography-body-md mt-auto flex flex-col gap-2 p-6 pt-0">
        {bullets.map(bullet => (
          <li key={bullet} className="flex items-center gap-2">
            <CheckIcon className="size-4 shrink-0 text-sec-base" aria-hidden />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Stripes() {
  return (
    <ImageLoaded
      role="presentation"
      image={blurBean}
      fetchPriority="low"
      // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
      className="pointer-events-none absolute inset-0 opacity-0 transition-[translate] duration-[400ms] ease-linear [mask-position:center_calc(100%+65vw)] [mask-size:200%] data-[loaded=true]:opacity-100 max-lg:rotate-[180deg] max-lg:scale-x-[-1] lg:[mask-position:center_500px] lg:[mask-size:150%] xl:translate-y-1/2 xl:[mask-position:center_top] xl:max-3xl:translate-y-[50%]"
      style={{
        maskImage: `url(${blurBean.src})`,
        WebkitMaskImage: `url(${blurBean.src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(180deg,hsl(var(--color-pri-light)/0.2)_20%,hsl(var(--color-pri-base))_150%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-pri-base)/.9)_20%,hsl(var(--color-pri-darker))_150%)]"
        oddClassName="bg-[linear-gradient(180deg,hsl(var(--color-pri-light))_20%,hsl(var(--color-pri-lighter)/.9)_150%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-pri-darker)/.9)_20%,hsl(var(--color-pri-base)/.8)_150%)]"
      />
    </ImageLoaded>
  )
}
