import { Button } from "@/app/conf/_design-system/button"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"

export function SpecificationSection() {
  return (
    <section className="gql-section" id="specification">
      <div className="border border-neu-200 bg-neu-0 p-8 lg:p-16">
        <div className="flex items-center gap-1">
          <PlayIcon className="size-4 text-pri-base" />
          <span className="font-mono text-sm uppercase text-pri-base">
            specification
          </span>
        </div>

        <div className="mt-12 flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex size-[268px] shrink-0 items-center justify-center border border-neu-200 bg-neu-50">
            <BooksIcon />
          </div>

          <div className="max-w-[788px]">
            <h2 className="typography-h2 text-balance">
              Read the GraphQL Specification
            </h2>
            <p className="typography-body-lg mt-6 lg:mt-10">
              The specification defines the core structure of GraphQL. It's the
              foundation for building consistent servers, clients, and tools.
              Read the spec to better understand how GraphQL works.
            </p>
            <Button href="/spec" className="mt-10">
              Read the Spec
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function BooksIcon() {
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
        d="M20 20H60V30H70V40H80V30H90V20H140V140H90V130H80V120H70V130H60V140H20V20ZM30 30V130H60V120H70V110H80V120H90V130H130V30H90V40H80V50H70V40H60V30H30ZM40 50H50V60H40V50ZM100 50H120V60H100V50ZM40 70H50V80H40V70ZM100 70H120V80H100V70ZM40 90H50V100H40V90ZM100 90H120V100H100V90Z"
      />
    </svg>
  )
}
