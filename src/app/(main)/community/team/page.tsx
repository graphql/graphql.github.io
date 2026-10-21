import dynamic from "next/dynamic"
import type { ReactNode } from "react"

import { Breadcrumbs } from "@/_design-system/breadcrumbs"
import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { TocHero, TocHeroContents } from "@/components/toc-hero"
import blurBean from "@/app/(main)/community/events/events-blur-bean.webp"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration.tsx"

interface Member {
  name?: string
  github: string
  alumni?: boolean
}

interface TeamSection {
  title: string
  description: ReactNode
  members: Member[]
  alumniMembers?: Member[]
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-pri-base"
    >
      {children}
    </a>
  )
}

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

function Anchor({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      aria-label="Link to this section"
      className="text-neu-500 no-underline opacity-0 transition hover:text-pri-base focus:opacity-100 group-hover:opacity-100"
    >
      #
    </a>
  )
}

function MemberCard({ member, small }: { member: Member; small?: boolean }) {
  return (
    <a
      href={`https://github.com/${member.github}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col items-center gap-1.5 text-center no-underline ${small ? "w-20" : "w-24"}`}
    >
      <img
        src={`https://github.com/${member.github}.png?size=80`}
        alt={member.name ?? member.github}
        className={`${small ? "size-10" : "size-16"} rounded-full grayscale-[20%] transition group-hover:grayscale-0`}
      />
      <span
        className={`${small ? "text-xs" : "text-sm"} font-medium leading-tight text-neu-900 group-hover:text-pri-base`}
      >
        {member.name ?? member.github}
      </span>
    </a>
  )
}

