import React from "react"
import type { PageProps } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

export default ({ pageContext }: PageProps<{}, { sourcePath: string }>) => {
  return (
    <Layout pageContext={pageContext} className="brand">
      Conf info here
    </Layout>
  )
}

export function Head() {
  return <Seo title="GraphQLConf" />
}
