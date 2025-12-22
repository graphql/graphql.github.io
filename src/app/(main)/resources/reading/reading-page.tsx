import Link from "next/link"
import { notFound } from "next/navigation"
import { clsx } from "clsx"

import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { Breadcrumbs } from "@/_design-system/breadcrumbs"
import { readResources } from "@/resources/data"
import {
  topics,
  type ResourceMetadata,
  type Topic,
  getResourceKind,
} from "@/resources/types"
import { LookingForMore } from "@/components/looking-for-more"
import { KeepLearning } from "../keep-learning"
import { Button } from "@/app/conf/_design-system/button"

import { tabs, type ReadingPageTab } from "./reading-page-categories"

import { ResourcesHero } from "../resources-hero"
import { ReadingResourcesCard } from "./reading-resources-card"

const topicSet = new Set<Topic>(topics)

const variants: Record<
  ReadingPageTab,
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
      resource.origin === "/data" &&
      getResourceKind(resource) === "blog-or-newsletter",
  },
  "blogs-and-newsletters": {
    title: "Blogs & Newsletters",
    description:
      "Popular sources to learn and keep track of the GraphQL ecosystem.",
    eyebrow: "Stay informed",
    filter: resource => getResourceKind(resource) === "blog-or-newsletter",
  },
  "individual-posts": {
    title: "Individual Posts",
    description: "Notable posts from the community.",
    eyebrow: "Deep dives",
    filter: resource =>
      resource.origin === "/data" && getResourceKind(resource) === "post",
  },
  books: {
    title: "Books",
    description:
      "Books to help you level up your GraphQL knowledge and practice.",
    eyebrow: "Read and learn",
    filter: resource => getResourceKind(resource) === "book",
  },
}

export function readingMetadata(variant: ReadingPageTab) {
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

export async function ReadingLibraryPage({
  variant,
}: {
  variant: ReadingPageTab
}) {
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

  const FIRST_PAGE_COUNT = 9

  return (
    <main className="gql-all-anchors-focusable pb-8 md:pb-16 lg:pb-24">
      <NavbarFixed />
      <ResourcesHero
        heading="Reading Resources Library"
        text="Grow your GraphQL expertise with a curated selection of articles, blogs, and books that support continuous learning and keep you in sync with the latest developments."
      />
      <section className="gql-container gql-section">
        <Breadcrumbs activePath={activePath} />
        <header className="mt-16 flex flex-wrap justify-between gap-x-8 gap-y-4 pt-2">
          <h2 className="typography-h2 text-pretty">Browse GraphQL Videos</h2>
          <p className="typography-body-md max-w-[578px] text-neu-800">
            The video library includes talks from GraphQL Conf and archival
            presentations by developers from Facebook and beyond, shared at
            conferences and meetups worldwide.
          </p>
        </header>
        <p className="typography-menu mt-8 lg:mt-12 xl:mt-16">
          Select a category
        </p>
        <nav
          className="mt-4 grid grid-cols-3 divide-x divide-neu-200 border border-neu-200 dark:divide-neu-100 dark:border-neu-100"
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
                    "!bg-[--color] text-neu-0 hover:!bg-[hsl(from_var(--color)_h_s_l/.9)]",
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, FIRST_PAGE_COUNT).map(resource => (
            <li key={resource.url}>
              <ReadingResourcesCard resource={resource} />
            </li>
          ))}
        </ul>
        {filtered.length > FIRST_PAGE_COUNT && (
          <details className="group">
            {/* we're using <details> for SEO and Cmd+F support */}
            <summary className="pointer-events-none mt-2 flex list-none items-center justify-center group-open:hidden">
              <Button
                as="span"
                variant="primary"
                className="pointer-events-auto mt-4 w-fit cursor-pointer"
              >
                Load more
              </Button>
            </summary>
            <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.slice(FIRST_PAGE_COUNT).map(resource => {
                return (
                  <li key={resource.url}>
                    <ReadingResourcesCard resource={resource} />
                  </li>
                )
              })}
            </ul>
          </details>
        )}
      </section>

      <KeepLearning
        className="mt-10 lg:mt-16"
        title="Video Resources Library"
        href="/resources/video"
        stripes="[--start:hsl(var(--color-pri-light)/.9)] dark:[--start:hsl(var(--color-pri-darker))] bg-[linear-gradient(to_bottom,var(--start),hsl(var(--color-neu-0)))]"
      />

      <LookingForMore
        description="Discover even more ways to learn and connect with the GraphQL community."
        links={[
          { href: "/community", label: "Community" },
          { href: "/learn", label: "Learn" },
        ]}
      />
    </main>
  )
}
