import { Button } from "@/app/conf/_design-system/button"
import { SectionLabel } from "@/app/conf/_design-system/section-label"

import { CodeA, CodeB, CodeC } from "../code-blocks"

const TRY_IT_OUT_URL = "https://graphql.org/swapi-graphql"

export function HowItWorks() {
  return (
    <section className="gql-container gql-section xl:py-20">
      <SectionLabel className="mb-6">How it works</SectionLabel>
      <h2 className="typography-h2 mb-6 lg:mb-16">A GraphQL Query</h2>
      <ol className="gql-radial-gradient list-none gap-px max-md:bg-gradient-to-r max-md:from-transparent max-md:via-neu-400 max-md:to-transparent lg:grid lg:grid-cols-3">
        <ListItem text="Describe your data" code={<CodeA />} />

        {/* TODO: Instead of importing CodeB and CodeC, we'll refactor MiniGraphiQL and dynamically import it here. 
            Required changes: 
            - [ ] Move VariableEditor and QueryEditor to separate files.
            - [ ] Import them here with the raw code snippets.
            
        */}
        <ListItem text="Ask for what you want" code={<CodeB />} />
        <ListItem text="Get predictable results" code={<CodeC />} />
      </ol>

      <Button className="mx-auto mt-8 w-fit lg:mt-16" href={TRY_IT_OUT_URL}>
        Try it out live
      </Button>
    </section>
  )
}

function ListItem({
  text,
  code,
}: {
  text: React.ReactNode
  code: React.ReactNode
}) {
  return (
    <li className="[counter-increment:list-item]">
      <div className="typography-body-md bg-neu-0 py-4 before:typography-body-sm before:mr-2 before:inline-flex before:size-5 before:translate-y-[-0.5px] before:items-center before:justify-center before:bg-neu-200 before:p-1 before:text-neu-800 before:content-[counter(list-item)] dark:before:bg-neu-50 md:py-6 md:before:ml-6">
        {text}
      </div>
      <div className="mt-px bg-neu-0 md:pl-2 md:pt-2 max-md:[&_code>span]:!pl-0 [&_pre]:border-none [&_pre]:ring-0">
        {code}
      </div>
    </li>
  )
}
