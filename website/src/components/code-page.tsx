import {
  GitHubIcon,
  GlobeIcon,
  NPMIcon,
  StarIcon,
  MagnifyingGlassIcon,
  RubyGemsIcon,
  ChevronLeftIcon,
} from "@/icons"
import { Card, Tag } from "@/components"
import NextLink from "next/link"
import { useMounted } from "nextra/hooks"
import Markdown from "markdown-to-jsx"
import { evaluate } from "nextra/components"

import {
  DelimitedArrayParam,
  useQueryParam,
  withDefault,
} from "use-query-params"
import {
  useCallback,
  useState,
  MouseEvent,
  useMemo,
  KeyboardEventHandler,
  memo,
} from "react"
import { clsx } from "clsx"
import { getComponents } from "nextra-theme-docs"
import { RadioGroup, RadioGroupItem } from "@/components/radio"

type CodePageProps = {
  allTags: {
    tag: string
    count: number
    name: string
  }[]
  data: {
    tags: string[]
    frontMatter: {
      name: string
      description: string
      url: string
      github: string
      npm: string
      gem?: string
    }
    stars?: number
    formattedStars?: string
    lastRelease?: string
    license: string
    compiledSource: string
  }[]
}

const TagParam = withDefault(DelimitedArrayParam, [])

