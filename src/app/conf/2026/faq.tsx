import clsx from "clsx"

import ArrowDown from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

const FAQS = [
  {
    question: "When will speakers and the agenda be announced?",
    answer: (
      <>
        Stay tuned to our social media channels and website for updates on
        speakers and the agenda.
      </>
    ),
  },
  {
    question: "Is anything happening on May 21 after the main conference?",
    answer: (
      <>
        Working Group Day is on May 21, 2026. For attendance, schedule, and
        day-of logistics, see{" "}
        <a className="typography-link" href="/conf/2026/wg-day">
          the WG Day page
        </a>
        .
      </>
    ),
  },
  {
    question: "Can I sponsor the event?",
    answer: (
      <>
        Yes! We offer various sponsorship packages. See the{" "}
        <a className="typography-link" href="#sponsors">
          Sponsors
        </a>{" "}
        section for more information.
      </>
    ),
  },
  {
    question: "Are there group discounts for teams?",
    answer: (
      <>
        If you have a group of 5 or more people, you can receive a 10% discount
        on all passes. All pass types must be the same, and all registrations
        must be processed under one group registration and must be paid with the
        same credit card.
        <br />
        <br />
        To create a group, select “Add Another Person” to your registration.
        When 5 or more people are added the 10% discount will be automatically
        applied.{" "}
        <a
          className="typography-link"
          href="mailto:registration@linuxfoundation.org"
        >
          registration@linuxfoundation.org
        </a>{" "}
        for any questions.
      </>
    ),
  },
  {
    question: "What is the refund and cancellation policy?",
    answer: (
      <>
        If you must cancel for any reason, please sign back into your
        registration, click the “Register/Modify” button and select
        “Unregister.” If you need further assistance, please contact{" "}
        <a
          className="typography-link"
          href="mailto:registration@linuxfoundation.org"
        >
          registration@linuxfoundation.org
        </a>
        .<br />
        <br />
        Refunds will only be issued for cancellations received two weeks prior
        to the event start date, including bulk ticket request refunds, and will
        appear as a credit on the card's statement 7-10 business days after
        cancellation. Individual refund requests for late cancellations due to
        sickness or emergency will be considered on a case by case basis -{" "}
        <a
          className="typography-link"
          href="mailto:registration@linuxfoundation.org"
        >
          registration@linuxfoundation.org
        </a>
        .<br />
        <br />
        Refunds can only be issued on the card the original payment was made.
      </>
    ),
  },
  {
    question: "Can I transfer my registration?",
    answer: (
      <>
        If you are unable to attend, you may substitute another attendee in lieu
        of cancellation. To substitute an attendee, sign back into your
        registration, click the “Register/Modify”, and select “Transfer
        Registration” on your confirmation page.
      </>
    ),
  },
  {
    question: "Can I get certificate of attendance?",
    answer: (
      <>
        You can download your Certificate of Attendance directly from your{" "}
        <a
          className="typography-link"
          target="_blank"
          rel="noreferrer"
          href="https://openprofile.dev/myevents"
        >
          LFX dashboard
        </a>{" "}
        by navigating to the "Past Events" section in the LF Events column.
        <br />
        <br />
        Please Note: We verify attendance through the registration system, and
        certificates will only be available for download after the event is
        completed.
      </>
    ),
  },
  {
    question: "How do I request a visa letter?",
    answer: (
      <>
        You must be registered for the event before requesting a visa letter.
        Please note: it can take up to an hour for our registration system and
        visa letter system to sync.{" "}
        <a
          className="typography-link"
          target="_blank"
          href="https://events.linuxfoundation.org/about/visa-request/"
          rel="noreferrer"
        >
          Request a visa letter
        </a>
        .
      </>
    ),
  },
  {
    question: "Where can I find health and safety information for the event?",
    answer: (
      <>
        Your well-being is our top priority. We continuously update our health
        and safety guidelines based on local regulations. Information about food
        allergies, medical resources, emergency contacts, and safety services
        can be found on{" "}
        <a
          className="typography-link"
          href="/conf/2026/resources#onsite-resources"
        >
          this
        </a>{" "}
        page.
      </>
    ),
  },
  {
    question: "What accessibility and onsite resources are available?",
    answer: (
      <>
        We are committed to providing a comfortable and accessible experience
        for all attendees. Onsite resources include a private nursing room,
        venue accessibility support, reserved seating, a quiet room,
        communication and pronoun stickers, all-gender restrooms, first aid
        assistance, and a process for handling harassment reports. For full
        details on these resources, please visit{" "}
        <a
          className="typography-link"
          href="/conf/2026/resources#health--safety"
        >
          this
        </a>{" "}
        page.
      </>
    ),
  },
  {
    question: "Looking for more?",
    answer: (
      <>
        Check out our{" "}
        <a className="typography-link" href="/conf/2026/resources">
          Resources
        </a>{" "}
        page.
      </>
    ),
  },
  {
    question: "Cannot find the answer to your question?",
    answer: (
      <>
        You are welcome to email us{" "}
        <a
          className="typography-link"
          href="mailto:graphql_events@linuxfoundation.org "
        >
          graphql_events@linuxfoundation.org
        </a>
        .
      </>
    ),
  },
]

export function FAQ({ className }: { className?: string }) {
  return (
    <section
      id="faq"
      className={clsx(
        "gql-section flex gap-10 max-lg:flex-col xl:gap-24 xl:py-16 2xl:gap-36",
        className,
      )}
    >
      <div>
        <h2 className="typography-h2 lg:max-xl:max-w-lg">
          Frequently Asked Questions
        </h2>
        <p className="typography-body-md mt-6">
          You can find much more information on our{" "}
          <a href="/conf/2026/resources" className="typography-link">
            Resources
          </a>{" "}
          page.
        </p>
      </div>

      <div className="grow space-y-4 lg:space-y-6">
        {FAQS.map((faq, index) => (
          <details
            open={index === 0}
            key={index}
            className="group/q w-full border border-neu-400 @container"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 border-neu-400 p-2 px-3 focus:outline-none group-open/q:border-b [&::-webkit-details-marker]:hidden">
              <span className="typography-body-lg select-none">
                {faq.question}
              </span>
              <ArrowDown className="size-10 shrink-0 text-sec-darker group-open/q:rotate-180" />
            </summary>
            <div className="typography-body-md p-3">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
