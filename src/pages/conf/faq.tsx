import React, { ReactNode } from "react"
import Seo from "../../components/Seo"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import SectionConf from "../../components/Conf/Section"

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
      <div className="px-8 pb-24">
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
  return <Seo title="GraphQLConf 2023 FAQ Frequently Asked Questions" />
}
