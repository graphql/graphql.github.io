import { Button } from "@/app/conf/_design-system/button"
import { clsx } from "clsx"
import { BECOME_A_SPEAKER_LINK } from "../../links"

export interface RegisterSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterSection({ className, ...props }: RegisterSectionProps) {
  return (
    <section
      className={clsx(
        "gql-section flex gap-x-12 gap-y-10 py-8 max-md:flex-col sm:py-12 md:py-24 xl:gap-x-24",
        className,
      )}
      {...props}
    >
      <div>
        <h2 className="typography-h2">Register</h2>
        <p className="typography-body-lg mt-6">
          Join a diverse community of GraphQL developers, architects, and
          enthusiasts while experiencing premium content and networking
          opportunities in a vendor-neutral environment.
        </p>
        <p className="typography-body-sm mt-6 md:mt-16">
          We never sell attendee lists or contact information, nor do we
          authorize others to do so. If you receive an email claiming to sell an
          attendee list for a Linux Foundation event, please forward it to
          events@linuxfoundation.org.
        </p>
      </div>
      <div className="flex flex-col gap-6 md:gap-8">
        <article className="border border-neu-400 p-6">
          <h3 className="typography-h3">Speakers</h3>
          <p className="typography-body-lg mt-6">
            You should have received a registration link in your acceptance
            email. If you did not, please contact us for more details:{" "}
            <a
              href="mailto:cfp@linuxfoundation.org"
              className="typography-link"
            >
              cfp@linuxfoundation.org
            </a>
          </p>
          <Button
            variant="primary"
            className="mt-6"
            href={BECOME_A_SPEAKER_LINK}
          >
            Become a speaker
          </Button>
        </article>
        <article className="border border-neu-400 p-6">
          <h3 className="typography-h3">Sponsors</h3>
          <p className="typography-body-lg mt-6">
            A registration link was shared in an email to your company's
            sponsorship contact. Please reach out to them if you need to
            register as a Sponsor. For further questions, please email us:{" "}
            <a
              href="mailto:graphql_events@linuxfoundation.org"
              className="typography-link"
            >
              graphql_events@linuxfoundation.org
            </a>
          </p>
          <Button
            variant="primary"
            className="mt-6"
            href="https://events.linuxfoundation.org/wp-content/uploads/2025/02/sponsor_GraphQLConf_2025_022025.pdf"
          >
            Become a sponsor
          </Button>
        </article>
        <article className="border border-neu-400 p-6">
          <h3 className="typography-h3">Media</h3>
          <p className="typography-body-lg mt-6">
            If you are a member of the media interested in attending this event,
            write us an email.
          </p>
          <Button
            variant="primary"
            className="mt-6"
            href="mailto:graphql_events@linuxfoundation.org"
          >
            Contact us
          </Button>
        </article>
      </div>
    </section>
  )
}
