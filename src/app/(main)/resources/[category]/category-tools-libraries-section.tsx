import path from "node:path"
import { glob } from "node:fs/promises"
import { readFile } from "node:fs/promises"

import matter from "gray-matter"
import type { CSSProperties } from "react"
import { clsx } from "clsx"

import { Button } from "@/app/conf/_design-system/button"
import blurCorner from "./blur-corner.webp"
import { Eyebrow } from "@/_design-system/eyebrow"
import slugMap from "@/code/slug-map.json"
import { type Topic } from "@/resources/types"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

import { IconSpritesheet, IconName } from "./spritesheet"
import CaretDown from "@/app/conf/_design-system/pixelarticons/caret-down.svg?svgr"

interface LibraryEntry {
  name: string
  href?: string
  group: string
  tags: string[]
}

const librariesPromise = loadLibraries()

async function loadLibraries(): Promise<LibraryEntry[]> {
  const entries: LibraryEntry[] = []

  for await (const file of glob("src/code/**/*.md")) {
    const relative = path.relative("src/code", file)
    const segments = relative.split(path.sep)
    const top = segments[0]
    const group =
      top === "language-support" ? (segments[1] ?? "language-support") : top
    if (!group) continue

    const raw = await readFile(file, "utf8")
    const { data } = matter(raw)
    const tags: string[] = Array.isArray(data.tags) ? data.tags : []
    if (!tags.includes("tools-and-libraries")) continue

    const name: string | undefined = data.name
    if (!name) continue

    const href: string | undefined =
      data.url ??
      (data.github ? `https://github.com/${data.github}` : undefined) ??
      (data.npm ? `https://npmjs.com/package/${data.npm}` : undefined)

    entries.push({ name, href, group, tags })
  }

  const deduped = entries.filter(
    (item, index, self) =>
      index ===
      self.findIndex(t => t.name.toLowerCase() === item.name.toLowerCase()),
  )

  return deduped
}

function displayName(id: string) {
  const key = id as keyof typeof slugMap

  if (key === "tools" || key === "services") {
    return "Tools / Services"
  }

  return slugMap[key] ?? id
}

