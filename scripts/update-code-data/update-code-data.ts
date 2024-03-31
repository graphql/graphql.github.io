import { readFile } from "fs/promises"
import { promisify } from "util"
// @ts-expect-error -- types are missing
import * as frontmatterParser from "parser-front-matter"
import { Library } from "../sort-libraries/sort-libraries"

const parse$ = promisify(frontmatterParser.parse)

export type CodeData = {
  Languages: {
    [languageName: string]: {
      [categoryName: string]: Library[]
    }
  }
  Tools: {
    [toolName: string]: {
      [categoryToolsName: string]: Library[]
    }
  }
  Services: Library[]
}

export async function updateCodeData(
  markdownFilePaths: string[],
  slugMap: string,
): Promise<CodeData> {
  const codeData = {} as CodeData
  await Promise.all(
    markdownFilePaths.map(async markdownFilePath => {
      const markdownFileContent = await readFile(markdownFilePath, "utf-8")
      let {
        data: { name, description, url, github, npm, gem },
        content: howto,
      } = await parse$(markdownFileContent)
      howto = howto.trim()
      const pathArr = markdownFilePath.split("/")
      const languageSupport = markdownFilePath.includes("language-support")
      const toolsSupport = markdownFilePath.includes("tools")

      switch (true) {
        case languageSupport: {
          const languageSupportDirIndex = pathArr.indexOf("language-support")
          const languageNameSlugIndex = languageSupportDirIndex + 1
          const languageNameSlug = pathArr[languageNameSlugIndex]
          // @ts-expect-error fixme
          const languageName = slugMap[languageNameSlug]
          codeData.Languages ||= {}
          codeData.Languages[languageName] ||= {}

          const categoryNameSlugIndex = languageSupportDirIndex + 2
          const categoryNameSlug = pathArr[categoryNameSlugIndex]
          // @ts-expect-error fixme
          const categoryName = slugMap[categoryNameSlug]
          codeData.Languages[languageName][categoryName] ||= []
          codeData.Languages[languageName][categoryName].push({
            name,
            description,
            howto,
            url,
            github,
            npm,
            gem,
            sourcePath: markdownFilePath,
          })
          break
        }
        case toolsSupport: {
          const toolSupportDirIndex = pathArr.indexOf("tools")
          const toolNameSlugIndex = toolSupportDirIndex + 1
          const toolNameSlug = pathArr[toolNameSlugIndex]
          // @ts-expect-error fixme
          const toolName = slugMap[toolNameSlug]
          codeData.Tools ||= {}
          codeData.Tools[toolName] ||= {}
          const categoryToolsNameSlugIndex = toolSupportDirIndex + 2
          const categoryToolsNameSlug = pathArr[categoryToolsNameSlugIndex]
          // @ts-expect-error fixme
          const categoryToolsName = slugMap[categoryToolsNameSlug]
          codeData.Tools[toolName][categoryToolsName] ||= []

          codeData.Tools[toolName][categoryToolsName].push({
            name,
            description,
            howto,
            url,
            github,
            npm,
            gem,
            sourcePath: markdownFilePath,
          })
          break
        }
        default: {
          const codeDirIndex = pathArr.indexOf("code")
          const categoryNameSlugIndex = codeDirIndex + 1
          const categoryNameSlug = pathArr[categoryNameSlugIndex]
          // @ts-expect-error fixme
          const categoryName = slugMap[categoryNameSlug]
          // @ts-expect-error fixme
          codeData[categoryName] ||= []
          // @ts-expect-error fixme
          codeData[categoryName].push({
            name,
            description,
            howto,
            url,
            github,
            npm,
            gem,
            sourcePath: markdownFilePath,
          })
        }
      }
    }),
  )
  return codeData
}
