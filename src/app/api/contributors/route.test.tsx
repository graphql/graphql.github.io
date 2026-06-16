import { describe, it } from "node:test"
import { strict as assert } from "node:assert"
import { NextRequest } from "next/server"

import { GET } from "./route"

import contributorData from "../../../../scripts/sync-landing-schema/data.json"

describe("Contributors API", () => {
  it("returns 400 when project parameter is missing", async () => {
    const request = new NextRequest("http://localhost:3000/api/contributors")
    const response = await GET(request)

    assert.strictEqual(response.status, 400)

    const json = await response.json()
    assert.strictEqual(json.error, "Bad request")
    assert.strictEqual(json.message, "Repository parameter is required")
  })

  it("returns contributors data for synced project", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/contributors?project=GraphQL",
    )
    const response = await GET(request)

    assert.strictEqual(response.status, 200)

    const json = await response.json()
    const expectedData = contributorData.GraphQL

    // Should return all contributors when no pagination params
    assert.strictEqual(json.length, 5) // Default first=5

    // Should be sorted by contributions (descending), then by id (ascending)
    const sortedExpected = expectedData
      .sort((a, b) => {
        if (b.contributions !== a.contributions) {
          return b.contributions - a.contributions
        }
        return a.id.localeCompare(b.id)
      })
      .slice(0, 5)

    assert.deepStrictEqual(json, sortedExpected)
  })

  it("returns empty array for a project we don't have data for", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/contributors?project=NonExistent",
    )
    const response = await GET(request)

    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(Array.isArray(json))
    assert.strictEqual(json.length, 0)
  })

  it("respects first parameter for pagination", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/contributors?project=GraphQL&first=2",
    )
    const response = await GET(request)

    assert.strictEqual(response.status, 200)

    const json = await response.json()
    const expectedData = contributorData.GraphQL
    const sortedExpected = expectedData
      .sort((a, b) => {
        if (b.contributions !== a.contributions) {
          return b.contributions - a.contributions
        }
        return a.id.localeCompare(b.id)
      })
      .slice(0, 2)

    assert.strictEqual(json.length, 2)
    assert.deepStrictEqual(json, sortedExpected)
  })

  it("handles after parameter for cursor pagination", async () => {
    const expectedData = contributorData.GraphQL
    const sortedExpected = expectedData.sort((a, b) => {
      if (b.contributions !== a.contributions) {
        return b.contributions - a.contributions
      }
      return a.id.localeCompare(b.id)
    })

    // Get first contributor's ID to use as cursor
    const firstContributorId = sortedExpected[0].id

    const request = new NextRequest(
      `http://localhost:3000/api/contributors?project=GraphQL&first=2&after=${firstContributorId}`,
    )
    const response = await GET(request)

    const json = await response.json()
    const expectedAfterFirst = sortedExpected.slice(1, 3)

    assert.strictEqual(json.length, 2)
    assert.deepStrictEqual(json, expectedAfterFirst)
  })
})
