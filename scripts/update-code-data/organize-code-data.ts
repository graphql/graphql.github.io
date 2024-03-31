import { Library, sortLibs } from "../sort-libraries/sort-libraries"
import { CodeData } from "./update-code-data"

export type List = {
  name: string
  totalStars: number
  categoryMap: {
    [categoryName: string]: Library[]
  }
}

export async function organizeCodeData(
  codeData: CodeData,
): Promise<{ languageList: List[]; toolList: List[]; serviceList: Library[] }> {
  const languageList: List[] = []
  const toolList: List[] = []
  let serviceList: Library[] = []
  await Promise.all([
    ...Object.keys(codeData.Languages).map(async languageName => {
      const libraryCategoryMap = codeData.Languages[languageName]
      let languageTotalStars = 0
      await Promise.all(
        Object.keys(libraryCategoryMap).map(async libraryCategoryName => {
          const libraries = libraryCategoryMap[libraryCategoryName]
          const { sortedLibs, totalStars } = await sortLibs(libraries)

          libraryCategoryMap[libraryCategoryName] = sortedLibs
          languageTotalStars += totalStars || 0
        }),
      )
      languageList.push({
        name: languageName,
        totalStars: languageTotalStars,
        categoryMap: libraryCategoryMap,
      })
    }),
    ...Object.keys(codeData.Tools).map(async toolName => {
      const toolCategoryMap = codeData.Tools[toolName]
      let toolTotalStars = 0
      await Promise.all(
        Object.keys(toolCategoryMap).map(async toolCategoryName => {
          const tools = toolCategoryMap[toolCategoryName]
          const { sortedLibs, totalStars } = await sortLibs(tools)
          toolCategoryMap[toolCategoryName] = sortedLibs
          toolTotalStars += totalStars || 0
        }),
      )
      toolList.push({
        name: toolName,
        totalStars: toolTotalStars,
        categoryMap: toolCategoryMap,
      })
    }),
    (serviceList = codeData.Services),
  ])
  return { languageList, toolList, serviceList }
}
