import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { LookingForMore } from "@/components/looking-for-more"

import { ResourcesHero } from "./resources-hero"
import { CategoriesSection } from "./categories-section"
import { ToolsLibrariesSection } from "./tools-libraries-section"
import { SpecificationSection } from "./specification-section"
import { BlogSection } from "./blog-section"
import { VideoResourcesSection } from "./video-resources-section"
import { ReadingResourcesSection } from "./reading-resources-section"

export const metadata = {
  title: "Resource Hub",
  description:
    "Explore curated GraphQL resources by topic. Find tools, videos, blog posts, and more to help you build with GraphQL.",
}

export default function ResourcesPage() {
  return (
    <main className="gql-all-anchors-focusable">
      <NavbarFixed />
      <ResourcesHero
        heading="Resource Hub"
        text="Choose a hub to explore curated resources by topic or browse all Tools, the GraphQL Specification, Blog, Video and Reading Libraries."
      />
      <div className="gql-container">
        <CategoriesSection />
        <ToolsLibrariesSection />
        <SpecificationSection />
        <BlogSection />
      </div>
      <div className="bg-neu-50 dark:bg-neu-50/25 lg:py-16 xl:py-24">
        <VideoResourcesSection />
        <hr className="gql-section mx-auto my-8 max-w-[90rem] border-neu-200 !py-0 dark:border-neu-100 xl:my-16" />
        <ReadingResourcesSection />
      </div>
      <LookingForMore
        className="xl:py-24"
        description="Discover even more ways to learn and connect with the GraphQL community."
        links={[
          { href: "/community", label: "Community" },
          { href: "/learn", label: "Learn" },
        ]}
      />
    </main>
  )
}
