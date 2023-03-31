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
      <div className="text-gray-600 body-font bg-[url('/img/bg-graphql-conf.png')]">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="flex flex-col items-center lg:w-2/3 w-full">
            <img src="/img/graphql-conf-logo.svg" className="w-[500px] mb-4" />
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-extrabold text-white">
              SEPTEMBER 19-21, 2023
            </h1>
            <h2 className="sm:text-2xl text-xl mb-8 text-white leading-relaxed">
              SAN FRANCISCO BAY AREA, CA
            </h2>
            <p className="mb-8 leading-relaxed text-white">#GRAPHQLCONF</p>
            <div className="flex justify-center gap-4">
              <ButtonConf text="JOIN AS A SPONSOR" href="/" />
              <ButtonConf text="SUBMIT TO SPEAK" href="/" />
            </div>
          </div>
        </div>
      </div>
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return <Seo title="GraphQL Conf 2023" />
}
