import { pagesBySection } from "@/components/learn-aggregator/learn-pages"

const SITE_URL = "https://graphql.org"

interface LlmsLink {
  title: string
  url: string
  description: string
}

interface LlmsSection {
  title: string
  links: LlmsLink[]
}

const sections: LlmsSection[] = [
  {
    title: "Start Here",
    links: [
      {
        title: "GraphQL.org",
        url: `${SITE_URL}/`,
        description:
          "The official website for GraphQL documentation, resources, and community information.",
      },
      {
        title: "Learn GraphQL",
        url: `${SITE_URL}/learn/`,
        description:
          "A guided path through GraphQL fundamentals, best practices, and schema governance.",
      },
      {
        title: "GraphQL Specification",
        url: "https://spec.graphql.org/",
        description: "The normative definition of the GraphQL language.",
      },
      {
        title: "Frequently Asked Questions",
        url: `${SITE_URL}/faq/`,
        description:
          "Answers to common questions about GraphQL, its specification, and its ecosystem.",
      },
    ],
  },
  learnSection("Learn: Core Concepts", "getting-started"),
  learnSection("Learn: Best Practices", "best-practices"),
  learnSection("Learn: Schema Governance", "schema-governance"),
  {
    title: "Implementations and Resources",
    links: [
      {
        title: "Resource Hub",
        url: `${SITE_URL}/resources/`,
        description:
          "Curated GraphQL tools, videos, articles, and learning resources.",
      },
      {
        title: "Frontend Resources",
        url: `${SITE_URL}/resources/frontend/`,
        description:
          "GraphQL clients, frontend techniques, videos, and articles.",
      },
      {
        title: "Backend Resources",
        url: `${SITE_URL}/resources/backend/`,
        description: "GraphQL server implementations and production guidance.",
      },
      {
        title: "Federation Resources",
        url: `${SITE_URL}/resources/federation/`,
        description:
          "Resources for composing and operating distributed GraphQL schemas.",
      },
      {
        title: "Security Resources",
        url: `${SITE_URL}/resources/security/`,
        description: "Guidance and tools for securing GraphQL APIs.",
      },
      {
        title: "AI Resources",
        url: `${SITE_URL}/resources/ai/`,
        description:
          "Patterns, tools, and implementations for using GraphQL with AI systems.",
      },
      {
        title: "Monitoring Resources",
        url: `${SITE_URL}/resources/monitoring/`,
        description:
          "Tools and guidance for monitoring GraphQL performance, usage, and schema changes.",
      },
      {
        title: "Tools and Libraries",
        url: `${SITE_URL}/community/tools-and-libraries/`,
        description:
          "Community-maintained GraphQL clients, servers, tools, and services organized by language and purpose.",
      },
      {
        title: "GraphQL.js",
        url: "https://www.graphql-js.org/docs/",
        description:
          "Documentation for the JavaScript reference implementation of GraphQL.",
      },
    ],
  },
  {
    title: "Project and Community",
    links: [
      {
        title: "How GraphQL Is Developed",
        url: `${SITE_URL}/community/contribute/how-graphql-is-developed/`,
        description:
          "How the specification, working groups, implementations, and tools evolve.",
      },
      {
        title: "Project Governance",
        url: `${SITE_URL}/community/contribute/governance/`,
        description:
          "Technical governance of the GraphQL project and its relationship to the GraphQL Foundation.",
      },
      {
        title: "Project Meetings",
        url: `${SITE_URL}/community/contribute/project-meetings/`,
        description:
          "Working group and subcommittee meetings for GraphQL development.",
      },
      {
        title: "Contributing to GraphQL",
        url: `${SITE_URL}/community/contribute/essential-links/`,
        description:
          "Essential links for participating in the GraphQL project.",
      },
      {
        title: "Official Channels",
        url: `${SITE_URL}/community/official-channels/`,
        description: "Official GraphQL community and support channels.",
      },
      {
        title: "GraphQL Foundation",
        url: `${SITE_URL}/community/foundation/`,
        description:
          "The neutral foundation supporting the GraphQL community and ecosystem.",
      },
    ],
  },
  {
    title: "Optional",
    links: [
      {
        title: "GraphQL Blog",
        url: `${SITE_URL}/blog/`,
        description:
          "Project announcements, technical articles, and community news.",
      },
      {
        title: "GraphQL Blog RSS Feed",
        url: `${SITE_URL}/blog/rss.xml`,
        description: "RSS feed for GraphQL blog posts.",
      },
      {
        title: "Community Events",
        url: `${SITE_URL}/community/events/`,
        description: "GraphQL community events and meetups.",
      },
      {
        title: "Community Events RSS Feed",
        url: `${SITE_URL}/community/events/rss.xml`,
        description: "RSS feed for GraphQL community events.",
      },
      {
        title: "GraphQLConf 2026",
        url: `${SITE_URL}/conf/2026/`,
        description: "The official GraphQL conference.",
      },
      {
        title: "GraphQL Days",
        url: `${SITE_URL}/day/`,
        description: "GraphQL community events held around the world.",
      },
      {
        title: "Brand Guidelines",
        url: `${SITE_URL}/brand/`,
        description: "Guidance for using the GraphQL name and visual identity.",
      },
      {
        title: "Code of Conduct",
        url: `${SITE_URL}/codeofconduct/`,
        description: "The code of conduct governing the GraphQL community.",
      },
    ],
  },
]

export function renderLlmsTxt(): string {
  const introduction = [
    "# GraphQL",
    "",
    "> GraphQL is a query language for APIs and a runtime for executing queries using a type system defined for your data.",
    "",
    "GraphQL.org is the official website for GraphQL. The GraphQL Specification is normative; the Learn materials explain the language and provide non-normative guidance for building and operating GraphQL APIs.",
    "",
    "GraphQL is language-neutral. GraphQL.js is the JavaScript reference implementation, not the GraphQL language itself. Listings of third-party tools, libraries, services, and training resources are informational and are not endorsements.",
  ]

  return [...introduction, ...sections.flatMap(formatSection), ""].join("\n")
}

function learnSection(
  title: string,
  section: keyof typeof pagesBySection,
): LlmsSection {
  return {
    title,
    links: pagesBySection[section].map(page => ({
      title: page.title,
      url: new URL(page.href, SITE_URL).href,
      description: page.description,
    })),
  }
}

function formatSection({ title, links }: LlmsSection): string[] {
  return [
    "",
    `## ${title}`,
    "",
    ...links.map(link => `- [${link.title}](${link.url}): ${link.description}`),
  ]
}
