import { describe, it } from "node:test"
import { strict as assert } from "node:assert"
import { graphql } from "graphql"

import { StarWarsSchema } from "@/components/interactive-code-block/swapi-schema"

import { demoPrompts } from "./demo-prompts"

describe("AI demo presets", () => {
  for (const { id, query } of demoPrompts) {
    it(`${id}: executes against the schema without errors`, async () => {
      const { errors, data } = await graphql({
        schema: StarWarsSchema,
        source: query,
      })
      assert.equal(errors, undefined)
      assert.ok(data)
    })

    it(`${id}: every selected member resolves to something`, async () => {
      const { data } = await graphql({ schema: StarWarsSchema, source: query })
      assert.doesNotMatch(
        JSON.stringify(data),
        /\{\}/,
        "an empty object means the query selected a union member it asked no fields for",
      )
    })
  }
})
