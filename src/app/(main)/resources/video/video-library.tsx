"use client"

import { useMemo, useState } from "react"
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react"
import { clsx } from "clsx"

import { Button } from "@/app/conf/_design-system/button"
import { Tag } from "@/app/conf/_design-system/tag"
import CaretDownIcon from "@/app/conf/_design-system/pixelarticons/caret-down.svg?svgr"
import { CheckboxIcon } from "@/app/conf/_design-system/pixelarticons/checkbox-icon"
import { type ResourceMetadata, topics, type Topic } from "@/resources/types"

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
    <div className={clsx("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-4 border-b border-neu-200 pb-6 dark:border-neu-100 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 lg:w-full lg:flex-row lg:items-end lg:gap-6">
          <TopicsCombobox
            label="Topics"
            options={topicOptions}
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
                className="typography-body-sm w-full bg-transparent px-3 py-2 outline-none"
              >
                <option value="az">Title A–Z</option>
                <option value="za">Title Z–A</option>
              </select>
              <CaretDownIcon className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-neu-500" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-sm uppercase text-neu-700">
            {filtered.length} videos
          </span>
          {selectedTopics.length > 0 && (
            <Button
              variant="tertiary"
              className="h-fit items-center gap-x-2 bg-neu-100 !p-2 text-neu-700 hover:bg-neu-200/80 hover:text-neu-900"
              onClick={() => setSelectedTopics([])}
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(resource => {
          return (
            <li key={resource.url}>
              <ResourceHubCard
                href={resource.url}
                title={resource.title}
                author={resource.author}
                tags={resource.tags.filter(tag => tag !== "video")}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function TopicsCombobox({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string[]
  onChange: (next: string[]) => void
}) {
  const [query, setQuery] = useState("")

  const filteredOptions =
    query === ""
      ? options
      : options.filter(option =>
          option.toLowerCase().includes(query.toLowerCase()),
        )

  return (
    <Combobox immediate multiple value={value} onChange={onChange}>
      <div className="flex flex-col gap-2 lg:w-full">
        <span className="typography-menu font-mono font-medium uppercase text-neu-900">
          {label}
        </span>
        <label className="relative w-full border border-neu-500 bg-neu-0 p-2 focus-within:outline-none focus-within:ring focus-within:ring-neu-300 dark:border-neu-200 dark:bg-neu-0/50 dark:focus-within:ring-neu-200">
          <ComboboxInput
            value={query}
            onChange={event => setQuery(event.target.value)}
            className="typography-body-sm bg-transparent leading-none text-neu-800 !outline-offset-0 max-lg:typography-body-md placeholder:text-neu-600 focus:outline-none"
            placeholder="Any topic"
            autoComplete="true"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
            <CaretDownIcon
              className="ui-open:rotate-180 size-5 text-neu-400 transition-transform duration-150 group-hover:text-neu-500"
              aria-hidden="true"
            />
          </ComboboxButton>

          {value.length > 0 && (
            <div className="inset-y-0 left-0 z-[1] mt-1 flex items-center overflow-x-auto pr-8">
              <div className="flex flex-wrap items-center gap-1">
                {value.map(topic => (
                  <Tag
                    key={topic}
                    color="hsl(var(--color-neu-500))"
                    className="bg-neu-0"
                  >
                    {topic.replaceAll("-", " ")}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </label>

        <div className="relative">
          <ComboboxOptions className="absolute z-10 -mt-px max-h-60 w-full overflow-auto border border-neu-500 bg-neu-0 p-1 text-base">
            {filteredOptions.map(option => (
              <ComboboxOption key={option} value={option}>
                {({ active, selected }) => (
                  <TopicOption
                    active={active}
                    selected={selected}
                    option={option}
                  />
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </div>
    </Combobox>
  )
}

function TopicOption({
  active,
  selected,
  option,
}: {
  active: boolean
  selected: boolean
  option: string
}) {
  return (
    <div
      className={[
        "typography-body-sm relative flex cursor-default select-none items-center p-1 font-sans",
        active ? "bg-neu-100 dark:bg-neu-50" : "",
      ].join(" ")}
    >
      <CheckboxIcon
        className={["size-5 shrink-0", active ? "text-neu-700" : ""].join(" ")}
        checked={selected}
      />
      <div className="min-w-0 flex-1 overflow-hidden pl-1 [container-type:inline-size]">
        <span
          className={[
            "relative block w-fit min-w-full whitespace-nowrap pt-px transition-all [--delta-x:calc(-100%+100cqi)]",
            active ? "animate-show-overflow" : "",
          ].join(" ")}
        >
          {option}
        </span>
      </div>
    </div>
  )
}
