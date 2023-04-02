import React from "react"
import Seo from "../../components/Seo"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <h1>FAQ</h1>
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return <Seo title="GraphQLConf 2023 FAQ Frequently Asked Questions" />
}
