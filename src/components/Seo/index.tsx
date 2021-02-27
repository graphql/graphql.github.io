import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  title?: string
  description?: string
}

const Seo = ({ title, description }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <Helmet
      title={title ? title : data.site.siteMetadata.title}
      meta={[
        {
          name: "description",
          content: description
            ? description
            : data.site.siteMetadata.description,
        },
      ]}
    >
      <meta name="viewport" content="width=640" />
    </Helmet>
  )
}

export default Seo
