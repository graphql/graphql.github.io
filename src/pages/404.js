import React from 'react'

import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout title="404: Not found">
    <div style={{ marginLeft: '7rem', marginBottom: '16rem' }}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
)

export default NotFoundPage
