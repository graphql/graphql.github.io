import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Marked from "../../components/Marked"
Marked
interface Props {
  page: string
}
const PageMarkdown = ({ page }: Props): JSX.Element => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              page
            }
            rawMarkdownBody
          }
        }
      }
    }
  `)

  const requiredPageMd = edges.filter(
    (markdown: any) => markdown.node.frontmatter.page === page
  )[0]

  return <Marked>{requiredPageMd.node.rawMarkdownBody}</Marked>
}
export default PageMarkdown
