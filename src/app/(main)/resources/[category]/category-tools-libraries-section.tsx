import path from "node:path"
import { glob } from "node:fs/promises"
import { readFile } from "node:fs/promises"
import matter from "gray-matter"

import { clsx } from "clsx"
import { Button } from "@/app/conf/_design-system/button"
import { Eyebrow } from "@/_design-system/eyebrow"
import slugMap from "@/code/slug-map.json"
import { type Topic } from "@/resources/types"

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

  return entries
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
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))

  if (grouped.length === 0) {
    return null
  }

  const desktopLayoutClass =
    grouped.length > 2 ? "lg:grid lg:grid-cols-1 lg:gap-6" : "lg:grid lg:grid-cols-2 lg:gap-6"

  return (
    <section
      id="tools-and-libraries"
      className="flex flex-col gap-8 border border-sec-base bg-sec-lighter p-6 dark:border-sec-darker dark:bg-sec-darker/15 lg:gap-10 lg:p-10"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <Eyebrow className="!text-sec-darker dark:!text-sec-light">
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
        <Button href="/code" variant="tertiary" className="w-fit">
          See all Tools & Libraries
        </Button>
      </div>

      <div
        className={clsx(
          "flex gap-4 overflow-x-auto pb-2 lg:overflow-visible",
          desktopLayoutClass,
        )}
      >
        {grouped.map(group => (
          <div
            key={group.id}
            className="min-w-[280px] shrink-0 border border-neu-200 bg-neu-0 shadow-[0_1px_0_#E5E7EB] dark:border-neu-100 dark:bg-neu-0/60 lg:min-w-0"
          >
            <div className="flex items-center gap-3 border-b border-neu-200 px-4 py-3 text-neu-900 dark:border-neu-100">
              <span className="font-mono text-sm uppercase text-neu-700">
                {group.name}
              </span>
            </div>
            <ul className="divide-y divide-neu-200 dark:divide-neu-100">
              {group.items.map(item => (
                <li key={`${group.id}-${item.name}`}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-neu-900 transition-colors hover:bg-neu-50 dark:hover:bg-neu-50/50"
                    >
                      <span>{item.name}</span>
                      <span aria-hidden className="text-neu-500">
                        →
                      </span>
                    </a>
                  ) : (
                    <span className="flex items-center justify-between px-4 py-3 text-neu-900">
                      <span>{item.name}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
