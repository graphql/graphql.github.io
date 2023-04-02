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
      <div className="text-gray-600 body-font bg-color-[#562556] bg-[url('/img/conf/graphql-conf-bg.png')] bg-cover">
        <div className="container mx-auto flex px-4 py-16 items-center justify-center flex-col">
          <div className="flex flex-col items-center w-full">
            <div className="sm:text-3xl text-2xl mb-8 text-white text-center leading-relaxed">
              <span className="block text-6xl lg:inline">Sponsor</span>
            </div>
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <ButtonConf
                text={
                  <>
                    Explore GraphQLConf <br /> sponsorship opportunities
                  </>
                }
                target="_blank"
                href="https://events.linuxfoundation.org/wp-content/uploads/2023/03/sponsor_GraphQLConf_2023_032423.pdf"
              />
              <ButtonConf
                text="Contact us"
                href="mailto:graphqlconf@graphql.org"
              />
              <ButtonConf
                text="Request A Contract"
                href="https://na3.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=ba1e05a3-244d-4c94-9b3a-fd769966e479&env=na3&acct=f30e10ec-fea1-4dd8-a262-384a61edabb5&v=2 "
              />
            </div>
          </div>
          <div className="w-full lg:w-full mt-5 sm:w-full">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative">
              <p>
                Email us at
                <a href="graphqlconf@graphql.org">
                  {" "}
                  graphqlconf@graphql.org
                </a>{" "}
                to reserve your sponsorship, ask questions or talk about
                different options.
              </p>
              <p>
                The inaugural GraphQLConf, presented by the GraphQL Foundation,
                is a premier event uniting the global GraphQL community to
                promote education, adoption, and advancement of GraphQL. This
                conference offers valuable insights through workshops,
                presentations, and panel discussions, covering best practices,
                innovative use cases, and the latest advancements in GraphQL. By
                bringing together a diverse group of developers, architects, and
                technology enthusiasts, GraphQLConf sets the stage for the
                ongoing success and expansion of GraphQL and its ecosystem
                across industries.
              </p>
              <p>
                GraphQLConf will attract members of the GraphQL community from
                around the world. Developers, users, architects, and technology
                leaders from multiple industries will gather in San Francisco to
                meet, collaborate and build. GraphQLConf 2023 represents the
                inaugural event in the GraphQL Foundation’s official conference
                series for GraphQL. Investing in GraphQLConf’s first conference
                provides the opportunity to build brand awareness and loyalty
                with leaders and decision makers in organizations across the
                GraphQL community.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return (
    <Seo title="Sponsor GraphQLConf 2023 - hosted by the GraphQL Foundation" />
  )
}
