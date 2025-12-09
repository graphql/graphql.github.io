import type { ComponentType, SVGProps } from "react"

import BookmarkIcon from "../assets/bookmark.svg?svgr"
import InfoIcon from "@/app/conf/_design-system/pixelarticons/info.svg?svgr"
import NotesIcon from "@/app/conf/_design-system/pixelarticons/notes.svg?svgr"
import { ResourceHubCard } from "../resource-hub-card"
import type { ResourceMetadata } from "@/resources/types"

type CornerIcon = ComponentType<SVGProps<SVGElement>>

type ReadingKind = "book" | "blog-or-newsletter" | "blog" | "guide"

const readingKindConfig: Record<
  ReadingKind,
  { label: string; color: string; Icon: CornerIcon }
> = {
  book: { label: "books", color: "#00C6AC", Icon: BookmarkIcon },
  "blog-or-newsletter": {
    label: "blogs & newsletters",
    color: "hsl(var(--color-pri-base))",
    Icon: NotesIcon,
  },
  blog: { label: "blog posts", color: "#FF8800", Icon: NotesIcon },
  guide: { label: "guides", color: "#FF8800", Icon: InfoIcon },
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
      tags={
        config
          ? [
              {
                label: config.label,
                color: config.color,
              },
            ]
          : undefined
      }
      icon={
        config ? (
          <div
            className="flex size-12 items-center justify-center text-[color:var(--icon-color)]"
            style={{ ["--icon-color" as string]: config.color }}
          >
            <config.Icon className="size-8" aria-hidden />
          </div>
        ) : null
      }
    />
  )
}
