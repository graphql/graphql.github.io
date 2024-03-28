import { Code1, Code2, Code3, Code4 } from "@/components/code-blocks"
import { InfiniteMovingCards } from "./infinite-moving-cards"

export function BringYourOwnCode() {
  return (
    <>
      <section className="container conf-block" id="bring-your-own-code">
        <div className="mx-auto text-center">
          <h2>Bring your own data and code</h2>
          {/*Illustration of each field becoming a function?]*/}
          <p className="lg:w-2/3 mx-auto">
            GraphQL creates a uniform API across your entire application without
            being limited by a specific storage engine. Write GraphQL APIs that
            leverage your existing data and code with GraphQL engines available
            in many languages. You provide functions for each field in the type
            system, and GraphQL calls them with optimal&nbsp;concurrency.
          </p>
        </div>
      </section>
      <InfiniteMovingCards
        direction="right"
        speed="normal"
        className="mx-auto [&_pre]:h-[calc(100%-48px)] [&_div.nextra-code]:h-full"
      >
        <Code1 />
        <Code2 />
        <Code3 />
        <Code4 />
      </InfiniteMovingCards>
    </>
  )
}
