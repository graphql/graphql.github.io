import { Metadata } from "next"
import { notFound } from "next/navigation"
import type { Item } from "nextra/normalize-pages"

import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { getResourcesByTag } from "@/resources/data"
import {
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

import { sectionKindNames, texts } from "./texts"
import { CardsSection } from "./cards-section"

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

  const title = `${texts[category].heading} Resources`
  const description = texts[category].subtitle

  return { title, description }
}

export default async function CategoryPage({ params }: { params: PageParams }) {
  const category = params.category as Topic
  if (!topics.includes(category)) return notFound()

  const resources = await getResourcesByTag(category)
  const deduped = uniqueByTitle(resources)
  const grouped = groupByKind(deduped)

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
      name: texts[category].heading,
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
        heading={texts[category].heading}
        text={texts[category].subtitle}
      >
        <TocHeroContents
          sections={grouped.map(section => sectionLabel(section.kind))}
          className="max-w-[528px]"
        />
      </ResourcesHero>

      <section className="gql-container gql-section">
        <Breadcrumbs activePath={activePath} />
      </section>

      {grouped.map(section => (
        <CategorySection
          key={section.kind}
          section={section}
          category={category}
        />
      ))}
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
    return <CategoryToolsLibrariesSection category={category} />
  }

  if (section.kind === "blog") {
    const blogSection = texts[category].sections["blog-or-newsletter"]
    return (
      <BlogPostsSection
        title={blogSection?.heading ?? "Insights from the community"}
        description={
          blogSection?.text ??
          "Stay up to date with insights from the GraphQL community."
        }
        posts={section.resources.map(resource => ({
          href: resource.url,
          title: resource.title,
          author: resource.author ?? "GraphQL Community",
          tags: resource.tags.filter(tag => tag !== "blog" && tag !== category),
        }))}
      />
    )
  }

  return <CardsSection section={section} category={category} />
}
