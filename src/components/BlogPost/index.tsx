import React from "react"

interface Props {
  html: string
  title: string
}

const BlogPost = ({ html }: any) => {
  return (
    <div className="inner-content">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default BlogPost
