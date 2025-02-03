"use client"
import clsx from "clsx"

import { useState, useEffect, ReactNode } from "react"
import Link from "next/link"

function TabHeading({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2 className={clsx("mb-4 text-2xl font-semibold", className)}>
      {children}
    </h2>
  )
}

function DatesTab() {
  return (
    <>
      <TabHeading>Dates to Remember</TabHeading>
      <ul className="list-disc space-y-2 pl-6">
        <li>CFP Opens: Tuesday, 4 February</li>
        <li>CFP Close: Sunday, 4 May at 23:59 CEST (UTC+2)</li>
        <li>CFP Notifications: Monday, 9 June</li>
        <li>Schedule Announced: Wednesday, 11 June</li>
        <li>Slides due date: Friday, 5 September</li>
        <li>
          Event Dates: Monday, 8 September - Wednesday, 10 September, 2024
        </li>
      </ul>
    </>
  )
}

function TopicsTab() {
  return (
    <>
      <TabHeading>Suggested Topics</TabHeading>
      <ul className="list-disc space-y-2 pl-6">
        <li>GraphQL Working Group</li>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            GraphQL Specification (including incremental delivery, nullability)
          </li>
          <li>GraphQL-over-HTTP specification</li>
          <li>Federation specification</li>
          <li>
            Reference software (GraphQL.js, graphql-http, GraphiQL and LSP)
          </li>
        </ul>
        <li>GraphQL in Production</li>
        <ul className="list-disc space-y-2 pl-6">
          <li>Case studies</li>
          <li>Federation and Distributed Systems</li>
          <li>
            Schema evolution (including backwards compatibility and versioning)
          </li>
          <li>Security</li>
          <li>Scaling</li>
          <li>Observability, telemetry and tracing</li>
        </ul>
        <li>Developer Experience</li>
        <ul className="list-disc space-y-2 pl-6">
          <li>Frontend</li>
          <li>Backend</li>
          <li>Patterns and community trends</li>
          <li>Testing</li>
          <li>Documentation</li>
        </ul>
      </ul>
    </>
  )
}

function NotesTab() {
  return (
    <>
      <TabHeading>Important Notes</TabHeading>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          All speakers are required to adhere to our{" "}
          <Link
            className="underline hover:text-primary"
            href="/conf/2025/resources/#code-of-conduct"
          >
            Code of Conduct
          </Link>
          . We also highly recommend that speakers take our online{" "}
          <a
            className="underline hover:text-primary"
            target="_blank"
            href="https://training.linuxfoundation.org/linux-courses/open-source-compliance-courses/inclusive-speaker-orientation"
          >
            Inclusive Speaker Orientation Course
          </a>
          .
        </li>
        <li>
          Panel submissions must include the names of all participants in the
          initial submission to be considered. In an effort to promote speaker
          diversity, The Linux Foundation does not accept submissions with
          all-male panels, and speakers must not all be from the same company.
        </li>
        <li>
          Complimentary Passes For Speakers – One complimentary pass for the
          event will be provided for each accepted speaker.
        </li>
        <li>
          Avoid sales pitches and discussing unlicensed or potentially
          closed-source technologies when preparing your proposal; these talks
          are almost always rejected due to the fact that they take away from
          the integrity of our events, and are rarely well-received by
          conference attendees.
        </li>
        <li>
          All accepted speakers are required to submit their slides prior to the
          event.
        </li>
      </ul>
      <TabHeading className="mt-6">
        Preparing to Submit Your Proposal
      </TabHeading>
      <p className="mb-4">
        While it is not our intention to provide you with strict instructions on
        how to prepare your proposal, we hope you will take a moment to review
        the following guidelines that we have put together to help you prepare
        the best submission possible. To get started, here are three things that
        you should consider before submitting your proposal:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>What are you hoping to get from your presentation?</li>
        <li>What do you expect the audience to gain from your presentation?</li>
        <li>How will your presentation help better the ecosystem?</li>
      </ul>
      <p>
        There are plenty of ways to give a presentation about projects and
        technologies without focusing on company-specific efforts. Remember the
        things to consider that we mentioned above when writing your proposal
        and think of ways to make it interesting for attendees while still
        letting you share your experiences, educate the community about an
        issue, or generate interest in a project.
      </p>
      <TabHeading className="mt-6">How to Give a Great Talk</TabHeading>
      <p>
        We want to make sure submitters receive resources to help put together a
        great submission and if accepted, give the best presentation possible.
        To help with this, we recommend viewing seasoned speaker Dawn Foster's
        in-depth talk:{" "}
        <a
          href="https://youtu.be/2I5fYBLCfUA"
          target="_blank"
          className="underline hover:text-primary"
        >
          Getting Over Your Imposter Syndrome to Become a Conference Speaker –
          Dawn Foster, VMware
        </a>
        .
      </p>
      <TabHeading className="mt-6">
        Have More Questions? First Time Submitting? Don't Feel Intimidated
      </TabHeading>
      <p>
        Linux Foundation events are an excellent way to get to know the
        community and share your ideas and the work that you are doing and we
        strongly encourage first-time speakers to submit talks for our events.
        In the instance that you aren't sure about your abstract,{" "}
        <a
          className="underline hover:text-primary"
          href="mailto:cfp@linuxfoundation.org"
        >
          reach out to us
        </a>{" "}
        and we will be more than happy to work with you on your proposal.
      </p>
    </>
  )
}

