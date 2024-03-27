import { Library } from "../sort-libraries/sort-libraries"
import { List } from "./organize-code-data"

type organizeData = {
  languageList: List[]
  toolList: List[]
  serviceList: Library[]
}

export async function sortCodeData(
  organizeData: organizeData,
): Promise<organizeData> {
  await Promise.all([
    organizeData.languageList.sort((a, b) => {
      if (a.totalStars > b.totalStars) {
        return -1
      }
      if (a.totalStars < b.totalStars) {
        return 1
      }
      return 0
    }),
    organizeData.toolList.sort((a, b) => {
      if (a.totalStars > b.totalStars) {
        return -1
      }
      if (a.totalStars < b.totalStars) {
        return 1
      }
      return 0
    }),
    organizeData.serviceList,
  ])
  return organizeData
}
