/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from "react"

import { graphql, GraphQLSchema } from "graphql"

import { QueryEditor } from "./query-editor"
import { VariableEditor } from "./variable-editor"
import { ResultViewer } from "./result-viewer"
import { getVariableToType } from "./get-variable-to-type"
import { StarWarsSchema } from "./swapi-schema"
import { UsersSchema } from "./users-schema"
import { CodeBlockLabel } from "@/components/pre/code-block-label"

export type MiniGraphiQLProps = {
  children: string
}

interface MiniGraphiQLState {
  query: string
  variables: string
  response: string | null
  variableToType: Record<string, string>
}

const SCHEMA_MAP = {
  StarWars: StarWarsSchema,
  Users: UsersSchema,
} as const

type SchemaKey = keyof typeof SCHEMA_MAP

type Metadata = {
  graphiql?: boolean
  variables?: unknown
  schema?: SchemaKey
}

export default class MiniGraphiQL extends Component<
  MiniGraphiQLProps,
  MiniGraphiQLState
> {
  // Lifecycle

  _editorQueryID = 0

  schema: GraphQLSchema

  constructor(props: MiniGraphiQLProps) {
    super(props)

    const codeMatch = this.props.children.match(/```graphql\s*\n([\s\S]*?)```/)
    const blockContent = codeMatch?.[1]
    const [firstLine, ...rest] = (blockContent || "").split("\n")

    const metaMatch = firstLine.match(/^\s*#\s*({.*})\s*$/)?.[1] ?? "{}"
    const meta = JSON.parse(metaMatch) as Metadata

    const query = rest.join("\n").replace(/^\s+/, "")
    const variables = meta.variables
      ? JSON.stringify(meta.variables, null, 2)
      : ""
    this.schema = SCHEMA_MAP[meta.schema ?? "StarWars"]

    this.state = {
      query: query,
      variables: variables,
      response: null,
      variableToType: getVariableToType(this.schema, query),
    }
  }

  render() {
    const editor = (
      <div className="flex flex-1 flex-col">
        <CodeBlockLabel
          text="Operation"
          className="border-b border-neu-200 bg-[--cm-background] dark:border-neu-50"
        />
        <QueryEditor
          key="query-editor"
          schema={this.schema}
          value={this.state.query}
          onEdit={this._handleEditQuery.bind(this)}
          runQuery={this._runQueryFromEditor.bind(this)}
        />
      </div>
    )

    return (
      <div className="[&:not(:first-child)]:_mt-6 grid grid-cols-2 border border-neu-200 text-sm dark:border-neu-50">
        {Object.keys(this.state.variableToType).length > 0 ? (
          <div className="hasVariables flex flex-col">
            {editor}
            <div className="flex flex-col border-neu-200 dark:border-neu-50">
              <CodeBlockLabel
                text="Variables"
                className="border-y border-neu-200 bg-[--cm-background] dark:border-neu-50"
              />
              <VariableEditor
                value={this.state.variables}
                variableToType={this.state.variableToType}
                onEdit={this._handleEditVariables.bind(this)}
                onRunQuery={() => void this._runQuery.bind(this)}
              />
            </div>
          </div>
        ) : (
          editor
        )}
        <div className="flex flex-col border-l border-neu-200 dark:border-neu-50">
          <CodeBlockLabel
            text="Response"
            className="border-b border-neu-200 bg-[--cm-background] dark:border-neu-50"
          />
          <ResultViewer value={this.state.response || undefined} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._runQueryFromEditor()
  }

  // Private methods

  _runQueryFromEditor() {
    this.setState({
      variableToType: getVariableToType(this.schema, this.state.query),
    })
    this._runQuery({ manual: true })
  }

  async _runQuery(options: { manual: boolean }) {
    this._editorQueryID++
    const queryID = this._editorQueryID
    try {
      const result = await graphql({
        schema: this.schema,
        source: this.state.query,
        variableValues: JSON.parse(this.state.variables || "{}"),
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

      if (queryID === this._editorQueryID) {
        this.setState({ response: JSON.stringify(resultToSerialize, null, 2) })
      }
    } catch (error) {
      if (queryID === this._editorQueryID) {
        this.setState({ response: JSON.stringify(error, null, 2) })
      }
    }
  }

  _handleEditQuery(value: string) {
    this.setState({ query: value }, () => {
      void this._runQuery({ manual: false })
    })
  }

  _handleEditVariables(value: string) {
    this.setState({ variables: value }, () => {
      void this._runQuery({ manual: false })
    })
  }
}
