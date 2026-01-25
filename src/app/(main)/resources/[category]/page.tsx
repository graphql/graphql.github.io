import { Metadata } from "next"
import { notFound } from "next/navigation"
import type { Item } from "nextra/normalize-pages"

import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { getResourcesByTag } from "@/resources/data"
import {
  groupByKind,
  Kind,
  kinds,
  topics,
  type ResourceMetadata,
  type Topic,
} from "@/resources/types"

import { ResourcesHero } from "../resources-hero"
import { TocHeroContents } from "@/components/toc-hero"
import { BlogPostsSection } from "./blog-posts-section"
import { CategoryToolsLibrariesSection } from "./category-tools-libraries-section"
import { Breadcrumbs } from "@/_design-system/breadcrumbs"

import { sectionKindNames, categoriesConfig } from "./categories-config"
import { CardsSection } from "./cards-section"
import { DocsSection } from "./docs-section"
import { LookingForMore } from "@/components/looking-for-more"
import { unsafeKeys } from "@/app/conf/_design-system/utils/unsafe-keys"
import { CategoryWorkingGroups } from "./category-working-groups"
import { loadWorkingGroupMeetings } from "../../community/events/get-all-events"

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

  const title = `${categoriesConfig[category].heading} Resources`
  const description = categoriesConfig[category].subtitle

  return { title, description }
}

export default async function CategoryPage({ params }: { params: PageParams }) {
  const category = params.category as Topic
  if (!topics.includes(category)) return notFound()

  let sections = unsafeKeys(categoriesConfig[category].sections)
  const resources = await getResourcesByTag(category)
  const deduped = uniqueByTitle(resources)
  const grouped = groupByKind(deduped)

  if (sections.length === 0) sections = Array.from(grouped.keys())

  const activePath: Item[] = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Resource Hub",
      route: "/resources",
    },
    {
      name: categoriesConfig[category].heading,
      route: "",
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
        heading={categoriesConfig[category].heading}
        text={categoriesConfig[category].subtitle}
      >
        <TocHeroContents
          sections={sections.map(sectionLabel)}
          className="max-w-[360px] [&:has(li:nth-child(3))]:max-w-[600px]"
        />
      </ResourcesHero>

      <section className="gql-container gql-section">
        <Breadcrumbs activePath={activePath} />
      </section>

      {sections.map(key => {
        const data = grouped.get(key)

        // "event" section uses working group meetings, not resources
        if (key !== "event" && !data?.length) {
          return null
        }

        return (
          <CategorySection
            className="py-8 lg:py-16 xl:py-20 2xl:py-24"
            key={key}
            section={{ kind: key, resources: data ?? [] }}
            category={category}
          />
        )
      })}

      <LookingForMore
        description="Discover even more ways to learn and connect with the GraphQL community."
        links={[
          { href: "/community", label: "Community" },
          { href: "/learn", label: "Learn" },
        ]}
        className="my-8 lg:mb-16 lg:mt-12"
      />
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

function sectionLabel(kind: Kind) {
  return sectionKindNames[kind] ?? `${kind[0].toUpperCase()}${kind.slice(1)}`
}

function CategorySection({
  section,
  category,
  className,
}: {
  section: { kind: Kind; resources: ResourceMetadata[] }
  category: Topic
  className?: string
}) {
  switch (section.kind) {
    case "tools-and-libraries":
      return (
        <CategoryToolsLibrariesSection
          category={category}
          className={className}
        />
      )

    case "blog": {
      const blogSection = categoriesConfig[category].sections["blog"]

      return (
        <BlogPostsSection
          title={blogSection?.heading ?? "Insights from the community"}
          description={
            blogSection?.text ??
            "Stay up to date with insights from the GraphQL community."
          }
          posts={section.resources.map(resource => {
            if (!resource.date) {
              throw new Error(`Resource ${resource.title} has no .date`)
            }

            if (!resource.author) {
              throw new Error(`Resource ${resource.title} has no .author`)
            }

            return {
              href: resource.url,
              title: resource.title,
              author: resource.author,
              date: resource.date,
              tags: resource.tags.filter(
                tag => tag !== "blog" && tag !== category,
              ),
            }
          })}
          className={className}
        />
      )
    }

    case "docs": {
      const docsSection = categoriesConfig[category].sections.docs
      if (!docsSection) return null
      return <DocsSection {...docsSection} className={className} />
    }

    case "event": {
      return <CategoryWorkingGroups category={category} className={className} />
    }

    default:
      return (
        <CardsSection
          section={section}
          category={category}
          className={className}
        />
      )
  }
}
