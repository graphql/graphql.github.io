import React from "react"
import Layout from "../components/Layout"
import BlogPost from "../components/BlogPost"
import BlogSidebar from "../components/BlogSidebar"
import { graphql } from "gatsby"
import type { PageProps } from "gatsby";

export default ({ pageContext, data }: PageProps<GatsbyTypes.GetAllBlogPostsQuery, GatsbyTypes.SitePageContext>) => {
  const posts = data.allMarkdownRemark.edges
    .map(e => e.node)
    .sort((a, b) => {
      const aDate = new Date(a?.frontmatter?.date ?? 0)
      const bDate = new Date(b?.frontmatter?.date ?? 0)
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
                  frontmatter: {
                    title,
                    date,
                    permalink,
                    byline,
                    guestBio,
                    tags,
                  },
                  rawMarkdownBody,
                  excerpt,
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
                  excerpt={excerpt}
                  showExcerpt
                  tags={tags}
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
  query GetAllBlogPosts {
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
            tags
          }
          id
          excerpt
          rawMarkdownBody
        }
      }
    }
  }
`
