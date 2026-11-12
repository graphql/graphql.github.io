import { Button } from "@/app/conf/_design-system/button"

const CFP_LINK = "https://forms.gle/M1kiuvwK2wLJyNzi9"

export function CfpButton({
  className,
  cfpLink,
}: {
  className?: string
  cfpLink?: string
}) {
  return (
    <Button href={cfpLink || CFP_LINK} className={className}>
      Submit a talk
    </Button>
  )
}

export function BecomeASpeakerSection({
  cfpDeadline,
  cfpLink,
}: {
  cfpDeadline?: string
  cfpLink?: string
}) {
  return (
    <section className="gql-section xl:py-12">
      <h3 className="typography-h2 mb-8">Become a speaker</h3>
      <div className="flex max-w-2xl flex-col gap-6">
        <p className="typography-body-lg">
          Any GraphQL topic is welcome: feedback from the trenches,
          introductions, technical deep-dives, workshops, lightning talks and
          more!
        </p>
        <p className="typography-body-lg">
          The FOST audience includes non-GraphQL experts from other communities
          (AsyncAPI, OpenAPI, JSON Schema, ...) as well as CTOs and business
          decision-makers. Submissions that address this diverse audience are
          especially appreciated.
        </p>
        <p className="typography-body-lg">
          All speakers will get a free conference ticket.
        </p>
        {cfpDeadline && (
          <p className="typography-body-lg">The CFP closes on {cfpDeadline}.</p>
        )}
        <p className="typography-body-lg">
          We aim to reply no later than 1 month before the event. We realize
          this can be short notice for international travellers — speakers
          should feel free to reach out to the team on{" "}
          <a href="https://discord.graphql.org" className="underline">
            Discord
          </a>{" "}
          with any questions.
        </p>
        <CfpButton cfpLink={cfpLink} className="whitespace-nowrap md:w-fit" />
      </div>
    </section>
  )
}
