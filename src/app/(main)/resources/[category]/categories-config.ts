import type { LearnPagePath } from "@/components/learn-aggregator/learn-pages"
import type { Kind, Topic } from "@/resources/types"
import type { WorkingGroupMeeting } from "@/../scripts/sync-working-groups/sync-working-groups"

// TODO: If the pages need to be customized further, consider flattening [category]/page.tsx
//       into multiple page files and defining the following texts in usual JSX.
export const categoriesConfig: CategoriesConfig = {
  frontend: {
    heading: "Frontend",
    subtitle: "Learn how to use GraphQL on the frontend.",
    sections: {
      video: {
        heading: "Master GraphQL on the frontend",
        text: "Watch talks and tutorials from GraphQL Conf and community experts. See how teams integrate GraphQL on the frontend and learn from real-world case studies.",
      },
      "tools-and-libraries": {
        heading: "Frontend tools & libraries",
        text: "Explore the most popular GraphQL client libraries and frameworks for frontend. These tools help you fetch and manage data with GraphQL.",
      },
      docs: {
        heading: "Learn the basics",
        text: "Learn practical GraphQL techniques for the frontend. Explore essential topics for building user interfaces.",
        docs: [
          "queries",
          "mutations",
          "subscriptions",
          "validation",
          "execution",
          "response",
          // best practices
          "pagination",
        ],
      },
      blog: {
        heading: "Insights for frontend devs",
        text: "Stay up to date with insights from the GraphQL community.",
      },
    },
  },
  backend: {
    heading: "Backend",
    subtitle:
      "Build powerful GraphQL backends with the right tools, libraries and expert insights.",
    sections: {
      video: {
        heading: "Master GraphQL on the backend",
        text: "Discover videos and tutorials to help you build, deploy and scale your GraphQL backend.",
      },
      "tools-and-libraries": {
        heading: "Backend tools & libraries",
        text: "Find the right GraphQL backend stack — from JavaScript to Rust and beyond.",
      },
      docs: {
        heading: "Lessons on the GraphQL backend",
        text: "Build and run GraphQL servers — from defining a schema to handling production traffic.",
        docs: [
          "queries",
          "mutations",
          "subscriptions",
          "validation",
          "execution",
          "response",
          // best practices
          "serving-over-http",
          "file-uploads",
          "pagination",
          "performance",
          "debug-errors",
          "caching",
        ],
      },
      blog: {
        heading: "Build better GraphQL infrastructure",
        text: "Dive into articles on server architecture, schema design and best practices for running GraphQL at scale.",
      },
    },
  },
  federation: {
    heading: "Federation",
    subtitle: "Learn how to build and compose GraphQL graphs with federation.",
    sections: {
      video: {
        heading: "Master GraphQL federation",
        text: "Watch talks and tutorials from GraphQL Conf and community experts. See how teams build and compose GraphQL graphs with federation.",
      },
      "tools-and-libraries": {
        heading: "Tools & libraries for federated graphs",
        text: "Run federated GraphQL graphs at scale with the right tools — from open-source routers to managed platforms.",
      },
      docs: {
        heading: "Federation in practice",
        text: "Learn the basics of planning and operating a federated graph.",
        docs: ["federation", "security"],
      },
      blog: {
        heading: "Latest updates on federation & composition",
        text: "Read the latest announcements and technical deep dives.",
      },
      event: {
        heading: "Help shape the standards",
        text: "Join the Composite Schemas Working Group meetings to participate in the latest developments in Federation and Composite Schemas.",
        predicate: (event: WorkingGroupMeeting) => {
          return (
            event.summary?.toLowerCase().includes("composite schemas") || false
          )
        },
      },
    },
  },
  ai: {
    heading: "Artificial Intelligence",
    subtitle: "Explore how to use GraphQL for AI systems.",
    sections: {
      "tools-and-libraries": {
        heading: "GraphQL tools for AI",
        text: "Discover the best tools for building AI systems with GraphQL.",
      },
      blog: {
        heading: "Latest insights on AI & GraphQL",
        text: "Read the latest announcements and technical deep dives.",
      },
      event: {
        heading: "AI Working Group",
        text: "Help define the intersection of GraphQL and AI. Join the working group meetings to contribute to the latest developments.",
        predicate: (event: WorkingGroupMeeting) => {
          return (
            event.summary?.toLowerCase().includes("ai working group") || false
          )
        },
      },
      post: {
        heading: "AI & GraphQL in the wild",
        text: "See how developers are connecting GraphQL to build MCP servers and power agentic workflows.",
      },
      video: {
        heading: "GraphQL and AI in videos",
        text: "Watch talks on bridging GraphQL APIs and AI: from tool-calling patterns to building context for LLMs and agents.",
      },
    },
  },
  security: {
    heading: "Security",
    subtitle: "Learn how to secure your GraphQL APIs.",
    sections: {
      "tools-and-libraries": {
        heading: "GraphQL security tools",
        text: "Find resources to help secure GraphQL APIs across various languages and frameworks.",
      },
      docs: {
        heading: "Security in practice",
        text: "Follow proven patterns to delegate authorization correctly and protect your GraphQL APIs from malicious operations.",
        docs: ["authorization", "security"],
      },
    },
  },
  monitoring: {
    heading: "Monitoring",
    subtitle:
      "Stay ahead of issues by monitoring queries and watching error trends.",
    sections: {
      "tools-and-libraries": {
        heading: "GraphQL monitoring tools",
        text: "Connect GraphQL tracing and alerting systems to reduce blind spots in production.",
      },
      docs: {
        heading: "Monitoring in practice",
        text: "Learn how to track the right signals in your GraphQL ecosystem — from latency and error rates to resolver-level performance.",
        docs: ["caching", "performance"],
      },
    },
  },
}

export const sectionKindNames: Record<Kind, string> = {
  video: "Featured videos",
  blog: "GraphQL Blog",
  "tools-and-libraries": "Tools & Libraries",
  guide: "Guides",
  book: "Books",
  "blog-or-newsletter": "Blogs & Newsletters",
  docs: "Documentation",
  event: "Events",
  post: "Community posts",
  list: "Community lists",
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/ & /g, "-and-").replace(/ /g, "-")
}

export const sectionIds: Record<Kind, string> = Object.fromEntries(
  Object.entries(sectionKindNames).map(([kind, name]) => [kind, slugify(name)]),
) as Record<Kind, string>

type CategoriesConfig = {
  [key in Topic]: {
    heading: string
    subtitle: string
    sections: {
      [key in Kind]?: {
        heading: string
        text: string
      }
    } & {
      docs?: {
        heading: string
        text: string
        docs?: LearnPagePath[]
      }
      event?: {
        heading: string
        text: string
        predicate: (event: WorkingGroupMeeting) => boolean
      }
    }
  }
}
