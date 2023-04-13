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
}
const IndexLayout = ({
  children,
  className,
  pageContext: { sourcePath } = {},
}: Props): JSX.Element => (
  <>
    <div className={className}>
      <Header />
      {children}
      <Footer sourcePath={sourcePath} />
    </div>
    <BackToTop scrollThreshold={1000} />
  </>
)

export default IndexLayout
