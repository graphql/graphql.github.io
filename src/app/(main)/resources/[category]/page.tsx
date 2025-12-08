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

const sectionKindNames: Record<Kind, string> = {
  video: "Featured videos",
  blog: "Blog posts",
  "tools-and-libraries": "Tools & Libraries",
  guide: "Guides",
}

function sectionHeading(section: { kind: Kind; resources: ResourceMetadata[] }) {
  
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
              <section
                id={sectionKindNames[section.kind]
                  .toLowerCase()
                  .replace(/ /g, "-")}
                key={section.kind}
                className="flex flex-col gap-6"
              >
                <header className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <Eyebrow>{sectionKindNames[section.kind]}</Eyebrow>
                    <h2 className="typography-h3 text-pretty">
                      {sectionHeading(section, category)}
                    </h2>
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
