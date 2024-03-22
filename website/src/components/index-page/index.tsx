import { Hero } from "./hero"
import { PredictableResults } from "./predictable-results"
import { SingleRequest } from "./single-request"
import { TypeSystem } from "./type-system"
import { PowerFulTools } from "./powerful-tools"
import { WithoutVersion } from "./without-version"
import { BringYourOwnCode } from "./bring-your-own-code"
import { WhoIsUsing } from "./who-is-using"

export function IndexPage() {
  return (
    <div className="index xl:mt-10">
      <Hero />
      <section className="flex flex-col container items-center conf-block max-w-3xl">
        <h2>A query language for your API</h2>
        <p className="text-center">
          GraphQL is a query language for APIs and a runtime for fulfilling
          those queries with your existing data. GraphQL provides a complete and
          understandable description of the data in your API, gives clients the
          power to ask for exactly what they need and nothing more, makes it
          easier to evolve APIs over time, and enables powerful developer tools.
        </p>
      </section>
      <PredictableResults />
      <SingleRequest />
      <TypeSystem />
      <PowerFulTools />
      <WithoutVersion />
      <BringYourOwnCode />
      <WhoIsUsing />
    </div>
  )
}
