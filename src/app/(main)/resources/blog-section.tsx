import fs from "node:fs/promises"
import path from "node:path"
import Link from "next/link"
import grayMatter from "gray-matter"

import { Button } from "@/app/conf/_design-system/button"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"

import { blogTagColors } from "@/components/blog-page/blog-tag-colors"
import { BlogCategoryLinks } from "./blog-category-links"
import { BlogPostListItem } from "./blog-post-list-item"

interface BlogFrontMatter {
  title: string
  tags?: string[]
  byline: string
  date: string | number | Date
}

type BlogFrontMatterWithFile = BlogFrontMatter & {
  fileName: string
  date: Date
}

let cachedBlogFrontMatters: BlogFrontMatterWithFile[] | null = null

async function getBlogFrontMatters() {
  if (cachedBlogFrontMatters) return cachedBlogFrontMatters

  const files = await fs.readdir("./src/pages/blog")

  const blogs = await Promise.all(
    files
      .filter(filename => /\.mdx?$/.test(filename))
      .map(async (filename: string) => {
        const filePath = path.join("./src/pages/blog", filename)
        const content = await fs.readFile(filePath, "utf8")
        const { data } = grayMatter(content)
        const frontMatter = data as BlogFrontMatter

        return {
          ...frontMatter,
          fileName: path.parse(filePath).name,
          date: new Date(frontMatter.date),
        }
      }),
  )

  cachedBlogFrontMatters = blogs
    .filter((blog): blog is BlogFrontMatterWithFile =>
      Boolean(blog.fileName && blog.title && blog.date),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return cachedBlogFrontMatters
}

export async function BlogSection() {
  const blogs = await getBlogFrontMatters()
  const blogPosts = Object.keys(blogTagColors)
    .flatMap(tag => blogs.filter(blog => blog.tags?.includes(tag)).slice(0, 5))
    .reduce<BlogFrontMatterWithFile[]>((unique, blog) => {
      if (!unique.some(item => item.fileName === blog.fileName)) {
        unique.push(blog)
      }
      return unique
    }, [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <section className="gql-section max-sm:px-0 xl:pb-24" id="blog">
      <header className="flex flex-col gap-6 max-sm:px-4">
        <div className="flex items-center gap-1">
          <PlayIcon className="size-4 text-pri-base" />
          <span className="font-mono text-sm uppercase text-pri-base">
            Blog
          </span>
        </div>
        <h2 className="typography-h2">The GraphQL Blog</h2>
      </header>

      <BlogCategoryLinks />

      <ul className="mt-4 flex grid-flow-row grid-cols-[auto_1fr] grid-rows-5 flex-col *:border-b dark:*:border-neu-100 md:grid md:grid-cols-[auto_1fr_auto_auto_auto]">
        {blogPosts.map(post => (
          <BlogPostListItem
            key={post.fileName}
            date={new Date(post.date).toISOString().slice(0, 10)}
            category={post.tags?.[0] ?? "blog"}
            title={post.title}
            href={`/blog/${post.fileName}`}
            author={post.byline}
          />
        ))}
      </ul>

      <div className="mt-8 flex justify-center lg:mt-16">
        <Button href="/blog">Read all posts</Button>
      </div>
    </section>
  )
}
