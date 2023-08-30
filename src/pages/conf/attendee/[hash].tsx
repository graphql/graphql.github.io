import React from "react"
import LayoutConf from "../../../components/Conf/Layout"
import HeaderConf from "../../../components/Conf/Header"
// import ButtonConf from "../../components/Conf/Button"
import clsx from "clsx"
import { PageProps } from "gatsby"
import SeoConf from "../../../components/Conf/Seo"
import { Helmet } from "react-helmet"

export async function getServerData({ params }: PageProps) {
  const search = getSeachParams(params.hash)
  const ogImageUrl = `https://og-image.the-guild.dev/conf${search}`
  return {
    props: { ogImage: ogImageUrl },
  }
}

export default ({ location, serverData }: PageProps) => {
  const ogImage = (serverData as any).ogImage || ""
  // const text = "Nice! I got my @GraphQLConf ticket! Get yours too!"
  return (
    <>
      <Helmet>
        <SeoConf
          title="My ticket"
          ogImage={{
            url: ogImage,
            width: 1200,
            height: 630,
          }}
        />

        <meta
          property="og:url"
          content={`https://graphql.org${location.pathname}`}
        />
      </Helmet>

      <LayoutConf>
        <HeaderConf />
        <div className="bg-white h-screen">
          <div className="prose lg:prose-lg mx-auto py-10 max-sm:px-4">
            <h1>Your ticket for GraphQLConf</h1>
            <section className="px-0 my-8">
              <div className="flex gap-4 flex-row flex-wrap">
                {/*<ButtonConf*/}
                {/*  href={`https://twitter.com/intent/tweet?url=${href}&text=${text}`}*/}
                {/*>*/}
                {/*  Share on X / Twitter*/}
                {/*</ButtonConf>*/}
                <button
                  className={clsx(
                    "cursor-pointer transition ease-in-out no-underline inline-flex text-center w-[fit-content] border-0 py-2 px-6 focus:outline-none hover:drop-shadow-md hover:[transform:scale(1.05)] rounded text-sm sm:text-base whitespace-nowrap",
                    "bg-[--rhodamine] text-white font-medium"
                  )}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(location.href)
                      console.log("Content copied to clipboard")
                    } catch (err) {
                      console.error("Failed to copy:", err)
                    }
                  }}
                >
                  Share URL
                </button>
              </div>
            </section>
          </div>
          {ogImage && <img src={ogImage} className="block mx-auto" />}
        </div>
      </LayoutConf>
    </>
  )
}

function getSeachParams(base64: string): string {
  let string: string
  try {
    string = atob(base64)
  } catch (error) {
    console.log(error)
    return ""
  }

  let list: string[] = []

  try {
    list = JSON.parse(string)
  } catch (error) {
    console.log(error)
    return ""
  }

  const [fullName, jobTitle, company, github] = list
  const searchParams = new URLSearchParams({
    ...(fullName && { fullName }),
    ...(jobTitle && { jobTitle }),
    ...(company && { company }),
    ...(github && { github }),
  })
  return "?" + searchParams.toString()
}
