import { type Topic } from "@/resources/types"

export const categoryNames: Record<Topic, string> = {
  frontend: "Frontend",
  backend: "Backend",
  federation: "Federation",
  security: "Security",
  ai: "AI",
  monitoring: "Monitoring",
  "api-platform-and-gateways": "API Platform and Gateways",
  "developer-experience": "Developer Experience",
  "schema-design": "Schema Design",
  tools: "Tools",
}

export const categorySubtitles: Record<Topic, string> = {
  frontend: "Learn how to integrate GraphQL on the frontend.",
  backend:
    "Build powerful GraphQL backends with the right tools, libraries and expert insights.",
  federation: "Learn how to build and compose GraphQL graphs with federation.",
  ai: "Explore how to use GraphQL for AI systems.",
  security: "Learn how to secure your GraphQL APIs.",
  monitoring:
    "Stay ahead of performance issues by monitoring queries and watching error trends.",
  "api-platform-and-gateways":
    "Learn how to build and deploy API Gateways and Supergraphs.",
  "developer-experience": "Learn how to improve your developer experience.",
  "schema-design": "Learn how to design and maintain GraphQL schemas.",
  tools: "Discover the best tools for GraphQL development.",
}
