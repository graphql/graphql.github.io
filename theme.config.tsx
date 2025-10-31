import { DocsThemeConfig, useConfig } from "nextra-theme-docs"
import { useRouter } from "next/router"

import { Navbar } from "@/components/navbar/navbar"
import { mdxComponents } from "@/_design-system/mdx-components"
import { GraphQLWordmarkLogo } from "@/icons"
import { Footer } from "@/components/footer"
import { NextraMdxWrapper } from "@/components/nextra-mdx-wrapper"
import { ThemeSwitch } from "@/components/theme-switch"

const graphQLLogo = (
  <GraphQLWordmarkLogo className="nextra-logo h-6" title="GraphQL" />
)

const absoluteUrl =
  `https://${process.env.VERCEL_URL}` ||
  process.env.__NEXT_PRIVATE_ORIGIN ||
  "http://localhost:3000"

export default {
  backgroundColor: {
    light: "251,251,249",
    dark: "15,15,12",
  },
  head: function useHead() {
    const { frontMatter, title: pageTitle } = useConfig()
    const { asPath } = useRouter()

    const title = `${pageTitle}${asPath === "/" ? "" : " | GraphQL"}`
    const { description, canonical, image } = frontMatter
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} key="meta-og-title" />
        {description && (
          <>
            <meta
              name="description"
              content={description}
              key="meta-description"
            />
            <meta
              property="og:description"
              content={description}
              key="meta-og-description"
            />
          </>
        )}
        {canonical && <link rel="canonical" href={canonical} />}

        <meta property="twitter:site" content="@graphql" />

        {image ? (
          <>
            {/* if there is an OG image, we show a bigger card */}
            <meta property="og:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />
          </>
        ) : (
          <>
            <meta
              property="og:image"
              content={`${absoluteUrl}/img/og-logo.png`}
            />
            <meta name="twitter:card" content="summary" />
          </>
        )}
      </>
    )
  },
  // Hidden for now, new design is done, but not implemented yet.
  // banner: {
  //   content: (
  //     <>
  //     📣 GraphQLConf 2025 • Sept 08-10 • Amsterdam •{" "}
  //     <NextLink
  //       href="/conf/2025"
  //       className="underline after:font-sans after:content-['_→']"
  //     >
  //       Register Today!
  //     </NextLink>
  //   </>
  // )
  //   key: "graphqlconf-2024",
  // },
  logo: graphQLLogo,
  docsRepositoryBase:
    "https://github.com/graphql/graphql.github.io/tree/source",
  color: {
    hue: 319,
    lightness: {
      light: 44.1,
      dark: 90,
    },
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  footer: {
    component: () => <Footer />,
    content: "Copyright © 2025 The GraphQL Foundation. All rights reserved.",
  },
  navbar: {
    component: Navbar,
    extraContent: (
      <ThemeSwitch lite className="max-lg:hidden [&_span]:hidden" />
    ),
  },
  toc: {
    backToTop: true,
  },
  search: {
    placeholder: "Search…",
  },
  components: { ...mdxComponents, wrapper: NextraMdxWrapper },
} satisfies DocsThemeConfig
