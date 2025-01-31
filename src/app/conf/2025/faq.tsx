import { ArrowRight } from "lucide-react"

import styles from "./index.module.css"

const FAQS = [
  {
    question: "When will speakers and the agenda be announced?",
    answer:
      "Stay tuned to our social media channels and website for updates on speakers and the agenda.",
  },
  {
    question: "Can I sponsor the event?",
    answer:
      'Yes! We offer various sponsorship packages. See <a href="#sponsors">this</a> section for more information.',
  },
  {
    question: "Are there group discounts for teams?",
    answer:
      'If you have a group of 5 or more people, you can receive a 10% discount on all passes. All pass types must be the same, and all registrations must be processed under one group registration and must be paid with the same credit card. To create a group, select “Add Another Person” to your registration. When 5 or more people are added the 10% discount will be automatically applied. <a href="mailto:registration@linuxfoundation.org">registration@linuxfoundation.org</a> for any questions.',
  },
  {
    question: "What is the refund and cancellation policy?",
    answer: `If you must cancel for any reason, please sign back into your registration, click the “Register/Modify” button and select “Unregister.” If you need further assistance, please contact <a href="mailto:registration@linuxfoundation.org">registration@linuxfoundation.org</a>.<br/><br/>Refunds will only be issued for cancellations received two weeks prior to the event start date, including bulk ticket request refunds, and will appear as a credit on the card's statement 7-10 business days after cancellation. Individual refund requests for late cancellations due to sickness or emergency will be considered on a case by case basis - <a href="mailto:registration@linuxfoundation.org">registration@linuxfoundation.org</a>.<br/><br/>Refunds can only be issued on the card the original payment was made.`,
  },
  {
    question: "Can I transfer my registration?",
    answer:
      "If you are unable to attend, you may substitute another attendee in lieu of cancellation. To substitute an attendee, sign back into your registration, click the “Register/Modify”, and select “Transfer Registration” on your confirmation page.",
  },
  {
    question: "Can I get certificate of attendance?",
    answer: `You can download your Certificate of Attendance directly from your <a target="_blank" href="https://openprofile.dev/myevents">LFX dashboard</a> by navigating to the "Past Events" section in the LF Events column. Please Note: We verify attendance through the registration system, and certificates will only be available for download after the event is completed.`,
  },
  {
    question: "How do I request a visa letter?",
    answer: `You must be registered for the event before requesting a visa letter. Please note: it can take up to an hour for our registration system and visa letter system to sync. <a target="_blank" href="https://events.linuxfoundation.org/about/visa-request/">Request a visa letter</a>.`,
  },
  {
    question: "Where can I find health and safety information for the event?",
    answer:
      'Your well-being is our top priority. We continuously update our health and safety guidelines based on local regulations. Information about food allergies, medical resources, emergency contacts, and safety services can be found on  <a href="/conf/2025/resources#onsite-resources">this</a> page.',
  },
  {
    question: "What accessibility and onsite resources are available?",
    answer:
      'We are committed to providing a comfortable and accessible experience for all attendees. Onsite resources include a private nursing room, venue accessibility support, reserved seating, a quiet room, communication and pronoun stickers, all-gender restrooms, first aid assistance, and a process for handling harassment reports. For full details on these resources, please visit <a href="/conf/2025/resources#health--safety">this</a> page.',
  },
  {
    question: "Looking for more?",
    answer: "Checkout our <a href='/conf/2025/resources'>Resources</a> page.",
  },
  {
    question: "Cannot find the answer to your question?",
    answer:
      'You are welcome to email us <a href="mailto:graphql_events@linuxfoundation.org ">graphql_events@linuxfoundation.org</a>.',
  },
]

export function FAQ() {
  return (
    <div id="faq" className={styles.faq}>
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 select-none text-4xl font-bold md:text-5xl">
            Frequently
            <br />
            Asked Questions
          </h2>
          <p className="select-none text-sm">
            You can find much more information on our{" "}
            <a
              href="/conf/2025/resources"
              className="select-text text-primary hover:underline"
            >
              Resources
            </a>{" "}
            page.
          </p>
        </div>

        <div>
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="group border-b border-dashed border-white/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-start gap-2 py-6 text-left focus:outline-none">
                <ArrowRight className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-90" />
                <span className="select-none text-lg">{faq.question}</span>
              </summary>
              <p
                className="-mt-4 ml-7 whitespace-pre-wrap pb-6 text-gray-300 [&>a]:underline"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
