import Link from "next/link"
import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { notFound } from "next/navigation"

import { ResourcesHero } from "../resources-hero"
import { Eyebrow } from "@/_design-system/eyebrow"
import { ResourceHubCard } from "../resource-hub-card"
import { readResources } from "@/resources/data"
import { topics, type ResourceMetadata, type Topic } from "@/resources/types"
import { clsx } from "clsx"

export const subcategories = [
  "blogs-and-newsletters",
  "individual-posts",
  "books",
] as const

export type Subcategory = (typeof subcategories)[number]

type Variant = Subcategory | "all"

const topicSet = new Set<Topic>(topics)

const tabs: { label: string; href: string; variant: Variant }[] = [
  {
    label: "All reading resources",
    href: "/resources/reading",
    variant: "all",
  },
  {
    label: "Blogs & newsletters",
    href: "/resources/reading/blogs-and-newsletters",
    variant: "blogs-and-newsletters",
  },
  {
    label: "Individual posts",
    href: "/resources/reading/individual-posts",
    variant: "individual-posts",
  },
  { label: "Books", href: "/resources/reading/books", variant: "books" },
]

const variants: Record<
  Variant,
  {
    title: string
    description: string
    eyebrow: string
    filter: (resource: ResourceMetadata) => boolean
  }
> = {
  all: {
    title: "Reading Resources Library",
    description:
      "Browse reading materials to learn best practices and stay up to date with the ecosystem.",
    eyebrow: "Reading resources",
    filter: resource =>
      resource.tags.includes("blog") || resource.tags.includes("guide"),
  },
  "blogs-and-newsletters": {
    title: "Blogs & Newsletters",
    description:
      "Popular sources to learn and keep track of the GraphQL ecosystem.",
    eyebrow: "Stay informed",
    filter: resource =>
      resource.tags.includes("blog") && !hasTopicTag(resource),
  },
  "individual-posts": {
    title: "Individual Posts",
    description: "Notable posts from the community.",
    eyebrow: "Deep dives",
    filter: resource => resource.tags.includes("blog") && hasTopicTag(resource),
  },
  books: {
    title: "Books",
    description:
      "Books to help you level up your GraphQL knowledge and practice.",
    eyebrow: "Read and learn",
    filter: resource => resource.tags.includes("guide"),
  },
}

export function readingMetadata(variant: Variant) {
  const config = variants[variant]
  if (!config) return {}
  return {
    title: config.title,
    description: config.description,
  }
}

function hasTopicTag(resource: ResourceMetadata) {
  return resource.tags.some(tag => topicSet.has(tag as Topic))
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

function formatTags(resource: ResourceMetadata) {
  return resource.tags.map(tag => ({
    label: tag,
    color: "hsl(var(--color-neu-500))",
  }))
}

export async function ReadingLibraryPage({ variant }: { variant: Variant }) {
  const config = variants[variant]
  if (!config) return notFound()

  const resources = await readResources()
  const filtered = uniqueByTitle(resources)
    .filter(config.filter)
    .sort((a, b) =>
      a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
    )

  return (
    <main className="gql-all-anchors-focusable">
      <NavbarFixed />
      <div className="gql-container pt-6 lg:pt-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap gap-2 text-neu-700"
        >
          <Link
            href="/resources"
            className="typography-body-sm underline-offset-2 hover:underline"
          >
            Resource Hub
          </Link>
          <span aria-hidden>›</span>
          <Link
            href="/resources/reading"
            className="typography-body-sm underline-offset-2 hover:underline"
          >
            Reading Resources
          </Link>
          <span aria-hidden>›</span>
          <span className="typography-body-sm text-neu-900">
            {config.title}
          </span>
        </nav>
      </div>
      <ResourcesHero heading={config.title} text={config.description} />
      <nav
        className="gql-container mt-6 lg:mt-8"
        aria-label="Reading resource types"
      >
        <ul className="flex flex-wrap gap-2">
          {tabs.map(tab => {
            const active = tab.variant === variant
            return (
              <li key={tab.variant}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "typography-body-sm border border-neu-200 px-3 py-2 text-neu-800 hover:bg-neu-50 dark:border-neu-100 dark:hover:bg-neu-50/50",
                    active
                      ? "bg-neu-50 font-semibold ring-1 ring-neu-300 dark:ring-neu-100"
                      : "bg-neu-0",
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <section className="gql-container gql-section">
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(resource => (
            <li key={resource.url}>
              <ResourceHubCard
                href={resource.url}
                title={resource.title}
                author={resource.author}
                tags={formatTags(resource)}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
