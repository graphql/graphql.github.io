import { Button } from "@/app/conf/_design-system/button"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"
import ToolsIcon from "./assets/tools.svg?svgr"

export function ToolsLibrariesSection() {
  return (
    <section className="gql-section" id="tools-and-libraries">
      <div className="border border-sec-base bg-sec-lighter p-8 dark:border-sec-darker dark:bg-sec-darker/15 lg:p-16">
        <div className="flex items-center gap-1 text-sec-darker dark:text-sec-light">
          <PlayIcon className="size-4" />
          <span className="font-mono text-sm uppercase">
            tools and libraries
          </span>
        </div>

        <div className="mt-12 flex flex-col items-start gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-[788px]">
            <h2 className="typography-h2 text-balance text-neu-900">
              Build GraphQL with Tools & Libraries
            </h2>
            <p className="typography-body-lg mt-6 text-neu-800 lg:mt-10">
              Explore solutions and docs for building with GraphQL — across
              languages, frameworks, and platforms.
            </p>
            <Button href="/code" className="mt-10 w-fit">
              Explore Tools & Libraries
            </Button>
          </div>

          <div className="flex size-[268px] shrink-0 items-center justify-center bg-sec-light p-12 text-sec-dark dark:bg-sec-darker/15">
            <ToolsIcon className="size-40" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
