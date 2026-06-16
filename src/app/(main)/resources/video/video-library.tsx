"use client"

import { useMemo, useState } from "react"
import { clsx } from "clsx"

import { Button } from "@/app/conf/_design-system/button"
import { Tag } from "@/app/conf/_design-system/tag"
import CaretDownIcon from "@/app/conf/_design-system/pixelarticons/caret-down.svg?svgr"
import { type ResourceMetadata, topics, type Topic } from "@/resources/types"
import { tagColors } from "@/app/conf/_design-system/tag-colors"

import { ResourceHubCard } from "../resource-hub-card"

interface VideoLibraryProps {
  resources: ResourceMetadata[]
  className?: string
}

type SortOrder = "az" | "za"

export function VideoLibrary({ resources, className }: VideoLibraryProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<SortOrder>("az")

  const topicOptions = useMemo(() => {
    const allowed = new Set<Topic>(topics)
    const found = new Set<string>()
    resources.forEach(resource => {
      resource.tags.forEach(tag => {
        if (allowed.has(tag as Topic)) {
          found.add(tag)
        }
      })
    })
    return Array.from(found).sort((a, b) =>
      a.localeCompare(b, "en", { sensitivity: "base" }),
    )
  }, [resources])

  const filtered = useMemo(() => {
    const filteredByTopic =
      selectedTopics.length === 0
        ? resources
        : resources.filter(resource =>
            resource.tags.some(tag => selectedTopics.includes(tag)),
          )

    const sorted = [...filteredByTopic].sort((a, b) =>
      sortOrder === "az"
        ? a.title.localeCompare(b.title, "en", { sensitivity: "base" })
        : b.title.localeCompare(a.title, "en", { sensitivity: "base" }),
    )

    return sorted
  }, [resources, selectedTopics, sortOrder])

  return (
    <section
      className={clsx(
        "gql-section gql-container flex flex-col gap-4",
        className,
      )}
    >
      <div className="flex flex-col gap-4 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 lg:w-full lg:flex-row lg:items-end lg:gap-6">
          <TopicsFilter
            label="Topics"
            options={topicOptions}
            resources={resources}
            value={selectedTopics}
            onChange={setSelectedTopics}
          />

          <div className="flex flex-col gap-2 lg:w-52">
            <span className="typography-menu font-mono font-medium uppercase text-neu-900">
              Sort
            </span>
            <div className="relative border border-neu-500 bg-neu-0 text-neu-800 focus-within:ring focus-within:ring-neu-300 dark:border-neu-200 dark:bg-neu-0/50 dark:focus-within:ring-neu-200">
              <select
                value={sortOrder}
                onChange={event =>
                  setSortOrder(event.target.value as SortOrder)
                }
                className="typography-body-sm w-full appearance-none bg-transparent px-3 py-2 outline-none"
              >
                <option value="az">Title A–Z</option>
                <option value="za">Title Z–A</option>
              </select>
              <CaretDownIcon className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-neu-500" />
            </div>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.slice(0, 6).map(resource => {
          return (
            <li key={resource.url}>
              <ResourceHubCard
                href={resource.url}
                title={resource.title}
                author={resource.author}
                tags={resource.tags.filter(tag => tag !== "video")}
                duration={resource.duration}
              />
            </li>
          )
        })}
      </ul>
      {filtered.length > 6 && (
        <details className="group">
          {/* we're using <details> for SEO and Cmd+F support */}
          <summary className="pointer-events-none mt-2 flex list-none items-center justify-center group-open:hidden">
            <Button
              as="span"
              variant="primary"
              className="pointer-events-auto w-fit cursor-pointer"
            >
              Load more
            </Button>
          </summary>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.slice(6).map(resource => {
              return (
                <li key={resource.url}>
                  <ResourceHubCard
                    href={resource.url}
                    title={resource.title}
                    author={resource.author}
                    tags={resource.tags.filter(tag => tag !== "video")}
                    duration={resource.duration}
                  />
                </li>
              )
            })}
          </ul>
        </details>
      )}
    </section>
  )
}

function TopicsFilter({
  label,
  options,
  resources,
  value,
  onChange,
}: {
  label: string
  options: string[]
  resources: ResourceMetadata[]
  value: string[]
  onChange: (next: string[]) => void
}) {
  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    resources.forEach(resource => {
      resource.tags.forEach(tag => {
        if (options.includes(tag)) {
          counts[tag] = (counts[tag] || 0) + 1
        }
      })
    })
    return counts
  }, [resources, options])

  const toggleTopic = (topic: string) => {
    if (value.includes(topic)) {
      onChange(value.filter(t => t !== topic))
    } else {
      onChange([...value, topic])
    }
  }

  const hasSelection = value.length > 0

  return (
    <section className="flex flex-col gap-2 lg:w-full">
      <h3 className="typography-menu font-mono font-medium uppercase text-neu-900">
        {label}
      </h3>
      <ul className="flex gap-2 pb-2 max-sm:overflow-auto sm:flex-wrap">
        {options.map((topic, i) => {
          const isSelected = value.includes(topic)
          const count = topicCounts[topic] || 0
          return (
            <li key={topic}>
              <button
                type="button"
                onClick={() => toggleTopic(topic)}
                data-active={isSelected ? "" : undefined}
                tabIndex={i === 0 ? 0 : -1}
                className={clsx(
                  "gql-focus-visible -m-1 flex p-1 !outline-offset-0 ring-inset ring-neu-400 transition-opacity duration-75 hover:opacity-100 hover:ring dark:ring-neu-50",
                  hasSelection && !isSelected && "opacity-50",
                )}
                onKeyDown={arrowsMoveSideways}
              >
                <Tag color={tagColors[topic as keyof typeof tagColors]}>
                  {topic.replaceAll("-", " ")} ({count})
                </Tag>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function arrowsMoveSideways(event: React.KeyboardEvent) {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    const target = event.currentTarget as HTMLElement
    const sibling =
      event.key === "ArrowLeft"
        ? target.parentElement?.previousElementSibling?.querySelector("button")
        : target.parentElement?.nextElementSibling?.querySelector("button")
    if (sibling instanceof HTMLElement) {
      sibling.focus()
    }
  }
}
