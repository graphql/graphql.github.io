import type { Ambassador } from "./info-card/ambassador-data"
import { InfoCard, InfoCardRow } from "./info-card"

function buildRows(ambassador: Ambassador): InfoCardRow[] {
  return [
    {
      type: "label",
      label: ambassador.label,
    },
    {
      type: "image",
      imageUrl: ambassador.imageUrl,
      alt: ambassador.alt,
    },
    {
      type: "label",
      label: ambassador.organization,
    },
    {
      type: "label",
      label:
        ambassador.tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3">
            {ambassador.tags.map(tag => (
              <a
                key={tag.url}
                href={tag.url}
                aria-label={tag.label}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-neu-100 text-current transition hover:bg-sec-base/10 hover:text-sec-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tag.icon ?? tag.label}
              </a>
            ))}
          </div>
        ) : null,
    },
  ]
}

export function AmbassadorGrid({ ambassadors }: { ambassadors: Ambassador[] }) {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-6xl flex-wrap justify-center gap-8">
      {ambassadors.map((ambassador, index) => (
        <InfoCard
          key={`${ambassador.label}-${index}`}
          rows={buildRows(ambassador)}
          className="h-full"
        />
      ))}
    </div>
  )
}
