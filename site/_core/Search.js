/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

var Search = React.createClass({
  render: function() {
    return <div className="algolia-search-wrapper">
      <input id="algolia-doc-search" type="text" placeholder="Search docs..." />
      <script type="text/javascript" src="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js"></script>
      <script dangerouslySetInnerHTML={{__html: `
        docsearch({
          apiKey: 'd103541f3e6041148aade2e746ed4d61',
          indexName: 'graphql',
          inputSelector: '#algolia-doc-search'
        });
      `}} />
    </div>;
  }
});

module.exports = Search;
