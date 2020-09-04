import React from 'react'
import { string } from 'prop-types'

import Layout from '../components/Layout'

const OutsideLink = ( { link, text } ) => <a href={link}>{text}</a>

OutsideLink.propTypes = {
  link: string.isRequired,
  text: string.isRequired,
}

const iframe = '<iframe frameBorder="0" id="landscape" scrolling="no" style="width: 1px; min-width: 100%" src="https://landscape.graphql.org/category=graph-ql-adopter&format=card-mode&grouping=category&embed=yes"></iframe>'

// eslint-disable-next-line react/no-danger
const Iframe = ( { iframe } ) => <div dangerouslySetInnerHTML={{ __html: iframe || '' }} />

Iframe.propTypes = {
  iframe,
}

Iframe.defaultProps = {
  iframe: undefined,
}

const Users = () => (
  <Layout title="Who's Using">
    <section className="whos-using-page">

      <div className="prose">

        <h1>Who&rsquo;s using GraphQL?</h1>

        <p>
          GraphQL is used by teams of all sizes in many different
          environments and languages to power mobile apps, websites, and APIs.
        </p>

        <p>
          Is your company using GraphQL? <br />
          Please send a pull request to the
          {' '}
          <OutsideLink link="https://github.com/graphql/graphql-landscape" text="GraphQL Landscape" />
          {' '}
          and follow
          {' '}
          <OutsideLink link="https://github.com/graphql/graphql-landscape#new-entries" text="instructions" />.
        </p>

        <Iframe iframe={iframe} />

      </div>

    </section>
  </Layout>
)

export default Users
