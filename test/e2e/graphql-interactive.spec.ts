import { test, expect, type Locator, type Page } from "@playwright/test"

// Helper functions to reduce duplication
async function findEditorByContent(
  page: Page,
  searchText: string,
): Promise<Locator> {
  const editors = page.locator(".cm-editor")

  for (let i = 0; i < (await editors.count()); i++) {
    const editor = editors.nth(i)
    const content = await editor.textContent()
    if (content && content.includes(searchText)) {
      return editor
    }
  }

  throw new Error(`Could not find GraphQL editor containing "${searchText}"`)
}

async function typeInQuery(
  page: Page,
  editor: Locator,
  afterText: string,
  newField: string,
): Promise<void> {
  const codeLines = editor.locator(".cm-line")

  for (let i = 0; i < (await codeLines.count()); i++) {
    const line = codeLines.nth(i)
    const lineText = await line.textContent()
    if (lineText && lineText.includes(afterText)) {
      await line.click()
      await page.keyboard.press("End")
      await page.keyboard.press("Enter")
      await page.keyboard.type(newField)
      break
    }
  }
}

async function expectJsonResult(
  resultViewer: Locator,
  expectedResult: object,
): Promise<void> {
  await expect(resultViewer).toBeVisible()

  await expect
    .poll(async () => {
      const resultContent = await resultViewer.textContent()
      const jsonMatch = resultContent?.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0])
        } catch {
          return {}
        }
      }
      return {}
    })
    .toStrictEqual(expectedResult)
}

test.describe("Learn", () => {
  test("adds appearsIn field to hero query and gets correct response", async ({
    page,
  }) => {
    await page.goto("/learn/introduction")
    await page.waitForSelector(".cm-editor", { timeout: 10000 })

    const heroEditor = await findEditorByContent(page, "hero")

    await typeInQuery(page, heroEditor, "name", "ap")
    await page.keyboard.press("Control+Space")

    const autoCompleteMenu = page.locator(".cm-tooltip-autocomplete")
    await expect(autoCompleteMenu).toBeVisible({ timeout: 5000 })

    const appearsInSuggestion = page
      .locator(".cm-completionLabel")
      .filter({ hasText: "appearsIn" })

    expect(page.locator(".cm-completionDetail").first()).toHaveText(
      "[Episode]!",
    )

    if (await appearsInSuggestion.isVisible()) {
      await appearsInSuggestion.click()
    } else {
      await page.keyboard.press("Enter")
    }

    const resultViewer = page.locator(".result-window").first()

    await expectJsonResult(resultViewer, {
      data: {
        hero: {
          name: "R2-D2",
          appearsIn: ["NEWHOPE", "EMPIRE", "JEDI"],
        },
      },
    })
  })

  test("edits variables and receives an expected mutation result", async ({
    page,
  }) => {
    await page.goto("/learn/mutations")
    await page.waitForLoadState("networkidle")

    const mutationEditor = await findEditorByContent(
      page,
      "CreateReviewForEpisode",
    )

    const variableEditor = mutationEditor.locator(".variable-editor").first()

    if (await variableEditor.isVisible()) {
      await variableEditor.click()

      await page.getByText('"This is a great movie!"').first().click()
      await page.keyboard.press("ControlOrMeta+ArrowRight")
      for (let i = 0; i < 4; i++)
        await page.keyboard.press("Alt+Shift+ArrowLeft")
      await page.keyboard.type('almost as good as Andor"')

      const resultViewer = mutationEditor.locator(".result-window")

      await expectJsonResult(resultViewer, {
        data: {
          createReview: {
            stars: 5,
            commentary: "This is almost as good as Andor",
          },
        },
      })
    }
  })
})

test.describe("Landing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    page.locator(`text="How it works"`).scrollIntoViewIfNeeded()
  })

  test("allows editing query and gets updated results", async ({ page }) => {
    await page.waitForSelector(".cm-editor", { timeout: 10000 })

    const editor = page.locator(".cm-editor").first()

    await editor.click()

    await typeInQuery(page, editor, "tagline", "contr")

    await page.keyboard.press("Control+Space")
    let autoCompleteMenu = page.locator(".cm-tooltip-autocomplete")
    await expect(autoCompleteMenu).toBeVisible({ timeout: 5000 })
    await page.locator(".cm-completionLabel").click()

    await page.keyboard.type("(first: 2) {\n")
    await page.keyboard.type("cont")

    await page.keyboard.press("Control+Space")
    autoCompleteMenu = page.locator(".cm-tooltip-autocomplete")
    await expect(autoCompleteMenu).toBeVisible({ timeout: 5000 })
    await page.locator(".cm-completionLabel").click()

    const resultViewer = page.locator(".result-window").first()
    await expect(resultViewer).toBeVisible()

    await expect
      .poll(async () => {
        const resultContent = await resultViewer.textContent()
        const jsonMatch = resultContent?.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          try {
            const data = JSON.parse(jsonMatch[0])
            if (data?.project?.contributors?.length === 2) {
              const contributors = data.project.contributors
              return (
                contributors[0].contributions >= contributors[1].contributions
              )
            }
            return false
          } catch {
            return false
          }
        }
        return false
      })
      .toBe(true)
  })

  test("shows syntax errors", async ({ page }) => {
    await page.waitForSelector(".cm-editor", { timeout: 10000 })

    const editor = page.locator(".cm-editor").first()

    await editor.click()
    await page.keyboard.press("ControlOrMeta+a")
    await page.keyboard.press("Backspace")

    const playButton = page.getByText("Run query")
    await playButton.click()

    const resultViewer = page.locator(".result-window").first()
    const resultContent = await resultViewer.textContent()
    expect(resultContent).toContain("Syntax Error: Unexpected <EOF>.")
  })
})
