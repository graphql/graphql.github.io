import { graphql } from "graphql"
import React, { useState } from "react"

import { getVariableToType } from "@/components/interactive-code-block/get-variable-to-type"
import { QueryEditor } from "@/components/interactive-code-block/query-editor"
import { ResultViewer } from "@/components/interactive-code-block/result-viewer"
import { VariableEditor } from "@/components/interactive-code-block/variable-editor"
import { CodeBlockLabel } from "@/components/pre/code-block-label"

import { HowItWorksListItem } from "./how-it-works-list-item"
import { PlayButton } from "./play-button"
import {
  INITIAL_QUERY_TEXT,
  INITIAL_RESULTS_TEXT,
  projectsSchema as schema,
} from "./schema"

export default function InteractiveEditor() {
  const [query, setQuery] = useState(INITIAL_QUERY_TEXT)
  const [results, setResults] = useState(INITIAL_RESULTS_TEXT)
  const [variableTypes, setVariableTypes] = useState<Record<string, string>>({})
  const [variables, setVariables] = useState("")
  const editorQueryId = React.useRef(0)

  async function runQuery(
    options: { manual: boolean },
    source: string = query,
  ) {
    editorQueryId.current++
    const queryID = editorQueryId.current
    try {
      const result = await graphql({
        schema,
        source,
        variableValues: JSON.parse(variables || "{}"),
      })

      let resultToSerialize: any = result
      if (result.errors) {
        if (!options.manual) {
          // if the query was ran on edit, we display errors on the left side
          // so we can just return instead of showing the resulting error
          return
        }

        // Convert errors to serializable format
        const serializedErrors = result.errors.map(error => ({
          message: error.message,
          locations: error.locations,
          path: error.path,
        }))
        // Replace errors with serialized version for JSON.stringify
        resultToSerialize = { ...result, errors: serializedErrors }
      }

      if (queryID === editorQueryId.current) {
        setResults(JSON.stringify(resultToSerialize, null, 2))
      }
    } catch (error) {
      if (queryID === editorQueryId.current) {
        setResults(JSON.stringify(error, null, 2))
      }
    }
  }

  const editor = (
    <QueryEditor
      value={query}
      schema={schema}
      onEdit={newQuery => {
        setQuery(newQuery)
        runQuery({ manual: false }, newQuery)
      }}
      runQuery={() => {
        setVariableTypes(getVariableToType(schema, query))
        runQuery({ manual: true })
      }}
    />
  )

  return (
    <>
      <HowItWorksListItem
        text="Ask for what you want"
        icon={
          <PlayButton
            onClick={() => {
              void runQuery({ manual: true })
            }}
          />
        }
        code={
          Object.keys(variableTypes).length > 0 ? (
            <div className="flex flex-col">
              {editor}
              <div className="flex flex-col border-neu-200 dark:border-neu-50">
                <CodeBlockLabel
                  text="Variables"
                  className="border-b border-neu-200 bg-transparent dark:border-neu-50"
                />
                <VariableEditor
                  value={variables}
                  variableToType={variableTypes}
                  onEdit={setVariables}
                  onRunQuery={() => void runQuery({ manual: false })}
                />
              </div>
            </div>
          ) : (
            editor
          )
        }
      />
      <HowItWorksListItem
        text="Get predictable results"
        code={<ResultViewer value={results} vainlyExtractData />}
      />
    </>
  )
}
