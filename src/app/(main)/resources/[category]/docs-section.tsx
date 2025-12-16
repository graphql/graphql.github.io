import { clsx } from "clsx"

import { Button } from "@/app/conf/_design-system/button"
import { Eyebrow } from "@/_design-system/eyebrow"

import { TeaserSectionListItem } from "@/components/learn-aggregator/teaser-section-list-item"
import {
  LearnPagePath,
  learnPages,
} from "@/components/learn-aggregator/learn-pages"

import { sectionIds } from "./categories-config"

export interface DocsSectionProps {
  heading: string
  text: string
  docs?: LearnPagePath[]
  className?: string
}

export function DocsSection({
  heading,
  text,
  docs,
  className,
}: DocsSectionProps) {
  const pages =
    docs?.map(path => learnPages[path]).filter(page => page !== null) ?? []

  return (
    <section
      id={sectionIds["docs"]}
      className={clsx(
        "gql-container gql-section flex flex-col gap-10 lg:gap-16",
        className,
      )}
    >
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 xl:gap-6">
          <Eyebrow>Documentation</Eyebrow>
          <h2 className="typography-h2 max-w-[700px] text-pretty">{heading}</h2>
          <p className="typography-body-md max-w-[577px] text-neu-800">
            {text}
          </p>
        </div>
        <Button href="/learn" variant="secondary" size="md">
          Go to Learn
        </Button>
      </header>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pages.map((page, index) => (
          <TeaserSectionListItem
            key={index}
            title={page.title}
            description={page.description}
            icon={<img src={page.icon} alt="" />}
            section={page.section}
            href={page.href}
          />
        ))}
      </ul>
    </section>
  )
}
