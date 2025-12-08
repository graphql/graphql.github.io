import { LearnHeroStripes } from "@/components/learn-aggregator/learn-hero-stripes"

export function ResourcesHero({
  heading,
  text,
  children,
}: {
  heading: string
  text: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-neu-0 pt-[calc(var(--nextra-navbar-height)+24px)] lg:h-[600px]">
      <LearnHeroStripes
        className="!h-full ![--start-2:hsl(var(--color-sec-lighter)/.5)] dark:![--start-2:hsl(319,100%,30%)]"
        style={{
          maskSize: "2000px",
          WebkitMaskSize: "2000px",
        }}
      />
      <div className="gql-section gql-container relative flex h-full flex-col items-center justify-center gap-6 text-center lg:gap-8">
        <h1 className="typography-h1">{heading}</h1>
        <p className="typography-body-md max-w-[554px] text-pretty">{text}</p>
        {children}
      </div>
    </section>
  )
}
