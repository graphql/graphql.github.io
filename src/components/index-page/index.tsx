import Link from "next/link"
import NextImage from "next-image-export-optimizer"
import { Hero } from "./hero"
import { PredictableResults } from "./predictable-results"
import { SingleRequest } from "./single-request"
import { TypeSystem } from "./type-system"
import { PowerFulTools } from "./powerful-tools"
import { WithoutVersion } from "./without-version"
import { BringYourOwnCode } from "./bring-your-own-code"
import { WhoIsUsing } from "./who-is-using"
import SupergraphImg from "public/img/diagrams/supergraph.png"

export function IndexPage() {
  return (
    <div className="index">
      <Hero />
      <section className="flex flex-col container">
        <h2>GraphQL for API consumers</h2>
        <p>GraphQL transforms the way API consumers access and interact with data, efficiently fetch the right slice of data. Whether you are building consumer facing applications or internal apps, GraphQL provides a seamless and efficient way to consume APIs. 
        </p>
        <PredictableResults />
        <SingleRequest />
        <PowerFulTools />
      </section>
      <section className="flex flex-col container">
        <h2>GraphQL for API producers</h2>
        <p>GraphQL provides API producers with a powerful framework for designing flexible and maintainable APIs. By defining a single, unified schema, producers can easily integrate data from multiple sources, simplifying API management. GraphQL provides a single endpoint with elevated semantic context on the data being served.
        </p>
        <TypeSystem />
        <BringYourOwnCode />
        <WithoutVersion />
      </section>
      <section className="flex flex-col container conf-block lg:flex-row">
        <div>
          <h2>GraphQL is the lingua franca for API producers</h2>
          <p>GraphQL provides a unified semantic layer that consolidates multiple discrete resources. GraphQL enables federation across multiple services and data providing a "Supergraph" experience.
          </p>
        </div>
        <div>
        <NextImage
          src={SupergraphImg}
          alt="GraphQL Supergraph"
          className=""
        />
        </div>
      </section>
      <WhoIsUsing />
    </div>
  )
}
