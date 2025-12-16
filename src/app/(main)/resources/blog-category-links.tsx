"use client"

import Link from "next/link"
import { Collapsible } from "@base-ui-components/react/collapsible"

import CaretDownIcon from "@/app/conf/_design-system/pixelarticons/caret-down.svg?svgr"
import { BlogTags } from "@/components/blog-page/blog-tags"
import { blogCategories } from "@/components/blog-page/blog-categories"

/**
 * Shows tags on desktop and a collapsible on mobile.
 */
export function BlogCategoryLinks() {
  return (
    <>
      <Collapsible.Root className="mt-8 sm:hidden">
        <Collapsible.Trigger className="gql-focus-visible flex h-12 w-full items-center justify-between border-y border-neu-400 p-4 text-neu-800 dark:border-neu-100">
          <span className="font-mono text-sm uppercase">categories</span>
          <CaretDownIcon className="size-6 [[data-panel-open]_&]:rotate-180" />
        </Collapsible.Trigger>
        <Collapsible.Panel className="absolute z-10 w-full border-b border-neu-200 bg-neu-50 backdrop-blur-xl dark:border-neu-100 dark:bg-[hsl(77_15%_10%/.5)]">
          {blogCategories.map(category => (
            <Link
              key={category}
              href={`/blog?tag=${encodeURIComponent(category)}`}
              className="flex h-12 w-full items-center border-b border-neu-200 p-4 font-mono text-sm uppercase text-neu-800 last:border-b-0 dark:border-neu-50"
            >
              {category.replace(/-/g, " ")}
            </Link>
          ))}
        </Collapsible.Panel>
      </Collapsible.Root>

      <div className="mt-8 max-sm:hidden">
        <span className="font-mono text-sm uppercase text-neu-700">
          categories
        </span>
        <div className="nextra-scrollbar overflow-auto pb-4">
          <BlogTags tags={blogCategories} opaque links className="mt-4" />
        </div>
      </div>
    </>
  )
}
