import { Button } from "@/app/conf/_design-system/button"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"

export function VideoResourcesSection() {
  return (
    <section className="gql-section" id="video-resources">
      <div className="flex items-center gap-1">
        <PlayIcon className="size-4 text-pri-base" />
        <span className="font-mono text-sm uppercase text-pri-base">
          video resources library
        </span>
      </div>

      <div className="mt-12 flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[709px]">
          <h2 className="typography-h2 text-balance">
            Watch and learn GraphQL
          </h2>
          <p className="typography-body-lg mt-6 lg:mt-10">
            Build your skills with featured videos from GraphQL Conf, global
            meetups, and expert engineers — keeping you up to date in a
            fast-moving ecosystem.
          </p>
          <Button href="/conf" className="mt-10">
            Watch video resources
          </Button>
        </div>

        <div className="flex size-[294px] shrink-0 items-center justify-center border border-neu-200 bg-neu-50">
          <VideoPlayerIcon />
        </div>
      </div>
    </section>
  )
}

function VideoPlayerIcon() {
  return (
    <svg
      viewBox="0 0 144 144"
      fill="currentColor"
      className="size-36"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 24H136V120H8V24ZM16 32V112H128V32H16ZM56 48V96H64V88H72V80H80V72H88V64H80V56H72V48H64V40H56V48ZM64 56V72H72V64H80V56H72V48H64V56ZM64 80V88H72V80H64Z"
      />
    </svg>
  )
}
