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
  community: {
    type: "menu",
    title: "Community",
    items: {
      "tools-and-libraries": {
        title: "Tools and Libraries",
      },
      resources: {
        title: "Resources",
        href: "/community/resources/official-channels",
      },
      events: { title: "Events & Meetups" },
      contribute: {
        title: "Contribute to GraphQL",
        href: "/community/contribute/governance",
      },
      foundation: { title: "Foundation" },
    },
  },
  faq: {
    type: "page",
    title: "FAQ",
  },
  spec: {
    type: "page",
    title: "Spec",
    href: "https://spec.graphql.org",
    newWindow: true,
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
    <span className="[a:has(>&)]:[a:has(>&)]:border [a:has(>&)]:border [a:has(>&)]:border-current [a:has(>&)]:text-pri-base dark:[a:has(>&)]:text-pri-light [a:hover:has(>&)]:border-transparent [a:hover:has(>&)]:no-underline">
      {children}
    </span>
  )
}
