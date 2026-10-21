import { DocsThemeConfig, useConfig } from "nextra-theme-docs"
import { useRouter } from "next/router"

import { Navbar } from "@/components/navbar/navbar"
import { mdxComponents } from "@/_design-system/mdx-components"
import { GraphQLWordmarkLogo } from "@/icons"
import { Footer } from "@/components/footer"
import { NextraMdxWrapper } from "@/components/nextra-mdx-wrapper"
import { getSocialImage, SITE_DESCRIPTION, SITE_URL } from "@/social-metadata"

const graphQLLogo = (
  <GraphQLWordmarkLogo className="nextra-logo h-6" title="GraphQL" />
)

export default {
  backgroundColor: {
    light: "251,251,249",
    dark: "15,15,12",
  },
  head: function useHead() {
    const { frontMatter, title: pageTitle } = useConfig()
    const { asPath, pathname } = useRouter()

    const title = `${pageTitle}${asPath === "/" ? "" : " | GraphQL"}`
    const { description = SITE_DESCRIPTION, canonical, image } = frontMatter
    const pageUrl = new URL(asPath.split(/[?#]/)[0], SITE_URL).href
    const socialImage = getSocialImage({
      path: new URL(pageUrl).pathname,
      title: frontMatter.title || pageTitle,
      description: frontMatter.description,
      byline:
        typeof frontMatter.byline === "string" ? frontMatter.byline : undefined,
      date: typeof frontMatter.date === "string" ? frontMatter.date : undefined,
    })
    const imageUrl = new URL(image || socialImage.url, SITE_URL).href
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

        <meta property="og:url" content={canonical || pageUrl} />
        <meta property="og:site_name" content="GraphQL" />
        <meta
          property="og:type"
          content={pathname.startsWith("/blog/") ? "article" : "website"}
        />
        <meta property="og:image" content={imageUrl} />
        {!image && (
          <>
            <meta property="og:image:type" content={socialImage.type} />
            <meta
              property="og:image:width"
              content={String(socialImage.width)}
            />
            <meta
              property="og:image:height"
              content={String(socialImage.height)}
            />
            <meta property="og:image:alt" content={socialImage.alt} />
          </>
        )}
        <meta name="twitter:site" content="@graphql" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        <meta name="twitter:image" content={imageUrl} />
        {!image && <meta name="twitter:image:alt" content={socialImage.alt} />}
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
  },
  navbar: {
    component: Navbar,
  },
  toc: {
    backToTop: true,
  },
  search: {
    placeholder: "Search…",
  },
  components: { ...mdxComponents, wrapper: NextraMdxWrapper },
} satisfies DocsThemeConfig
