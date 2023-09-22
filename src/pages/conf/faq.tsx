import React, { ReactNode } from "react"
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
    id: "dni",
    title: "Diversity & Inclusion",
    contents: (
      <>
        <p>
          Education and collaboration are vital to the future of the open source
          ecosystem, and it is imperative to us that everyone in the community
          that wants to participate feels welcome to do so regardless of gender,
          gender identity, sexual orientation, disability, race, ethnicity, age,
          religion or economic status. Our{" "}
          <a href="#codeofconduct">code of conduct</a> outlines our expectations
          for all those who participate in our community, as well as the
          consequences for unacceptable behavior.
        </p>
        <p>
          We offer diversity and need based{" "}
          <a href="#scholarships">scholarships</a> and have considered a broad
          range of both <a href="#onsite-resources">onsite resources</a> and{" "}
          <a href="#emergency-resources">emergency resources</a> as well as a{" "}
          <a href="#health-and-safety">health &amp; safety</a> policy.
        </p>
        <p>
          If you have ideas on how we can create a more inclusive event, please
          do not hesitate to let us know. Contact Emily Ruf, Senior Event
          Manager, at{" "}
          <a href="mailto:eruf@linuxfoundation.org">eruf@linuxfoundation.org</a>
          .
        </p>
      </>
    ),
  },
  {
    id: "chaoss-event-badge",
    title: "CHAOSS D&I Event Badge",
    contents: (
      <>
        <img
          src="https://img.shields.io/badge/D%26I-Gold-yellow?style=flat-square&labelColor=583586&&link=https://github.com/badging/event-diversity-and-inclusion/issues/255/&logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1MCAyNTAiPgo8cGF0aCBmaWxsPSIjMUM5QkQ2IiBkPSJNOTcuMSw0OS4zYzE4LTYuNywzNy44LTYuOCw1NS45LTAuMmwxNy41LTMwLjJjLTI5LTEyLjMtNjEuOC0xMi4yLTkwLjgsMC4zTDk3LjEsNDkuM3oiLz4KPHBhdGggZmlsbD0iIzZBQzdCOSIgZD0iTTE5NC42LDMyLjhMMTc3LjIsNjNjMTQuOCwxMi4zLDI0LjcsMjkuNSwyNy45LDQ4LjVoMzQuOUMyMzYuMiw4MC4yLDIxOS45LDUxLjcsMTk0LjYsMzIuOHoiLz4KPHBhdGggZmlsbD0iI0JGOUNDOSIgZD0iTTIwNC45LDEzOS40Yy03LjksNDMuOS00OS45LDczLTkzLjgsNjUuMWMtMTMuOC0yLjUtMjYuOC04LjYtMzcuNS0xNy42bC0yNi44LDIyLjQKCWM0Ni42LDQzLjQsMTE5LjUsNDAuOSwxNjIuOS01LjdjMTYuNS0xNy43LDI3LTQwLjIsMzAuMS02NC4ySDIwNC45eiIvPgo8cGF0aCBmaWxsPSIjRDYxRDVGIiBkPSJNNTUuNiwxNjUuNkMzNS45LDEzMS44LDQzLjMsODguOCw3My4xLDYzLjVMNTUuNywzMy4yQzcuNSw2OS44LTQuMiwxMzcuNCwyOC44LDE4OEw1NS42LDE2NS42eiIvPgo8L3N2Zz4K"
          alt="D&I Badging badge state: Gold"
          className="mb-0"
        />
        <p>
          Awarded to events in the open source community that fosters healthy
          D&I practices.{" "}
          <a
            href="https://chaoss.community/diversity-and-inclusion-badging/"
            target="_blank"
          >
            Learn More
          </a>
          .
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
]

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="bg-white">
        <div className="prose lg:prose-lg mx-auto py-10 max-sm:px-4">
          <h1>GraphQLConf FAQ</h1>
          <ul className="md:columns-2 max-lg:p-0 max-lg:m-0 list-none">
            {faq.map(q => (
              <li key={q.id} className="md:mt-0 md:mb-2">
                <a href={`#${q.id}`}>{q.title}</a>
              </li>
            ))}
          </ul>
          {faq.map(q => (
            <SectionConf key={q.id} id={q.id} title={q.title}>
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
