import React from "react"
import Layout from "../components/Layout"

import Search from "../components/Search"

import Hero from "../Containers/Sections/Hero"
import SingleRequest from "../Containers/Sections/SingleRequest"
import TypeSystem from "../Containers/Sections/TypeSystem"
import PredictableResults from "../Containers/Sections/PredictableResults"
import BringYourOwnData from "../Containers/Sections/BringYourOwnCode"
import WithoutVersions from "../Containers/Sections/WithoutVersion"
import PowerFulTools from "../Containers/Sections/PowerFulTools"
import WhosUsing from "../Containers/Sections/WhosUsing"

export default ({ pageContext }) => {
  return (
    <Layout className={"index"} title="GraphQL | A query language for your API" pageContext={pageContext}>
      <section className="fixedSearch">
        <Search />
      </section>
      <Hero />
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