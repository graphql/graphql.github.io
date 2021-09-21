import React from "react"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import BlogPost from "../components/BlogPost"
import BlogSidebar from "../components/BlogSidebar"

export default ({ pageContext, data }: PageProps<GatsbyTypes.TagsTemplateQuery, GatsbyTypes.SitePageContext>) => {
  const { tag } = pageContext
  const allPosts = data.allMarkdownRemark.edges
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

  const taggedPosts = allPosts.filter((post: any) =>
    post.frontmatter.tags.includes(tag)
  )

  return (
    <Layout title={`Blog: ${tag} | GraphQL`} pageContext={pageContext}>
      <section>
        <div className="documentationContent">
          <div>
            {taggedPosts.map(
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
          <BlogSidebar posts={allPosts} currentPermalink={tag} />
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query TagsTemplate {
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
