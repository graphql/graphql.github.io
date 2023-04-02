import React from "react"
import Seo from "../../components/Seo"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"
import SpeakersConf from "../../components/Conf/Speakers"

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="text-gray-600 body-font bg-color-[#562556] bg-[url('/img/conf/graphql-conf-bg.png')] bg-cover">
        <div className="container mx-auto flex px-4 py-16 items-center justify-center flex-col">
          <div className="flex flex-col items-center w-full">
            <img src="/img/conf/graphql-conf-logo.svg" className="w-[500px]" />
            <div className="sm:text-3xl text-2xl mb-8 text-white text-center italic leading-relaxed">
              <span className="block lg:inline">SEPTEMBER 19-21, 2023</span>
              <span className="hidden lg:inline"> • </span>
              <span>SAN FRANCISCO BAY AREA, CA</span>
            </div>
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <ButtonConf text="Join as a Sponsor" href="/sponsor" />
              <ButtonConf text="Submit to Speak" href="/speak" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto">
          <p>
            The official GraphQL conference, presented by the GraphQL
            Foundation.
          </p>
          <p>
            GraphQLConf is a premier event uniting the global GraphQL community
            to promote education, adoption, and advancement of GraphQL.
            Workshops, presentations, and discussions covering everything from
            best practices, innovative use cases, and the latest advancements in
            GraphQL.
          </p>
        </div>
      </div>
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return <Seo title="GraphQLConf 2023 - hosted by the GraphQL Foundation" />
}
