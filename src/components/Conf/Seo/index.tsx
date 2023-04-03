import React from "react"

interface Props {
  title?: string
  description?: string
}

const SeoConf = ({ title, description }: Props): JSX.Element => {
  return (
    <>
      <title>
        {title ?? "GraphQL Conf 2023  | hosted by GraphQL Foundation "}
      </title>
      <meta name="description" content={description} />
      <meta property="og:image" content="/img/conf/og-image.png" />
      <meta property="twitter:site" content="@graphql" />
      <meta name="viewport" content="width=640" />
    </>
  )
}

export default SeoConf
