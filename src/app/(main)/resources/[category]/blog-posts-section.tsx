import { clsx } from "clsx"

import { Button } from "@/app/conf/_design-system/button"
import { Eyebrow } from "@/_design-system/eyebrow"
import { BlogCard } from "@/components/blog-page/blog-card"

import { sectionIds, sectionKindNames } from "./categories-config"

export interface BlogPost {
  href: string
  title: string
  author: string
  date: Date
  tags: string[]
}

export interface BlogPostsSectionProps {
  title: string
  description: string
  posts: BlogPost[]
  readAllHref?: string
  readAllLabel?: string
  className?: string
}

export function BlogPostsSection({
  title,
  description,
  posts,
  readAllHref = "/blog",
  readAllLabel = "Read all GraphQL stories",
  className,
}: BlogPostsSectionProps) {
  return (
    <section
      id={sectionIds["blog"]}
      className={clsx(
        "gql-container gql-section flex flex-col gap-10 lg:gap-16",
        className,
      )}
    >
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 xl:gap-6">
          <Eyebrow>{sectionKindNames["blog"]}</Eyebrow>
          <h2 className="typography-h2 max-w-[700px] text-pretty">{title}</h2>
          <p className="typography-body-md max-w-[577px] text-neu-800">
            {description}
          </p>
        </div>
        <Button
          href={readAllHref}
          variant="secondary"
          size="md"
          className="md:w-fit"
        >
          {readAllLabel}
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <BlogCard
            key={post.href}
            route={post.href}
            frontMatter={{
              title: post.title,
              byline: post.author,
              date: post.date,
              tags: post.tags,
            }}
          />
        ))}
      </div>
    </section>
  )
}
