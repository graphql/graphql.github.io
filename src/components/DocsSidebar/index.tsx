import React from "react"
import { Link } from "gatsby"
import { toSlug } from "../../utils/slug"

const SidebarForCategory = ({ category }: any) => {
  const listItems = category.links.map((page: any) => {
    return (
      <li key={page.frontmatter.permalink}>
        <Link
          style={{ marginLeft: page.indent ? 20 : 0 }}
          className="active"
          to={page.frontmatter.permalink}
        >
          {page.frontmatter.sidebarTitle || page.frontmatter.title}
        </Link>
        {page.frontmatter.sublinks && (
          <ul>
            {page.frontmatter.sublinks.split(",").map((sublink: any) => (
              <li key={sublink}>
                <Link to={page.frontmatter.permalink + "#" + toSlug(sublink)}>
                  {sublink}
                </Link>
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
      {sideBarData.map((category: any) => (
        <SidebarForCategory category={category} key={category.name} />
      ))}
    </div>
  )
}

export default SideBar
