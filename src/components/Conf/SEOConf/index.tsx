import React, { ReactNode } from "react"

export default function SEOConf(props: {
  includeSchema?: boolean
  title?: string
  twitterTitle?: string
  description?: string
  children?: ReactNode
}) {
  const title = props.title ?? "GraphQLConf 2023 — Sept 19-21 • SF Bay Area"
  const twitterTitle =
    props.twitterTitle ??
    props.title ??
    "#GraphQLConf 2023 — Sept 19-21 • SF Bay Area"
  const description =
    props.description ??
    "The official GraphQL conference hosted by the GraphQL Foundation."
  const url = "https://graphql.org/conf/"
  const image = "http://graphql.org/img/conf/social.jpg"

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {props.includeSchema && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Event",
            name: "GraphQLConf 2023",
            url,
            description,
            image,
            potentialAction: {
              "@type": "Action",
              name: "Register Now!",
              url: "https://graphql.org/conf/#register",
            },
            about: {
              "@type": "Thing",
              name: "GraphQL",
              url: "https://graphql.org",
            },
            startDate: "2023-09-19",
            endDate: "2023-09-21",
            location: {
              "@type": "Place",
              name: "Hyatt Regency SFO • SF Bay Area",
              longitude: -122.36515,
              latitude: 37.59403,
              address: "1333 Old Bayshore Hwy, Burlingame, CA 94010",
            },
            organizer: {
              "@type": "Organizer",
              name: "GraphQL Foundation",
              url: "https://graphql.org/foundation/",
            },
            datePublished: "2023-04-03",
          })}
        </script>
      )}
      <meta property="og:type" content="event" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:site" content="@graphql" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {props.children}
      <body className="bg-[#862e69]" />
    </>
  )
}
