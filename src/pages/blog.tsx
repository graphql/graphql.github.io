import React from "react"
import Layout from "../components/Layout"
import BlogPost from "../components/BlogPost"
import BlogSidebar from "../components/BlogSidebar"
import { graphql } from "gatsby"

export default ({ pageContext, data }: any) => {
  const posts = data.allMarkdownRemark.edges
    .map((e: any) => e.node)
    .sort((a: any, b: any) => {
      const aDate = new Date(a.frontmatter.date)
      const bDate = new Date(b.frontmatter.date)
      if (aDate > bDate) {
        return -1
      } else if (aDate < bDate) {
        return 1
      }
      return 0
    })
  return (
    <Layout title="Blog | GraphQL" pageContext={pageContext}>
      <section>
        <div className="documentationContent">
          <div>
            {posts.map(
              (
                {
                  frontmatter: { title, date, permalink, byline, guestBio },
                  rawMarkdownBody,
                }: any,
                i
              ) => (
                <BlogPost
                  key={i}
                  title={title}
                  date={date}
                  permalink={permalink}
                  byline={byline}
                  guestBio={guestBio}
                  rawMarkdownBody={rawMarkdownBody}
                  isPermalink={false}
                  pageContext={pageContext}
                />
              )
            )}
          </div>
          <BlogSidebar posts={posts} />
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query getAllBlogPosts {
    allMarkdownRemark(
      filter: { frontmatter: { permalink: { regex: "/blog/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            permalink
            byline
            guestBio
            sublinks
            layout
          }
          id
          rawMarkdownBody
        }
      }
    }
  }
`
