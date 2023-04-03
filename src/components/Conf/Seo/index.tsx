import React from "react"

export const defaults = {
  title: "GraphQLConf 2023 — Sept 19-21 • SF Bay Area",
  twitterTitle: "#GraphQLConf 2023 — Sept 19-21 • SF Bay Area",
  description:
    "The official GraphQL conference hosted by the GraphQL Foundation.",
  url: "https://graphql.org/conf/",
  image: "http://graphql.org/img/conf/social.jpg",
}

export default function SeoConf(props: {
  title?: string
  twitterTitle?: string
  description?: string
}) {
  const title = props.title ?? defaults.title
  const twitterTitle =
    props.twitterTitle ?? props.title ?? defaults.twitterTitle
  const description = props.description ?? defaults.description
  const image = defaults.image

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="event" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:site" content="@graphql" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <body className="bg-[#862e69]" />
    </>
  )
}
