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
import NextHead from "next/head"
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

  const handleQuery = useCallback(
    (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      e.preventDefault()
      const tag = e.currentTarget.dataset.tag!

      setTags(prevTags => {
        if (prevTags!.includes(tag)) {
          return prevTags!.filter(t => t !== tag)
        }
        return [...prevTags!, tag]
      })
    },
    [setTags],
  )

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

  const selectedTagsAsString = useMemo(() => {
    const tags = queryParamsTags
      .slice()
      .map(tag => allTagsMap.get(tag as string)?.name ?? tag)
      .filter((tag): tag is string => typeof tag === "string")

    if (tags.length === 0) {
      return ""
    }

    if (tags.length === 1) {
      return tags[0]
    }

    return `${tags.slice(0, -1).join(", ")} and ${tags.slice(-1)[0]}`
  }, [queryParamsTags, allTagsMap])

  const [sort, setSort] = useState("popularity")

  let description = `A collection of tools and libraries for GraphQL`
  let title = "Tools and Libraries | GraphQL"
  if (selectedTagsAsString) {
    description += ` related to ${selectedTagsAsString}`
    title = `${selectedTagsAsString} | ${title}`
  }

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
      <div className="container py-10 md:py-20">
        <h1 className="text-4xl font-extrabold md:text-7xl">
          Code Using GraphQL
        </h1>
        <div className="my-10 flex max-w-[700px] items-center border-b border-current pb-2.5 text-2xl font-extrabold">
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
              "block grow bg-transparent",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "focus-visible:border-b-primary",
            )}
          />
          <MagnifyingGlassIcon className="shrink-0" />
        </div>
        <div className="roboto-mono flex flex-wrap gap-3 md:gap-5">
          {queryTags.map(({ tag, count, name }) => {
            const isTagMatchSearch =
              !search || name.toLowerCase().includes(search.toLowerCase())
            if (!isTagMatchSearch) return
            return (
              <NextLink
                href={`/community/tools-and-libraries/?tags=${tag}`}
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
              </NextLink>
            )
          })}
        </div>
      </div>
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

      <div className="container grid gap-10 py-20 md:grid-cols-2">
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
              <Card
                key={`${name}${tags.toString()}`}
                className={clsx(
                  "h-max !p-0",
                  "min-w-0", // hack to avoid overflow when opening details
                )}
              >
                <div className="flex grow flex-col gap-7 p-8 lg:p-12">
                  <div className="flex items-center gap-6 [&_a:hover]:text-primary [&_a]:transition-colors">
                    <span className="grow break-all text-3xl font-extrabold">
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
                  <div className="roboto-mono flex gap-2">
                    {tags.map(tag => (
                      <Tag
                        key={tag}
                        // @ts-expect-error -- fixme
                        as={NextLink}
                        href={`/community/tools-and-libraries/?tags=${tag}`}
                        className="cursor-pointer transition-colors hover:!bg-primary hover:text-white"
                      >
                        {allTagsMap.get(tag)!.name}
                      </Tag>
                    ))}
                  </div>
                  <Markdown className="line-clamp-4 grow lg:text-lg [&_a]:text-primary">
                    {description}
                  </Markdown>
                  {hasMetadata && (
                    <div
                      className={clsx(
                        "flex items-center gap-5 max-md:text-xs",
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
                        "flex justify-between px-8 py-5 font-bold text-primary lg:px-12 dark:[[open]>&]:shadow-[-5px_10px_30px_20px_#1b1b1b4d]",
                        "[[open]>&]:shadow-[0_6px_21px_0_#1b1b1b33]",
                        "cursor-pointer",
                      )}
                    >
                      README
                      <ChevronLeftIcon className="size-5 -rotate-90 transition-transform [[open]>*>&]:rotate-90" />
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
