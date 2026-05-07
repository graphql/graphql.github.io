"use client"

import { useState } from "react"
import Image from "next/image"
import clsx from "clsx"

import { Tag } from "@/app/conf/_design-system/tag"
import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import {
  SocialIcon,
  SocialIconType,
} from "@/app/conf/_design-system/social-icon"
import { formatDescription } from "@/app/conf/2026/schedule/[id]/format-description"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

import {
  AmsterdamSession,
  AmsterdamSpeaker,
  amsterdamSessions,
  tagColors,
} from "./schedule-data"

const TIME_RANGE = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/Amsterdam",
})

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "Europe/Amsterdam",
})

export function ScheduleSection() {
  return (
    <section
      id="schedule"
      className="scroll-mt-20 overflow-hidden border-y border-neu-200 bg-neu-50 dark:border-neu-100 dark:bg-neu-50/25"
    >
      <div className="gql-container">
        <div className="gql-section !py-0 max-xs:px-0">
          <div className="border-neu-200 dark:border-neu-100 xs:border-x">
            <div className="flex flex-wrap items-baseline justify-between gap-4 px-2 py-8 sm:px-3 lg:py-12 2xl:py-16">
              <h2 className="typography-h2">Schedule</h2>
              <p className="typography-body-md text-neu-700">
                All times in Amsterdam Time (CET, UTC+2)
              </p>
            </div>

            {amsterdamSessions.map((session, i) => (
              <SessionBlock
                key={session.id}
                session={session}
                isFirst={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SessionBlock({
  session,
  isFirst,
}: {
  session: AmsterdamSession
  isFirst: boolean
}) {
  // On xl+ with a single speaker we slot the card next to the last two
  // paragraphs of the description so it sits in the bottom-right corner.
  // Multi-speaker sessions keep the regular "speakers below" layout.
  const sideSpeaker = session.speakers.length === 1 ? session.speakers[0] : null

  return (
    <article>
      <Hr
        className={isFirst ? "mt-8 lg:mt-12 xl:mt-0" : "mt-12 lg:mt-16 xl:mt-0"}
      />
      <SessionHeader session={session} className="px-2 py-8 sm:px-3 lg:py-12" />
      {session.description && (
        <>
          <Hr className="mt-0 lg:mt-10 xl:mt-0 2xl:mt-16" />
          <SessionDescription
            description={session.description}
            sideSpeaker={sideSpeaker}
          />
        </>
      )}
      {session.speakers.length > 0 && (
        <div className={sideSpeaker ? "xl:hidden" : undefined}>
          <Hr />
          <SessionSpeakers
            speakers={session.speakers}
            className="-mx-px -mb-px"
          />
        </div>
      )}
    </article>
  )
}

function SessionDescription({
  description,
  sideSpeaker,
}: {
  description: string
  sideSpeaker: AmsterdamSpeaker | null
}) {
  const [expanded, setExpanded] = useState(false)
  const paragraphs = parseParagraphs(description)
  const hasMore = paragraphs.length > 1
  const visible = expanded ? paragraphs : paragraphs.slice(0, 1)
  const splitAt = sideSpeaker ? Math.max(0, visible.length - 2) : visible.length
  const lead = visible.slice(0, splitAt)
  const tail = visible.slice(splitAt)
  const lastInLead = tail.length === 0 ? lead.length - 1 : -1
  const lastInTail = tail.length - 1

  const toggle = hasMore && (
    <>
      {" "}
      <button
        type="button"
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        className="typography-link"
      >
        {expanded ? "Show less." : "Read more…"}
      </button>
    </>
  )

  return (
    <div className="typography-body-lg mt-8 px-2 pb-8 sm:px-3 lg:mt-12 xl:pb-12 [&>p+p]:mt-4 [&_a]:break-words">
      {lead.map((html, i) => (
        <p key={`lead-${i}`}>
          <span dangerouslySetInnerHTML={{ __html: html }} />
          {i === lastInLead && toggle}
        </p>
      ))}
      {tail.length > 0 && (
        <div className="mt-4 first:mt-0 xl:flex xl:items-end xl:gap-6">
          <div className="xl:flex-1 [&>p+p]:mt-4">
            {tail.map((html, i) => (
              <p key={`tail-${i}`}>
                <span dangerouslySetInnerHTML={{ __html: html }} />
                {i === lastInTail && toggle}
              </p>
            ))}
          </div>
          {sideSpeaker && (
            <div className="hidden xl:-mb-12 xl:-mr-3 xl:block xl:w-[580px] xl:shrink-0 xl:[&>article]:border-b-0 xl:[&>article]:border-r-0 xl:[&>article]:border-t">
              <SpeakerCard speaker={sideSpeaker} index={0} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Split FOST description HTML (a sequence of `<p>...</p>` blocks) into the
 * inner HTML of each paragraph so we can render them as real React `<p>`
 * siblings — needed so we can splice the speaker card in alongside the last
 * couple of paragraphs at xl+.
 */
function parseParagraphs(html: string): string[] {
  const formatted = formatDescription(html)
  const matches = formatted.match(/<p>[\s\S]*?<\/p>/g)
  if (!matches) return [formatted]
  return matches.map(p => p.replace(/^<p>/, "").replace(/<\/p>$/, ""))
}

function SessionHeader({
  session,
  className,
}: {
  session: AmsterdamSession
  className?: string
}) {
  const start = new Date(session.start)
  const end = new Date(session.end)

  return (
    <header className={className}>
      <h3 className="typography-h2 mb-6">{session.title}</h3>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="typography-body-md flex flex-col gap-2 md:flex-row md:gap-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-sec-darker dark:text-sec-light/90 sm:size-6" />
            <time dateTime={session.start}>
              {DATE_FORMAT.format(start)}
              {", "}
              {TIME_RANGE.formatRange(start, end)}
            </time>
          </div>
          {session.venue && (
            <div className="flex items-center gap-2">
              <PinIcon className="size-5 text-sec-darker dark:text-sec-light/90 sm:size-6" />
              <span>{session.venue}</span>
            </div>
          )}
        </div>
        {session.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {session.tags.map(tag => (
              <Tag
                key={tag}
                color={tagColors[tag] ?? "hsl(var(--color-sec-dark))"}
              >
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

function SessionSpeakers({
  speakers,
  className,
}: {
  speakers: AmsterdamSpeaker[]
  className?: string
}) {
  return (
    <div
      className={clsx(
        "grid lg:grid-cols-2 lg:gap-5 max-lg:[&>*:not(:last-child)]:border-b-0",
        className,
      )}
    >
      {speakers.map((speaker, i) => (
        <SpeakerCard key={speaker.id} speaker={speaker} index={i} />
      ))}
    </div>
  )
}

const STRIPE_VARIANTS: { mask: string; endColor: string }[] = [
  {
    mask: "linear-gradient(120deg, hsl(var(--color-pri-base)) 0%, hsl(var(--color-pri-base)) 8%, transparent 35%, transparent)",
    endColor: "hsl(var(--color-sec-base))",
  },
  {
    mask: "radial-gradient(circle at bottom right, hsl(var(--color-pri-base)) 0%, hsl(var(--color-pri-base)) 10%, transparent 40%, transparent)",
    endColor: "hsl(var(--color-sec-darker))",
  },
  {
    mask: "linear-gradient(-40deg, hsl(var(--color-pri-base)) 0%, hsl(var(--color-pri-base)) 5%, transparent 40%, transparent)",
    endColor: "hsl(var(--color-sec-light))",
  },
]

function SpeakerCard({
  speaker,
  index,
}: {
  speaker: AmsterdamSpeaker
  index: number
}) {
  const variant = STRIPE_VARIANTS[index % STRIPE_VARIANTS.length]
  const subtitle = [
    speaker.company === "-" ? "" : speaker.company,
    speaker.jobtitle,
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <article className="group relative overflow-hidden border border-t-0 border-neu-200 bg-transparent @container dark:border-neu-100">
      <div className="flex h-full flex-col gap-4 p-4 @[420px]:flex-row md:gap-6 md:p-6">
        <div className="relative aspect-square h-full overflow-hidden @[420px]:w-[176px] @[420px]:shrink-0">
          <div className="absolute inset-0 z-[1] bg-sec-light mix-blend-multiply" />
          <Image
            src={speaker.avatar}
            alt=""
            width={176}
            height={176}
            placeholder="blur"
            className="size-full object-cover saturate-[.1]"
          />
          <div
            role="presentation"
            className="pointer-events-none absolute inset-0 inset-y-[-20px]"
            style={
              {
                maskImage: variant.mask,
                WebkitMaskImage: variant.mask,
                "--end-color": variant.endColor,
              } as React.CSSProperties
            }
          >
            <StripesDecoration oddClassName="absolute inset-0 bg-gradient-to-b from-sec-dark to-[var(--end-color)]" />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h5 className="typography-body-lg">{speaker.name}</h5>
            {subtitle && (
              <p className="typography-body-sm line-clamp-2 text-neu-800">
                {subtitle}
              </p>
            )}
          </div>
          {speaker.socialurls.length > 0 && (
            <SpeakerSocialLinks links={speaker.socialurls} />
          )}
        </div>
      </div>
    </article>
  )
}

function SpeakerSocialLinks({
  links,
}: {
  links: AmsterdamSpeaker["socialurls"]
}) {
  const ordered = SocialIconType.all
    .map(service =>
      links.find(l => l.service.toLowerCase() === service.toLowerCase()),
    )
    .filter((x): x is { service: string; url: string } => !!x?.url)

  if (ordered.length === 0) return null

  return (
    <div className="flex w-fit divide-x divide-neu-200 border border-neu-200 dark:divide-neu-100 dark:border-neu-100">
      {ordered.map(social => (
        <a
          key={social.url}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center p-2 text-neu-900 hover:bg-neu-600/10"
          aria-label={`${social.service} profile`}
        >
          <SocialIcon type={social.service.toLowerCase()} className="size-5" />
        </a>
      ))}
    </div>
  )
}

function Hr({ className }: { className?: string }) {
  return (
    <hr
      className={clsx(
        "ml-[-50vw] w-[200vw] border-neu-200 dark:border-neu-100",
        className,
      )}
    />
  )
}
