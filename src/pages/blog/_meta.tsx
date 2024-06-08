import { useConfig } from "nextra-theme-docs"
import NextLink from "next/link"

export default {
  // only for blog posts inside folders we need to specify breadcrumb title
  "2024-06-08-announcing-new-graphql-website": "Announcing New GraphQL Website",
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
            <div className="text-gray-500 text-center">
              <time dateTime={date.toISOString()}>
                {date.toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>{" "}
              by {byline}
            </div>
            <div className="mt-6 gap-2 flex justify-center roboto-mono">
              {tags.map((tag: string) => (
                <NextLink
                  key={tag}
                  href={`/tags/${tag}`}
                  className="transition-colors py-1 px-2.5 capitalize rounded bg-zinc-200 dark:bg-zinc-700 font-bold hover:!no-underline hover:!bg-primary hover:text-white dark:hover:text-zinc-900"
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
