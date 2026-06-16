"use client"

import SearchIcon from "@/app/conf/_design-system/pixelarticons/search.svg?svgr"
import type { ResourceMetadata } from "@/resources/types"
import clsx from "clsx"
import { ReactNode, useState, useTransition } from "react"

function fuzzyMatch(text: string, query: string): boolean {
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  let queryIndex = 0
  for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++
    }
  }
  return queryIndex === lowerQuery.length
}

function matchesSearch(resource: ResourceMetadata, query: string): boolean {
  if (!query) return true
  const searchable = [
    resource.title,
    resource.url,
    resource.author,
    resource.description,
    ...resource.tags,
  ].join(" ")
  return fuzzyMatch(searchable, query)
}

type TooltipState = {
  content: ReactNode
  x: number
  y: number
} | null

type CellProps = {
  children: ReactNode | undefined
  onMouseMove: (e: React.MouseEvent, content: ReactNode) => void
  onMouseLeave: () => void
  className?: string
}

function Cell({ children, onMouseMove, onMouseLeave, className }: CellProps) {
  if (!children) return <td className="px-2 py-1" />
  return (
    <td
      className={clsx(
        "max-w-[200px] cursor-copy truncate px-2 py-1",
        className,
      )}
      onMouseMove={e => onMouseMove(e, children)}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </td>
  )
}

type ResourcesTableProps = {
  resources: ResourceMetadata[]
}

export function ResourcesTable({ resources }: ResourcesTableProps) {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  const [_isPending, startTransition] = useTransition()
  const [tooltip, setTooltip] = useState<TooltipState>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const filtered = resources.filter(r => matchesSearch(r, query))

  const handleMouseMove = (e: React.MouseEvent, content: ReactNode) => {
    setTooltip({ content, x: e.clientX, y: e.clientY })
  }

  const handleMouseLeave = () => {
    setTooltip(null)
  }

  const handleRowClick = async (resource: ResourceMetadata, index: number) => {
    const json = JSON.stringify(resource, null, 2)
    await navigator.clipboard.writeText(json)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  return (
    <div className="p-4">
      <label className="mb-4 flex items-center gap-2 border border-neu-300 bg-neu-0 p-2 focus-within:gql-focus-outline">
        <SearchIcon className="size-5 text-neu-800" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          autoFocus
          onChange={e => {
            setSearch(e.target.value)
            startTransition(() => setQuery(e.target.value))
          }}
          className="w-full bg-transparent font-mono text-sm placeholder:text-neu-600 focus:outline-none dark:placeholder:text-neu-400"
        />
      </label>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full font-mono text-sm">
          <thead className="typography-menu text-pri-base dark:text-pri-light">
            <tr>
              <th className="whitespace-nowrap px-2 py-1 text-left font-medium">
                Title
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-left font-medium">
                URL
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-left font-medium">
                Tags
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-left font-medium">
                Author
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-left font-medium">
                Description
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-left font-medium">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((resource, i) => (
              <tr
                key={i}
                className={clsx(
                  "cursor-pointer border-t border-neu-200 transition-colors hover:bg-neu-50/50 hover:duration-0",
                  copiedIndex === i && "bg-green-100 dark:bg-green-900/30",
                )}
                onClick={() => handleRowClick(resource, i)}
              >
                <Cell
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {resource.title}
                </Cell>
                <Cell
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {resource.url}
                </Cell>
                <Cell
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="flex gap-1"
                >
                  {resource.tags.map(tag => (
                    <span key={tag} className="border border-neu-50 text-xs">
                      {tag}
                    </span>
                  ))}
                </Cell>
                <Cell
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {resource.author}
                </Cell>
                <Cell
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {resource.description}
                </Cell>
                <Cell
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {resource.duration}
                </Cell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 max-w-md border border-neu-50 bg-neu-0/50 px-2 py-1 font-mono text-sm shadow-lg backdrop-blur-md"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y + 12,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  )
}
