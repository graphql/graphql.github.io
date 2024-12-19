import { useConfig } from "nextra-theme-docs"
import NextLink from "next/link"

export default {
  // only for blog posts inside folders we need to specify breadcrumb title
  "2024-06-11-announcing-new-graphql-website": "Announcing New GraphQL Website",
  "*": {
    display: "hidden",
    theme: {
      sidebar: false,
      timestamp: true,
      layout: "default",
      topContent: function TopContent() {
        const { frontMatter } = useConfig()
        const { title, byline, tags } = frontMatter
        const date = new Date(frontMatter.date)
        return (
          <>
            <h1 className="text-balance">{title}</h1>
            <div className="text-center text-gray-500">
              <time dateTime={date.toISOString()}>
                {date.toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>{" "}
              by {byline}
            </div>
            <div className="roboto-mono mt-6 flex justify-center gap-2">
              {tags.map((tag: string) => (
                <NextLink
                  key={tag}
                  href={`/tags/${tag}`}
                  className="rounded bg-zinc-200 px-2.5 py-1 font-bold capitalize transition-colors hover:!bg-primary hover:text-white hover:!no-underline dark:bg-zinc-700 dark:hover:text-zinc-900"
                >
                  {tag.replaceAll("-", " ")}
                </NextLink>
              ))}
            </div>
          </>
        )
      },
    },
  },
}
