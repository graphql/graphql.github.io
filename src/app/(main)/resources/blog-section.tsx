import fs from "node:fs/promises"
import path from "node:path"
import Link from "next/link"
import grayMatter from "gray-matter"

import { Button } from "@/app/conf/_design-system/button"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { BlogTags } from "@/components/blog-page/blog-tags"
import { blogTagColors } from "@/components/blog-page/blog-tag-colors"

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
    <section className="gql-section xl:pb-24" id="blog">
      <header className="flex flex-col gap-6">
        <div className="flex items-center gap-1">
          <PlayIcon className="size-4 text-pri-base" />
          <span className="font-mono text-sm uppercase text-pri-base">
            Blog
          </span>
        </div>
        <h2 className="typography-h2">The GraphQL Blog</h2>
      </header>

      <div className="mt-8">
        <span className="font-mono text-sm uppercase text-neu-700">
          categories
        </span>
        <div className="nextra-scrollbar overflow-auto pb-4">
          <BlogTags
            tags={Object.keys(blogTagColors)}
            opaque
            links
            className="mt-4"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-flow-row grid-cols-[auto_1fr] grid-rows-5 divide-neu-200 *:border-b dark:*:border-neu-100 md:grid-cols-[auto_1fr_auto_auto_auto]">
        {blogPosts.map(post => (
          <BlogPostRow
            key={post.fileName}
            date={new Date(post.date).toISOString().slice(0, 10)}
            category={post.tags?.[0] ?? "blog"}
            title={post.title}
            href={`/blog/${post.fileName}`}
            author={post.byline}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center lg:mt-16">
        <Button href="/blog">Read all posts</Button>
      </div>
    </section>
  )
}

interface BlogPostRowProps {
  date: string
  category: string
  title: string
  href: string
  author: string
}

function BlogPostRow({
  date,
  category,
  title,
  href,
  author,
}: BlogPostRowProps) {
  return (
    <Link
      href={href}
      className="group typography-menu col-span-full grid grid-flow-row grid-cols-subgrid grid-rows-1 items-center gap-x-6 gap-y-px py-6 hover:bg-neu-50 dark:hover:bg-neu-50/50 max-md:grid-rows-2"
    >
      <time className="pr-6 text-neu-700 [grid-column:1]">
        {formatDate(date)}
      </time>
      <div className="[grid-column:2] max-md:!row-span-1 max-md:[grid-column:1]">
        <BlogTags tags={[category]} opaque />
      </div>

      <p className="truncate [grid-column:3] max-md:[grid-column:2] max-md:[grid-row:0]">
        {title}
      </p>
      <p className="text-neu-700 [grid-column:4] max-md:[grid-column:2] max-md:[grid-row:1]">
        {author}
      </p>

      <div className="row-span-full pr-6 [grid-column:5] max-sm:hidden">
        <ArrowDownIcon className="size-8 -rotate-90 text-neu-400 group-hover:text-neu-800" />
      </div>
    </Link>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", "-")
}
