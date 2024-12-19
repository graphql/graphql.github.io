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
        href: "/community/contribute/essential-links",
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
    title: <span className="after:font-sans after:content-['_↗']">Spec</span>,
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
    title: "GraphQLConf",
    route: "/conf/2025",
  },
  "graphql-js": {
    type: "page",
    title: "GraphQL.JS Tutorial",
  },
}
