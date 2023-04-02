import React from "react"
import Seo from "../../components/Seo"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <h1>Sponsor GraphQLConf 2023</h1>
      <ButtonConf text="SPONSORSHIP PROSPECTUS" href="https://events.linuxfoundation.org/sponsor-graphqlconf-23" />
      <ButtonConf text="REQUEST A CONTRACT" href="https://na3.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=ba1e05a3-244d-4c94-9b3a-fd769966e479&env=na3&acct=f30e10ec-fea1-4dd8-a262-384a61edabb5&v=2" />
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return <Seo title="Sponsor GraphQLConf 2023 - hosted by the GraphQL Foundation" />
}
