import Link from "next/link"

import { Button } from "@/app/conf/_design-system/button"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

import NewspaperIcon from "./assets/newspaper.svg?svgr"
import WriteIcon from "./assets/write-note.svg?svgr"
import BookIcon from "./assets/bookmark.svg?svgr"

export function ReadingResourcesSection() {
  return (
    <section className="gql-container gql-section" id="reading-resources">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-[794px]">
          <div className="flex items-center gap-1">
            <PlayIcon className="size-4 text-pri-base" />
            <span className="font-mono text-sm uppercase text-pri-base">
              reading resources library
            </span>
          </div>

          <h2 className="typography-h2 mt-12 text-balance">
            Dive into GraphQL content
          </h2>
          <p className="typography-body-lg mt-6 lg:mt-10">
            Browse reading materials to learn best practices and stay up to date
            with the ecosystem.
          </p>
          <Button href="/community/resources" className="mt-10">
            Explore reading resources
          </Button>
        </div>

        <div className="flex flex-col divide-y divide-neu-200 border-y border-neu-200 lg:w-[358px]">
          <ReadingLink
            href="/blog"
            icon={<NewspaperIcon className="text-pri-base" />}
            label="Blogs and newsletters"
          />
          <ReadingLink
            href="/community/resources"
            icon={<WriteIcon className="text-[#FF8800]" />}
            label="Individual Posts"
          />
          <ReadingLink
            href="/community/resources/books"
            icon={<BookIcon className="text-[#00C6AC]" />}
            label="Books"
          />
        </div>
      </div>
    </section>
  )
}

interface ReadingLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function ReadingLink({ href, icon, label }: ReadingLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between py-6 hover:bg-neu-50"
    >
      <div className="flex items-center gap-6 px-6">
        <span className="size-6 text-neu-900">{icon}</span>
        <span className="typography-body-lg">{label}</span>
      </div>
      <ArrowDownIcon className="mr-6 size-8 -rotate-90 text-neu-400 transition-transform group-hover:translate-x-1 group-hover:text-neu-900" />
    </Link>
  )
}
