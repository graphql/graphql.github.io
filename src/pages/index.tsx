import React from "react"
import type { PageProps } from "gatsby"
import Layout from "../components/Layout"

import Hero from "../Containers/Sections/Hero"
import SingleRequest from "../Containers/Sections/SingleRequest"
import TypeSystem from "../Containers/Sections/TypeSystem"
import PredictableResults from "../Containers/Sections/PredictableResults"
import BringYourOwnData from "../Containers/Sections/BringYourOwnCode"
import WithoutVersions from "../Containers/Sections/WithoutVersion"
import PowerFulTools from "../Containers/Sections/PowerFulTools"
import WhosUsing from "../Containers/Sections/WhosUsing"
import Seo from "../components/Seo"

export default ({ pageContext }: PageProps<{}, { sourcePath: string }>) => {
  return (
    <Layout className="index" pageContext={pageContext}>
      <Hero />
      <section className="conf-banner">
        <a href="/conf/">
          <img src="/img/conf/graphql-conf-logo.svg" />
          <div>
            <span>
              The official GraphQL conference, by the GraphQL Foundation
            </span>
            <span className="mt-2 font-bold">
              SEPTEMBER 19-21, 2023 • SAN FRANCISCO BAY AREA, CA
            </span>
            <div>
              <a className="button" href="/conf/#attend">
                Register Now!
              </a>
            </div>
          </div>
        </a>
      </section>
      <section className="lead">
        <h1>A query language for your API</h1>
        <p>
          GraphQL is a query language for APIs and a runtime for fulfilling
          those queries with your existing data. GraphQL provides a complete and
          understandable description of the data in your API, gives clients the
          power to ask for exactly what they need and nothing more, makes it
          easier to evolve APIs over time, and enables powerful
          developer&nbsp;tools.
        </p>
      </section>
      <PredictableResults />
      <SingleRequest />
      <TypeSystem />
      <PowerFulTools />
      <WithoutVersions />
      <BringYourOwnData />
      <WhosUsing />
    </Layout>
  )
}

export function Head() {
  return <Seo title="GraphQL | A query language for your API" />
}
