import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { Helmet } from 'react-helmet'

import { useSiteMetadata } from '../hooks'

const SEO = ( { description, lang, meta, title } ) => {
  const site = useSiteMetadata()

  const metaDescription = description || site.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ].concat( meta )}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
}

SEO.propTypes = {
  description: string,
  lang: string,
  meta: arrayOf( shape( {} ) ),
  title: string.isRequired,
}

export default SEO
