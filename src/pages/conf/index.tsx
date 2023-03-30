import React from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"

export default () => {
  return (
    <>
      <HeaderConf />
      <div className="conf-hero">
        <div className="conf-hero-inner">
          <h1>GraphQLConf</h1>
          <p>SEPTEMBER 19-21, 2023</p>
          <p>SAN FRANCISCO BAY AREA, CA</p>
          <p>#GRAPHQLCONF</p>
        </div>
      </div>
      <FooterConf />
    </>
  )
}

export function Head() {
  return <Seo title="GraphQL Conf 2023" />
}
