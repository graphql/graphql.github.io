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
  code: {
    type: "page",
    theme: {
      layout: "raw",
    },
  },
  community: {
    type: "menu",
    title: "Community",
    items: {
      index: {
        title: "Community Resources",
        href: "/community/resources/official-channels",
      },
      events: { title: "Events & Meetups" },
      contribute: {
        title: "Contribute to GraphQL",
        href: "/community/contribute/essential-links",
      },
    },
    theme: {
      breadcrumb: false,
    },
  },
  faq: {
    type: "page",
    title: "FAQ",
  },
  spec: {
    type: "page",
    title: <span className="after:content-['_↗'] after:font-sans">Spec</span>,
    href: "https://spec.graphql.org",
    newWindow: true,
  },
  foundation: {
    type: "page",
    title: "Foundation",
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
    route: "/conf/2024",
  },
  "graphql-js": {
    display: "children",
    title: "GraphQL.JS Tutorial",
  },
}
