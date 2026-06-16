import clsx from "clsx"

import { SchedSpeaker } from "@/app/conf/_api/sched-types"
import {
  SocialIcon,
  SocialIconType,
} from "@/app/conf/_design-system/social-icon"

export interface SpeakerLinksProps
  extends React.HTMLAttributes<HTMLDivElement> {
  speaker: SchedSpeaker
  size?: "lg" | "md"
}

export function SpeakerLinks({
  speaker,
  className,
  size = "md",
  ...rest
}: SpeakerLinksProps) {
  const speakerUrls = SocialIconType.all
    .map(social =>
      speaker.socialurls.find(
        x => x.service.toLowerCase() === social.toLowerCase(),
      ),
    )
    .concat([{ service: "website", url: speaker.url || "" }])
    .filter((x): x is Exclude<typeof x, undefined> => !!x?.url)
    .slice(-3)

  return (
    <div
      className={clsx(
        "flex divide-x divide-neu-200 border border-neu-200 dark:border-neu-100",
        className,
      )}
      {...rest}
    >
      {speakerUrls.map(social => (
        <a
          key={social.url}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className={clsx(
            "flex items-center text-neu-900 hover:bg-neu-600/10",
            size === "lg" ? "p-4" : "p-2",
          )}
        >
          <SocialIcon
            type={social.service.toLowerCase()}
            className={size === "lg" ? "size-6" : "size-5"}
          />
        </a>
      ))}
    </div>
  )
}
