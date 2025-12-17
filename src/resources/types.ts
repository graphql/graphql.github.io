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
] as const
export type Kind = (typeof kinds)[number]

export type ResourceTag = Topic | Kind

export const ResourceMetadata = type({
  title: "string>0",
  url: type("string.url").or("/^\\/.+$/"),
  "author?": "string",
  "kind?": type.enumerated(...kinds),
  "topics?": type.enumerated(...topics).array(),
  "description?": "string>0",
  "duration?": "string",
  tags: type.enumerated(...Object.keys(tagColors)).array(),
})

export type ResourceMetadata = typeof ResourceMetadata.inferOut
