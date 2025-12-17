import { type Topic } from "@/resources/types"

// TODO: These can be moved to the categories-config.ts object.

export const categoryNames: Record<Topic, string> = {
  frontend: "Frontend",
  backend: "Backend",
  federation: "Federation",
  security: "Security",
  ai: "AI",
  monitoring: "Monitoring",
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
}
