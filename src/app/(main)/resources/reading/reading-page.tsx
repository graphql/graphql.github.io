import Link from "next/link"
import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/_design-system/breadcrumbs"
import { clsx } from "clsx"

import { ResourcesHero } from "../resources-hero"
import { Eyebrow } from "@/_design-system/eyebrow"
import { ResourceHubCard } from "../resource-hub-card"
import { readResources } from "@/resources/data"
import { topics, type ResourceMetadata, type Topic } from "@/resources/types"

export const subcategories = [
  "blogs-and-newsletters",
  "individual-posts",
  "books",
] as const

export type Subcategory = (typeof subcategories)[number]

type Variant = Subcategory | "all"

const topicSet = new Set<Topic>(topics)

const tabs: {
  label: string
  href: string
  variant: Variant
  color: string
}[] = [
  {
    label: "Blogs & newsletters",
    href: "/resources/reading/blogs-and-newsletters",
    variant: "blogs-and-newsletters",
    color: "hsl(var(--color-pri-base))",
  },
  {
    label: "Individual posts",
    href: "/resources/reading/individual-posts",
    variant: "individual-posts",
    color: "#FF8800",
  },
  {
    label: "Books",
    href: "/resources/reading/books",
    variant: "books",
    color: "#00C6AC",
  },
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
      resource.tags.some(
        tag =>
          tag === "blog-or-newsletter" || tag === "guide" || tag === "book",
      ),
  },
  "blogs-and-newsletters": {
    title: "Blogs & Newsletters",
    description:
      "Popular sources to learn and keep track of the GraphQL ecosystem.",
    eyebrow: "Stay informed",
    filter: resource => resource.tags.includes("blog-or-newsletter"),
  },
  "individual-posts": {
    title: "Individual Posts",
    description: "Notable posts from the community.",
    eyebrow: "Deep dives",
    filter: resource =>
      resource.tags.some(
        tag =>
          tag === "guide" ||
          (tag === "blog" && !resource.url.startsWith("/blog")),
      ),
  },
  books: {
    title: "Books",
    description:
      "Books to help you level up your GraphQL knowledge and practice.",
    eyebrow: "Read and learn",
    filter: resource => resource.tags.includes("book"),
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

  const activePath = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Resource Hub",
      route: "/resources",
    },
    {
      name: "Reading Resources Library",
      route: "/resources/reading",
    },
  ].map(item => ({
    ...item,
    title: item.name,
    type: "page",
    children: [],
    frontMatter: {},
  }))

  return (
    <main className="gql-all-anchors-focusable">
      <NavbarFixed />
      <ResourcesHero
        heading="Reading Resources Library"
        text="Grow your GraphQL expertise with a curated selection of articles, blogs, and books that support continuous learning and keep you in sync with the latest developments."
      />
      <section className="gql-container gql-section">
        <Breadcrumbs activePath={activePath} />
        <nav
          className="mt-6 grid grid-cols-3 divide-x divide-neu-200 border border-neu-200 dark:divide-neu-100 dark:border-neu-100"
          aria-label="Reading resource types"
        >
          {tabs.map(tab => {
            const active = tab.variant === variant
            return (
              <Link
                key={tab.variant}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                style={
                  {
                    "--color": tab.color,
                  } as React.CSSProperties
                }
                scroll={false}
                className={clsx(
                  "typography-body-lg flex h-full flex-col gap-2 bg-neu-0 px-4 py-3 text-left transition hover:bg-neu-50 dark:bg-neu-0/60 dark:hover:bg-neu-50/40",
                  active &&
                    "bg-[--color] text-neu-0 hover:bg-[hsl(from_var(--color)_h_s_l/.9)]",
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
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
