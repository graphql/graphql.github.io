import { clsx } from "clsx"

import { Kind, ResourceMetadata, Topic } from "@/resources/types"
import { Eyebrow } from "@/_design-system/eyebrow"
import { Button } from "@/app/conf/_design-system/button"

import { ResourceHubCard } from "../resource-hub-card"
import { ReadingResourcesCard } from "../reading/reading-resources-card"

import {
  categoriesConfig,
  sectionKindNames,
  sectionIds,
} from "./categories-config"

function sectionLabel(kind: Kind) {
  return sectionKindNames[kind] ?? `${kind[0].toUpperCase()}${kind.slice(1)}`
}

export function CardsSection({
  section,
  category,
  className,
}: {
  section: { kind: Kind; resources: ResourceMetadata[] }
  category: Topic
  className?: string
}) {
  const sectionData = categoriesConfig[category].sections[section.kind]
  const heading = sectionData?.heading ?? sectionLabel(section.kind)
  const text = sectionData?.text

  let cta: React.ReactNode | undefined

  if (section.kind === "video") {
    cta = (
      <Button
        href="/resources/video"
        variant="secondary"
        size="md"
        className="shrink-0"
      >
        <span>
          Go to Video <span className="max-xl:hidden">Resources </span>Library
        </span>
      </Button>
    )
  } else if (section.kind === "post") {
    cta = (
      <Button
        href="/resources/reading"
        variant="secondary"
        size="md"
        className="shrink-0"
      >
        Browse all reading resources
      </Button>
    )
  }

  return (
    <section
      id={sectionIds[section.kind]}
      className={clsx(
        "gql-container gql-section flex flex-col gap-6",
        className,
      )}
    >
      <header className="flex items-end justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
        <div className="flex flex-col gap-4 xl:gap-6">
          <Eyebrow>{sectionKindNames[section.kind]}</Eyebrow>
          <h2 className="typography-h2 text-pretty">{heading}</h2>
          {text && (
            <p className="typography-body-md max-w-[700px] text-neu-800">
              {text}
            </p>
          )}
        </div>
        {cta}
      </header>

      <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:mt-6">
        {section.resources.slice(0, 6).map(resource => (
          <li key={resource.url}>
            <Card resource={resource} kind={section.kind} category={category} />
          </li>
        ))}
      </ul>
      {section.resources.length > 6 && (
        <details className="group">
          {/* we're using <details> for SEO and Cmd+F support */}
          <summary className="pointer-events-none mt-2 flex list-none items-center justify-center group-open:hidden">
            <Button
              as="span"
              variant="primary"
              className="pointer-events-auto cursor-pointer md:w-fit"
            >
              Load more
            </Button>
          </summary>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.resources.slice(6).map(resource => (
              <li key={resource.url}>
                <Card
                  resource={resource}
                  kind={section.kind}
                  category={category}
                />
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  )
}

function Card({
  resource,
  kind,
  category,
}: {
  resource: ResourceMetadata
  kind: Kind
  category: Topic
}) {
  const filteredTags = resource.tags.filter(
    tag => tag !== kind && tag !== category,
  )

  if (kind === "post") {
    return (
      <ReadingResourcesCard resource={{ ...resource, tags: filteredTags }} />
    )
  }

  return (
    <ResourceHubCard
      href={resource.url}
      title={resource.title}
      author={resource.author}
      tags={filteredTags}
      duration={resource.duration}
    />
  )
}
