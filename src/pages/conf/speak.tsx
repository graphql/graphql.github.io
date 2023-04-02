import React, { ReactNode } from "react"
import Seo from "../../components/Seo"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"
import SectionConf from "../../components/Conf/Section"

const cfp: Array<{ id: string; title: string; contents: ReactNode }> = [
  {
    id: "dates",
    title: "Dates to Remember",
    contents: (
      <dl>
        {[
          ["CFP Closes", "Friday, May 26 at 11:59 PM PDT (UTC-7)"],
          ["CFP Notifications", "Monday, July 10"],
          ["Schedule Announcement", "Wednesday, July 12"],
          ["Slide upload deadline to Sched.com", "Friday, September 15"],
          ["Event Date", "Tuesday, September 19 – Thursday, September 21"],
        ].map(([eventName, date]) => (
          <>
            <dt>{eventName}</dt>
            <dd>{date}</dd>
          </>
        ))}
      </dl>
    ),
  },
  {
    id: 'topics',
    title: 'Suggested Topics',
    contents: (
      <dl>
        {[
          ["GraphQL Core", "latest and greatest developments in the GraphQL specification, graphql.js, GraphQL over HTTP, GraphiQL, and Composite Schemas."],
          ["GraphQL in Production", "best practices, real world use cases, spectacular success, spectacular failures, and lessons learned from production deployments of GraphQL."],
          ["GraphQL Security", "authentication/authorization, security testing, threat models, GraphQL and OWASP Top 10, exploit analysis and retrospective, full-lifecycle security considerations."],
          ["GraphQL Clients", "client development (web, mobile, and beyond) with GraphQL, frontend frameworks, GraphQL IDEs."],
          ["Platform and Backend", "GraphQL server implementations, data sources for GraphQL resolvers, integration with platform providers/frameworks, serverless, mesh architectures, AI/ML."],
          ["Spec Fusion", "Orchestrating a Symphony of API Standards", "In today’s connected world, GraphQL coexists with various other specifications to enable seamless integrations and interoperability. Share your experiences and insights on integrating GraphQL with REST, gRPC, Websockets, RSocket, or other related technologies. Explore the harmonization of FAIR, FHIR,  RDF/SPARQL, BIAN, or similar standards to create a beautiful symphony of API specifications."],
          ["GraphQL and Data", "Discuss using GraphQL to interact with existing internal or external data sources, conventions and best practices for API design in different types of query and data workloads, federation across data sources, and authorization ownership and implementation best practices."],
          ["Scaling", "everything related to scaling GraphQL: testing, automation, performance, social/organizational considerations."],
          ["Beyond Javascript", "implementing and interacting with GraphQL APIs using languages and frameworks beyond JavaScript: Go, Ruby, Rust, .NET, WebAssembly, et al."],
          ["GraphQL Academia", "research papers or studies in academia that involve GraphQL."],
          ["Emerging Community Trends", "what’s happening at the vanguard of GraphQL adoption that will help define the future of GraphQL usage in the community."],
          ["Defies Categorization", "have a talk idea that doesn’t fit inside the topics above? Challenge accepted! Wow us with your awesome talk submission and we’ll work with you to fit it into our track structure. "],
        ].map(([name, detail]) => (
          <>
            <dt>{name}</dt>
            <dd>{detail}</dd>
          </>
        ))}
      </dl>
    ),
  }
]

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />

      <div className="px-8 pb-24">
        <div className="mx-auto max-w-prose">
          <h1>Speak at GraphQLConf</h1>
          <section>
            <p>
              GraphQLConf, the official GraphQL conference brought to you by the
              GraphQL Foundation, brings the entire GraphQL community together
              to learn, engage, and discuss everything GraphQL. Putting on an
              amazing conference depends on great content, which is where you
              come in! Join other GraphQL practitioners and leaders as a
              presenter by submitting to our CFP and sharing your experience
              across a wide range of topics.
            </p>
            <p>
              For any questions regarding the Call for Proposals (CFP) process,
              please email{" "}
              <a href="mailto:cfp@linuxfoundation.org">
                cfp@linuxfoundation.org
              </a>
              .
            </p>
            <ButtonConf
              text="Submit a Proposal"
              href="https://sessionize.com/graphqlconf2023/"
              target="_blank"
            />
          </section>
          <ul className="columns-2 mx-0 gap-4">
            {cfp.map(q => (
              <li>
                <a href={`#${q.id}`}>{q.title}</a>
              </li>
            ))}
          </ul>
          {cfp.map(q => (
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
  return <Seo title="Speak at GraphQLConf 2023 - (CFP) Call for proposals" />
}
