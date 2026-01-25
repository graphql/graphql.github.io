import { useConfig } from "nextra-theme-docs"

import { BlogCardPicture } from "../../components/blog-page/blog-card-picture"
import { BlogMdxContent } from "../../components/blog-page/mdx-types"
import { BlogTags } from "../../components/blog-page/blog-tags"

export default {
  // only for blog posts inside folders we need to specify breadcrumb title
  "2024-06-11-announcing-new-graphql-website": "Announcing New GraphQL Website",
  "2025-07-17-graphiql-5": "GraphiQL 5 Release; Press F1!",
  "*": {
    display: "hidden",
    theme: {
      sidebar: false,
      timestamp: true,
      layout: "default",
      topContent: function TopContent() {
        const frontMatter = useConfig()
          .frontMatter as BlogMdxContent["frontMatter"]
        const { title, byline, tags } = frontMatter
        const date = new Date(frontMatter.date)

        return (
          <>
            <div className="mt-8 flex gap-4">
              <BlogCardPicture
                frontMatter={frontMatter}
                className="aspect-[4.75] w-full"
              >
                <BlogTags tags={tags} opaque links />
              </BlogCardPicture>
            </div>

            <h1 className="typography-d1 text-balance !text-left xl:!mb-5">
              {title}
            </h1>
            <div className="typography-menu flex flex-col justify-center gap-2">
              <span>{byline}</span>
              <time
                dateTime={date.toISOString()}
                className="text-neu-700 dark:text-neu-400"
              >
                {date.toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </>
        )
      },
    },
  },
}
