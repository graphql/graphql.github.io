import path from "node:path"
import { glob } from "node:fs/promises"
import { readFile } from "node:fs/promises"
import matter from "gray-matter"

import type { CSSProperties } from "react"
import { Button } from "@/app/conf/_design-system/button"
import blurCorner from "./blur-corner.webp"
import { Eyebrow } from "@/_design-system/eyebrow"
import slugMap from "@/code/slug-map.json"
import { type Topic } from "@/resources/types"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

import { icons } from "./icons"
import { ChevronRight } from "@/app/conf/_design-system/pixelarticons/chevron-right"

interface LibraryEntry {
  name: string
  href?: string
  group: string
  icon: React.ReactNode
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
  return slugMap[key] ?? id
}

export async function CategoryToolsLibrariesSection({
  category,
}: {
  category: Topic
}) {
  const libraries = await librariesPromise
  const filtered = libraries.filter(item => item.tags.includes(category))

  const grouped = Array.from(
    filtered.reduce<Map<string, LibraryEntry[]>>((acc, item) => {
      const list = acc.get(item.group) ?? []
      list.push(item)
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

  if (grouped.length === 0) {
    return null
  }

  return (
    <div className="relative bg-neu-100 dark:bg-neu-50/25">
      <Stripes />
      <section
        id="tools-and-libraries"
        className="gql-container gql-section relative flex flex-col gap-8 overflow-hidden"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow className="!text-pri-base dark:!text-pri-light">
              key tools & libraries
            </Eyebrow>
            <h2 className="typography-h3 text-pretty">
              Build GraphQL with tools and libraries
            </h2>
            <p className="typography-body-md text-neu-800">
              Explore language and platform tooling to ship production-ready
              graphs.
            </p>
          </div>
          <Button href="/code" variant="primary" className="w-fit">
            See all Tools & Libraries
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 pb-2 lg:overflow-visible">
          {grouped.map((group, index) => {
            const nextLength = grouped[index + 1]?.items.length ?? 0
            const columns =
              nextLength > 0 && group.items.length >= nextLength * 1.9 ? 2 : 1
            const listStyle = { "--item-columns": columns } as CSSProperties
            const breakIndex =
              columns === 2 ? Math.floor(group.items.length / 2) : 0

            const Icon = icons[group.id]

            return (
              <div
                key={group.id}
                className="min-w-[480px] shrink-0 grow border border-neu-200 bg-neu-50 dark:bg-neu-50/50 lg:w-1/3 lg:min-w-0"
              >
                <div className="typography-body-lg flex items-center gap-3 border-b border-inherit bg-neu-50 px-4 py-3 text-neu-900">
                  {Icon && (
                    <div className="border-r border-inherit p-3">
                      <Icon className="size-10" />
                    </div>
                  )}
                  {group.name}
                  <div className="border-l border-inherit p-3 max-md:hidden">
                    {/* TODO: On mobile */}
                    <ChevronRight className="rotate-90" />
                  </div>
                </div>
                <ul
                  className="gap-0 divide-y divide-neu-200 dark:divide-neu-100 lg:[column-count:var(--item-columns,1)]"
                  style={listStyle}
                >
                  {group.items.map((item, i) => (
                    <li
                      key={`${group.id}-${item.name}`}
                      style={{
                        borderTop: breakIndex === i ? "none" : "",
                        borderLeftWidth: breakIndex >= i ? "1px" : "",
                      }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-center justify-between bg-neu-0/40 px-4 py-3 text-neu-900 transition-colors hover:bg-neu-0 hover:duration-0"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span className="flex items-center justify-between bg-neu-50 px-4 py-3 text-neu-900">
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
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
