import { type } from "arktype"

export const topics = [
  "frontend",
  "backend",
  "federation",
  "schema-design",
  "api-platform-and-gateways",
  "developer-experience",
  "security",
  "ai",
  "monitoring",
] as const
export type Topic = (typeof topics)[number]

export const kinds = ["video", "blog", "tools-and-libraries", "guide"] as const
export type Kind = (typeof kinds)[number]

export type ResourceTag = Topic | Kind

export const ResourceMetadata = type({
  title: "string>0",
  url: "string.url",
  "kind?": type.enumerated(...kinds),
  "topics?": type.enumerated(...topics).array(),
  "description?": "string>0",
  tags: type.enumerated(...topics, ...kinds).array(),
})

export type ResourceMetadata = typeof ResourceMetadata.inferOut
