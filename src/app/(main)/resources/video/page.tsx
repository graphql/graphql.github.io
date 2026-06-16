import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { getResourcesByTag } from "@/resources/data"
import { ResourcesHero } from "../resources-hero"
import { VideoLibrary } from "./video-library"
import { KeepLearning } from "../keep-learning"
import { LookingForMore } from "@/components/looking-for-more"
import { Breadcrumbs } from "@/_design-system/breadcrumbs"

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

      <section className="gql-container gql-section">
        <Breadcrumbs
          activePath={[
            {
              name: "home",
              route: "/",
              title: "Home",
              type: "page",
              children: [],
              frontMatter: {},
            },
            {
              name: "resources",
              route: "/resources",
              title: "Resource Hub",
              type: "page",
              children: [],
              frontMatter: {},
            },
            {
              name: "Video Resources Library",
              route: "",
              title: "Video Resources Library",
              type: "page",
              children: [],
            },
          ]}
        />
      </section>

      <section className="gql-container pb-8 md:pb-16 lg:pb-24 xl:pt-12">
        <header className="gql-section flex flex-wrap justify-between gap-x-8 gap-y-4 !pt-0">
          <h2 className="typography-h2 text-pretty">Browse GraphQL Videos</h2>
          <p className="typography-body-md max-w-[578px] text-neu-800">
            The video library includes talks from GraphQL Conf and archival
            presentations by developers from Facebook and beyond, shared at
            conferences and meetups worldwide.
          </p>
        </header>

        <VideoLibrary resources={unique} className="lg:mt-12" />

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
