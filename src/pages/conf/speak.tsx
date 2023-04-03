import React, { ReactNode, Fragment } from "react"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"
import SectionConf from "../../components/Conf/Section"
import SeoConf from "../../components/Conf/Seo"

const cfp: Array<{ id: string; title: string; contents: ReactNode }> = [
  {
    id: "dates",
    title: "Dates to Remember",
    contents: (
      <DL
        items={[
          ["CFP Closes", "Friday, May 26 at 11:59 PM PDT (UTC-7)"],
          ["CFP Notifications", "Monday, July 10"],
          ["Schedule Announcement", "Wednesday, July 12"],
          ["Slide upload deadline to Sched.com", "Friday, September 15"],
          ["Event Date", "Tuesday, September 19 – Thursday, September 21"],
        ]}
      />
    ),
  },
  {
    id: "topics",
    title: "Suggested Topics",
    contents: (
      <DL
        items={[
          [
            "GraphQL Core",
            "latest and greatest developments in the GraphQL specification, graphql.js, GraphQL over HTTP, GraphiQL, and Composite Schemas.",
          ],
          [
            "GraphQL in Production",
            "best practices, real world use cases, spectacular success, spectacular failures, and lessons learned from production deployments of GraphQL.",
          ],
          [
            "GraphQL Security",
            "authentication/authorization, security testing, threat models, GraphQL and OWASP Top 10, exploit analysis and retrospective, full-lifecycle security considerations.",
          ],
          [
            "GraphQL Clients",
            "client development (web, mobile, and beyond) with GraphQL, frontend frameworks, GraphQL IDEs.",
          ],
          [
            "Platform and Backend",
            "GraphQL server implementations, data sources for GraphQL resolvers, integration with platform providers/frameworks, serverless, mesh architectures, AI/ML.",
          ],
          [
            "Spec Fusion",
            "Orchestrating a Symphony of API Standards. In today’s connected world, GraphQL coexists with various other specifications to enable seamless integrations and interoperability. Share your experiences and insights on integrating GraphQL with REST, gRPC, Websockets, RSocket, or other related technologies. Explore the harmonization of FAIR, FHIR,  RDF/SPARQL, BIAN, or similar standards to create a beautiful symphony of API specifications.",
          ],
          [
            "GraphQL and Data",
            "Discuss using GraphQL to interact with existing internal or external data sources, conventions and best practices for API design in different types of query and data workloads, federation across data sources, and authorization ownership and implementation best practices.",
          ],
          [
            "Scaling",
            "everything related to scaling GraphQL: testing, automation, performance, social/organizational considerations.",
          ],
          [
            "Beyond Javascript",
            "implementing and interacting with GraphQL APIs using languages and frameworks beyond JavaScript: Go, Ruby, Rust, .NET, WebAssembly, et al.",
          ],
          [
            "GraphQL Academia",
            "research papers or studies in academia that involve GraphQL.",
          ],
          [
            "Emerging Community Trends",
            "what’s happening at the vanguard of GraphQL adoption that will help define the future of GraphQL usage in the community.",
          ],
          [
            "Defies Categorization",
            "have a talk idea that doesn’t fit inside the topics above? Challenge accepted! Wow us with your awesome talk submission and we’ll work with you to fit it into our track structure. ",
          ],
        ]}
      />
    ),
  },
  {
    id: "types",
    title: "Submission Types",
    contents: (
      <DL
        items={[
          [
            "Session Presentation",
            "Typically 30-40 minutes in length, 1-2 speakers presenting on a topic",
          ],
          [
            "Panel Discussion",
            "Typically 30-40 minutes in length, 3-5 speakers presenting on a topic",
          ],
          ["Birds of a Feather", "Typically 45 minutes to 1 hour in length"],
          ["Lightning Talk", "Typically 5-10 minutes in length"],
          ["Workshop", "Typically 1-2 hours in length"],
        ]}
      />
    ),
  },
  {
    id: "important",
    title: "Important Notes",
    contents: (
      <>
        <p>
          All speakers are required to adhere to our{" "}
          <a href="/conf/faq/#codeofconduct">Code of Conduct</a>. We also highly
          recommend that speakers take our online{" "}
          <a
            href="https://training.linuxfoundation.org/linux-courses/open-source-compliance-courses/inclusive-speaker-orientation"
            target="_blank"
          >
            Inclusive Speaker Orientation Course
          </a>
          .
        </p>
        <p>
          Panel submissions must include the names of all participants in the
          initial submission to be considered. In an effort to promote speaker
          diversity, The Linux Foundation does not accept submissions with
          all-male panels, and speakers must not all be from the same company.
        </p>
        <p>
          Complimentary Passes For Speakers – One complimentary pass for the
          event will be provided for the accepted speaker(s) per submission.
        </p>
        <p>
          Avoid sales or marketing pitches and discussing unlicensed or
          potentially closed-source technologies when preparing your proposal;
          these talks are almost always rejected due to the fact that they take
          away from the integrity of our events, and are rarely well-received by
          conference attendees.
        </p>
        <p>
          The Linux Foundation will not select submissions that have already
          been presented at a previous Linux Foundation event within the past
          year. If your submission is similar to a previous talk, please explain
          how this version differs.
        </p>
        <p>
          You are allowed to be listed as a speaker on a maximum of two
          proposals submitted to the CFP, regardless of the format. If you are
          listed on more than two, we will contact you to remove yourself from
          any additional proposals.
        </p>
        <p>
          You may only be selected to speak on one panel and one non-panel
          session per event.
        </p>
        <p>
          All accepted speakers are required to submit their slides prior to the
          event.
        </p>
      </>
    ),
  },
  {
    id: "prepare",
    title: "Prepare to Submit",
    contents: (
      <>
        <p>
          While it is not our intention to provide you with strict instructions
          on how to prepare your proposal, we hope you will take a moment to
          review the following guidelines that we have put together to help you
          prepare the best submission possible. To get started, here are three
          things that you should consider before submitting your proposal:
        </p>
        <ul className="list-disc">
          <li>What are you hoping to get from your presentation?</li>
          <li>
            What do you expect the audience to gain from your presentation?
          </li>
          <li>How will your presentation help better the ecosystem?</li>
          <li>
            There are plenty of ways to give a presentation about projects and
            technologies without focusing on company-specific efforts. Remember
            the things to consider that we mentioned above when writing your
            proposal and think of ways to make it interesting for attendees
            while still letting you share your experiences, educate the
            community about an issue, or generate interest in a project.
          </li>
        </ul>
        <h3>Writing Your Proposal</h3>
        <p>
          Your abstract title will be the main point of reference for attendees
          to decide if they want to attend your talk, so choose it carefully.
          The title should accurately reflect the content of your talk and
          comply with The Linux Foundation’s{" "}
          <a
            href="https://events.linuxfoundation.org/graphqlconf/program/cfp/#preparing-to-submit:~:text=The%20Linux%20Foundation%E2%80%99s-,Inclusive%20Language%20Initiative.,-It%20will%20appear"
            target="_blank"
          >
            Inclusive Language Initiative
          </a>
          . Please use title case when inputting your title.
        </p>
        <p>
          In the abstract, make the most of your opportunity to pitch your talk
          to the program committee by emphasizing its problem, contribution, and
          relevance. Don’t forget technical details, but keep the big picture in
          mind. Your proposal’s description should be focused, detailed, and
          comply with The Linux Foundation’s Inclusive Language Initiative. It
          will appear on the website schedule if accepted, so ensure it’s
          error-free, uses full sentences, and written in the third person. This
          description can make or break an attendee’s decision to attend your
          talk, so provide enough information to aid their choice, and be
          concise. The competition for presentation slots is high, so a
          well-crafted, engaging abstract will improve your chances of
          acceptance.
        </p>
        <h3>How to Give a Great Talk</h3>
        <p>
          We want to make sure submitters receive resources to help put together
          a great submission and if accepted, give the best presentation
          possible. To help with this, we recommend viewing seasoned speaker
          Dawn Foster’s in-depth talk:{" "}
          <a href="https://youtu.be/2I5fYBLCfUA" target="_blank">
            Getting Over Your Imposter Syndrome to Become a Conference Speaker –
            Dawn Foster, VMware
          </a>
        </p>
        <h3>
          Have More Questions? First Time Submitting? Don’t Feel Intimidated
        </h3>
        Linux Foundation events are an excellent way to get to know the
        community and share your ideas and the work that you are doing and we
        strongly encourage first-time speakers to submit talks for our events.
        In the instance that you aren’t sure about your abstract,{" "}
        <a href="mailto:cfp@linuxfoundation.org">reach out to us</a> and we will
        be more than happy to work with you on your proposal.
      </>
    ),
  },
  {
    id: "sessionize",
    title: "Using Sessionize",
    contents: (
      <>
        <h3>First time using Sessionize?</h3>
        <p>
          Sessionize is a cloud-based event content management software designed
          to be intuitive and user-friendly. If you need guidance, please review
          how to submit your session for an event for step-by-step instructions
          and helpful screenshots.
        </p>

        <h3>Submitting on behalf of somebody else?</h3>
        <p>
          While speakers ordinarily submit their sessions themselves, it’s also
          common for them to have someone else do it in their name. Submitters
          can choose to submit as someone else and must fill out the necessary
          speaker fields, but the session submission process is otherwise
          identical to when the session is submitted by the speaker themselves.
        </p>
      </>
    ),
  },
]

