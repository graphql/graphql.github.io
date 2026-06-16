import Mailbox from "./mailbox.svg?svgr"
import { Button } from "@/app/conf/_design-system/button"
import { DISCORD_CHANNEL_LINK, DISCORD_SERVER_LINK } from "./links"

export function GetYourMeetupNoticedSection({ id }: { id?: string }) {
  return (
    <section className="gql-section" id={id}>
      <div className="flex flex-col-reverse gap-4 border border-sec-dark bg-sec-lighter p-6 dark:border-sec-base/40 dark:bg-sec-darker/20 sm:gap-10 sm:p-10 lg:flex-row lg:items-center lg:gap-16 lg:px-16">
        <div>
          <p className="typography-h2 text-balance text-neu-900">
            Get your meetup noticed
          </p>
          <div className="mt-6 space-y-4 text-neu-800">
            <p className="typography-body-lg text-balance">
              Planning to host a GraphQL meetup? The GraphQL Foundation can help
              spread the word through official channels.
            </p>
            <p className="typography-body-lg text-balance">
              To submit your event, join our{" "}
              <a
                href={DISCORD_SERVER_LINK}
                target="_blank"
                rel="noreferrer"
                className="typography-link"
              >
                Discord
              </a>{" "}
              and share details in the{" "}
              <a
                href={DISCORD_CHANNEL_LINK}
                target="_blank"
                rel="noreferrer"
                className="typography-link"
              >
                #locals
              </a>{" "}
              channel.
            </p>
          </div>
          <Button href={DISCORD_CHANNEL_LINK} className="mt-8 w-fit">
            Go to Discord
          </Button>
        </div>
        <div className="flex aspect-square w-full max-w-[320px] items-center justify-center border border-sec-dark bg-sec-light p-2 text-sec-darker dark:border-sec-base/40 dark:bg-sec-dark/10 max-lg:size-16 lg:p-8">
          <Mailbox aria-hidden className="size-full" />
        </div>
      </div>
    </section>
  )
}
