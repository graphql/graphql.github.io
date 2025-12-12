import { Metadata } from "next"
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
import { ResourcesHero } from "../resources-hero"
import { TocHeroContents } from "@/components/toc-hero"
import { Eyebrow } from "@/_design-system/eyebrow"
import { ResourceHubCard } from "../resource-hub-card"
import { BlogPostsSection } from "./blog-posts-section"
import { CategoryToolsLibrariesSection } from "./category-tools-libraries-section"

const sectionKindNames: Record<Kind, string> = {
  video: "Featured videos",
  blog: "Blog posts",
  "tools-and-libraries": "Tools & Libraries",
  guide: "Guides",
  book: "Books",
  "blog-or-newsletter": "Blogs & Newsletters",
}

// TODO: I'd prefer to have this in JSX over "JSON" objects
const blogTitles: Partial<Record<Topic, string>> = {
  frontend: "Insights for frontend devs",
  backend: "Insights for backend devs",
}

const blogDescriptions: Partial<Record<Topic, string>> = {
  frontend: "Stay up to date with insights from the GraphQL community.",
  backend: "Stay up to date with insights from the GraphQL community.",
}

function sectionHeading(
  section: { kind: Kind; resources: ResourceMetadata[] },
  category: Topic,
) {
  if (section.kind === "video") {
    if (category === "frontend") return "Master GraphQL on the frontend"
    // todo: paragraph: "Watch talks and tutorials from GraphQL Conf and community experts. See how teams integrate GraphQL on the frontend and learn from real-world case studies."
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
    return (
      <BlogPostsSection
        title={blogTitles[category] ?? "Insights from the community"}
        description={
          blogDescriptions[category] ??
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

  return (
    <section
      id={sectionKindNames[section.kind].toLowerCase().replace(/ /g, "-")}
      className="gql-container gql-section flex flex-col gap-6"
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

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {section.resources.map(resource => (
          <li key={resource.url}>
            <ResourceHubCard
              href={resource.url}
              title={resource.title}
              author={resource.author}
              tags={resource.tags}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
