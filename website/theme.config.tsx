import {
  DocsThemeConfig,
  ThemeSwitch,
  useConfig,
  Navbar,
} from "nextra-theme-docs"
import NextLink from "next/link"
import {
  GraphQLWordmarkLogo,
  StackOverflowIcon,
  GitHubIcon,
  DiscordIcon,
  TwitterIcon,
} from "./src/icons"
import { useRouter } from "next/router"

const graphQLLogo = (
  <GraphQLWordmarkLogo className="h-8 nextra-logo" title="GraphQL" />
)

const classes = {
  link: "hover:underline decoration-from-font [text-underline-position:from-font]",
}

function List({
  title,
  items,
}: {
  title: string
  items: { title: string; url: string }[]
}) {
  return (
    <ul className="text-sm flex flex-col gap-4 max-lg:w-[46%]">
      <h3 className="text-lg font-bold">{title}</h3>
      {items.map(item => (
        <li key={item.title}>
          <NextLink href={item.url} className={classes.link}>
            {item.title}
          </NextLink>
        </li>
      ))}
    </ul>
  )
}

function Footer() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-start mb-24 flex-wrap gap-10">
        <NextLink href="/" className="max-lg:w-full">
          {graphQLLogo}
        </NextLink>
        <List
          title="Learn"
          items={[
            { title: "Introduction to GraphQL", url: "/learn" },
            { title: "Best Practices", url: "/learn/best-practices" },
            { title: "Frequently Asked Questions", url: "/faq" },
            {
              title: "Training Courses",
              url: "/community/users/#training-courses",
            },
          ]}
        />
        <List
          title="Code"
          items={[
            { title: "GitHub", url: "https://github.com/graphql" },
            {
              title: "GraphQL Specification",
              url: "https://spec.graphql.org",
            },
            { title: "Libraries & Tools", url: "/code" },
            { title: "Services & Vendors", url: "#" },
          ]}
        />
        <List
          title="Community"
          items={[
            { title: "Resources", url: "/community/users" },
            { title: "Events & Meetups", url: "/community/upcoming-events" },
            { title: "Contribute to GraphQL", url: "#" },
            { title: "Landscape", url: "https://landscape.graphql.org" },
            { title: "Shop", url: "https://store.graphql.org" }
          ]}
        />
        <List
          title="& More"
          items={[
            { title: "Blog", url: "/blog" },
            { title: "GraphQL Foundation", url: "/foundation" },
            {
              title: "GraphQL Community Grant",
              url: "/foundation/community-grant",
            },
            { title: "Logo and Brand Guidelines", url: "/brand" },
            { title: "Code of Conduct", url: "/codeofconduct" },
          ]}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-10">
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} The GraphQL Foundation. All rights reserved.
          <br />
          For web site terms of use, trademark policy and general project
          policies please see{" "}
          <a
            href="https://lfprojects.org"
            target="_blank"
            rel="noreferrer"
            className={`text-primary ${classes.link}`}
          >
            https://lfprojects.org
          </a>
        </p>
        <ul className="flex gap-5">
          {[
            { url: "https://github.com/graphql", icon: GitHubIcon },
            { url: "https://discord.graphql.org", icon: DiscordIcon },
            { url: "https://twitter.com/graphql", icon: TwitterIcon },
            {
              url: "http://stackoverflow.com/questions/tagged/graphql",
              icon: StackOverflowIcon,
            },
          ].map(({ url, icon: Icon }) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Icon className="h-5 w-auto *:fill-current" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default {
  backgroundColor: {
    dark: "27,27,27",
  },
  head: function useHead() {
    const { frontMatter, title: pageTitle } = useConfig()
    const { asPath } = useRouter()

    const title = `${pageTitle}${asPath === "/" ? "" : " | GraphQL"}`
    const { description, canonical, image } = frontMatter
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
          </>
        )}
        {canonical && <link rel="canonical" href={canonical} />}
        {image && <meta name="og:image" content={image} />}
        <meta property="og:image" content="/img/og-image.png" />
        <meta property="twitter:site" content="@graphql" />
      </>
    )
  },
  banner: {
    content: (
      <>
        📣 GraphQLConf 2024 • Sept 10-12 • San Francisco •{" "}
        <NextLink
          href="/conf/2024"
          className="underline after:content-['_→'] after:font-sans"
        >
          Read more
        </NextLink>
      </>
    ),
    key: "graphqlconf-2024",
  },
  logo: graphQLLogo,
  docsRepositoryBase: "https://github.com/graphql/graphql.github.io",
  color: {
    hue: 319,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  footer: {
    content: Footer,
  },
  navbar: {
    component(props) {
      const { frontMatter } = useConfig()
      let { asPath } = useRouter()

      if (asPath.startsWith("/community/resources/")) asPath = "/community/"
      if (asPath.startsWith("/community/contribute/")) asPath = "/community/contribute/"
      if (asPath === "/community/") {
        frontMatter.title = "Community Resources"
        frontMatter.description =
          "The GraphQL community is worldwide, and includes developers, users, supporters, and fans from around the globe. You are welcome to join us! If you're new to the community, here are a few things to get you started."
      }
      if (asPath === "/community/contribute/") {
        frontMatter.title = 'Contribute to GraphQL'
        frontMatter.description = 'The following resources describe how GraphQL development processes work, how to get involved, and where to get help.'
      }

      return (
        <>
          <Navbar {...props} />
          {asPath.startsWith("/community/") && (
            <div className="code-page lg:min-h-96 lg:max-h-96 relative overflow-hidden">
              <div className="container conf-block relative z-10">
                <h1 className="text-7xl font-extrabold mb-10">
                  {frontMatter.title}
                </h1>
                <p className="text-2xl/[2.375rem] text-balance lg:w-2/3">
                  {frontMatter.description}
                </p>
              </div>
              <img
                src={
                  {
                    "/community/": "/img/community/resources.png",
                    "/community/events/": "/img/community/events.png",
                    "/community/contribute/": "/img/community/contribute.png",
                  }[asPath]
                }
                alt="Figure"
                className="max-xl:hidden select-none absolute right-0 top-0 h-full -translate-x-1/4 scale-125"
              />
            </div>
          )}
        </>
      )
    },
    extraContent: <ThemeSwitch lite className="[&_span]:hidden" />,
  },
  toc: {
    backToTop: true,
  },
  search: {
    placeholder: "Search…",
  },
} satisfies DocsThemeConfig
