import { Metadata } from "next"
import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { Hero } from "./components/hero"
import { WhyGraphQLAI } from "./components/why-graphql-ai"
import { ByTheNumbers } from "./components/by-the-numbers"
import { InteractiveDemo } from "./components/interactive-demo"
import { HowItWorks } from "./components/how-it-works"
import { UseCases } from "./components/use-cases"
import { CTACommunity } from "./components/cta-community"

export const metadata: Metadata = {
  title: "GraphQL & AI",
  description:
    "Discover how GraphQL's self-describing schemas, strong typing, and composability make it the ideal API protocol for AI systems, MCP servers, and LLM-powered applications.",
  openGraph: {
    title: "GraphQL & AI — The API language for humans and agents",
    description:
      "When AI agents need to interact with APIs, GraphQL's self-describing schemas, strong typing, and composable queries make it the natural choice.",
  },
}

export default function AIPage() {
  return (
    <main className="gql-all-anchors-focusable bg-neu-0">
      <NavbarFixed />
      <Hero />
      <WhyGraphQLAI />
      <ByTheNumbers />
      <InteractiveDemo />
      <HowItWorks />
      <UseCases />
      <CTACommunity />
    </main>
  )
}
