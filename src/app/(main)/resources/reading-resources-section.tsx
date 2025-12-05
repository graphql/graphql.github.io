import Link from "next/link"

import { Button } from "@/app/conf/_design-system/button"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

export function ReadingResourcesSection() {
  return (
    <section className="gql-section" id="reading-resources">
      <hr className="mb-16 border-neu-200" />

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
            icon={<NewspaperIcon />}
            label="Blogs and newsletters"
          />
          <ReadingLink
            href="/community/resources"
            icon={<WriteIcon />}
            label="Individual Posts"
          />
          <ReadingLink
            href="/community/resources/books"
            icon={<BookIcon />}
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

function NewspaperIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-full"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2H18V4H20V6H22V20H20V22H2V2ZM4 4V20H18V6H16V4H4ZM20 8V20H20V8ZM6 8H14V10H6V8ZM6 12H14V14H6V12ZM6 16H10V18H6V16Z"
      />
    </svg>
  )
}

function WriteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-full"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2H18V4H20V6H18V8H16V10H14V12H12V14H10V16H8V18H6V20H4V22H2V20H4V18H6V16H8V14H10V12H12V10H14V8H16V6H18V4H16V2ZM14 6V8H12V10H10V12H8V14H6V16H8V14H10V12H12V10H14V8H16V6H14ZM20 8H22V22H8V20H20V8Z"
      />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-full"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2H20V20H22V22H2V20H4V2ZM6 4V20H18V4H6ZM8 8H10V6H8V8ZM14 6H16V14H14V6ZM10 10H12V14H10V10Z"
      />
    </svg>
  )
}
