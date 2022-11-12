import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  title?: string
  description?: string
}

const Seo = ({ title, description }: Props): JSX.Element => {
  const data = useStaticQuery<GatsbyTypes.SeoQueryQuery>(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const metadata = data.site.siteMetadata

  return (
    <Helmet>
      <title>{title ?? metadata.title}</title>
      <meta name="description" content={description ?? metadata.description} />
      <meta property="og:image" content="/img/og-image.png" />
      <meta property="twitter:site" content="@graphql" />
      <meta name="viewport" content="width=640" />
    </Helmet>
  )
}

export default Seo
