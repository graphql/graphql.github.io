import { clsx } from "clsx"
import NextHead from "next/head"
import NextLink from "next/link"
import { Collapse, getComponents, useConfig } from "nextra-theme-docs"
import { evaluate } from "nextra/components"
import { useMounted } from "nextra/hooks"
import { memo, useCallback, useEffect, useMemo, useState } from "react"

import { Card } from "@/components"
import { CheckboxTree, type CheckboxTreeItem } from "@/components/checkbox-tree"
import { useSearchParamsState } from "@/components/checkbox-tree/use-search-params-state"
import { GitHubIcon, GlobeIcon, NPMIcon, RubyGemsIcon } from "@/icons"
import { MicroMarkdown } from "@/components/micro-markdown"
import { Radio, RadioGroup } from "@/components/radio"

import { Button } from "@/app/conf/_design-system/button"
import CaretDown from "@/app/conf/_design-system/pixelarticons/caret-down.svg?svgr"
import SearchIcon from "@/app/conf/_design-system/pixelarticons/search.svg?svgr"
import NotesIcon from "@/app/conf/_design-system/pixelarticons/notes.svg?svgr"
import { Tag } from "@/app/conf/_design-system/tag"
import ArrowBarLeft from "@/app/conf/_design-system/pixelarticons/arrow-bar-left.svg?svgr"

import { Breadcrumbs } from "../_design-system/breadcrumbs"

import { SidebarFooter } from "./sidebar"

type PackageInfo = {
  name: string
  description: string
  url: string
  github: string
  npm: string
  gem?: string
}

type CodePageProps = {
  allTags: {
    tag: string
    count: number
    name: string
  }[]
  data: {
    tags: string[]
    frontMatter: PackageInfo
    stars?: number
    formattedStars?: string
    lastRelease?: string
    license: string
    compiledSource: string
  }[]
}

const TAG_PARAM_KEY = "tags"

type Sort = "popularity" | "alphabetical"

