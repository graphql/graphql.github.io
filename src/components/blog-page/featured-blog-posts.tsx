import { clsx } from "clsx"
import NextLink from "next/link"

import { BlogCard, BlogCardArrow, BlogCardFooterContent } from "./blog-card"
import { BlogCardPicture } from "./blog-card-picture"
import { BlogMdxContent } from "./mdx-types"
import { BlogTags } from "./blog-tags"

export interface FeaturedBlogPostsProps
  extends React.HTMLAttributes<HTMLElement> {
  blogs: BlogMdxContent[]
}

export function FeaturedBlogPosts({
  className,
  blogs,
  ...props
}: FeaturedBlogPostsProps) {
  const [firstFeatured, ...nextThree] = blogs
    .filter(blog => blog.frontMatter.featured)
    .sort((a, b) => b.frontMatter.date.getTime() - a.frontMatter.date.getTime())
    .slice(0, 4)

  return (
    <section
      className={clsx(
        className,
        "border border-neu-0 bg-neu-0/30 p-4 backdrop-blur-xl dark:bg-neu-0/20 lg:p-12",
      )}
      {...props}
    >
      <NextLink
        href={firstFeatured.route}
        className="-m-4 flex p-4 ring-neu-0 hover:bg-neu-0/20 hover:ring-1 dark:ring-neu-100 sm:min-h-[300px] lg:gap-12 [&:not(:hover)]:transition"
      >
        <BlogCardPicture
          frontMatter={firstFeatured.frontMatter}
          className="aspect-[2.23] w-2/5 shrink-0 max-lg:invisible max-lg:absolute"
        />
        <div className="flex flex-col">
          <BlogTags tags={firstFeatured.frontMatter.tags} />
          <div className="typography-h2 mt-6">
            {firstFeatured.frontMatter.title}
          </div>
          <footer className="mt-2 flex items-end justify-between sm:mt-4 lg:mt-auto">
            <BlogCardFooterContent
              byline={firstFeatured.frontMatter.byline}
              date={firstFeatured.frontMatter.date}
            />
            <BlogCardArrow className="border border-neu-300 p-4 dark:border-neu-50" />
          </footer>
        </div>
      </NextLink>
      <div className="mt-4 grid grid-cols-3 flex-col gap-4 max-md:flex sm:mt-8 lg:mt-16 lg:gap-6">
        {nextThree.map(post => (
          <BlogCard key={post.route} {...post} />
        ))}
      </div>
    </section>
  )
}
