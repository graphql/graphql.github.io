"use client"

import { Button } from "@/app/conf/_design-system/button"
import { Eyebrow } from "@/_design-system/eyebrow"
import { BlogCard } from "@/components/blog-page/blog-card"

export interface BlogPost {
  href: string
  title: string
  author: string
  date?: Date
  tags: string[]
}

export interface BlogPostsSectionProps {
  title: string
  description: string
  posts: BlogPost[]
  readAllHref?: string
  readAllLabel?: string
}

export function BlogPostsSection({
  title,
  description,
  posts,
  readAllHref = "/blog",
  readAllLabel = "Read all GraphQL stories",
}: BlogPostsSectionProps) {
  return (
    <section className="gql-container gql-section flex flex-col gap-10 lg:gap-16">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <Eyebrow>Blog posts</Eyebrow>
          <h2 className="typography-h2 max-w-[700px] text-pretty">{title}</h2>
          <p className="typography-body-md max-w-[577px] text-neu-800">
            {description}
          </p>
        </div>
        <Button href={readAllHref} variant="secondary" size="md">
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
              date: post.date ?? new Date(),
              tags: post.tags,
            }}
          />
        ))}
      </div>
    </section>
  )
}
