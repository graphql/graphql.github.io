import { Kind, ResourceMetadata, Topic } from "@/resources/types"
import { Eyebrow } from "@/_design-system/eyebrow"
import { Button } from "@/app/conf/_design-system/button"

import { ResourceHubCard } from "../resource-hub-card"

import { texts, sectionKindNames, sectionIds } from "./texts"

function sectionLabel(kind: Kind) {
  return sectionKindNames[kind] ?? `${kind[0].toUpperCase()}${kind.slice(1)}`
}

export function CardsSection({
  section,
  category,
}: {
  section: { kind: Kind; resources: ResourceMetadata[] }
  category: Topic
}) {
  const sectionData = texts[category].sections[section.kind]
  const heading = sectionData?.heading ?? sectionLabel(section.kind)
  const text = sectionData?.text

  let cta: React.ReactNode | undefined

  if (section.kind === "video") {
    cta = (
      <Button href="/resources/video" variant="secondary" size="md">
        Go to Video Resources Library
      </Button>
    )
  } else if (section.kind === "docs") {
    cta = (
      <Button href="/resources/docs" variant="secondary" size="md">
        Go to Documentation
      </Button>
    )
  }

  return (
    <section
      id={sectionIds[section.kind]}
      className="gql-container gql-section flex flex-col gap-6"
    >
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-3">
          <Eyebrow>{sectionKindNames[section.kind]}</Eyebrow>
          <h2 className="typography-h3 text-pretty">{heading}</h2>
          {text && (
            <p className="typography-body-md max-w-[700px] text-neu-800">
              {text}
            </p>
          )}
        </div>
        {cta}
      </header>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {section.resources.slice(0, 6).map(resource => (
          <li key={resource.url}>
            <ResourceHubCard
              href={resource.url}
              title={resource.title}
              author={resource.author}
              tags={resource.tags.filter(tag => tag !== section.kind)}
              duration={resource.duration}
            />
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
              className="pointer-events-auto w-fit cursor-pointer"
            >
              Load more
            </Button>
          </summary>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.resources.slice(6).map(resource => {
              return (
                <li key={resource.url}>
                  <ResourceHubCard
                    href={resource.url}
                    title={resource.title}
                    author={resource.author}
                    tags={resource.tags.filter(tag => tag !== section.kind)}
                    duration={resource.duration}
                  />
                </li>
              )
            })}
          </ul>
        </details>
      )}
    </section>
  )
}
