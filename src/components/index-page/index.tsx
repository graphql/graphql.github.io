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
    <div className="index">
      <Hero />
      <section className="conf-block container flex max-w-3xl flex-col items-center text-center">
        <h2>A query language for your API</h2>
        <p>
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
