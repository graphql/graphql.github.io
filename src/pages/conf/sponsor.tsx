import React, { useEffect } from "react"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"
import SeoConf from "../../components/Conf/Seo"

type Button = {
  href: string
  text: string
  active?: boolean
}

const Buttons: Button[] = [
  {
    href: "https://events.linuxfoundation.org/sponsor-graphqlconf-23",
    text: "Sponsorship sales have closed",
    active: false,
  },
  {
    href: "https://powerforms.docusign.net/ba1e05a3-244d-4c94-9b3a-fd769966e479?env=na3&acct=f30e10ec-fea1-4dd8-a262-384a61edabb5&accountId=f30e10ec-fea1-4dd8-a262-384a61edabb5",
    text: "Ready To Sign",
    active: false,
  },
  {
    href: "mailto:graphqlconf@graphql.org?subject=Sponsorships",
    text: "Contact Us",
  },
]

export default () => {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.replace("/conf/")
    }, 5000)
    return () => clearTimeout(redirectTimer)
  }, [])

  return (
    <LayoutConf>
      <HeaderConf />
      <div className="text-gray-600 items-center bg-color-[#562556] bg-[url('/img/conf/graphql-conf-bg.png')] bg-cover bg-blend-multiply	bg-opacity-20	bg-black">
        <div className="container flex py-16 md:py-36 items-center justify-center flex-col">
          <div className="flex flex-col justify-center w-full gap-2 lg:gap-32 lg:flex-row">
            <div>
              <img
                src="/img/conf/graphql-conf-logo.svg"
                className="w-[300px] md:w-[500px]"
              />
            </div>
          </div>
          <div className="text-center w-full">
            <h1 className="text-white font-semibold">Oops!</h1>
            <p className="text-white font-semibold">Page not found!</p>
            <p className="text-white font-semibold">
              You will redirect to the home page
            </p>
          </div>
        </div>
      </div>
      {/* <div className="bg-color-[#562556] bg-[url('/img/conf/graphql-conf-bg.png')] bg-cover">
        <div className="container flex py-16 items-center justify-center flex-col">
          <div className="flex flex-col items-center w-full">
            <div className="sm:text-3xl text-2xl mb-8 text-white text-center leading-relaxed">
              <span className="block lg:inline">Sponsor GraphQLConf 2023</span>
            </div>
            <div className="flex justify-center items-center gap-4 flex-col sm:flex-row">
              {Buttons.map(button => (
                <ButtonConf
                  disabled={button.active === false}
                  key={button.text}
                  href={button.href}
                >
                  {button.text}
                </ButtonConf>
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-prose mt-8">
            <div className="text-black h-full bg-gray-100 bg-opacity-75 p-8 rounded-lg overflow-hidden relative">
              <p>
                Contact us at{" "}
                <a
                  className="font-medium"
                  href="mailto:graphqlconf@graphql.org"
                >
                  graphqlconf@graphql.org
                </a>{" "}
                to reserve your sponsorship, ask questions or talk about
                different options.
              </p>
              <br />
              <p>
                GraphQLConf is the official GraphQL conference hosted by the
                GraphQL Foundation. It is a premier event by the community for
                the community to promote education, adoption, and advancement of
                GraphQL.
              </p>
              <br />
              <p>Help make this event one to remember by becoming a sponsor.</p>
              <br />
              <p>
                GraphQLConf will attract members of the GraphQL community from
                around the world. Developers, users, architects, and technology
                leaders from multiple industries will gather in San Francisco to
                meet, collaborate and build. GraphQLConf 2023 is the flagship
                event in the GraphQL Foundation’s official event series.
              </p>
              <br />
              <p>
                Investing in GraphQLConf provides the opportunity to build
                awareness and loyalty with leaders and decision makers in
                organizations across the GraphQL and open source community.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return (
    <SeoConf title="Sponsor GraphQLConf 2023 - hosted by the GraphQL Foundation" />
  )
}
