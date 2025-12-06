import { Button } from "@/app/conf/_design-system/button"
import ArchiveIcon from "./assets/archive.svg?svgr"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import { Eyebrow } from "@/_design-system/eyebrow"

export function SpecificationSection() {
  return (
    <section className="gql-section" id="specification">
      <div className="relative overflow-hidden border border-pri-lighter bg-pri-lightest p-8 dark:border-pri-darker dark:bg-pri-darker/15 lg:p-16">
        <Stripes />
        <Eyebrow>specification</Eyebrow>

        <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
          <div className="flex size-[268px] shrink-0 items-center justify-center bg-pri-lighter p-12 text-pri-base dark:bg-pri-darker/20 max-lg:size-16 max-lg:p-2">
            <ArchiveIcon className="size-40 max-lg:size-12" aria-hidden />
          </div>

          <div className="max-w-[788px]">
            <h2 className="typography-h2 text-balance text-neu-900">
              Read the GraphQL Specification
            </h2>
            <p className="typography-body-lg mt-6 text-neu-800 lg:mt-10">
              The specification defines the core structure of GraphQL. It's the
              foundation for building consistent servers, clients, and tools.
              Read the spec to better understand how GraphQL works.
            </p>
            <Button href="/spec" className="mt-10 w-fit max-lg:w-full">
              Go to specification
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stripes() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        maskImage: "linear-gradient(21deg, transparent 70%, black 105%)",
        maskPosition: "top right",
        maskSize: "80% 100%",
        maskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(90deg,hsl(var(--color-pri-lighter))_0_12px,hsl(var(--color-pri-light))_12px_24px)] dark:bg-[repeating-linear-gradient(90deg,hsl(var(--color-pri-light)/0.22)_0_12px,hsl(var(--color-pri-base)/0.22)_12px_24px)]"
        angle="-90deg"
      />
    </div>
  )
}
