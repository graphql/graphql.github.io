import { SectionLabel } from "@/app/conf/_design-system/section-label"
import { Button } from "@/app/conf/_design-system/button"

import { Wires } from "./wires"

export function WhatIsGraphQL() {
  return (
    <section id="what-is-graphql" className="gql-container gql-section">
      <SectionLabel>Introduction</SectionLabel>
      <div className="justify-between gap-4 lg:flex">
        <h2 className="typography-h2 mt-6">What is GraphQL?</h2>
        <p className="typography-body-lg mt-6 max-w-[624px] text-pretty text-neu-800">
          GraphQL is an open‑source query language for APIs and
          a&nbsp;server‑side runtime. It provides a strongly‑typed schema to
          define relationships between data, making APIs more flexible and
          predictable. And it isn’t tied to a specific database or storage
          engine — it works with your existing code and data, making it easier
          to evolve APIs over time.
        </p>
      </div>
      <Wires className="mt-6 w-full max-sm:my-12" />
      <Button className="mt-6 sm:mx-auto sm:w-fit" href="/learn">
        Learn GraphQL
      </Button>
    </section>
  )
}
