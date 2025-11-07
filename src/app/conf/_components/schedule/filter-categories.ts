import { CategoryName } from "./session-list"

export const filterCategories2024: {
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
      "Keynote Sessions",
      "API Platform",
      "Federation and Composite Schemas",
      "GraphQL Clients",
      "Backend",
      "Defies Categorization",
      "Developer Experience",
      "GraphQL in Production",
      "GraphQL Security",
      "GraphQL Spec",
      "Scaling",
    ],
  },
  {
    name: "Event type",
    options: [
      "Workshops",
      "Breaks & Special Events",
      "Keynote Sessions",
      "Sponsor Showcase",
      "Session Presentations",
      "Lightning Talks",
    ],
  },
]

export const filterCategories2023: {
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
