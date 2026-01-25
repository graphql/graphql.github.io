import type { ComponentType, SVGProps } from "react"

import { ResourceHubCard } from "../resource-hub-card"
import type { ResourceMetadata } from "@/resources/types"
import { tagColors } from "@/app/conf/_design-system/tag-colors"

import NewspaperIcon from "../assets/newspaper.svg?svgr"
import WriteIcon from "../assets/write-note.svg?svgr"
import BookIcon from "../assets/bookmark.svg?svgr"

type CornerIcon = ComponentType<SVGProps<SVGElement>>

type ReadingKind = "book" | "blog-or-newsletter" | "blog" | "guide"

const readingKindIcons: Record<ReadingKind, CornerIcon> = {
  book: BookIcon,
  "blog-or-newsletter": NewspaperIcon,
  blog: WriteIcon,
  guide: WriteIcon,
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
  const Icon = kind ? readingKindIcons[kind] : undefined
  const firstTag = resource.tags[0]
  const color = firstTag
    ? tagColors[firstTag as keyof typeof tagColors]
    : undefined

  return (
    <ResourceHubCard
      href={resource.url}
      title={resource.title}
      author={resource.author}
      authorPlacement="body"
      tags={resource.tags}
      icon={
        Icon ? (
          <Icon className="size-6 md:size-8" style={{ color }} aria-hidden />
        ) : null
      }
    />
  )
}
