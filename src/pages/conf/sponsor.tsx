import React from "react"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"
import SeoConf from "../../components/Conf/Seo"

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="text-gray-600 body-font bg-color-[#562556] bg-[url('/img/conf/graphql-conf-bg.png')] bg-cover">
        <div className="container mx-auto flex px-4 py-16 items-center justify-center flex-col">
          <div className="flex flex-col items-center w-full">
            <div className="sm:text-3xl text-2xl mb-8 text-white text-center leading-relaxed">
              <span className="block text-46xl lg:inline">
                Sponsor GraphQLConf
              </span>
            </div>
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <ButtonConf
                text="Explore Sponsorship"
                target="_blank"
                href="https://events.linuxfoundation.org/wp-content/uploads/2023/03/sponsor_GraphQLConf_2023_032423.pdf"
              />
              <ButtonConf
                text="Request a Contract"
                target="_blank"
                href="https://na3.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=ba1e05a3-244d-4c94-9b3a-fd769966e479&env=na3&acct=f30e10ec-fea1-4dd8-a262-384a61edabb5&v=2 "
              />
            </div>
          </div>
          <div className="mx-auto max-w-prose mt-8">
            <div className="text-black h-full bg-gray-100 bg-opacity-75 p-8 rounded-lg overflow-hidden relative">
              <p>
                Contact us at{" "}
                <a href="graphqlconf@graphql.org">graphqlconf@graphql.org</a> to
                reserve your sponsorship, ask questions or talk about different
                options.
              </p>
              <p>
                GraphQLConf is the official GraphQL conference presented by the
                GraphQL Foundation. It is a premier event by the community for
                the community uniting the global GraphQL community to promote
                education, adoption, and advancement of GraphQL.
              </p>
              <p>
                Help make this event one to remember by{" "}
                <a
                  target="_blank"
                  href="https://events.linuxfoundation.org/wp-content/uploads/2023/03/sponsor_GraphQLConf_2023_032423.pdf"
                >
                  becoming a sponsor
                </a>
                .
              </p>
              <p>
                GraphQLConf will attract members of the GraphQL community from
                around the world. Developers, users, architects, and technology
                leaders from multiple industries will gather in San Francisco to
                meet, collaborate and build. GraphQLConf 2023 represents the
                flagship event in the GraphQL Foundation’s official conference
                series for GraphQL.
              </p>
              <p>
                Investing in GraphQLConf provides the opportunity to build
                awareness and loyalty with leaders and decision makers in
                organizations across the GraphQL and open source community.
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
    <SeoConf title="Sponsor GraphQLConf 2023 - hosted by the GraphQL Foundation" />
  )
}
