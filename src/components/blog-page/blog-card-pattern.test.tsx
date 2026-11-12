import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { getBlogPattern } from "./blog-card-pattern"

describe("getBlogPattern", () => {
  it("returns the same cells for the same seed and dimensions", () => {
    const pattern = getBlogPattern("GraphQL", 55, 37)
    getBlogPattern("Another title", 120, 80)
    assert.deepStrictEqual(getBlogPattern("GraphQL", 55, 37), pattern)
    assert.deepStrictEqual(getBlogPattern("GraphQL", 55, 37, 18), pattern)
  })

  it("produces different colors for different seeds", () => {
    const colors = (seed: string) =>
      getBlogPattern(seed, 55, 37).map(cell => cell.color)
    assert.notDeepStrictEqual(colors("GraphQL"), colors("A different title"))
  })

  it("clips the last column and row without changing row-major order", () => {
    const cells = getBlogPattern("GraphQL", 55, 37)
    assert.deepStrictEqual(
      cells.map(({ color, ...bounds }) => bounds),
      [0, 18, 36].flatMap(y =>
        [0, 18, 36, 54].map(x => ({
          x,
          y,
          width: x === 54 ? 1 : 18,
          height: y === 36 ? 1 : 18,
        })),
      ),
    )
    assert.deepStrictEqual(
      getBlogPattern("GraphQL", 5, 7).map(({ color, ...bounds }) => bounds),
      [{ x: 0, y: 0, width: 5, height: 7 }],
    )
  })

  it("supports a custom pixel size and clips its edge cells", () => {
    const cells = getBlogPattern("GraphQL", 25, 15, 10)
    assert.strictEqual(cells.length, 6)
    assert.deepStrictEqual(cells[5], {
      x: 20,
      y: 10,
      width: 5,
      height: 5,
      color: cells[5].color,
    })
    assert.ok(cells.every(cell => cell.width <= 10 && cell.height <= 10))
  })

  it("returns no cells for empty dimensions", () => {
    for (const [width, height] of [
      [0, 0],
      [0, 37],
      [55, 0],
      [-1, 37],
      [55, -1],
    ]) {
      assert.deepStrictEqual(getBlogPattern("GraphQL", width, height), [])
    }
  })

  for (const [seed, expected] of [
    [
      "GraphQL",
      [
        "rgb(119, 183, 0)",
        "rgb(52, 184, 38)",
        "rgb(0, 184, 59)",
        "rgb(0, 204, 128)",
        "rgb(81, 184, 26)",
        "rgb(0, 184, 59)",
        "rgb(0, 198, 112)",
        "rgb(0, 218, 174)",
        "rgb(0, 184, 49)",
        "rgb(0, 199, 116)",
        "rgb(0, 220, 173)",
        "rgb(0, 210, 177)",
      ],
    ],
    [
      "A different title",
      [
        "rgb(248, 123, 199)",
        "rgb(254, 131, 211)",
        "rgb(234, 86, 230)",
        "rgb(200, 83, 255)",
        "rgb(251, 127, 205)",
        "rgb(255, 135, 217)",
        "rgb(211, 53, 246)",
        "rgb(189, 105, 255)",
        "rgb(254, 131, 211)",
        "rgb(240, 97, 226)",
        "rgb(201, 82, 255)",
        "rgb(178, 123, 255)",
      ],
    ],
    [
      "",
      [
        "rgb(165, 152, 0)",
        "rgb(182, 155, 0)",
        "rgb(188, 155, 0)",
        "rgb(196, 156, 0)",
        "rgb(126, 185, 54)",
        "rgb(131, 155, 0)",
        "rgb(133, 146, 0)",
        "rgb(141, 148, 0)",
        "rgb(94, 203, 93)",
        "rgb(107, 208, 104)",
        "rgb(112, 210, 108)",
        "rgb(118, 212, 113)",
      ],
    ],
  ] as const) {
    it(`preserves the original sRGB colors for seed ${JSON.stringify(seed)}`, () => {
      assert.deepStrictEqual(
        getBlogPattern(seed, 55, 37).map(cell => cell.color),
        expected,
      )
    })
  }
})
