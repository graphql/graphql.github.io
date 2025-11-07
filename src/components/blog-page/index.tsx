import NextLink from "next/link"
import clsx from "clsx"

import { Tag } from "@/app/conf/_design-system/tag"
import { arrowsMoveSideways } from "@/app/conf/_design-system/utils/arrows-move-sideways"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

import { blogTagColors } from "./blog-tag-colors"
import { BlogCard } from "./blog-card"
import { LookingForMore } from "./looking-for-more"
import { BlogMdxContent } from "./mdx-types"
import { FeaturedBlogPosts } from "./featured-blog-posts"

const mask = `url(${new URL("./blur-bean.webp", import.meta.url).href})`

export interface BlogPageProps {
  tags: Record<string, number>
  blogs: BlogMdxContent[]
  currentTag: string
  hideFeaturedPosts?: boolean
}

export function BlogPage({
  tags,
  blogs,
  currentTag,
  hideFeaturedPosts,
}: BlogPageProps) {
  return (
    <main className="gql-all-anchors-focusable bg-neu-0">
      <div className="relative top-[calc(var(--nextra-navbar-height)*-1)] bg-gradient-to-b from-sec-base to-neu-0 pt-[var(--nextra-navbar-height)] dark:from-sec-darker">
        <Stripes
          className={
            hideFeaturedPosts ? "opacity-20 ![mask-position:top]" : undefined
          }
        />
        <header className="gql-container gql-section max-sm:pb-0 lg:pt-24">
          <h1 className="typography-h1 text-center">The GraphQL Blog</h1>
          <p className="typography-body-sm mt-4 text-center lg:mt-8">
            Insights, updates and best practices from across the GraphQL
            community. Stay connected with the ideas and innovations shaping the
            GraphQL ecosystem.
          </p>
          {!hideFeaturedPosts && (
            <FeaturedBlogPosts
              blogs={blogs}
              className="mt-4 max-sm:pb-0 lg:mt-24"
            />
          )}
        </header>
      </div>

      <div className="gql-container">
        <div className="gql-section max-sm:pt-0">
          <section className="flex justify-between gap-2 max-sm:flex-col sm:items-end">
            <h2 className="typography-h2 capitalize">
              {currentTag || "All Posts"}
            </h2>
            <section>
              <h3 className="typography-menu">Categories</h3>
              <ul className="mt-4 flex gap-2 max-sm:overflow-auto sm:flex-wrap">
                {Object.entries(tags)
                  .sort((a, b) => b[1] - a[1])
                  .map(([tag, count], i) => (
                    <NextLink
                      key={tag}
                      href={currentTag === tag ? "/blog" : `/tags/${tag}`}
                      data-active={currentTag === tag ? "" : undefined}
                      tabIndex={i === 0 ? 0 : -1}
                      className="-m-1 flex p-1 ring-inset ring-neu-400 transition-opacity duration-75 hover:ring focus:!outline-offset-0 dark:ring-neu-50 [:has(>:hover)>&:not(:hover)]:opacity-70"
                      onKeyDown={arrowsMoveSideways}
                    >
                      <Tag color={blogTagColors[tag]}>
                        {tag.replaceAll("-", " ")} ({count})
                      </Tag>
                    </NextLink>
                  ))}
              </ul>
            </section>
          </section>
          <section className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(368px,1fr))] gap-4 md:mt-8 lg:mt-16 lg:gap-6">
            {blogs.map(
              page =>
                (!currentTag || page.frontMatter.tags.includes(currentTag)) && (
                  <BlogCard key={page.route} {...page} />
                ),
            )}
          </section>
        </div>
        <LookingForMore />
      </div>
    </main>
  )
}

function Stripes({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      className={clsx(
        "pointer-events-none absolute inset-0 max-sm:[mask-position:left_top]",
        className,
      )}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(0deg,_hsl(var(--color-sec-dark))_0%,_hsl(var(--color-sec-light))_100%)] dark:bg-[linear-gradient(0deg,_hsl(var(--color-sec-dark))_0%,_hsl(var(--color-sec-darker))_100%)]"
        oddClassName="bg-[linear-gradient(0deg,_hsl(var(--color-sec-lighter))_0%,_hsl(79_81%_40%/0)_100%)] dark:bg-[linear-gradient(0deg,_hsl(var(--color-sec-darker))_0%,_rgba(133,185,19,0.00)_100%)]"
      />
    </div>
  )
}
