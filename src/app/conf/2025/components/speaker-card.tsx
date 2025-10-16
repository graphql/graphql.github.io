import clsx from "clsx"
import Image from "next/image"
import { getPlaiceholder } from "plaiceholder"

import { Anchor } from "../../_design-system/anchor"
import { SchedSpeaker } from "../../2023/types"
import { StripesDecoration } from "../../_design-system/stripes-decoration"

import { SpeakerTags } from "./speaker-tags"
import { SpeakerLinks } from "./speaker-links"

import styles from "./speaker-card.module.css"
import { formatSpeakerPosition } from "./format-speaker-position"
import { formatDescription } from "../schedule/[id]/format-description"
import { getBase64Placeholder } from "../../_design-system/utils/get-base64-placeholder"

export interface SpeakerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  isReturning?: boolean
  stripes?: string
  speaker: SchedSpeaker
  showSocials?: boolean
  year: string
}

export async function SpeakerCard({
  className,
  speaker,
  year,
  showSocials = false,
  ...props
}: SpeakerCardProps) {
  let avatarPlaceholder: string | undefined

  if (speaker.avatar) {
    try {
      if (speaker.avatar.startsWith("//"))
        speaker.avatar = `https:${speaker.avatar}`

      avatarPlaceholder = await getBase64Placeholder(speaker.avatar)
    } catch (e) {
      // this might happen in dev server on reloads and it's okay to ignore
      console.warn(
        "failed to fetch speaker.avatar for placeholder generation:",
        e,
      )
    }
  }

  return (
    <article
      className={clsx(
        "group relative overflow-hidden border border-neu-200 bg-neu-0 @container dark:border-neu-100",
        styles.speakerCard,
        className,
      )}
      {...props}
    >
      <div className="flex h-full flex-col gap-4 p-4 @[420px]:flex-row md:gap-6 md:p-6">
        {showSocials && (
          <SpeakerLinks
            speaker={speaker}
            className="absolute right-6 top-6 z-[3]"
          />
        )}

        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="Avatar relative aspect-square h-full overflow-hidden @[420px]:w-[176px] @[420px]:shrink-0">
          <div className="absolute inset-0 z-[1] bg-sec-light mix-blend-multiply" />
          {speaker.avatar ? (
            <Image
              src={speaker.avatar}
              // the placeholder without an additional blur NextImage adds actually fits better here
              placeholder={avatarPlaceholder! as `data:image/${string}`}
              alt=""
              width={176}
              height={176}
              className="size-full object-cover saturate-[.1] transition-transform"
            />
          ) : (
            <div
              className="size-full"
              style={{
                backgroundImage:
                  "linear-gradient(163deg, #759236 0%, hsl(var(--color-sec-lighter)) 100%)",
              }}
            />
          )}
          <Stripes />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="typography-body-lg">{speaker.name}</h3>
            <p className="typography-body-sm line-clamp-1 text-neu-800">
              {formatSpeakerPosition(speaker)}
            </p>
            <SpeakerTags speaker={speaker} className="my-3" />
          </div>
          {speaker.about && (
            <p
              className="typography-body-sm line-clamp-3 text-neu-800"
              dangerouslySetInnerHTML={{
                __html: formatDescription(speaker.about),
              }}
            />
          )}
        </div>
      </div>
      <Anchor
        href={`/conf/${year}/speakers/${speaker.username}`}
        className="absolute inset-0 z-[1] ring-inset ring-neu-400 hover:bg-sec-base/[.035] hover:ring-1 dark:ring-neu-100 dark:hover:bg-sec-base/[.05]"
        aria-label={`See ${speaker.name.split(" ")[0]}'s sessions`}
      />
    </article>
  )
}

function Stripes() {
  return (
    <div
      role="presentation"
      className={clsx(
        "pointer-events-none absolute inset-0 inset-y-[-20px]",
        styles.stripes,
      )}
    >
      <StripesDecoration oddClassName="absolute inset-0 bg-gradient-to-b from-sec-dark to-[var(--end-color)]" />
    </div>
  )
}
