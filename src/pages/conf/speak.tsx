import React from "react"
import Seo from "../../components/Seo"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import "../../assets/css/style.less"
import "../../assets/css/global.css"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <h1>Speak at GraphQLConf 2023</h1>
      <ButtonConf text="SUBMIT TO SPEAK" href="https://sessionize.com/graphqlconf2023/" />
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return <Seo title="Speak at GraphQLConf 2023 - (CFP) Call for proposals" />
}
