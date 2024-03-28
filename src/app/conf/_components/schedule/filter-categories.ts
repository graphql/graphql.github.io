import { CategoryName } from "./session-list"

export const filterCategories: {
  name: CategoryName
  options: string[]
}[] = [
  {
    name: "Audience",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    name: "Talk category",
    options: [
      "Beyond Javascript",
      "Spec Fusion",
      "Platform and Backend",
      "GraphQL and Data",
      "GraphQL Security",
      "GraphQL in Production",
      "GraphQL Clients",
      "GraphQL Core",
      "Scaling",
      "Emerging Community Trends",
    ],
  },
  {
    name: "Event type",
    options: [
      "Workshops",
      "Unconference",
      "Keynote Sessions",
      "Sponsor Showcase",
      "Session Presentations",
      "Lightning Talks",
      "Events & Experiences",
    ],
  },
]
