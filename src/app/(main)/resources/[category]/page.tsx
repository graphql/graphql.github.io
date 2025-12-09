import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { getResourcesByTag } from "@/resources/data"
import {
  Kind,
  kinds,
  topics,
  type ResourceMetadata,
  type Topic,
} from "@/resources/types"

import { categoryNames, categorySubtitles } from "../subtitles"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { ResourcesHero } from "../resources-hero"
import { TocHeroContents } from "@/components/toc-hero"
import { Eyebrow } from "@/_design-system/eyebrow"
import { Button } from "@/app/conf/_design-system/button"

import ToolsIcon from "../assets/tools.svg?svgr"

const sectionKindNames: Record<Kind, string> = {
  video: "Featured videos",
  blog: "Blog posts",
  "tools-and-libraries": "Tools & Libraries",
  guide: "Guides",
}

// TODO: I'd prefer to have this in JSX over "JSON" objects
const blogDescriptions: Partial<Record<Topic, string>> = {
  frontend: "Stay up to date with insights from the GraphQL community.",
}

function sectionHeading(
  section: { kind: Kind; resources: ResourceMetadata[] },
  category: Topic,
) {
  if (section.kind === "video") {
    if (category === "frontend") return "Master GraphQL on the frontend"
    if (category === "backend") return "Master GraphQL on the backend"
  }

  return sectionLabel(section.kind)
}

interface PageParams {
  category: string
}

export async function generateStaticParams() {
  return topics.map(category => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
  const category = params.category as Topic
  if (!topics.includes(category)) return {}

  const title = `${categoryNames[category]} Resources`
  const description = categorySubtitles[category]

  return { title, description }
}

export default async function CategoryPage({ params }: { params: PageParams }) {
  const category = params.category as Topic
  if (!topics.includes(category)) return notFound()

  const resources = await getResourcesByTag(category)
  const deduped = uniqueByTitle(resources)
  const grouped = groupByKind(deduped)

  return (
    <main className="gql-all-anchors-focusable">
      <NavbarFixed />

      <ResourcesHero
        heading={categoryNames[category]}
        text={categorySubtitles[category]}
      >
        <TocHeroContents
          sections={grouped.map(section => sectionLabel(section.kind))}
          className="max-w-[528px]"
        />
      </ResourcesHero>

      <div className="gql-container gql-section pb-16 pt-12 lg:pb-24 lg:pt-20">
        {grouped.length === 0 ? (
          <p className="typography-body-md text-neu-700">
            No resources available for this category yet. Check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-12 lg:gap-16">
            {grouped.map(section => (
              <CategorySection
                key={section.kind}
                section={section}
                category={category}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function uniqueByTitle(resources: ResourceMetadata[]) {
  const seen = new Set<string>()
  return resources.filter(resource => {
    const key = resource.title.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function groupByKind(resources: ResourceMetadata[]) {
  return kinds
    .map(kind => ({
      kind,
      resources: resources.filter(
        resource => (resource.kind ?? getKindFromTags(resource)) === kind,
      ),
    }))
    .filter(section => section.resources.length > 0)
}

function getKindFromTags(resource: ResourceMetadata) {
  return kinds.find(kind => resource.tags.includes(kind))
}

function sectionLabel(kind: Kind) {
  return sectionKindNames[kind] ?? `${kind[0].toUpperCase()}${kind.slice(1)}`
}

function CategorySection({
  section,
  category,
}: {
  section: { kind: Kind; resources: ResourceMetadata[] }
  category: Topic
}) {
  if (section.kind === "tools-and-libraries") {
    return (
      <CategoryToolsAndLibraries
        category={category}
        resources={section.resources}
      />
    )
  }

  return (
    <section
      id={sectionKindNames[section.kind].toLowerCase().replace(/ /g, "-")}
      className="flex flex-col gap-6"
    >
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-3">
          <Eyebrow>{sectionKindNames[section.kind]}</Eyebrow>
          <h2 className="typography-h3 text-pretty">
            {sectionHeading(section, category)}
          </h2>
          {section.kind === "blog" && blogDescriptions[category] ? (
            <p className="typography-body-md text-neu-800">
              {blogDescriptions[category]}
            </p>
          ) : null}
        </div>
        <span className="typography-menu text-neu-600">
          {section.resources.length} resources
        </span>
      </header>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {section.resources.map(resource => (
          <li key={resource.url}>
            <ResourceCard resource={resource} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function CategoryToolsAndLibraries({
  category,
  resources,
}: {
  category: Topic
  resources: ResourceMetadata[]
}) {
  const sectionId = sectionKindNames["tools-and-libraries"]
    .toLowerCase()
    .replace(/ /g, "-")
  const featured = resources.slice(0, 4)

  return (
    <section
      id={sectionId}
      className="flex flex-col gap-8 border border-sec-base bg-sec-lighter p-6 dark:border-sec-darker dark:bg-sec-darker/15 lg:gap-10 lg:p-10"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <Eyebrow className="!text-sec-darker dark:!text-sec-light">
            {sectionKindNames["tools-and-libraries"]}
          </Eyebrow>
          <h2 className="typography-h3 text-pretty">
            Build GraphQL with tools and libraries
          </h2>
          <p className="typography-body-md text-neu-800">
            Explore language and platform tooling to ship production-ready{" "}
            {categoryNames[category].toLowerCase()} graphs.
          </p>
          <Button href="/code" className="mt-2 w-fit max-lg:w-full">
            Explore Tools & Libraries
          </Button>
        </div>

        <div className="flex size-24 shrink-0 items-center justify-center bg-sec-light text-sec-dark dark:bg-sec-darker/30 lg:size-32">
          <ToolsIcon className="size-16" aria-hidden />
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featured.map(resource => (
          <li key={resource.url}>
            <ResourceCard resource={resource} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ResourceCard({ resource }: { resource: ResourceMetadata }) {
  const kind = resource.kind ?? getKindFromTags(resource)

  return (
    <Link
      href={resource.url}
      className="flex h-full flex-col gap-3 border border-neu-200 bg-neu-0 p-6 text-left transition-colors hover:bg-neu-50 hover:duration-0 dark:border-neu-100"
    >
      {kind ? (
        <span className="font-mono text-xs uppercase text-neu-700">
          {sectionLabel(kind)}
        </span>
      ) : null}
      <h3 className="typography-h4 text-pretty text-neu-900">
        {resource.title}
      </h3>
      {resource.description ? (
        <p className="typography-body-md text-neu-800">
          {resource.description}
        </p>
      ) : null}
      <span className="typography-menu mt-auto inline-flex items-center gap-2 text-pri-base">
        Open resource
        <ArrowDownIcon className="size-5 -rotate-90" aria-hidden />
      </span>
    </Link>
  )
}
