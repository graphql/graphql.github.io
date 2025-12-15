import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { getResourcesByTag } from "@/resources/data"
import VideoPlayerIcon from "../assets/video-player.svg?svgr"
import { ResourcesHero } from "../resources-hero"
import { Eyebrow } from "@/_design-system/eyebrow"
import { VideoLibrary } from "./video-library"
import { KeepLearning } from "../keep-learning"
import { LookingForMore } from "@/components/looking-for-more"

export const metadata = {
  title: "Video Resources Library",
  description:
    "Expand your expertise with curated videos to help you master GraphQL and stay up to date with its evolving ecosystem.",
}

export default async function VideoResourcesPage() {
  const resources = await getResourcesByTag("video")
  const seen = new Set<string>()
  const unique = resources.filter(resource => {
    const key = resource.title.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  unique.sort((a, b) =>
    a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
  )

  return (
    <main className="gql-all-anchors-focusable">
      <NavbarFixed />
      <ResourcesHero
        heading="Video Resources Library"
        text="Expand your expertise with curated videos to help you master GraphQL and stay up to date with its evolving ecosystem."
      />

      <section className="gql-container pb-16 pt-12 lg:pb-24">
        <header className="flex flex-col gap-6 border-b border-neu-200 pb-8 dark:border-neu-100 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center border border-neu-200 bg-neu-0 text-neu-500 dark:border-neu-100 dark:bg-neu-0/50 lg:size-16">
              <VideoPlayerIcon className="size-8 lg:size-10" aria-hidden />
            </div>
            <div className="flex flex-col gap-3">
              <Eyebrow>Watch and learn</Eyebrow>
              <h2 className="typography-h2 text-pretty">
                Curated GraphQL talks
              </h2>
              <p className="typography-body-md max-w-[720px] text-neu-800">
                Browse recorded sessions from GraphQL Conf alongside community
                talks and workshops.
              </p>
            </div>
          </div>

          <span className="font-mono text-sm uppercase text-neu-700">
            {unique.length} videos
          </span>
        </header>

        <VideoLibrary resources={unique} className="mt-10 lg:mt-16" />

        <KeepLearning
          className="mt-10 lg:mt-16"
          title="Reading Resources Library"
          href="/resources/reading"
          stripes="[--start:hsl(var(--color-sec-light)/.9)] dark:[--start:hsl(var(--color-sec-darker))] bg-[linear-gradient(to_bottom,var(--start),hsl(var(--color-neu-0)))]"
        />

        <LookingForMore
          description="Discover even more ways to learn and connect with the GraphQL community."
          links={[
            { href: "/community", label: "Community" },
            { href: "/learn", label: "Learn" },
          ]}
        />
      </section>
    </main>
  )
}
