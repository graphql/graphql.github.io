import Link from "next/link"

import { Button } from "@/app/conf/_design-system/button"
import { Eyebrow } from "@/_design-system/eyebrow"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

import NewspaperIcon from "./assets/newspaper.svg?svgr"
import WriteIcon from "./assets/write-note.svg?svgr"
import BookIcon from "./assets/bookmark.svg?svgr"

export function ReadingResourcesSection() {
  return (
    <section className="gql-container gql-section" id="reading-resources">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="max-w-[794px]">
          <Eyebrow>reading resources library</Eyebrow>

          <h2 className="typography-h2 mt-6 text-balance">
            Dive into GraphQL content
          </h2>
          <p className="typography-body-lg mt-6 md:mt-10">
            Browse reading materials to learn best practices and stay up to date
            with the ecosystem.
          </p>
          <Button href="/resources/reading" className="mt-10 sm:w-fit">
            Go to Reading Resources
          </Button>
        </div>

        <div className="flex flex-col gap-2 md:w-[358px] lg:gap-6">
          <ReadingLink
            href="/resources/reading/blogs-and-newsletters"
            icon={<NewspaperIcon className="text-pri-base" />}
            label="Blogs and newsletters"
          />
          <ReadingLink
            href="/resources/reading/individual-posts"
            icon={<WriteIcon className="text-[#FF8800]" />}
            label="Individual posts"
          />
          <ReadingLink
            href="/resources/reading/books"
            icon={<BookIcon className="text-[#00C6AC]" />}
            label="Books"
          />
        </div>
      </div>
    </section>
  )
}

function ReadingLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="group typography-body-md flex items-center justify-between gap-6 border border-neu-200 bg-neu-0 p-6 hover:ring hover:ring-neu-100 dark:border-neu-100 dark:bg-neu-0/50 dark:hover:ring-neu-50 [&>svg]:size-6"
    >
      {icon}
      {label}
      <ArrowDownIcon className="ml-auto size-8 -rotate-90 text-neu-700 group-hover:text-neu-900" />
    </Link>
  )
}
