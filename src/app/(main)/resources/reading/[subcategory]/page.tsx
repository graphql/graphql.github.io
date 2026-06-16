import { notFound } from "next/navigation"

import { ReadingLibraryPage, readingMetadata } from "../reading-page"
import { subcategories, type Subcategory } from "../reading-page-categories"

interface PageParams {
  subcategory: string
}

function isSubcategory(value: string): value is Subcategory {
  return subcategories.includes(value as Subcategory)
}

export function generateStaticParams() {
  return subcategories.map(subcategory => ({ subcategory }))
}

export function generateMetadata({ params }: { params: PageParams }) {
  const subcategory = params.subcategory
  if (!isSubcategory(subcategory)) return {}
  return readingMetadata(subcategory)
}

export default function ReadingSubcategoryPage({
  params,
}: {
  params: PageParams
}) {
  const subcategory = params.subcategory
  if (!isSubcategory(subcategory)) return notFound()
  return <ReadingLibraryPage variant={subcategory} />
}
