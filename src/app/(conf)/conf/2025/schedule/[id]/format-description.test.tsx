import { describe, it } from "node:test"
import { strict as assert } from "node:assert"

import { formatDescription } from "./format-description"

describe(formatDescription.name, () => {
  it("does not double-wrap links", () => {
    assert.equal(
      formatDescription(
        `Check out Y! <a href="https://y.dev">https://y.dev</a>`,
      ),
      `Check out Y! <a href="https://y.dev" rel="noopener noreferrer" target="_blank" class=" typography-link">y.dev</a>`,
    )
  })

  it("enriches plain URLs", () => {
    assert.equal(
      formatDescription(`Visit https://example.com for more info`),
      `Visit <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="typography-link">example.com</a> for more info`,
    )
  })

  it("adds attributes to existing links without URL content", () => {
    assert.equal(
      formatDescription(`<a href="https://example.com">Click here</a>`),
      `<a href="https://example.com" rel="noopener noreferrer" target="_blank" class=" typography-link">Click here</a>`,
    )
  })

  it("handles mixed content", () => {
    assert.equal(
      formatDescription(
        `Check <a href="https://y.dev">Y site</a> and https://example.com`,
      ),
      `Check <a href="https://y.dev" rel="noopener noreferrer" target="_blank" class=" typography-link">Y site</a> and <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="typography-link">example.com</a>`,
    )
  })

  it("handles multiple URLs in one text", () => {
    assert.equal(
      formatDescription(
        `Visit https://github.com and https://example.org for info`,
      ),
      `Visit <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="typography-link">github.com</a> and <a href="https://example.org" target="_blank" rel="noopener noreferrer" class="typography-link">example.org</a> for info`,
    )
  })

  it("handles existing link with existing class", () => {
    assert.equal(
      formatDescription(
        `<a href="https://example.com" class="custom">Click here</a>`,
      ),
      `<a href="https://example.com" class="custom typography-link" rel="noopener noreferrer" target="_blank">Click here</a>`,
    )
  })
})
