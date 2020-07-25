import React from 'react'
import { Link } from 'gatsby'
import { uniq } from 'lodash'
import { arrayOf } from 'prop-types'

import { toSlug } from '../../lib/utils'

const SidebarForCategory = ( { data, category } ) => {
  const listItems = data.map( ( { node: {
    id,
    frontmatter: { title, sidebarTitle, sublinks, category: pageCategory, permalink },
  } } ) => {
    if ( category !== pageCategory ) return null

    return (
      <div key={id}>

        <li>
          <Link to={permalink} className="active">
            {sidebarTitle || title}
          </Link>
        </li>

        <ul>
          {sublinks && (
          <ul>
            {sublinks
              .split( ',' )
              .map( sublink => (
                <ul key={sublink}>
                  <Link to={`${permalink}#${toSlug( sublink )}`}>
                    {sublink}
                  </Link>
                </ul>
              ) )}
          </ul>
          )}
        </ul>

      </div>
    )
  } )

  return listItems
}

const Sidebar = ( { data } ) => {
  const categories = []
  data.map( ( { node: { frontmatter: { category } } } ) => categories.push( category ) )

  return (
    <div className="nav-docs">

      {uniq( categories )
        .reverse()
        .map( categoryName => (

          <div key={categoryName}>

            <h3>{categoryName}</h3>

            <ul>
              <SidebarForCategory
                data={data}
                category={categoryName}
              />
            </ul>

          </div>

        ) )}

    </div>
  )
}

Sidebar.propTypes = {
  data: arrayOf( {} ).isRequired,
}

export default Sidebar
