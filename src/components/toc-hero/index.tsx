import { clsx } from "clsx"

export { TocHeroContents } from "./toc-hero-contents"

export interface TocHeroProps {
  heading: string
  text: React.ReactNode
  children: React.ReactNode
  decoration: React.ReactNode
  className?: string
}
export function TocHero({
  heading,
  text,
  children,
  decoration,
  className,
}: TocHeroProps) {
  return (
    <section
      className={clsx(
        "relative overflow-visible bg-neu-0 pt-[calc(var(--nextra-navbar-height)+24px)]",
        className,
      )}
    >
      {decoration}
      <div className="gql-section gql-container relative flex !max-w-screen-lg flex-col items-center gap-6 text-center lg:gap-8 xl:!max-w-screen-xl">
        <h1 className="typography-h1">{heading}</h1>
        <p className="typography-body-md max-w-[80vw] text-pretty">{text}</p>
        {children}
      </div>
    </section>
  )
}
