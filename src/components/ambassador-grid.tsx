import type { Ambassador } from "./info-card/ambassador-data"
import { InfoCard, InfoCardRow } from "./info-card"

function buildRows(ambassador: Ambassador): InfoCardRow[] {
  return [
    {
      type: "label",
      label: (
        <>
          {ambassador.label}
          {ambassador.location ? (
            <span
              role="img"
              aria-label={ambassador.location.name}
              title={ambassador.location.name}
              className="shrink-0 self-start text-xl"
            >
              {ambassador.location.flag}
            </span>
          ) : null}
        </>
      ),
    },
    {
      type: "image",
      imageUrl: ambassador.imageUrl,
      alt: ambassador.alt,
    },
    ...(ambassador.askMeAbout
      ? [
          {
            type: "label" as const,
            hideInConciseMode: true,
            label: (
              <div className="typography-body-md leading-relaxed">
                <span className="mr-2 bg-sec-light px-1 text-neu-900 dark:bg-sec-darker">
                  Ask me about
                </span>
                {ambassador.askMeAbout.join(", ")}
              </div>
            ),
          },
        ]
      : []),
    {
      type: "label",
      hideInConciseMode: true,
      label:
        ambassador.tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3">
            {ambassador.tags.map(tag => (
              <a
                key={tag.url}
                href={tag.url}
                aria-label={tag.label}
                className="inline-flex size-8 shrink-0 items-center justify-center bg-neu-100 text-current transition hover:bg-sec-base/10 hover:text-sec-base"
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

export function AmbassadorGrid({
  ambassadors,
  concise,
}: {
  ambassadors: Ambassador[]
  concise?: boolean
}) {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-6xl flex-wrap justify-center gap-6">
      {ambassadors.map((ambassador, index) => (
        <InfoCard
          key={`${ambassador.label}-${index}`}
          rows={buildRows(ambassador)}
          className="h-full"
          concise={concise}
        />
      ))}
    </div>
  )
}
