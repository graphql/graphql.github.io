import { Kind, ResourceMetadata, Topic } from "@/resources/types"
import { Eyebrow } from "@/_design-system/eyebrow"
import { Button } from "@/app/conf/_design-system/button"

import { ResourceHubCard } from "../resource-hub-card"

import { texts, sectionKindNames, sectionId } from "./texts"

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
  const label = sectionLabel(section.kind)

  return (
    <section
      id={sectionId(label)}
      className="gql-container gql-section flex flex-col gap-6"
    >
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-3">
          <Eyebrow>{sectionKindNames[section.kind]}</Eyebrow>
          <h2 className="typography-h3 text-pretty">{heading}</h2>
          {text && <p className="typography-body-md text-neu-800">{text}</p>}
        </div>
        {section.kind === "video" ? (
          <Button href="/resources/video" variant="primary" size="md">
            Go to full Video Resources Library
          </Button>
        ) : (
          <span className="typography-menu text-neu-600">
            {section.resources.length} resources
          </span>
        )}
      </header>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {section.resources.map(resource => (
          <li key={resource.url}>
            <ResourceHubCard
              href={resource.url}
              title={resource.title}
              author={resource.author}
              tags={resource.tags}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
