import dynamic from "next/dynamic"

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
  description: string
  url?: string
  members: Member[]
  alumniMembers?: Member[]
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
      <h2 className="gql-section typography-h2">{group}</h2>
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
        className={`gql-section ${archived ? "opacity-50" : ""}`}
        id={section.title}
        key={section.title}
      >
        <header className="mb-6 flex w-full gap-4 max-md:flex-col lg:mb-12 lg:gap-6">
          <div className="flex-1">
            <h3 className="typography-h3 flex flex-wrap items-center gap-3">
              {section.url ? (
                <a
                  href={section.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pri-base"
                >
                  {section.title}
                </a>
              ) : (
                section.title
              )}
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
      description:
        "The Technical Steering Committee oversees the development and evolution of the GraphQL specification. It sets the technical direction for the project and makes decisions on behalf of the GraphQL Foundation.",
      url: "https://github.com/graphql/graphql-wg/blob/main/GraphQL-TSC.md",
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
      description:
        "GraphQL Auxiliary Proposals — filling the GAPs in the GraphQL specification.",
      url: "https://gaps.graphql.org",
      members: [
        { name: "Mark Larah", github: "magicmark" },
        { name: "Martin Bonnin", github: "martinbonnin" },
      ],
    },
    {
      title: "rfcs.graphql.org",
      description: "The GraphQL RFC tracker lists all RFCs and their state.",
      url: "https://rfcs.graphql.org",
      members: [{ name: "Benjie Gillam", github: "benjie" }],
    },
    {
      title: "scalars.graphql.org",
      description:
        "A collaborative effort to define and standardize custom scalar types for GraphQL, making it easier to share type definitions across implementations.",
      url: "https://scalars.graphql.org",
      members: [{ name: "Martin Bonnin", github: "martinbonnin" }],
    },
  ],
  Community: [
    {
      title: "Community gardening",
      description: "Keeping the GraphQL community running smoothly.",
      url: "https://graphql.org/",
      members: [
        { name: "Benjie Gillam", github: "benjie" },
        { name: "Jem Gillam", github: "jemgillam" },
      ],
    },
    {
      title: "Grants Program",
      description: "Managing the GraphQL grants program.",
      url: "https://graphql.org/community/foundation/community-grant/",
      members: [{ name: "Martin Bonnin", github: "martinbonnin" }],
    },
    {
      title: "GraphQL Weekly",
      description:
        "A weekly newsletter curating the best GraphQL news, articles, tutorials, and community updates from across the ecosystem.",
      url: "https://graphqlweekly.com",
      members: [],
    },
    {
      title: "Socials",
      description:
        "Getting the GraphQL word out on social networks: X, BlueSky, LinkedIn,...",
      url: "https://typefully.com/",
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
      description: "Managing the YouTube channel.",
      url: "https://www.youtube.com/@graphqltv/videos",
      members: [{ name: "Michael Staib", github: "michaelstaib" }],
    },
    {
      title: "GraphQL Day",
      description: "Organizing GraphQL Day events all around the world.",
      url: "https://graphql.org/day",
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
      description:
        "The reference implementation of GraphQL for JavaScript, providing the canonical implementation of the GraphQL specification.",
      url: "https://github.com/graphql/graphql-js",
      members: [{ name: "Yaacov Rydzinski", github: "yaacovCR" }],
    },
    {
      title: "GraphiQL",
      description:
        "An in-browser IDE for exploring GraphQL APIs, used by developers worldwide to write, test, and debug queries.",
      url: "https://github.com/graphql/graphiql",
      members: [{ name: "Trevor Scheer", github: "trevor-scheer" }],
    },
  ],
  "Working Groups": [
    {
      title: "Composite Schemas working group (Federation)",
      description:
        "Building a specification that covers many of the shared concerns when building a larger GraphQL schema as a composite of many smaller GraphQL schemas.",
      url: "https://github.com/graphql/composite-schemas-wg",
      members: [
        { name: "Derek Kuc", github: "dariuszkuc" },
        { name: "Michael Staib", github: "michaelstaib" },
        { name: "Pascal Senn", github: "PascalSenn" },
        { name: "Sachin D. Shinde", github: "sachindshinde" },
      ],
    },
    {
      title: "AI Working Group",
      description:
        "A working group focused on integrating GraphQL with AI systems and defining best practices for using GraphQL in AI-powered applications.",
      url: "https://github.com/graphql/ai-wg",
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
      description:
        "A working group defining OpenTelemetry conventions and semantics for GraphQL, enabling consistent observability across GraphQL implementations.",
      url: "https://github.com/graphql/otel-wg",
      members: [
        { name: "Bryn Cooke", github: "BrynCooke" },
        { name: "Pascal Senn", github: "PascalSenn" },
        { name: "Tim Hingston", github: "timbotnik" },
      ],
    },
    {
      title: "GraphQL over HTTP Working Group",
      description:
        "A working group that defines and maintains the specification for transporting GraphQL over HTTP, ensuring interoperability across servers and clients.",
      url: "https://github.com/graphql/graphql-over-http",
      members: [
        { name: "Benjie Gillam", github: "benjie" },
        { name: "Michael Staib", github: "michaelstaib" },
        { name: "Martin Bonnin", github: "martinbonnin" },
      ],
    },
    {
      title: "@defer/@stream Working Group",
      description:
        "A working group that defines and maintains the specification for transporting GraphQL over HTTP, ensuring interoperability across servers and clients.",
      url: "https://github.com/graphql/defer-stream-wg",
      members: [
        { name: "Rob Richard", github: "robrichard" },
        { name: "Yaacov Rydzinski", github: "yaacovCR" },
      ],
    },
    {
      title: "Golden Path Working Group",
      description:
        "Laying out the default experience for new users that should lead to the greatest chance of success with GraphQL.",
      url: "https://github.com/graphql/golden-path-wg/",
      members: [{ name: "Benjie Gillam", github: "benjie" }],
    },
  ],
}

const archivedSections: TeamSection[] = [
  {
    title: "Nullability Working Group",
    description:
      "A working group that explored improvements to GraphQL's null handling, including the @semanticNonNull directive and related proposals. Now archived, with its work continuing in the main GraphQL WG.",
    url: "https://github.com/graphql/nullability-wg",
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
        <h2 className="gql-section typography-h2">Archived teams</h2>
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