function MemberGrid({
  members,
  label,
  small,
}: {
  members: Member[]
  label?: string
  small?: boolean
}) {
  if (!members.length) return null
  return (
    <div className="mt-3">
      {label && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neu-500">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-6">
        {members.map(m => (
          <MemberCard key={m.github} member={m} small={small} />
        ))}
      </div>
    </div>
  )
}

function ListOfSectionLists({
  sections,
}: {
  sections: Record<string, TeamSection[]>
}) {
  return Object.entries(sections).map(([group, groupSections]) => (
    <div key={group}>
      <h2
        className="gql-section group typography-h2 flex scroll-mt-24 items-center gap-3"
        id={slugify(group)}
      >
        {group}
        <Anchor id={slugify(group)} />
      </h2>
      <SectionList sections={groupSections} archived={false} />
    </div>
  ))
}

function SectionList({
  sections,
  archived,
}: {
  sections: TeamSection[]
  archived: boolean
}) {
  {
    return sections.map(section => (
      <section
        className={`gql-section scroll-mt-24 ${archived ? "opacity-50" : ""}`}
        id={slugify(section.title)}
        key={section.title}
      >
        <header className="mb-6 flex w-full gap-4 max-md:flex-col lg:mb-12 lg:gap-6">
          <div className="flex-1">
            <h3 className="group typography-h3 flex flex-wrap items-center gap-3">
              {section.title}
              <Anchor id={slugify(section.title)} />
              {archived && <span>(Archived)</span>}
            </h3>
            <p className="typography-body-md col-start-1 mt-4 lg:mt-6">
              {section.description}
            </p>
          </div>
        </header>

        <MemberGrid members={section.members} />
        {section.alumniMembers && section.alumniMembers.length > 0 && (
          <MemberGrid members={section.alumniMembers} label="Emeriti" small />
        )}
      </section>
    ))
  }
}

const sections: Record<string, TeamSection[]> = {
  Standards: [
    {
      title: "Technical Steering Committee (TSC)",
      description: (
        <>
          The{" "}
          <ExtLink href="https://github.com/graphql/graphql-wg/blob/main/GraphQL-TSC.md">
            Technical Steering Committee
          </ExtLink>{" "}
          oversees the development and evolution of the GraphQL specification.
          It sets the technical direction for the project and makes decisions on
          behalf of the GraphQL Foundation.
        </>
      ),
      members: [
        { name: "Lee Byron", github: "leebyron" },
        { name: "Benjie Gillam", github: "benjie" },
        { name: "Kewei Qu", github: "Keweiqu" },
        { name: "Mark Larah", github: "magicmark" },
        { name: "Martin Bonnin", github: "martinbonnin" },
        { name: "Matt Mahoney", github: "mjmahone" },
        { name: "Michael Staib", github: "michaelstaib" },
        { name: "Pascal Senn", github: "PascalSenn" },
        { name: "Rob Richard", github: "robrichard" },
        { name: "Uri Goldshtein", github: "Urigo" },
        { name: "Yaacov Rydzinski", github: "yaacovCR" },
      ],
    },
    {
      title: "gaps.graphql.org",
      description: (
        <>
          <ExtLink href="https://gaps.graphql.org">
            GraphQL Auxiliary Proposals
          </ExtLink>{" "}
          — filling in the GAPs in the GraphQL specification.
        </>
      ),
      members: [
        { name: "Mark Larah", github: "magicmark" },
        { name: "Martin Bonnin", github: "martinbonnin" },
      ],
    },
    {
      title: "rfcs.graphql.org",
      description: (
        <>
          The{" "}
          <ExtLink href="https://rfcs.graphql.org">GraphQL RFC tracker</ExtLink>{" "}
          lists all RFCs and their state.
        </>
      ),
      members: [{ name: "Benjie Gillam", github: "benjie" }],
    },
    {
      title: "scalars.graphql.org",
      description: (
        <>
          A collaborative effort to define and standardize{" "}
          <ExtLink href="https://scalars.graphql.org">
            custom scalar types
          </ExtLink>{" "}
          for GraphQL, making it easier to share type definitions across
          implementations.
        </>
      ),
      members: [{ name: "Martin Bonnin", github: "martinbonnin" }],
    },
  ],
  Community: [
    {
      title: "Community gardening",
      description: <>Keeping the GraphQL community running smoothly.</>,
      members: [
        { name: "Benjie Gillam", github: "benjie" },
        { name: "Jem Gillam", github: "jemgillam" },
      ],
    },
    {
      title: "Grants Program",
      description: (
        <>
          Managing the{" "}
          <ExtLink href="https://graphql.org/community/foundation/community-grant/">
            GraphQL grants program
          </ExtLink>
          .
        </>
      ),
      members: [{ name: "Martin Bonnin", github: "martinbonnin" }],
    },
    {
      title: "GraphQL Weekly",
      description: (
        <>
          A weekly newsletter curating the best GraphQL news, articles,
          tutorials, and community updates from across the ecosystem. Read it at{" "}
          <ExtLink href="https://graphqlweekly.com">graphqlweekly.com</ExtLink>.
        </>
      ),
      members: [],
    },
    {
      title: "Socials",
      description: (
        <>
          Getting the GraphQL word out on social networks:{" "}
          <ExtLink href="https://x.com/graphql">X</ExtLink>,{" "}
          <ExtLink href="https://bsky.app/profile/graphql.org">Bluesky</ExtLink>
          ,{" "}
          <ExtLink href="https://www.linkedin.com/company/graphql-foundation/">
            LinkedIn
          </ExtLink>
          . Posts are scheduled with{" "}
          <ExtLink href="https://typefully.com/">Typefully</ExtLink>.
        </>
      ),
      members: [
        { name: "Benjie Gillam", github: "benjie" },
        { name: "Jean Lucas", github: "jeanlucaslima" },
        { name: "Jem Gillam", github: "jemgillam" },
        { name: "Martin Bonnin", github: "martinbonnin" },
        { name: "Michael Staib", github: "michaelstaib" },
      ],
    },
    {
      title: "YouTube",
      description: (
        <>
          Managing the{" "}
          <ExtLink href="https://www.youtube.com/@graphqltv/videos">
            GraphQL YouTube channel
          </ExtLink>
          .
        </>
      ),
      members: [{ name: "Michael Staib", github: "michaelstaib" }],
    },
    {
      title: "GraphQL Day",
      description: (
        <>
          Organizing{" "}
          <ExtLink href="https://graphql.org/day">GraphQL Day</ExtLink> events
          all around the world.
        </>
      ),
      members: [
        { name: "Benjie Gillam", github: "benjie" },
        { name: "Jeff Auriemma", github: "bignimbus" },
        { name: "Jem Gillam", github: "jemgillam" },
        { name: "Martin Bonnin", github: "martinbonnin" },
        { name: "Michael Staib", github: "michaelstaib" },
        { name: "Pascal Senn", github: "PascalSenn" },
      ],
    },
  ],
  Projects: [
    {
      title: "GraphQL.js",
      description: (
        <>
          <ExtLink href="https://github.com/graphql/graphql-js">
            The reference implementation of GraphQL for JavaScript
          </ExtLink>
          , providing the canonical implementation of the GraphQL specification.
        </>
      ),
      members: [{ name: "Yaacov Rydzinski", github: "yaacovCR" }],
    },
    {
      title: "GraphiQL",
      description: (
        <>
          An in-browser IDE for exploring GraphQL APIs, used by developers
          worldwide to write, test, and debug queries. See{" "}
          <ExtLink href="https://github.com/graphql/graphiql">
            GraphiQL on GitHub
          </ExtLink>
          .
        </>
      ),
      members: [{ name: "Trevor Scheer", github: "trevor-scheer" }],
    },
  ],
  "Working Groups": [
    {
      title: "Composite Schemas working group (Federation)",
      description: (
        <>
          Building a specification that covers many of the shared concerns when
          building a larger GraphQL schema as a composite of many smaller
          GraphQL schemas. Work happens in the{" "}
          <ExtLink href="https://github.com/graphql/composite-schemas-wg">
            composite-schemas-wg repository
          </ExtLink>
          .
        </>
      ),
      members: [
        { name: "Derek Kuc", github: "dariuszkuc" },
        { name: "Michael Staib", github: "michaelstaib" },
        { name: "Pascal Senn", github: "PascalSenn" },
        { name: "Sachin D. Shinde", github: "sachindshinde" },
      ],
    },
    {
      title: "AI Working Group",
      description: (
        <>
          The{" "}
          <ExtLink href="https://github.com/graphql/ai-wg">
            AI working group
          </ExtLink>{" "}
          is focused on integrating GraphQL with AI systems and defining best
          practices for using GraphQL in AI-powered applications.
        </>
      ),
      members: [
        { name: "Dale Seo", github: "DaleSeo" },
        { name: "Jeff Auriemma", github: "bignimbus" },
        { name: "Kewei Qu", github: "Keweiqu" },
        { name: "Mark Larah", github: "magicmark" },
        { name: "Pascal Senn", github: "PascalSenn" },
      ],
    },
    {
      title: "OTel Working Group",
      description: (
        <>
          The{" "}
          <ExtLink href="https://github.com/graphql/otel-wg">
            OTel working group
          </ExtLink>{" "}
          defines OpenTelemetry conventions and semantics for GraphQL, enabling
          consistent observability across GraphQL implementations.
        </>
      ),
      members: [
        { name: "Bryn Cooke", github: "BrynCooke" },
        { name: "Pascal Senn", github: "PascalSenn" },
        { name: "Tim Hingston", github: "timbotnik" },
      ],
    },
    {
      title: "GraphQL over HTTP Working Group",
      description: (
        <>
          The{" "}
          <ExtLink href="https://github.com/graphql/graphql-over-http">
            GraphQL over HTTP working group
          </ExtLink>{" "}
          defines and maintains the specification for transporting GraphQL over
          HTTP, ensuring interoperability across servers and clients.
        </>
      ),
      members: [
        { name: "Benjie Gillam", github: "benjie" },
        { name: "Michael Staib", github: "michaelstaib" },
        { name: "Martin Bonnin", github: "martinbonnin" },
      ],
    },
    {
      title: "@defer/@stream Working Group",
      description: (
        <>
          The{" "}
          <ExtLink href="https://github.com/graphql/defer-stream-wg">
            @defer/@stream working group
          </ExtLink>{" "}
          defines and maintains the specification for incremental delivery of
          GraphQL results with @defer and @stream.
        </>
      ),
      members: [
        { name: "Rob Richard", github: "robrichard" },
        { name: "Yaacov Rydzinski", github: "yaacovCR" },
      ],
    },
    {
      title: "Golden Path Working Group",
      description: (
        <>
          The{" "}
          <ExtLink href="https://github.com/graphql/golden-path-wg/">
            Golden Path working group
          </ExtLink>{" "}
          lays out the default experience for new users that should lead to the
          greatest chance of success with GraphQL.
        </>
      ),
      members: [{ name: "Benjie Gillam", github: "benjie" }],
    },
  ],
}

const archivedSections: TeamSection[] = [
  {
    title: "Nullability Working Group",
    description: (
      <>
        The{" "}
        <ExtLink href="https://github.com/graphql/nullability-wg">
          Nullability working group
        </ExtLink>{" "}
        explored improvements to GraphQL's null handling, including the
        @semanticNonNull directive and related proposals. Now archived, with its
        work continuing in the main GraphQL WG.
      </>
    ),
    members: [{ name: "Martin Bonnin", github: "martinbonnin" }],
  },
]

export default async function TeamPage() {
  return (
    <>
      <NavbarFixed />
      <TocHero
        heading="Team"
        text="GraphQL is built and maintained by contributors from across the ecosystem. Below are the people behind the projects, working groups, and community programs that make GraphQL thrive."
        decoration={<Stripes />}
      >
        <div />
      </TocHero>
      <div className="gql-container">
        <div className="gql-section xl:mt-8">
          <Breadcrumbs
            activePath={[
              {
                name: "Community",
                title: "Community",
                route: "/community",
                type: "page",
                children: [],
                frontMatter: {},
              },
              {
                name: "Team",
                title: "Team",
                route: "/community/team",
                type: "page",
                children: [],
                frontMatter: {},
              },
            ]}
          />
        </div>

        <ListOfSectionLists sections={sections} />
        <h2
          className="gql-section group typography-h2 flex scroll-mt-24 items-center gap-3"
          id="archived-teams"
        >
          Archived teams
          <Anchor id="archived-teams" />
        </h2>
        <SectionList archived={true} sections={archivedSections} />

        <section className="gql-section">
          <p className="typography-body-md">
            Note: To update this page, please send a pull request to
            <a
              href="https://github.com/graphql/graphql.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pri-base"
            >
              github.com/graphql/graphql.github.io
            </a>
            . Contributions are welcome!
          </p>
        </section>
      </div>
    </>
  )
}

function Stripes() {
  return (
    <div
      role="presentation"
      // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className="pointer-events-none absolute inset-0 overflow-visible [--end-1:hsl(var(--color-sec-base))] [--end-2:hsl(var(--color-sec-light))] [--start-1:hsl(var(--color-sec-lighter))] [--start-2:hsl(var(--color-sec-dark))] dark:[--end-1:hsl(var(--color-neu-50))] dark:[--end-2:hsl(var(--color-sec-dark)/.5)] dark:[--start-1:hsl(var(--color-sec-darker))] dark:[--start-2:hsl(var(--color-sec-dark))]"
      style={{
        maskImage: `url(${blurBean.src})`,
        WebkitMaskImage: `url(${blurBean.src})`,
        maskSize: "2200px 100%",
        WebkitMaskSize: "2200px 100%",
        maskPosition: "50% -100px",
        // WebkitMaskPosition: "50% 20%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(180deg_in_hsl,var(--start-1)_-288px,var(--end-1)_100%)]"
        oddClassName="bg-[linear-gradient(180deg,var(--start-2)_-288px,var(--end-2)_100%)]"
      />
    </div>
  )
}
