import { Kind, Topic } from "@/resources/types"

// @ts-ignore
export const texts: {
  [key in Topic]: {
    heading: string
    subtitle: string
    sections: {
      [key in Kind]: {
        heading: string
        paragraph: string
      }
    }
  }
} = {}
