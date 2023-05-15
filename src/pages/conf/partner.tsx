import React, { ReactNode } from "react"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"
import SectionConf from "../../components/Conf/Section"
import SeoConf from "../../components/Conf/Seo"

const cfp: Array<{ id: string; title: string; contents: ReactNode }> = [
  {
    id: "media",
    title: "Benefits for Media Partners",
    contents: (
      <>
        <p>As a media partner, you will receive the following benefits:</p>
        <ul className="list-disc">
          <li>Logo on our GraphQLConf 2023 event websites</li>
          <li>20% registration discount code for your readers/members</li>
          <li>Complimentary media passes upon request</li>
          <li>Recognition in GraphQL Foundation Newsletter</li>
          <li>Promotion of partnership on social channels</li>
          <li>Access and booking assistance with the event’s sponsors</li>
          <li>
            Your company name and contact information to the event’s Diamond
            Sponsors
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "community",
    title: "Benefits for Community Partners",
    contents: (
      <>
        <p>As a community partner, you will receive the following benefits:</p>
        <ul className="list-disc">
          <li>Logo on our GraphQLConf 2023 event website</li>
          <li>Promotion of partnership on social channels</li>
          <li>20% registration discount code for your community</li>
          <li>Collateral distribution on shared table in sponsor showcase</li>
          <li>(1) Complimentary conference attendee pass</li>
        </ul>
      </>
    ),
  },
  {
    id: "obligation",
    title: "Obligations for Media and Community Partners",
    contents: (
      <>
        <p>
          In exchange for these benefits, media and community partners are
          expected to fulfill the following obligations:
        </p>
        <ul className="list-disc">
          <li>
            Promote the conference through your own media channels or community
            network
          </li>
          <li>
            Include the conference logo and website URL in any promotional
            materials related to the conference
          </li>
          <li>
            Follow conference media and social media guidelines, including not
            publishing or sharing any defamatory or inappropriate content
            related to the conference or its attendees
          </li>
          <li>
            Attend the conference and actively engage with attendees and other
            partners
          </li>
          <li>
            Provide feedback and suggestions for improvement of future
            conferences
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "apply",
    title: "How to Apply",
    contents: (
      <>
        <p>
          To apply to become a media or community partner, please fill out the
          application form. Applications will be reviewed on a rolling basis,
          and all applicants will be notified of their status within two weeks
          of submitting their application.
        </p>
        <p>
          Thank you for your interest in partnering with us for GraphQLConf
          2023. We look forward to working with you to make our inaugural
          conference a success!
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
          <h1>Partner with GraphQLConf</h1>
          <section className="px-0 my-8">
            <p>
              We are pleased to offer a Media and Community Partner Program for
              our upcoming GraphQLConf 2023. Our program is designed to provide
              benefits to media and community partners, while also ensuring that
              our conference is promoted in a positive and appropriate way.
            </p>
            <div className="flex gap-4 flex-row">
              <ButtonConf href="">Become a Media Partner</ButtonConf>
              <ButtonConf href="">Become a Community Partner</ButtonConf>
            </div>
          </section>
          <ul className="md:columns-2 max-lg:p-0 max-lg:m-0 list-none">
            {cfp.map(q => (
              <li key={q.id} className="md:mt-0 md:mb-2">
                <a href={`#${q.id}`}>{q.title}</a>
              </li>
            ))}
          </ul>
          {cfp.map(q => (
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
  return (
    <SeoConf title="Partner with GraphQLConf 2023 - Media and Community Partners" />
  )
}
