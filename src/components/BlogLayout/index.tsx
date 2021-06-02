import React from "react"
import BlogSidebar from "../BlogSidebar"
import BlogPost from "../BlogPost"

interface Props {
  title: string
  date: string
  permalink: string
  byline: string
  guestBio: string
  rawMarkdownBody: string
  sideBarData: any
  pageContext: any
  tags: Array<string>
}

const index = ({
  title,
  date,
  permalink,
  byline,
  guestBio,
  rawMarkdownBody,
  sideBarData,
  pageContext,
  tags,
}: Props) => {
  return (
    <section>
      <div className="documentationContent">
        <BlogPost
          title={title}
          date={date}
          permalink={permalink}
          byline={byline}
          guestBio={guestBio}
          rawMarkdownBody={rawMarkdownBody}
          isPermalink={true}
          pageContext={pageContext}
          tags={tags}
        />
        <BlogSidebar
          posts={sideBarData[0].links.sort((a: any, b: any) => {
            const aDate = new Date(a.frontmatter.date)
            const bDate = new Date(b.frontmatter.date)
            if (aDate > bDate) {
              return -1
            } else if (aDate < bDate) {
              return 1
            }
            return 0
          })}
          currentPermalink={permalink}
        />
      </div>
    </section>
  )
}

export default index
