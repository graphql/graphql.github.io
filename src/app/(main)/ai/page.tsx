import { Metadata } from "next"
import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { Hero } from "./components/hero"
import { WhyGraphQLAI } from "./components/why-graphql-ai"
import { ByTheNumbers } from "./components/by-the-numbers"
import { InteractiveDemo } from "./components/interactive-demo"
import { HowItWorks } from "./components/how-it-works"
import { UseCases } from "./components/use-cases"
import { CTACommunity } from "./components/cta-community"

const description =
  "How AI agents use GraphQL: schema introspection for tool discovery, typed inputs and outputs, and field selection that keeps responses to what was asked for."

export const metadata: Metadata = {
  title: "GraphQL for AI Agents, MCP, and LLM Tools",
  description,
  alternates: { canonical: "/ai" },
  openGraph: {
    title: "GraphQL for AI Agents, MCP, and LLM Tools",
    description,
    url: "/ai",
    type: "article",
    images: ["/img/og-image.png"],
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
