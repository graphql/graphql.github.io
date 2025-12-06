import { Button } from "@/app/conf/_design-system/button"
import ToolsIcon from "./assets/tools.svg?svgr"
import { Eyebrow } from "@/_design-system/eyebrow"

export function ToolsLibrariesSection() {
  return (
    <section className="gql-section" id="tools-and-libraries">
      <div className="border border-sec-base bg-sec-lighter p-8 dark:border-sec-darker dark:bg-sec-darker/15 lg:p-16">
        <Eyebrow className="!text-sec-darker dark:!text-sec-light">
          tools and libraries
        </Eyebrow>

        <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
          <div className="max-w-[788px] max-lg:order-2">
            <h2 className="typography-h2 text-balance text-neu-900">
              Build GraphQL with Tools & Libraries
            </h2>
            <p className="typography-body-lg mt-6 text-neu-800 lg:mt-10">
              Explore solutions and docs for building with GraphQL — across
              languages, frameworks, and platforms.
            </p>
            <Button href="/code" className="mt-10 w-fit max-lg:w-full">
              Explore Tools & Libraries
            </Button>
          </div>

          <div className="flex size-[268px] shrink-0 items-center justify-center bg-sec-light p-12 text-sec-dark dark:bg-sec-darker/15 max-lg:order-1 max-lg:size-16 max-lg:p-2">
            <ToolsIcon className="size-40 max-lg:size-12" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
