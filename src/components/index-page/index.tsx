import Head from "next/head"

import { Hero } from "./hero"
import { TrustedBy } from "./trusted-by"
import { HowItWorks } from "./how-it-works"
import { ProvenSolution } from "./proven-solution"
import { FivePillars } from "./five-pillars"
import { PoweredByCommunity } from "./powered-by-community"
import { GraphQLAdvantages } from "./graphql-advantages"
import { QuotesFromTheIndustry } from "./quotes-from-the-industry"
import { JoinTheCommunity } from "./join-the-community"
import { DataColocation } from "./data-colocation"
import { WhatIsGraphQL } from "./what-is-graphql"
import { UseCases } from "./use-cases"
import { NavbarFixed } from "../navbar/navbar-fixed"

export function IndexPage() {
  return (
    <div className="gql-all-anchors-focusable bg-neu-0">
      <Head>
        <meta
          name="description"
          content="GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data."
        />
      </Head>

      <Hero />
      <TrustedBy />
      <WhatIsGraphQL />
      <HowItWorks />
      <ProvenSolution />
      <FivePillars />
      <PoweredByCommunity />
      <GraphQLAdvantages />
      <DataColocation />
      <UseCases />
      <QuotesFromTheIndustry />
      <JoinTheCommunity />
      <NavbarFixed />
    </div>
  )
}
