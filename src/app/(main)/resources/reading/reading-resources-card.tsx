import type { ComponentType, SVGProps } from "react"

import { ResourceHubCard } from "../resource-hub-card"
import type { ResourceMetadata } from "@/resources/types"

import NewspaperIcon from "../assets/newspaper.svg?svgr"
import WriteIcon from "../assets/write-note.svg?svgr"
import BookIcon from "../assets/bookmark.svg?svgr"

type CornerIcon = ComponentType<SVGProps<SVGElement>>

type ReadingKind = "book" | "blog-or-newsletter" | "blog" | "guide"

const readingKindConfig: Record<
  ReadingKind,
  { label: string; color: string; Icon: CornerIcon }
> = {
  book: { label: "books", color: "#00C6AC", Icon: BookIcon },
  "blog-or-newsletter": {
    label: "blogs & newsletters",
    color: "hsl(var(--color-pri-base))",
    Icon: NewspaperIcon,
  },
  blog: { label: "blog posts", color: "#FF8800", Icon: WriteIcon },
  guide: { label: "guides", color: "#FF8800", Icon: WriteIcon },
}

function pickReadingKind(resource: ResourceMetadata): ReadingKind | undefined {
  const candidates: ReadingKind[] = [
    "book",
    "blog-or-newsletter",
    "guide",
    "blog",
  ]
  return candidates.find((candidate): candidate is ReadingKind =>
    resource.tags.includes(candidate),
  )
}

export function ReadingResourcesCard({
  resource,
}: {
  resource: ResourceMetadata
}) {
  const kind = pickReadingKind(resource)
  const config = kind ? readingKindConfig[kind] : undefined

  return (
    <ResourceHubCard
      href={resource.url}
      title={resource.title}
      author={resource.author}
      authorPlacement="body"
      tags={resource.tags}
      icon={
        config ? (
          <config.Icon
            className="size-6 md:size-8"
            style={{ color: config.color }}
            aria-hidden
          />
        ) : null
      }
    />
  )
}