export function CodePage({ allTags, data }: CodePageProps) {
  const allTagsMap = useMemo(
    () =>
      new Map(allTags.map(({ tag, count, name }) => [tag, { count, name }])),
    [],
  )

  const [search, setSearch] = useState("")
  const [queryParamsTags, setTags] = useQueryParam("tags", TagParam)

  const handleQuery = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const tag = e.currentTarget.dataset.tag!

    setTags(prevTags => {
      if (prevTags!.includes(tag)) {
        return prevTags!.filter(t => t !== tag)
      }
      return [...prevTags!, tag]
    })
  }, [])

  const mounted = useMounted()
  const [isBackspacePressed, setIsBackspacePressed] = useState(false)

  const inputTags =
    mounted &&
    queryParamsTags
      .map(tag => [tag, allTagsMap.get(tag as string)?.name])
      .filter(([, name]) => name)
      .map(([tag, name]) => (
        <button
          key={tag}
          className="shrink-0 pr-2"
          data-tag={tag}
          title={`Remove tag "${name}"`}
          onClick={handleQuery}
        >
          {name} <span className="text-primary">+</span>
        </button>
      ))

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    e => {
      if (e.key === "Backspace" && !search) {
        if (isBackspacePressed) {
          setIsBackspacePressed(false)
          setTags(prevTags => prevTags!.slice(0, -1))
        } else {
          setIsBackspacePressed(true)
        }
      }
    },
    [isBackspacePressed, search],
  )

  const { newData, queryTags } = useMemo(() => {
    const newData = mounted
      ? data.filter(({ tags }) => {
          const matchQueryParamsTags =
            !queryParamsTags.length ||
            (queryParamsTags as string[]).every(tag => tags.includes(tag))

          return matchQueryParamsTags
        })
      : data

    const queryTags = newData
      .flatMap(({ tags }) => tags)
      .reduce<Record<string, number>>((acc, tag) => {
        acc[tag] ??= 0
        acc[tag] += 1
        return acc
      }, {})

    return {
      newData,
      queryTags: Object.entries(queryTags)
        .filter(
          ([tag]) => !mounted || !(queryParamsTags as string[]).includes(tag),
        )
        .map(([tag, count]) => ({
          tag,
          count,
          name: allTagsMap.get(tag)?.name || "",
        })),
    }
  }, [mounted, data, queryParamsTags])

  const [sort, setSort] = useState("popularity")

  return (
    <>
      <div className="container py-20">
        <h1 className="text-7xl font-extrabold">Code Using GraphQL</h1>
        <div className="flex my-10 items-center border-b border-current max-w-[700px] font-extrabold text-2xl pb-2.5">
          <div
            className={clsx(
              "flex shrink-0",
              isBackspacePressed && "last:*:opacity-50",
            )}
          >
            {inputTags}
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className={clsx(
              "grow bg-transparent block",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "focus-visible:border-b-primary",
            )}
          />
          <MagnifyingGlassIcon className="shrink-0" />
        </div>
        <div className="flex flex-wrap gap-3 md:gap-5 roboto-mono">
          {queryTags.map(({ tag, count, name }) => {
            const isTagMatchSearch =
              !search || name.toLowerCase().includes(search.toLowerCase())
            if (!isTagMatchSearch) return
            return (
              <button
                key={tag}
                data-tag={tag}
                className={clsx(
                  "tag",
                  mounted &&
                    (queryParamsTags as string[]).includes(tag) &&
                    "bg-primary",
                )}
                onClick={handleQuery}
                title={`${mounted && (queryParamsTags as string[]).includes(tag) ? "Remove" : "Add"} tag "${name}"`}
              >
                {name} ({count})
              </button>
            )
          })}
        </div>
      </div>
      <div className="px-3">
        <RadioGroup
          value={sort}
          onValueChange={setSort}
          className="container flex gap-2"
        >
          <div className="mr-4">Sort by:</div>
          <div className="flex items-center">
            <RadioGroupItem value="popularity" id="r1" />
            <label htmlFor="r1" className="cursor-pointer pl-2">
              Popularity
            </label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="alphabetical" id="r2" />
            <label htmlFor="r2" className="cursor-pointer pl-2">
              Alphabetical
            </label>
          </div>
        </RadioGroup>

        <div className="container grid md:grid-cols-2 gap-10 py-20">
          {(sort === "alphabetical"
            ? [...newData].sort((a, b) =>
                a.frontMatter.name.localeCompare(b.frontMatter.name),
              )
            : newData
          ).map(
            ({
              frontMatter,
              tags,
              formattedStars,
              lastRelease,
              license,
              compiledSource,
            }) => {
              const { name, description, url, github, npm, gem } = frontMatter
              const hasMetadata = formattedStars || lastRelease || license
              return (
                <Card key={`${name}${tags.toString()}`} className="!p-0 h-max">
                  <div className="p-8 lg:p-12 flex flex-col gap-7 grow">
                    <div className="flex items-center gap-6 [&_a:hover]:text-primary [&_a]:transition-colors">
                      <span className="text-3xl font-extrabold grow break-words">
                        {name}
                      </span>
                      {url && (
                        <a href={url} target="_blank" rel="noreferrer">
                          <GlobeIcon />
                        </a>
                      )}
                      {github && (
                        <a
                          href={`https://github.com/${github}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <GitHubIcon />
                        </a>
                      )}
                      {npm && (
                        <a
                          href={`https://npmjs.com/package/${npm}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <NPMIcon />
                        </a>
                      )}
                      {gem && (
                        <a
                          href={`https://rubygems.org/gems/${gem}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <RubyGemsIcon />
                        </a>
                      )}
                    </div>
                    <div className="gap-2 flex roboto-mono">
                      {tags.map(tag => (
                        <Tag
                          key={tag}
                          // @ts-expect-error -- fixme
                          as={NextLink}
                          href={`/code?tags=${tag}`}
                          className="hover:!bg-primary transition-colors hover:text-white cursor-pointer"
                        >
                          {allTagsMap.get(tag)!.name}
                        </Tag>
                      ))}
                    </div>
                    <Markdown className="[&_a]:text-primary grow line-clamp-4 lg:text-lg">
                      {description}
                    </Markdown>
                    {hasMetadata && (
                      <div
                        className={clsx(
                          "flex gap-5",
                          "[&>:not(:last-child)]:border-r [&>:not(:last-child)]:border-gray-500 [&>:not(:last-child)]:pr-5",
                        )}
                      >
                        {lastRelease && <span>Last release {lastRelease}</span>}
                        {formattedStars && (
                          <span className="flex items-center gap-1">
                            <StarIcon className="text-primary" />
                            {formattedStars}
                          </span>
                        )}
                        {license && <span>{license}</span>}
                      </div>
                    )}
                  </div>

                  {compiledSource && (
                    <details className="bg-[#f0f0f0] dark:bg-[#2f2f2f]">
                      <summary
                        className={clsx(
                          "flex justify-between font-bold text-primary px-12 py-5 dark:[[open]>&]:shadow-[-5px_10px_30px_20px_#1b1b1b4d]",
                          "[[open]>&]:shadow-[0_6px_21px_0_#1b1b1b33]",
                        )}
                      >
                        README
                        <ChevronLeftIcon className="size-5 -rotate-90 [[open]>*>&]:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-12 py-5" suppressHydrationWarning>
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
    </>
  )
}

const RemoteContent = memo(function RemoteContent({
  compiledSource,
}: {
  compiledSource: string
}) {
  const { default: MDXContent } = evaluate(compiledSource)
  const components = getComponents({ isRawLayout: false })
  return <MDXContent components={components} />
})
