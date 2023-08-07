import React from "react"
import Footer from "../Footer"
import Header from "../Header"

import "../../assets/css/style.less"
import "../../assets/css/global.css"
import BackToTop from "../BackToTop"
interface Props {
  children: React.ReactNode
  className?: string
  pageContext?: { sourcePath?: string }
  showConfBanner?: boolean
}
const IndexLayout = ({
  children,
  className,
  pageContext: { sourcePath } = {},
  showConfBanner = true,
}: Props): JSX.Element => (
  <>
    <div className={className}>
      {showConfBanner && (
        <div
          className="flex items-center justify-center gap-6 p-6 h-full"
          style={{ backgroundColor: "#4F224C" }}
        >
          <div className="text-center md:text-right text-white">
            <a
              href="https://graphql.org/conf/#attend"
              className="rounded-md border-2 px-3 py-2 font-normal text-white underline-offset-2"
            >
              📣 GraphQL Conf 2023 • Sept 19-21 • San Francisco •{" "}
              <span className="underline underline-offset-2">
                Register Now!
              </span>
            </a>
          </div>
        </div>
      )}
      <Header />
      {children}
      <Footer sourcePath={sourcePath} />
    </div>
    <BackToTop scrollThreshold={1000} />
  </>
)

export default IndexLayout
