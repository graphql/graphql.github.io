import { Button } from "@/app/conf/_design-system/button"
import { SectionLabel } from "@/app/conf/_design-system/section-label"
import { ReactNode } from "react"
import { clsx } from "clsx"

import { PrecisionFigure } from "./precision"
import { OptimizationFigure } from "./optimization"
import { ProductivityFigure } from "./productivity"
import { ConsistencyFigure } from "./consistency"
import { VersionlessFigure } from "./versionless"
import { IntegrationFigure } from "./integration"

export function GraphQLAdvantages() {
  return (
    <section className="overflow-x-hidden bg-neu-50 dark:bg-neu-50/25">
      <div className="gql-container gql-section lg:py-16">
        <SectionLabel>GraphQL advantages</SectionLabel>
        <div className="mt-8 flex flex-col gap-y-10 lg:gap-y-16 xl:gap-y-24">
          <Subsection
            name="Precision"
            bigText="Ask for what you need, get exactly that"
            text="Send a GraphQL query to your API and get precisely the data you request — no over-fetching, no under-fetching. Predictable responses keep apps efficient and performant."
            figure={<PrecisionFigure />}
            cta={
              <Button href="/learn" variant="secondary">
                Learn GraphQL
              </Button>
            }
          />
          <Subsection
            name="Optimization"
            bigText="Retrieve multiple resources in one request"
            text="GraphQL seamlessly follows relationships between data, eliminating multiple API calls. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Ideal for complex queries and optimizing network performance."
            figure={<OptimizationFigure />}
            cta={
              <Button href="/learn" variant="secondary">
                Read the docs
              </Button>
            }
          />
          <Subsection
            name="Productivity"
            bigText="Move faster with powerful, community-built tools"
            text="Know exactly what you can request without leaving editor. Highlight potential issues before sending a query and take advantage of improved code intelligence. GraphQL makes it easy to build powerful tools. And many of them, like GraphiQL, are open source and built by the GraphQL community."
            figure={<ProductivityFigure />}
            cta={
              <Button href="/community/tools-and-libraries" variant="secondary">
                Explore GraphQL tools
              </Button>
            }
          />
          <Subsection
            name="Consistency"
            bigText="Build confidently with a type-safe schema"
            text="GraphQL APIs are structured around types and fields, not endpoints. This ensures data consistency, self-documentation, and clear, actionable errors. Apps can use types to avoid writing manual parsing code."
            figure={<ConsistencyFigure />}
            cta={
              <Button href="/learn/schema" variant="secondary">
                Learn more about GraphQL schemas
              </Button>
            }
          />
          <Subsection
            name="Versionless"
            bigText="Evolve without versions"
            text="Add new fields and types without impacting existing queries. Deprecate outdated fields while keeping APIs clean and future-proof. By using a single evolving version, GraphQL APIs give apps continuous access to new features and encourage more maintainable server code."
            figure={<VersionlessFigure />}
            cta={
              <Button
                href="/learn/schema-design/#versioning"
                variant="secondary"
              >
                See more in docs
              </Button>
            }
          />
          <Subsection
            name="Integration"
            bigText="Bring your own data and code"
            text="GraphQL is storage-agnostic — integrate databases, REST APIs, and third-party services into a single, cohesive data layer. Write GraphQL APIs that leverage your existing data and code with GraphQL engines available in many languages."
            figure={<IntegrationFigure />}
            cta={
              <Button href="/learn" variant="secondary">
                Learn more about this
              </Button>
            }
          />
        </div>
      </div>
    </section>
  )
}

function Subsection({
  name,
  bigText,
  cta,
  figure,
  text,
  className,
}: {
  name: string
  bigText: ReactNode
  cta: ReactNode
  figure: ReactNode
  text: ReactNode
  className?: string
}) {
  return (
    <article
      className={clsx(
        "grid gap-x-4 lg:grid-cols-2 lg:*:[grid-column:1] xl:gap-x-16 2xl:gap-x-24",
        className,
      )}
    >
      <h3 className="typography-body-sm size-min items-center justify-center bg-sec-light px-1 py-[1.5px] font-normal dark:bg-sec-darker">
        {name}
      </h3>
      <strong className="typography-h3 mt-4 text-balance font-normal lg:mt-8">
        {bigText}
      </strong>
      <div className="flex max-lg:mt-6 max-sm:-mx-4 lg:row-start-1 lg:row-end-6 lg:![grid-column:2]">
        {figure}
      </div>
      <p className="typography-body-lg my-6 text-pretty lg:mb-4 lg:mt-8">
        {text}
      </p>
      <div className="self-end lg:justify-self-start xl:mt-2">{cta}</div>
    </article>
  )
}