function DL({ items }: { items: [header: string, contents: ReactNode][] }) {
  return (
    <dl className="my-4">
      {items.map(([header, contents]) => (
        <Fragment key={header}>
          <dt className="mt-6 mb-2 text-xl">{header}</dt>
          <dd>{contents}</dd>
        </Fragment>
      ))}
    </dl>
  )
}

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="bg-white">
        <div className="prose lg:prose-lg mx-auto py-10 max-sm:px-4">
          <h1>Speak at GraphQLConf</h1>
          <section className="px-0">
            <p>
              Putting on an amazing conference depends on great content, which
              is where you come in! Join other GraphQL leaders and community
              members as a presenter by submitting to our Call for Proposals
              (CFP) and sharing your experience across a wide range of topics.
            </p>
            <p>
              The CFP is open through Friday, May 26. For any questions
              regarding the CFP process, please email{" "}
              <a href="mailto:cfp@linuxfoundation.org">
                cfp@linuxfoundation.org
              </a>
              .
            </p>
            <ButtonConf
              onWhiteBg
              text="Submit a Proposal"
              href="https://sessionize.com/graphqlconf2023/"
              target="_blank"
            />
          </section>
          <ul className="columns-2 mx-0 gap-4">
            {cfp.map(q => (
              <li key={q.id}>
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
    <SeoConf title="Speak at GraphQLConf 2023 - (CFP) Call for proposals" />
  )
}
