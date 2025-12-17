"use client"

import SearchIcon from "@/app/conf/_design-system/pixelarticons/search.svg?svgr"
import type { ResourceMetadata } from "@/resources/types"
import clsx from "clsx"
import { useState, useTransition } from "react"

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
    resource.kind,
    resource.description,
    ...resource.tags,
  ].join(" ")
  return fuzzyMatch(searchable, query)
}

function Cell({ children }: { children: string | undefined }) {
  if (!children) return <td className="px-2 py-1" />
  return (
    <td className="max-w-[200px] truncate px-2 py-1" title={children}>
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
  const [isPending, startTransition] = useTransition()

  const filtered = resources.filter(r => matchesSearch(r, query))

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
      <table className="w-full font-mono text-sm">
        <thead className="typography-menu text-pri-base dark:text-pri-light">
          <tr>
            <th className="whitespace-nowrap px-2 py-1 text-left">Title</th>
            <th className="whitespace-nowrap px-2 py-1 text-left">URL</th>
            <th className="whitespace-nowrap px-2 py-1 text-left">Author</th>
            <th className="whitespace-nowrap px-2 py-1 text-left">Kind</th>
            <th className="whitespace-nowrap px-2 py-1 text-left">
              Description
            </th>
            <th className="whitespace-nowrap px-2 py-1 text-left">Duration</th>
            <th className="whitespace-nowrap px-2 py-1 text-left">Tags</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((resource, i) => (
            <tr key={i} className="border-t border-neu-200">
              <Cell>{resource.title}</Cell>
              <Cell>{resource.url}</Cell>
              <Cell>{resource.author}</Cell>
              <Cell>{resource.kind}</Cell>
              <Cell>{resource.description}</Cell>
              <Cell>{resource.duration}</Cell>
              <Cell>{resource.tags.join(", ")}</Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