export function CodePage({ allTags, data }: CodePageProps) {
  const allTagsMap = useMemo(
    () =>
      new Map(allTags.map(({ tag, count, name }) => [tag, { count, name }])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [sort, setSort] = useState<Sort>("popularity")

  const sidebarState = useToolsAndLibrariesSidebarState({
    allTagsMap,
    data,
  })

  let description = `A collection of tools and libraries for GraphQL`
  let title = "Tools and Libraries | GraphQL"
  if (sidebarState.selectedTagsAsString) {
    description += ` related to ${sidebarState.selectedTagsAsString}`
    title = `${sidebarState.selectedTagsAsString} | ${title}`
  }

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        const toggle = document.getElementById("sidebar-toggle")
        if (toggle && (toggle as HTMLInputElement).checked) {
          toggle.click()
        }
      }
    })
  }, [])

  return (
    <>
      <NextHead>
        <title>{title}</title>
        <meta property="og:title" content={title} key="meta-og-title" />
        <meta name="description" content={description} key="meta-description" />
        <meta
          property="og:description"
          content={description}
          key="meta-og-description"
        />
      </NextHead>
      <div className="gql-all-anchors-focusable mx-auto max-w-[120rem] p-4 pl-0 max-md:pl-4 md:py-8">
        <style>
          {`@media (max-width: 767px) { html:has(#sidebar-toggle:checked) { overscroll-behavior: none; } }`}
        </style>
        <SidebarOverlay />
        <div className="relative flex md:gap-6">
          <ToolsAndLibrariesSidebar
            searchInputValue={sidebarState.searchInputValue}
            selectedTags={sidebarState.selectedTags}
            setSearchInputValue={sidebarState.setSearchInputValue}
            treeItems={sidebarState.treeItems}
            updateTags={sidebarState.updateTags}
          />
          <div className="flex-1 @container">
            <ToolsAndLibrariesHeader sort={sort} setSort={setSort} />

            <div className="grid gap-2 py-4 pt-2 @[640px]:grid-cols-2 md:gap-4 md:py-8 md:pt-6 lg:grid-cols-2">
              {(sort === "alphabetical"
                ? [...sidebarState.filteredData].sort((a, b) =>
                    a.frontMatter.name.localeCompare(b.frontMatter.name),
                  )
                : sidebarState.filteredData
              ).map(
                ({
                  frontMatter,
                  tags,
                  formattedStars,
                  lastRelease,
                  license,
                  compiledSource,
                }) => {
                  const { name, description } = frontMatter
                  const hasMetadata = formattedStars || lastRelease || license
                  return (
                    <Card
                      key={`${name}${tags.toString()}`}
                      className={clsx(
                        "flex h-full flex-col !p-0",
                        "min-w-0", // hack to avoid overflow when opening details
                      )}
                    >
                      <article className="flex grow flex-col gap-4 p-4 lg:p-8">
                        <header className="flex items-center gap-2">
                          <span className="typography-h3 grow break-all">
                            {name}
                          </span>
                          <PackageLinks data={frontMatter} />
                        </header>
                        <div className="flex gap-2">
                          {tags.map(tag => (
                            <NextLink
                              key={tag}
                              href={`/community/tools-and-libraries/?tags=${tag}`}
                              className="flex [&:has(:hover)_.Tag--bg]:opacity-50"
                            >
                              <Tag
                                className="cursor-pointer !capitalize"
                                color="hsl(var(--color-neu-400))" // todo: tags could be color coded like on the conference page
                              >
                                {allTagsMap.get(tag)!.name}
                              </Tag>
                            </NextLink>
                          ))}
                        </div>
                        <MicroMarkdown
                          className="typography-body-md grow lg:text-lg"
                          text={description}
                        />
                        <div className="flex-1" />
                        {hasMetadata && (
                          <div
                            className={clsx(
                              "flex place-items-center gap-2 truncate text-sm [&>*:not(:first-of-type):before]:[content:'/__']",
                            )}
                          >
                            {formattedStars && (
                              <span className="flex items-center gap-1">
                                ★{formattedStars}
                              </span>
                            )}
                            {license && (
                              <span>
                                <NotesIcon className="inline size-4 translate-y-[-1.5px] pr-0.5" />
                                {license.split(" ").map((word, index) => {
                                  const isLicense =
                                    word.toLowerCase() === "license"
                                  return (
                                    <span key={index}>
                                      <span
                                        className={
                                          isLicense ? "max-md:hidden" : ""
                                        }
                                      >
                                        {word}
                                      </span>{" "}
                                    </span>
                                  )
                                })}
                              </span>
                            )}
                            {lastRelease && (
                              <span>
                                <span className="max-md:hidden">Last</span>{" "}
                                <span className="max-md:capitalize">
                                  release
                                </span>{" "}
                                {lastRelease}
                              </span>
                            )}
                          </div>
                        )}
                      </article>

                      {compiledSource && (
                        <details>
                          <summary
                            className={clsx(
                              "flex justify-between px-8 py-5 text-pri-base dark:[[open]>&]:shadow-[-5px_10px_30px_20px_#1b1b1b4d]",
                              "border-t border-neu-100 dark:border-neu-50 [[open]>&]:bg-neu-200 dark:[[open]>&]:bg-neu-50/25",
                              "gql-focus-visible cursor-pointer",
                            )}
                          >
                            README
                            <CaretDown className="size-5 [[open]>*>&]:rotate-180" />
                          </summary>
                          <div
                            className="px-8 py-5 lg:px-12"
                            suppressHydrationWarning
                          >
                            <RemoteContent compiledSource={compiledSource} />
                          </div>
                        </details>
                      )}
                    </Card>
                  )
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const RemoteContent = memo(function RemoteContent({
  compiledSource,
}: {
  compiledSource: string
}) {
  const { default: MDXContent } = evaluate(compiledSource)
  const components = getComponents({
    isRawLayout: false,
    components: {
      // Rendering README.md with headings messes up the headings hierarchy of the page
      h1: props => <strong {...props} />,
      h2: props => <strong {...props} />,
      h3: props => <strong {...props} />,
      h4: props => <strong {...props} />,
      h5: props => <strong {...props} />,
      h6: props => <strong {...props} />,
    },
  })
  return <MDXContent components={components} />
})

function PackageLinks({ data }: { data: PackageInfo }) {
  const { url, github, npm, gem } = data

  return (
    <>
      {url && (
        <Button href={url} variant="tertiary" isIconButton>
          <GlobeIcon className="size-5" />
        </Button>
      )}
      {github && (
        <Button
          href={`https://github.com/${github}`}
          variant="tertiary"
          isIconButton
        >
          <GitHubIcon className="size-5" />
        </Button>
      )}
      {npm && (
        <Button
          href={`https://npmjs.com/package/${npm}`}
          variant="tertiary"
          isIconButton
        >
          <NPMIcon className="size-5" viewBox="0 0 30 30" />
        </Button>
      )}
      {gem && (
        <Button
          href={`https://rubygems.org/gems/${gem}`}
          variant="tertiary"
          isIconButton
        >
          <RubyGemsIcon className="size-5" />
        </Button>
      )}
    </>
  )
}

interface ToolsAndLibrariesSidebarProps {
  treeItems: CheckboxTreeItem[]
  searchInputValue: string
  setSearchInputValue: (value: string) => void
  selectedTags: string[]
  updateTags: (tags: string[]) => void
}
function ToolsAndLibrariesSidebar({
  treeItems,
  searchInputValue,
  setSearchInputValue,
  selectedTags,
  updateTags,
}: ToolsAndLibrariesSidebarProps) {
  const [sidebarShown, setSidebarShown] = useState(true)
  return (
    <div className="sticky top-[calc(var(--navbar-h)+1.5rem)] duration-200 ease-out before:absolute before:-top-4 before:h-4 before:w-full max-md:fixed max-md:right-0 max-md:top-[--navbar-h] max-md:z-10 max-md:transform-gpu max-md:border-l max-md:border-white max-md:bg-[rgb(var(--nextra-bg),.8)] max-md:pr-2 max-md:pt-4 max-md:backdrop-blur-[6.4px] max-md:transition-transform dark:max-md:border-white/10 md:h-[calc(100vh-var(--nextra-navbar-height)-var(--nextra-menu-height))] max-md:hover-hover:[html:has(#sidebar-toggle:checked:hover)_&]:translate-x-[calc(100%-0.5rem)] max-md:[html:has(#sidebar-toggle:not(:checked))_&:not(:hover)]:translate-x-[calc(100%+1px)] max-md:hover-hover:[html:has(#sidebar-toggle:not(:checked))_&]:translate-y-16 max-md:hover-hover:[html:has(#sidebar-toggle:not(:checked))_&]:border-t max-md:hover-hover:[html:has(#sidebar-toggle:not(:checked):hover)_&]:translate-x-2 max-md:hover-hover:[html:has(#sidebar-toggle:not(:checked):hover)_&]:shadow-md">
      <Collapse horizontal isOpen={sidebarShown}>
        <section className="nextra-scrollbar -mt-4 w-[300px] shrink-0 overflow-y-auto p-4 pb-8 md:h-[calc(100vh-var(--nextra-navbar-height)-var(--nextra-menu-height))] lg:pb-16">
          <div className="sticky top-0 z-10 bg-[rgb(var(--nextra-bg))] shadow-[0_8px_16px_8px_rgb(var(--nextra-bg))] before:absolute before:-top-20 before:bottom-0 before:w-full before:bg-[rgb(var(--nextra-bg))]">
            <label className="relative flex items-center gap-1 border border-neu-300 bg-neu-0 p-2 focus-within:gql-focus-outline">
              <SearchIcon className="size-5 text-neu-800" />
              <input
                value={searchInputValue}
                onChange={e => setSearchInputValue(e.target.value)}
                placeholder="Filter tags..."
                className="bg-transparent placeholder:text-neu-600 focus:outline-none dark:placeholder:text-neu-400"
              />
            </label>
          </div>
          <CheckboxTree
            items={treeItems}
            selectedValues={selectedTags}
            onSelectionChange={updateTags}
          />
        </section>
      </Collapse>
      <SidebarFooter
        setSidebar={setSidebarShown}
        showSidebar={sidebarShown}
        className="mt-4 max-md:hidden"
        hiddenOnMobile={false}
      />
    </div>
  )
}

function useToolsAndLibrariesSidebarState({
  allTagsMap,
  data,
}: {
  allTagsMap: Map<string, { count: number; name: string }>
  data: CodePageProps["data"]
}) {
  const mounted = useMounted()
  const [searchParams, setSearchParams] = useSearchParamsState()
  const selectedTags = searchParams.getAll(TAG_PARAM_KEY)

  const selectedTagsAsString = useMemo(() => {
    const tags = selectedTags
      .slice()
      .map(tag => allTagsMap.get(tag)?.name ?? tag)
      .filter((tag): tag is string => typeof tag === "string")

    if (tags.length === 0) {
      return ""
    }

    if (tags.length === 1) {
      return tags[0]
    }

    return `${tags.slice(0, -1).join(", ")} and ${tags.slice(-1)[0]}`
  }, [allTagsMap, selectedTags])

  const [searchInputValue, setSearchInputValue] = useState("")
  const normalizedSearch = useMemo(
    () => searchInputValue.trim().toLowerCase(),
    [searchInputValue],
  )

  const searchTokens = useMemo(
    () =>
      normalizedSearch ? normalizedSearch.split(/\s+/).filter(Boolean) : [],
    [normalizedSearch],
  )

  const updateTags = useCallback(
    (next: string[]) => {
      setSearchParams(prev => {
        prev.delete(TAG_PARAM_KEY)
        next.forEach(tag => {
          prev.append(TAG_PARAM_KEY, tag)
        })
      })
    },
    [setSearchParams],
  )

  const { filteredData, tagCounts } = useMemo(() => {
    const fuzzyMatch = (haystack: string, needle: string) => {
      if (!needle) return true
      let matchIndex = 0
      for (
        let i = 0;
        i < haystack.length && matchIndex < needle.length;
        i += 1
      ) {
        if (haystack[i] === needle[matchIndex]) {
          matchIndex += 1
        }
      }
      return matchIndex === needle.length
    }

    const filteredData = mounted
      ? data.filter(item => {
          if (
            selectedTags.length &&
            !selectedTags.every(tag => item.tags.includes(tag))
          ) {
            return false
          }

          if (!searchTokens.length) {
            return true
          }

          const tagNames = item.tags
            .map(tag => allTagsMap.get(tag)?.name ?? tag)
            .join(" ")

          const searchableText = [
            item.frontMatter.name,
            item.frontMatter.description,
            tagNames,
            item.license,
            item.lastRelease,
            item.formattedStars,
            item.frontMatter.github,
            item.frontMatter.npm,
            item.frontMatter.url,
            item.frontMatter.gem,
            item.compiledSource,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()

          if (!searchableText) {
            return false
          }

          return searchTokens.every(token => fuzzyMatch(searchableText, token))
        })
      : data

    const tagCounts = filteredData.reduce<Map<string, number>>(
      (acc, { tags }) => {
        tags.forEach(tag => {
          acc.set(tag, (acc.get(tag) ?? 0) + 1)
        })
        return acc
      },
      new Map(),
    )

    return {
      filteredData,
      tagCounts,
    }
  }, [mounted, data, allTagsMap, searchTokens, selectedTags])

  const treeItems = useMemo<CheckboxTreeItem[]>(() => {
    const matchesSearch = (label: string) =>
      normalizedSearch ? label.toLowerCase().includes(normalizedSearch) : true

    const getName = (tag: string) => allTagsMap.get(tag)?.name ?? tag
    const getCount = (tag: string) => tagCounts.get(tag) ?? 0

    const nonLanguageTags = new Set([
      "client",
      "server",
      "services",
      "tools",
      "general",
      "gateways-supergraphs",
    ])

    const languages = Array.from(allTagsMap.keys())
      .filter(tag => !nonLanguageTags.has(tag))
      .map<CheckboxTreeItem>(tag => ({
        id: `language-${tag}`,
        label: getName(tag),
        value: tag,
        count: getCount(tag),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))

    const baseItems: CheckboxTreeItem[] = [
      {
        id: "category",
        label: "Category",
        children: [
          {
            id: "usage-server",
            label: getName("server"),
            value: "server",
            count: getCount("server"),
          },
          {
            id: "usage-client",
            label: getName("client"),
            value: "client",
            count: getCount("client"),
          },
          {
            id: "category-tools",
            label: getName("tools"),
            value: "tools",
            count: getCount("tools"),
            children: [
              {
                id: "category-tools-gateways-supergraphs",
                label: getName("gateways-supergraphs"),
                value: "gateways-supergraphs",
                count: getCount("gateways-supergraphs"),
              },
              {
                id: "category-tools-general",
                label: getName("general"),
                value: "general",
                count: getCount("general"),
              },
            ],
          },
          {
            id: "category-services",
            label: getName("services"),
            value: "services",
            count: getCount("services"),
          },
        ],
      },
    ]

    if (languages.length > 0) {
      baseItems.push({
        id: "language-support",
        label: "Language Support",
        children: languages,
      })
    }

    const applySearch = (item: CheckboxTreeItem): CheckboxTreeItem => {
      const children = item.children?.map(applySearch) ?? []
      const enabledChildren = children.filter(child => !child.disabled)
      const disabledChildren = children.filter(child => child.disabled)
      const hasEnabledChildren = enabledChildren.length > 0
      const isMatch = matchesSearch(item.label)
      const isDisabled =
        normalizedSearch && !isMatch && !hasEnabledChildren ? true : false

      const orderedChildren =
        children.length > 0
          ? [...enabledChildren, ...disabledChildren]
          : undefined

      return {
        ...item,
        disabled: isDisabled,
        ...(orderedChildren
          ? { children: orderedChildren }
          : { children: undefined }),
      }
    }

    const processed = baseItems.map(applySearch)
    const enabledRoots = processed.filter(item => !item.disabled)
    const disabledRoots = processed.filter(item => item.disabled)

    return [...enabledRoots, ...disabledRoots]
  }, [allTagsMap, normalizedSearch, tagCounts])

  return {
    filteredData,
    searchInputValue,
    setSearchInputValue,
    selectedTags,
    selectedTagsAsString,
    treeItems,
    updateTags,
  }
}

function MobileSidebarToggle(props: React.HTMLAttributes<HTMLLabelElement>) {
  return (
    <Button
      as="label"
      variant="tertiary"
      isIconButton
      {...props}
      className={clsx(
        props.className,
        "-m-1 cursor-pointer !p-1 !ring-transparent [&:not(:hover)]:!bg-transparent [&:not(:hover)]:!text-neu-700 dark:[&:not(:hover)]:!text-neu-500",
      )}
    >
      <input type="checkbox" id="sidebar-toggle" className="hidden" />
      <ArrowBarLeft className="size-6" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

function ToolsAndLibrariesHeader({
  sort,
  setSort,
}: {
  sort: Sort
  setSort: (value: Sort) => void
}) {
  const { activePath } = useConfig().normalizePagesResult

  return (
    <div className="top-[--navbar-h] z-[1] mt-2 flex items-center justify-between bg-[rgb(var(--nextra-bg),.8)] py-2 backdrop-blur-[6.4px] max-md:sticky">
      <div className="relative">
        <Breadcrumbs className="mb-2 mt-1 md:mb-6" activePath={activePath} />
        <RadioGroup
          value={sort}
          onValueChange={value => setSort(value as Sort)}
          className="typography-menu flex flex-wrap gap-2 text-sm text-neu-800 dark:text-neu-600 md:flex-nowrap"
        >
          <div>Sort by:</div>
          <label className="-m-1 flex items-center gap-1 p-1 [&:has([data-checked])]:text-neu-900 [&:has([data-unchecked])]:cursor-pointer [&:has([data-unchecked])]:hover:bg-neu-50/50">
            <Radio value="popularity" />
            <span>Popularity</span>
          </label>
          <label className="-m-1 flex items-center gap-1 p-1 [&:has([data-checked])]:text-neu-900 [&:has([data-unchecked])]:cursor-pointer [&:has([data-unchecked])]:hover:bg-neu-50/50">
            <Radio value="alphabetical" />
            <span>Alphabetical</span>
          </label>
        </RadioGroup>
      </div>
      <MobileSidebarToggle className="md:hidden" />
    </div>
  )
}

function SidebarOverlay() {
  return (
    <button
      tabIndex={-1}
      title="Close sidebar"
      className="pointer-events-none fixed inset-0 top-[--navbar-h] z-[9] bg-[rgb(var(--nextra-bg),.25)] opacity-0 transition-opacity focus:outline-none max-md:[html:has(#sidebar-toggle:checked)_&]:pointer-events-auto max-md:[html:has(#sidebar-toggle:checked)_&]:opacity-100"
      // this button can't be a label because of hovers
      onClick={() => {
        document.getElementById("sidebar-toggle")?.click()
      }}
    />
  )
}
