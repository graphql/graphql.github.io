import React from "react"
import Footer from "../Footer"
import Header from "../Header"
import Seo from "../Seo"

import "../../assets/css/style.less"

interface PageContext {
  sourcePath?: string
}

interface Props {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  pageContext: PageContext
}
const IndexLayout = ({
  title,
  description,
  children,
  className,
  pageContext: { sourcePath },
}: Props): JSX.Element => (
  <>
    <Seo title={title} description={description} />
    <div className={className}>
      <Header />
      {children}
      <Footer sourcePath={sourcePath} />
    </div>
  </>
)

export default IndexLayout
