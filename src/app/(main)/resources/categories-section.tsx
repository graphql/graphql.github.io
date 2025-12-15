import Link from "next/link"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

import { Eyebrow } from "@/_design-system/eyebrow"
import { type Topic } from "@/resources/types"

import FrontendIcon from "./assets/frontend.svg?svgr"
import BackendIcon from "./assets/backend.svg?svgr"
import FederationIcon from "./assets/federation.svg?svgr"
import SecurityIcon from "./assets/security.svg?svgr"
import AIIcon from "./assets/ai.svg?svgr"
import MonitoringIcon from "./assets/monitoring.svg?svgr"

interface Category {
  id: Topic
  name: string
  description: string
  icon: React.ReactNode
}

const categories: Category[] = [
  {
    id: "frontend",
    name: "Frontend",
    description:
      "Build better queries and optimize UI performance with the right client tools.",
    icon: (
      <FrontendIcon className="size-8 text-pri-base dark:text-pri-light lg:size-12" />
    ),
  },
  {
    id: "backend",
    name: "Backend",
    description:
      "From resolvers to execution — everything you need to run a GraphQL server in production.",
    icon: (
      <BackendIcon className="size-8 text-pri-base dark:text-pri-light lg:size-12" />
    ),
  },
  {
    id: "federation",
    name: "Federation",
    description:
      "Design and manage distributed graphs that scale across teams and services.",
    icon: (
      <FederationIcon className="size-8 text-pri-base dark:text-pri-light lg:size-12" />
    ),
  },
  {
    id: "security",
    name: "Security",
    description:
      "Secure your GraphQL API with query limits and schema protection.",
    icon: (
      <SecurityIcon className="size-8 text-pri-base dark:text-pri-light lg:size-12" />
    ),
  },
  {
    id: "ai",
    name: "AI",
    description:
      "Use GraphQL to power AI systems — patterns, tools and implementations.",
    icon: (
      <AIIcon className="size-8 text-pri-base dark:text-pri-light lg:size-12" />
    ),
  },
  {
    id: "monitoring",
    name: "Monitoring",
    description:
      "Track performance, usage and schema changes to keep your graph healthy.",
    icon: (
      <MonitoringIcon className="size-8 text-pri-base dark:text-pri-light lg:size-12" />
    ),
  },
]

export function CategoriesSection() {
  return (
    <section className="gql-section" id="categories">
      <header className="mb-12 flex flex-col gap-6">
        <Eyebrow>Explore GraphQL by topic</Eyebrow>
        <div className="max-w-[700px]">
          <h2 className="typography-h2">Choose a resource category</h2>
          <p className="typography-body-md mt-6">
            Dive into the topics most relevant to your work with GraphQL. Find
            selected tools, videos and other resources.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/resources/${category.id}`}
      className="group flex flex-col justify-between gap-4 border border-neu-200 bg-neu-0 p-6 transition-colors hover:bg-neu-50 hover:duration-0 dark:border-neu-100 dark:hover:bg-neu-50/50 lg:h-[202px] lg:gap-6"
    >
      <div className="flex items-start justify-between">
        {category.icon}
        <ArrowDownIcon className="size-6 -rotate-90 text-neu-900 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-hover:duration-0 group-focus-visible:opacity-100 max-lg:opacity-80" />
      </div>
      <div>
        <h3 className="typography-h3 lg:group-hover:hidden">{category.name}</h3>
        <p className="typography-body-md group-hover:block max-lg:mt-4 lg:hidden">
          {category.description}
        </p>
      </div>
    </Link>
  )
}
