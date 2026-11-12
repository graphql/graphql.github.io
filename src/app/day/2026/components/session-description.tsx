"use client"

import { useState, type ReactNode } from "react"

import { formatDescription } from "@/app/conf/2026/schedule/[id]/format-description"

export function SessionDescription({
  description,
  aside,
}: {
  description: string
  /** Shown next to the last paragraphs on wide screens. */
  aside?: ReactNode
}) {
  const [expanded, setExpanded] = useState(false)
  const paragraphs = parseParagraphs(description)
  const hasMore = paragraphs.length > 1
  const visible = expanded ? paragraphs : paragraphs.slice(0, 1)
  const splitAt = aside ? Math.max(0, visible.length - 2) : visible.length
  const lead = visible.slice(0, splitAt)
  const tail = visible.slice(splitAt)
  const lastInLead = tail.length === 0 ? lead.length - 1 : -1
  const lastInTail = tail.length - 1

  const toggle = hasMore && (
    <>
      {" "}
      <button
        type="button"
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        className="typography-link"
      >
        {expanded ? "Show less." : "Read more…"}
      </button>
    </>
  )

  return (
    <div className="typography-body-lg mt-8 px-2 pb-8 sm:px-3 lg:mt-12 xl:pb-12 [&>p+p]:mt-4 [&_a]:break-words">
      {lead.map((html, i) => (
        <p key={`lead-${i}`}>
          <span dangerouslySetInnerHTML={{ __html: html }} />
          {i === lastInLead && toggle}
        </p>
      ))}
      {tail.length > 0 && (
        <div className="mt-4 first:mt-0 xl:flex xl:items-end xl:gap-6">
          <div className="xl:flex-1 [&>p+p]:mt-4">
            {tail.map((html, i) => (
              <p key={`tail-${i}`}>
                <span dangerouslySetInnerHTML={{ __html: html }} />
                {i === lastInTail && toggle}
              </p>
            ))}
          </div>
          {aside && (
            <div className="hidden xl:-mb-12 xl:-mr-3 xl:block xl:w-[580px] xl:shrink-0 xl:[&>article]:border-b-0 xl:[&>article]:border-r-0 xl:[&>article]:border-t">
              {aside}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function parseParagraphs(html: string): string[] {
  const formatted = formatDescription(html)
  const matches = formatted.match(/<p>[\s\S]*?<\/p>/g)
  if (!matches) return [formatted]
  return matches.map(p => p.replace(/^<p>/, "").replace(/<\/p>$/, ""))
}
