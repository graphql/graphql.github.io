import React from "react"
import { Link } from "gatsby"
import DocsSidebar from "../DocsSidebar"
import Marked from '../Marked'

interface Props {
  title: string
  heroText: string
  nextDoc: any
  permalink: string
  sideBarData: any
  rawMarkdownBody: string
  pageContext: any
}

const Index = ({ title, heroText, nextDoc, sideBarData, rawMarkdownBody, pageContext }: Props) => {
  return (
    <section>
      <div className="foundation conf">
        <div className="foundation-hero">
          <div className="foundation-hero-inner-content">
              <img src="/img/conf/graphql-conf-logo.svg" alt="GraphQLConf logo" />
              <div>{heroText}</div>
          </div>
        </div>
        <div className="documentationContent">
          <div className="inner-content">
            <h1>{title}</h1>
            <Marked pageContext={pageContext}>{rawMarkdownBody}</Marked>
            {nextDoc?.frontmatter?.permalink && (
              <Link className="read-next" to={nextDoc.frontmatter.permalink}>
                <span className="read-next-continue">
                  Continue Reading &rarr;
                </span>
                <span className="read-next-title">
                  {nextDoc.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
          <DocsSidebar sideBarData={sideBarData} />
        </div>
      </div>
    </section>
  )
}

export default Index
