import React from "react"
import { Link } from "gatsby"
import { toSlug } from "../../utils/slug"
import { AnchorLink } from "gatsby-plugin-anchor-links"

const SidebarForCategory = ({ category }: any) => {
  const listItems = category.links.map((page: any, i: number) => {
    return (
      <li key={i}>
        <Link
          style={{ marginLeft: page.indent ? 20 : 0 }}
          className="active"
          to={page.frontmatter.permalink}
        >
          {page.frontmatter.sidebarTitle || page.frontmatter.title}
        </Link>
        {page.frontmatter.sublinks && (
          <ul>
            {page.frontmatter.sublinks.split(",").map((sublink: any, i: number) => (
              <li key={i}>
                <AnchorLink
                  title={sublink}
                  to={page.frontmatter.permalink + "#" + toSlug(sublink)}
                >
                  {sublink}
                </AnchorLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  })

  return (
    <div>
      <h3>{category.name}</h3>
      <ul>{listItems}</ul>
    </div>
  )
}

const SideBar = ({ sideBarData }: any) => {
  return (
    <div className="nav-docs">
      <div className="sticky-container">
      {sideBarData.map((category: any) => (
        <SidebarForCategory category={category} key={category.name} />
      ))}
      </div>
    </div>
  )
}

export default SideBar
