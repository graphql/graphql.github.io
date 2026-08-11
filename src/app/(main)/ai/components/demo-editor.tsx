"use client"

import { useEffect, useState } from "react"
import { graphql } from "graphql"

import { QueryEditor } from "@/components/interactive-code-block/query-editor"
import { ResultViewer } from "@/components/interactive-code-block/result-viewer"
import { StarWarsSchema } from "@/components/interactive-code-block/swapi-schema"
import { CodeBlockLabel } from "@/components/pre/code-block-label"

export function DemoEditor({
  query,
  onEdit,
}: {
  query: string
  onEdit: (value: string) => void
}) {
  const [result, setResult] = useState("")

  useEffect(() => {
    let cancelled = false
    graphql({ schema: StarWarsSchema, source: query })
      .then(execution => {
        if (cancelled) return
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
        setResult(JSON.stringify(serializable, null, 2))
      })
      .catch(error => {
        if (!cancelled)
          setResult(JSON.stringify({ error: String(error) }, null, 2))
      })
    return () => {
      cancelled = true
    }
  }, [query])

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="flex flex-col border border-neu-200 dark:border-neu-50">
        <CodeBlockLabel
          text="Query (runs as you type)"
          className="border-b border-neu-200 dark:border-neu-50"
        />
        <QueryEditor value={query} schema={StarWarsSchema} onEdit={onEdit} />
      </div>
      <div className="flex flex-col border border-neu-200 dark:border-neu-50">
        <CodeBlockLabel
          text="Response"
          className="border-b border-neu-200 dark:border-neu-50"
        />
        <ResultViewer value={result} vainlyExtractData />
      </div>
    </div>
  )
}