function TypesTab() {
  return (
    <>
      <TabHeading>Submission Types</TabHeading>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Session Presentation: Typically 30 minutes in length, 1-2 speakers
          presenting on a topic
        </li>
        <li>
          Panel Discussion: Typically 30 minutes in length, 3-4 speakers
          presenting on a topic
        </li>
        <li>Birds of a Feather: Typically 45 minutes to 1 hour in length</li>
        <li>Lightning Talk: Typically 5-10 minutes in length</li>
        <li>Workshop: Typically 1-2 hours in length</li>
      </ul>
    </>
  )
}
export function Speakers() {
  const [buttonText, setButtonText] = useState("Submit a Proposal")
  const [isDisabled, setIsDisabled] = useState(false)
  const [activeTab, setActiveTab] = useState("dates")

  useEffect(() => {
    const checkDate = () => {
      const currentDate = new Date()
      const closingDate = new Date("2025-05-12T00:00:00Z")
      if (currentDate >= closingDate) {
        setButtonText("CFP Closed")
        setIsDisabled(true)
      }
    }

    checkDate()
    const timer = setInterval(checkDate, 60000) // Check every minute

    return () => clearInterval(timer)
  }, [])

  const tabContent = {
    dates: <DatesTab />,
    topics: <TopicsTab />,
    types: <TypesTab />,
    notes: <NotesTab />,
  }

  return (
    <section id="speakers" className="">
      <h1 className="conf-heading">Call for Proposals</h1>
      <p className="mb-4">
        Putting on an amazing conference depends on great content, which is
        where you come in! Join other GraphQL leaders and community members as a
        presenter by submitting to our Call for Proposals (CFP) and sharing your
        experience across a wide range of topics. Please click through all of
        the tabs below before submitting a proposal.
      </p>
      <p className="mb-4">
        For any questions regarding the CFP process, please email{" "}
        <a
          href="mailto:cfp@linuxfoundation.org"
          className="underline hover:text-primary"
        >
          cfp@linuxfoundation.org
        </a>
        .
      </p>
      <button
        disabled={isDisabled}
        onClick={() =>
          window.open(
            "https://sessionize.com/graphqlconf-2025?utm_medium=website&utm_campaign=speaker_section",
            "_blank",
          )
        }
        className={clsx(
          "px-20 py-4 text-center text-3xl font-semibold transition-colors md:px-28",
          isDisabled
            ? "cursor-not-allowed bg-gray-400"
            : "bg-primary/85 hover:bg-primary/100",
        )}
      >
        {buttonText}
      </button>
      <p className="mb-8 mt-6">
        Please be aware that the Linux Foundation uses Sessionize for CFP
        submissions. Sessionize is a cloud-based event content management
        software designed to be intuitive and user-friendly. If you need
        guidance, please review{" "}
        <a
          className="underline hover:text-primary"
          target="_blank"
          href="https://sessionize.com/playbook/submit-your-session-for-an-event"
        >
          how to submit your session
        </a>{" "}
        for an event to see step-by-step instructions and helpful screenshots.
      </p>
      <div className="mb-6">
        <div className="flex border-b">
          {["dates", "topics", "types", "notes"].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold ${
                activeTab === tab
                  ? "border-b-2 border-primary text-white"
                  : "text-gray-400 hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {/* @ts-ignore - fine code */}
        <div className="mt-6">{tabContent[activeTab]}</div>
      </div>
    </section>
  )
}
