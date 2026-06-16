import { Button } from "@/app/conf/_design-system/button"
import { Eyebrow } from "@/_design-system/eyebrow"
import VideoPlayerIcon from "./assets/video-player.svg?svgr"

export function VideoResourcesSection() {
  return (
    <section className="gql-container gql-section" id="video-resources">
      <Eyebrow>video resources library</Eyebrow>

      <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
        <div className="flex shrink-0 items-center justify-center border border-neu-200 bg-neu-0 text-neu-400 dark:border-neu-100 dark:bg-neu-0/50 max-lg:size-16 max-lg:p-2 max-md:hidden lg:order-1 lg:size-[294px]">
          <VideoPlayerIcon className="size-12 lg:size-36" />
        </div>

        <div className="max-w-[709px]">
          <h2 className="typography-h2 text-balance text-neu-900">
            Watch and learn GraphQL
          </h2>
          <p className="typography-body-lg mt-6 text-neu-800 lg:mt-10">
            Build your skills with featured videos from GraphQL Conf, global
            meetups, and expert engineers — keeping you up to date in a
            fast-moving ecosystem.
          </p>
          <Button href="/resources/video" className="mt-10 sm:w-fit">
            Go to Video Resources
          </Button>
        </div>
      </div>
    </section>
  )
}
