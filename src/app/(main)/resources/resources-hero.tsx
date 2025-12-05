import { LearnHeroStripes } from "@/components/learn-aggregator/learn-hero-stripes"

export function ResourcesHero() {
  return (
    <section className="relative overflow-hidden bg-neu-0 pt-[calc(var(--nextra-navbar-height)+24px)] lg:h-[600px]">
      <LearnHeroStripes
        className="!h-full"
        style={{
          maskSize: "2000px",
          WebkitMaskSize: "2000px",
        }}
      />
      <div className="gql-section gql-container relative flex h-full flex-col items-center justify-center gap-6 text-center lg:gap-8">
        <h1 className="typography-h1">Resource Hub</h1>
        <p className="typography-body-md max-w-[554px] text-pretty">
          Choose a hub to explore curated resources by topic or browse all
          Tools, the GraphQL Specification, Blog, Video and Reading Libraries.
        </p>
      </div>
    </section>
  )
}
