import { Button } from "@/app/conf/_design-system/button"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"

export function ToolsLibrariesSection() {
  return (
    <section className="gql-section" id="tools-and-libraries">
      <div className="border border-neu-200 bg-neu-0 p-8 lg:p-16">
        <div className="flex items-center gap-1">
          <PlayIcon className="size-4 text-pri-base" />
          <span className="font-mono text-sm uppercase text-pri-base">
            tools and libraries
          </span>
        </div>

        <div className="mt-12 flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[788px]">
            <h2 className="typography-h2 text-balance">
              Build GraphQL with Tools & Libraries
            </h2>
            <p className="typography-body-lg mt-6 lg:mt-10">
              Explore solutions and docs for building with GraphQL — across
              languages, frameworks, and platforms.
            </p>
            <Button href="/code" className="mt-10">
              Explore Tools & libraries
            </Button>
          </div>

          <div className="flex size-[268px] shrink-0 items-center justify-center border border-neu-200 bg-neu-50">
            <WrenchIcon />
          </div>
        </div>
      </div>
    </section>
  )
}

function WrenchIcon() {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="currentColor"
      className="size-40"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100 10H120V20H130V30H140V50H150V90H140V100H130V110H120V120H110V130H100V140H90V150H50V140H60V130H70V120H80V110H70V100H60V90H50V80H40V70H30V60H20V50H30V40H40V30H50V20H60V10H100ZM80 40V50H70V60H80V70H90V80H100V70H110V60H120V50H110V40H100V30H90V40H80ZM70 30V20H60V30H70ZM50 40V30H40V40H50ZM40 50V60H30V50H40ZM50 70V80H60V70H50ZM70 90V100H80V110H90V100H100V90H90V80H80V90H70ZM100 110V120H90V130H80V140H90V130H100V120H110V110H100Z"
      />
    </svg>
  )
}
