import { test, expect, type Locator } from "@playwright/test"

test.describe("interactive examples", () => {
  test("adds appearsIn field to hero query and gets correct response", async ({
    page,
  }) => {
    await page.goto("/learn")
    await page.waitForSelector(".cm-editor", { timeout: 10000 })

    const editors = page.locator(".cm-editor")
    let heroEditor: Locator | null = null

    for (let i = 0; i < (await editors.count()); i++) {
      const editor = editors.nth(i)
      const content = await editor.textContent()
      if (content && content.includes("hero")) {
        heroEditor = editor
        break
      }
    }

    if (!heroEditor) {
      throw new Error("Could not find hero GraphQL editor")
    }

    const codeLines = heroEditor.locator(".cm-line")

    // Find the line containing "name" and click after it
    for (let i = 0; i < (await codeLines.count()); i++) {
      const line = codeLines.nth(i)
      const lineText = await line.textContent()
      if (lineText && lineText.includes("name")) {
        await line.click()
        // Move to end of line
        await page.keyboard.press("End")
        // Add new line
        await page.keyboard.press("Enter")
        break
      }
    }

    await page.keyboard.type("ap")
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
    await expect(resultViewer).toBeVisible()

    await expect
      .poll(async () => {
        const resultContent = await resultViewer.textContent()
        const jsonMatch = resultContent?.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const responseJson = JSON.parse(jsonMatch[0])
          return responseJson
        }

        return {}
      })
      .toStrictEqual({
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

    // Find the mutation example that has GraphiQL enabled
    const editors = page.locator(".cm-editor")
    let mutationEditor: Locator | null = null

    for (let i = 0; i < (await editors.count()); i++) {
      const editor = editors.nth(i)
      const content = await editor.textContent()
      if (content && content.includes("CreateReviewForEpisode")) {
        mutationEditor = editor
        break
      }
    }

    if (!mutationEditor) {
      throw new Error("Could not find mutation GraphQL editor")
    }

    const variableEditor = mutationEditor.locator(".variable-editor").first()

    if (await variableEditor.isVisible()) {
      await variableEditor.click()

      await page.getByText('"This is a great movie!"').first().click()
      await page.keyboard.press("ControlOrMeta+ArrowRight")
      for (let i = 0; i < 4; i++)
        await page.keyboard.press("Alt+Shift+ArrowLeft")
      await page.keyboard.type('almost as good as Andor"')

      const resultViewer = mutationEditor.locator(".result-window")
      await expect(resultViewer).toBeVisible()

      await expect
        .poll(async () => {
          const resultContent = await resultViewer.textContent()
          const jsonMatch = resultContent?.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            const responseJson = JSON.parse(jsonMatch[0])
            return responseJson
          }
          return {}
        })
        .toStrictEqual({
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
