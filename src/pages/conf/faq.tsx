import React, { ReactNode } from "react"
import SeoConf from "../../components/Conf/SEOConf"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"
import SectionConf from "../../components/Conf/Section"
import SeoConf from "../../components/Conf/Seo"

const faq: Array<{ id: string; title: string; contents: ReactNode }> = [
  {
    id: "contact",
    title: "Contact Us",
    contents: (
      <p>
        Answers to many common questions are readily available on this event’s
        website. If you cannot find the answer to your question, you are welcome
        to contact us by emailing{" "}
        <a href="mailto:graphql_events@linuxfoundation.org">
          graphql_events@linuxfoundation.org
        </a>
        .
      </p>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    contents: (
      <p>
        We never sell attendee lists or contact information, nor do we authorize
        others to do so. If you receive an email claiming to sell an attendee
        list for a Linux Foundation event, please forward it to{" "}
        <a href="mailto:events@linuxfoundation.org">
          events@linuxfoundation.org
        </a>
        .
      </p>
    ),
  },
  {
    id: "codeofconduct",
    title: "Code of Conduct",
    contents: (
      <>
        <p>
          The GraphQL Foundation and the Linux Foundation are dedicated to
          providing a harassment-free experience for participants at all of our
          events, whether they are held in person or virtually. GraphQLConf is a
          working conference intended for professional networking and
          collaboration within the open source community. It exists to encourage
          the open exchange of ideas and expression and requires an environment
          that recognizes the inherent worth of every person and group. While at
          GraphQLConf or related ancillary or social events, any participants,
          including members, speakers, attendees, volunteers, sponsors,
          exhibitors, booth staff and anyone else, should not engage in
          harassment in any form.
        </p>
        <p>
          This Code of Conduct may be revised at any time by The GraphQL
          Foundation or The Linux Foundation and the terms are non-negotiable.
          Your registration for or attendance at GraphQL, whether in person or
          virtually, indicates your agreement to abide by this policy and its
          terms.
        </p>
        <p>
          Please read the full{" "}
          <a
            href="https://events.linuxfoundation.org/about/code-of-conduct/"
            target="_blank"
          >
            Code of Conduct
          </a>{" "}
          for the complete policy and terms.
        </p>
      </>
    ),
  },
  {
    id: "invoices",
    title: "Invoices & Certificates of Attendance",
    contents: (
      <>
        <h3>Registration Invoices</h3>
        <p>
          Invoice receipts are downloadable from the confirmation email you
          received after registering under the Payment Receipt Information
          section. If the downloadable invoice receipt does not meet your needs
          or you need to have your confirmation email resent, please submit your
          request{" "}
          <a
            href="https://docs.google.com/forms/d/1uxCqF-ieG9QmpU8tl3HqgatHLY9FWhRs7KLpyhZA5KI/edit"
            target="_blank"
          >
            here
          </a>
          . Please include any additional customization you need for your
          invoice receipt in the request.
        </p>

        <h3>Certificates of Attendance</h3>
        <p>
          To request a Certificate of Attendance, please submit a request{" "}
          <a
            href="https://docs.google.com/forms/d/1RpI8h6AGK2rCl3aIlyEY0D6fU3tsZ5yr1Ba6c3h6p9Y/edit"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <p>
          Please Note: We verify attendance through the registration system, and
          Certificate of Attendance letters are sent out after the event is
          completed.
        </p>
      </>
    ),
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    contents: (
      <>
        <h3>Cancellations</h3>
        <p>
          If you must cancel for any reason, please{" "}
          <a href="https://cvent.me/4zbxz9" target="_blank">
            sign back into your registration
          </a>
          , click the “Register/Modify” button and select “Unregister.” If you
          need further assistance, email{" "}
          <a href="mailto:registration@linuxfoundation.org">
            registration@linuxfoundation.org
          </a>
          .
        </p>
        <p>
          Refunds will only be issued for cancellations received two weeks prior
          to the event start date, including bulk ticket request refunds, and
          will appear as a credit on the card’s statement 7 – 10 business days
          after cancellation. Due to the ongoing pandemic, individual refund
          requests due to COVID-19 positive tests will be honored up until the
          start date of the event, and must be accompanied by a photo of a
          positive COVID-19 test.
        </p>
        <p>
          Please note: Refunds can only be issued on the card the original
          payment was made.
        </p>
        <h3>Substitutions</h3>
        <p>
          If you are unable to attend, you may substitute another attendee in
          lieu of cancellation. To substitute an attendee,{" "}
          <a href="https://cvent.me/4zbxz9" target="_blank">
            sign back into your registration
          </a>
          , click the “Register/Modify”, and select “Transfer Registration” on
          your confirmation page.
        </p>
      </>
    ),
  },
  {
    id: "registration-types",
    title: "Other Registration Types",
    contents: (
      <>
        <h3>Scholarships</h3>
        <p>
          For information about scholarship opportunities, please{" "}
          <a href="#scholarships">click here</a>.
        </p>

        <h3>Speakers</h3>
        <p>
          You should have received a registration link in your acceptance email.
          If you did not, please contact{" "}
          <a href="mailto:cfp@linuxfoundation.org">cfp@linuxfoundation.org</a>{" "}
          for more details.
        </p>

        <h3>Sponsors</h3>
        <p>
          A registration link was shared in an email to your company’s
          sponsorship contact. Please reach out to your company’s sponsorship
          contact if you need to register as a Sponsor. For further questions,
          please email{" "}
          <a href="mailto:sponsors@linuxfoundation.org">
            sponsors@linuxfoundation.org
          </a>
          .
        </p>

        <h3>Media</h3>
        <p>
          If you are a member of the media interested in attending this event
          and have not received a complimentary access code to attend, please
          contact{" "}
          <a href="mailto:events@linuxfoundation.org">
            events@linuxfoundation.org
          </a>{" "}
          and a member of our PR team will be in touch.
        </p>
      </>
    ),
  },
  {
    id: "scholarships",
    title: "Scholarships",
    contents: (
      <>
        <p>
          The Linux Foundation’s Registration Scholarship program exists to
          support individuals who may not otherwise have the opportunity to
          attend Linux Foundation events in two categories:
        </p>

        <h3>Diversity Scholarships</h3>
        <p>
          Applicants must be from a traditionally underrepresented and/or
          marginalized group in the technology and/or open source communities
          who are unable to attend without some financial assistance. Including,
          but not limited to: persons identifying as LGBTQIA+, women, persons of
          color, and/or persons with disabilities.
        </p>

        <h3>Need-based Scholarships</h3>
        <p>
          Individuals who apply should be active members of the open source
          community who are unable to attend for financial reasons and are
          unable to get funding from their companies.
        </p>

        <p>
          Registration Scholarship recipients will receive a complimentary
          registration pass. Registration Scholarships are awarded based on a
          combination of need and impact. Selection will be made by an assembled
          group of reviewers who will assess each applicant’s request.
        </p>
        <p>
          Receipt of a scholarship does not, on its own, guarantee entry to the
          event. Recipients need to adhere to The Linux Foundation{" "}
          <a href="#health-and-safety">Health and Safety</a> rules and
          regulations or the scholarship is null and void.
        </p>
        <p>
          Applicants can be approved for up to 2 (two) Registration Scholarships
          per calendar year.
        </p>
        <ul className="list-disc">
          <li>Application Deadline — Friday, July 21, 2023 11:59 PM PST</li>
          <li>Notifications — Week of August 7, 2023</li>
        </ul>
        <ButtonConf
          text="Apply for a Scholarship"
          href="https://forms.gle/PwgWSTJ872Pce9XW6"
          target="_blank"
        />
      </>
    ),
  },
  {
    id: "visas",
    title: "Visa Letter Request",
    contents: (
      <p>
        If you require a visa letter to attend GraphQLConf, please read the
        instructions and then fill and submit the{" "}
        <a
          href="https://events.linuxfoundation.org/about/visa-request/"
          target="_blank"
        >
          form to request a visa
        </a>
        .
      </p>
    ),
  },
]

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="flow-root bg-white px-8 pb-24">
        <div className="mx-auto max-w-prose">
          <h1>GraphQLConf FAQ</h1>
          <ul className="columns-2 mx-0 gap-4">
            {faq.map(q => (
              <li>
                <a href={`#${q.id}`}>{q.title}</a>
              </li>
            ))}
          </ul>
          {faq.map(q => (
            <SectionConf id={q.id} title={q.title}>
              {q.contents}
            </SectionConf>
          ))}
        </div>
      </div>
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return <SeoConf title="GraphQLConf 2023 FAQ Frequently Asked Questions" />
}
