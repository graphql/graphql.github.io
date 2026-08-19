"use client"

import { useEffect, useRef, useState } from "react"
import { graphql } from "graphql"

import { QueryEditor } from "@/components/interactive-code-block/query-editor"
import { ResultViewer } from "@/components/interactive-code-block/result-viewer"
import { StarWarsSchema } from "@/components/interactive-code-block/swapi-schema"
import { CodeBlockLabel } from "@/components/pre/code-block-label"
import { PlayButton } from "@/components/index-page/how-it-works/play-button"

async function executeQuery(source: string) {
  const execution = await graphql({
    schema: StarWarsSchema,
    source,
  })
  const serializable = execution.errors
    ? {
        ...execution,
        errors: execution.errors.map(error => ({
          message: error.message,
          locations: error.locations,
          path: error.path,
        })),
      }
    : execution
  return JSON.stringify(serializable, null, 2)
}

export function DemoEditor({
  query,
  onEdit,
  queryComplete,
}: {
  query: string
  onEdit: (value: string) => void
  queryComplete: boolean
}) {
  const [result, setResult] = useState("")
  const queryId = useRef(0)

  async function runQuery(source: string = query) {
    if (!queryComplete) {
      setResult("")
      return
    }

    queryId.current++
    const id = queryId.current
    try {
      const next = await executeQuery(source)
      if (id === queryId.current) setResult(next)
    } catch (error) {
      if (id === queryId.current)
        setResult(JSON.stringify({ error: String(error) }, null, 2))
    }
  }

  useEffect(() => {
    if (!queryComplete) {
      setResult("")
      return
    }

    let cancelled = false
    executeQuery(query)
      .then(next => {
        if (!cancelled) setResult(next)
      })
      .catch(error => {
        if (!cancelled)
          setResult(JSON.stringify({ error: String(error) }, null, 2))
      })
    return () => {
      cancelled = true
    }
  }, [query, queryComplete])

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="flex h-[280px] flex-col overflow-hidden border border-neu-200 text-xs dark:border-neu-50 [&_.cm-editor]:h-full [&_.cm-editor]:max-h-none">
        <CodeBlockLabel
          text={queryComplete ? "Query (runs as you type)" : "Composing query…"}
          className="shrink-0 border-b border-neu-200 dark:border-neu-50"
          button={
            <PlayButton
              disabled={!queryComplete}
              onClick={() => {
                void runQuery()
              }}
            />
          }
        />
        <div className="min-h-0 flex-1">
          <QueryEditor
            value={query}
            schema={StarWarsSchema}
            onEdit={onEdit}
            runQuery={() => {
              void runQuery()
            }}
          />
        </div>
      </div>
      <div className="flex h-[280px] flex-col overflow-hidden border border-neu-200 text-xs dark:border-neu-50 [&_.cm-editor]:h-full [&_.cm-editor]:max-h-none">
        <CodeBlockLabel
          text={queryComplete ? "Response" : "Response waits for the query"}
          className="shrink-0 border-b border-neu-200 dark:border-neu-50"
        />
        <div className="min-h-0 flex-1">
          <ResultViewer value={result} vainlyExtractData />
        </div>
      </div>
    </div>
  )
}
