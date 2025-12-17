export default {
  index: {
    type: "page",
    display: "hidden",
    theme: {
      layout: "raw",
    },
  },
  learn: {
    type: "page",
    title: "Learn",
  },
  resources: {
    type: "menu",
    title: "Resource Hub",
    route: "/resources",
    items: {
      index: "Resource Hub",
      frontend: "",
      backend: "",
      federation: "",
      ai: "AI",
      security: "",
      monitoring: "",
      "tools-and-libraries": {
        type: "page",
        title: "Tools & Libraries",
        // for now, until we have bandwidth to migrate it to App Router
        href: "/community/tools-and-libraries",
      },
      spec: {
        type: "page",
        title: "Specification",
        href: "https://spec.graphql.org",
        newWindow: true,
      },
      video: "Video Resources Library",
      reading: "Reading Resources Library",
    },
  },
  community: {
    type: "menu",
    title: "Community",
    items: {
      events: {
        title: "Events",
        type: "page",
        href: "/community/events",
      },
      "official-channels": { title: "Official Channels" },
      "training-courses": { title: "Training Courses" },
      "community-channels": { title: "Community Channels" },
      "vendor-channels": { title: "Vendor Channels" },
      "more-resources": { title: "Community Resources" },
      ambassadors: { title: "Ambassador Program" },
      contribute: {
        title: "Contribute to GraphQL",
        href: "/community/contribute/governance",
      },
      foundation: { title: "Foundation" },
    },
  },
  faq: {
    type: "hidden",
    title: "FAQ",
  },
  blog: {
    type: "page",
    title: "Blog",
    theme: {
      layout: "raw",
      typesetting: "article",
      timestamp: false,
    },
  },
  codeofconduct: {
    display: "hidden",
    theme: {
      breadcrumb: false,
      sidebar: false,
    },
  },
  brand: {
    display: "hidden",
    theme: {
      breadcrumb: false,
      sidebar: false,
    },
  },
  users: {
    display: "hidden",
    theme: {
      typesetting: "article",
      toc: false,
      sidebar: false,
      breadcrumb: false,
      timestamp: false,
    },
  },
  tags: {
    display: "children",
    theme: {
      layout: "raw",
    },
  },
  conf: {
    type: "page",
    title: (
      <Emphasis>
        GraphQLConf
        <span className="max-xl:hidden"> 2025</span>
      </Emphasis>
    ),
    route: "/conf/2025",
  },
  "graphql-js": {
    type: "page",
    title: "GraphQL.JS Tutorial",
  },
}

function Emphasis({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block before:absolute before:-inset-x-3 before:-inset-y-1 before:border before:border-current [a:has(>&)]:text-pri-base dark:[a:has(>&)]:text-pri-light [a:hover:has(>&)]:no-underline [a:hover_&]:before:border-transparent">
      {children}
    </span>
  )
}
