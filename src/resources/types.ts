import { tagColors } from "@/app/conf/_design-system/tag-colors"
import { type } from "arktype"

export const topics = [
  "frontend",
  "backend",
  "federation",
  "security",
  "ai",
  "monitoring",
] as const
export type Topic = (typeof topics)[number]

export const kinds = [
  "video",
  "blog",
  "tools-and-libraries",
  "guide",
  "book",
  "blog-or-newsletter",
  "docs",
  "event",
  "list",
  "post",
] as const
export type Kind = (typeof kinds)[number]

export type ResourceTag = Topic | Kind

const POSTS_TAGS = ["blog", "post", "guide", "list"]
export function getResourceKind({
  tags,
  title,
  origin,
}: ResourceMetadata): Kind {
  // Blog posts from GraphQL.org are shown separately from other "Reading" resources.
  if (origin === "/blog") {
    return "blog"
  }

  // We don't have separate tabs for posts, guides and lists.
  if (POSTS_TAGS.some(tag => tags.includes(tag))) {
    return "post"
  }

  const kind = kinds.find(kind => tags.includes(kind))
  if (!kind) {
    throw new Error(
      `Unknown kind for tags: ${tags.join(", ")} in "${title}". Won't be able to group the resource.`,
    )
  }

  return kind
}

export function groupByKind(resources: ResourceMetadata[]) {
  const res = new Map<Kind, ResourceMetadata[]>()

  for (const resource of resources) {
    const kind = getResourceKind(resource)
    res.get(kind)?.push(resource) ?? res.set(kind, [resource])
  }

  return res
}

export const ResourceMetadata = type({
  origin: type.enumerated("/blog", "/data", "/events", "$tools", "$docs"),

  title: "string>0",
  url: type("string.url").or("/^\\/.+$/"),
  "author?": "string",
  "topics?": type.enumerated(...topics).array(),
  "description?": "string>0",
  "duration?": "string",
  tags: type.enumerated(...Object.keys(tagColors)).array(),
  date: "Date?",
})

export type ResourceMetadata = typeof ResourceMetadata.inferOut