export async function CategoryToolsLibrariesSection({
  category,
  className,
}: {
  category: Topic
  className?: string
}) {
  const libraries = await librariesPromise
  const filtered = libraries.filter(item => item.tags.includes(category))

  const sortedGroups = Array.from(
    filtered.reduce<Map<string, LibraryEntry[]>>((acc, item) => {
      const list = acc.get(item.group) ?? []
      list.push(item)

      if (item.group === "tools") {
        item.group = "services"
      }

      acc.set(item.group, list)
      return acc
    }, new Map()),
  )
    .map(([group, items]) => ({
      id: group,
      name: displayName(group),
      items: items
        .sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
        )
        .slice(0, 20),
    }))
    .sort((a, b) => b.items.length - a.items.length)

  const grouped: GroupData[] = sortedGroups.map((group, index) => {
    const nextLength = sortedGroups[index + 1]?.items.length ?? 0
    const columns =
      nextLength > 0 && group.items.length >= nextLength * 1.9 ? 2 : 1
    const breakIndex = columns === 2 ? Math.ceil(group.items.length / 2) : 0
    return { ...group, columns, breakIndex }
  })

  if (grouped.length === 0) {
    return null
  }

  return (
    <div className="relative bg-neu-100 dark:bg-neu-50/25">
      <Stripes />
      <section
        id="tools-and-libraries"
        className={clsx(
          "gql-container gql-section relative flex flex-col gap-8 overflow-hidden",
          grouped.length > 1 ? "" : "lg:flex-row lg:justify-between",
          className,
        )}
      >
        <div
          className={clsx(
            "flex flex-col gap-3 lg:justify-between lg:gap-y-8",
            grouped.length > 1 ? "lg:flex-row lg:items-end" : "",
          )}
        >
          <div className="flex flex-col gap-4 xl:gap-6">
            <Eyebrow className="!text-pri-base dark:!text-pri-light">
              tools & libraries
            </Eyebrow>
            <h2 className="typography-h2 text-pretty">
              {capitalizeTopic(category)} tools & libraries
            </h2>
            <p className="typography-body-md text-neu-800">
              Explore language and platform tooling to ship production-ready
              graphs.
            </p>
          </div>
          <Button
            href="/community/tools-and-libraries/"
            variant="secondary"
            className="md:w-fit [&:not(:hover)]:!bg-neu-200 dark:[&:not(:hover)]:!bg-neu-100"
          >
            See all Tools & Libraries
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 pb-2 max-md:flex-col md:flex-nowrap md:items-start">
          {distributeToColumns(grouped).map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex w-full flex-col gap-4 max-md:contents"
            >
              {column.map((group, i) => (
                <Group
                  key={group.id}
                  group={group}
                  mobileDefaultExpanded={i === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

interface GroupData {
  id: string
  name: string
  items: LibraryEntry[]
  columns: 1 | 2
  breakIndex: number
}

function distributeToColumns(groups: GroupData[]): [GroupData[], GroupData[]] {
  const left: GroupData[] = []
  const right: GroupData[] = []

  let leftHeight = 0
  let rightHeight = 0

  for (const group of groups) {
    const itemRows =
      group.columns === 2
        ? Math.ceil(group.items.length / 2)
        : group.items.length
    const height = itemRows + 1
    if (leftHeight <= rightHeight) {
      left.push(group)
      leftHeight += height
    } else {
      right.push(group)
      rightHeight += height
    }
  }

  return [left, right]
}

function Group({
  group,
  mobileDefaultExpanded,
}: {
  group: GroupData
  mobileDefaultExpanded: boolean
}) {
  // When odd count in 2-column layout, last item spans full width
  const isOddTwoColumn = group.columns === 2 && group.items.length % 2 === 1
  // Adjust break index: exclude spanning item from column distribution
  const effectiveBreakIndex = isOddTwoColumn
    ? Math.ceil((group.items.length - 1) / 2)
    : group.breakIndex

  return (
    <div className="group/item shrink-0 grow border border-neu-200 bg-neu-50 dark:border-neu-100 dark:bg-neu-50/25 lg:min-w-0 xl:min-w-[480px]">
      <input
        type="checkbox"
        id={`group-${group.id}`}
        className="peer sr-only"
        defaultChecked={mobileDefaultExpanded}
      />
      <label
        htmlFor={`group-${group.id}`}
        className="typography-body-lg flex cursor-pointer items-center border-inherit bg-neu-50 text-neu-900 peer-checked:border-b dark:bg-transparent md:pointer-events-none md:cursor-default md:border-b"
      >
        <div className="border-r border-inherit p-2 lg:p-3">
          <IconSpritesheet
            sprite={group.id as IconName}
            className="size-8 text-neu-800 dark:text-neu-700 lg:size-10"
          />
        </div>
        <div className="p-2 lg:px-4 lg:py-3">{group.name}</div>
        <div className="ml-auto flex aspect-square h-12 shrink-0 items-center justify-center border-l border-inherit p-2 md:hidden">
          <CaretDown className="size-6 shrink-0 fill-neu-700 group-has-[:checked]/item:rotate-180" />
        </div>
      </label>
      <ul
        className="divide-y divide-neu-200 [column-gap:0] dark:divide-neu-100 max-md:hidden peer-checked:max-md:block md:block lg:[column-count:var(--item-columns,1)]"
        style={{ "--item-columns": group.columns } as CSSProperties}
      >
        {group.items.map((item, i) => {
          const isLastItem = i === group.items.length - 1
          const spansFullWidth = isOddTwoColumn && isLastItem
          const isAtBreak = i === effectiveBreakIndex
          const isInSecondColumn = !spansFullWidth && i >= effectiveBreakIndex

          return (
            <li
              key={`${group.id}-${item.name}`}
              className={clsx(
                spansFullWidth && "lg:[column-span:all]",
                group.columns === 2 && isInSecondColumn && "lg:border-l",
                group.columns === 2 && isAtBreak && "lg:!border-t-0",
              )}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="flex items-center justify-between bg-neu-0/40 px-4 py-3 text-neu-900 transition-colors hover:bg-neu-0 hover:duration-0"
                >
                  {item.name}
                </a>
              ) : (
                <span className="flex items-center justify-between bg-neu-0/40 px-4 py-3 text-neu-900">
                  {item.name}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Stripes() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[542px]"
      style={{
        maskImage: `url(${blurCorner.src})`,
        WebkitMaskImage: `url(${blurCorner.src})`,
        maskSize: "62% 62%",
        WebkitMaskSize: "62% 62%",
        maskPosition: "top right",
        WebkitMaskPosition: "top right",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(90deg,hsl(var(--color-pri-lighter))_0_12px,hsl(var(--color-pri-light))_12px_24px)] dark:bg-[linear-gradient(90deg,hsl(var(--color-sec-dark)/0.22)_0_12px,hsl(var(--color-sec-base)/0.22)_12px_24px)]"
        oddClassName="bg-[linear-gradient(90deg,hsl(var(--color-pri-light))_0_12px,hsl(var(--color-pri-base)/0)_12px_24px)] dark:bg-[linear-gradient(90deg,hsl(var(--color-sec-base)/0.14)_0_12px,hsl(var(--color-sec-light)/0.14)_12px_24px)]"
        angle="-90deg"
      />
    </div>
  )
}

function capitalizeTopic(topic: Topic) {
  if (topic === "ai") return "AI"
  return topic.charAt(0).toUpperCase() + topic.slice(1)
}
