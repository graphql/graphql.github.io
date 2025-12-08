"use client"

import Link from "next/link"
import { Collapsible } from "@base-ui-components/react/collapsible"

import CaretDownIcon from "@/app/conf/_design-system/pixelarticons/caret-down.svg?svgr"
import { BlogTags } from "@/components/blog-page/blog-tags"
import { blogTagColors } from "@/components/blog-page/blog-tag-colors"

const categories = Object.keys(blogTagColors)

/**
 * Shows tags on desktop and a collapsible on mobile.
 */
export function BlogCategoryLinks() {
  return (
    <>
      <Collapsible.Root className="mt-8 sm:hidden">
        <Collapsible.Trigger className="flex h-12 w-full items-center justify-between border-y border-neu-400 p-4 text-neu-800">
          <span className="font-mono text-sm uppercase">categories</span>
          <CaretDownIcon className="size-6 transition-transform [[data-panel-open]_&]:rotate-180" />
        </Collapsible.Trigger>
        <Collapsible.Panel>
          {categories.map(category => (
            <Link
              key={category}
              href={`/blog?tag=${encodeURIComponent(category)}`}
              className="flex h-12 w-full items-center border-b border-neu-200 bg-neu-50 p-4 font-mono text-sm uppercase text-neu-800 last:border-b-0 hover:bg-neu-100"
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
          <BlogTags tags={categories} opaque links className="mt-4" />
        </div>
      </div>
    </>
  )
}
