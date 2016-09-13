/**
 * Copyright (c) 2016, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var path = require('path');
var React = require('react');
var Site = require('./Site');
var Marked = require('./Marked');
var DocsSidebar = require('./DocsSidebar');

var CodeLayout = React.createClass({
  render: function() {
    var page = this.props.page;
    var site = this.props.site;
    var firstURL = '/graphql-js/';
    var category = page.category;
    if (!category.match(/GraphQL/)) {
      category = 'GraphQL.js ' + category;
    }
    return (
      <Site section="docs" title={page.title}>
        <section className="content documentationContent">
          <DocsSidebar site={site} page={page} firstURL={firstURL}/>
          <div className="inner-content">
            <h1>{page.title}</h1>
            <Marked>{page.content}</Marked>
            <div className="docs-prevnext">
              {page.previous && <a className="docs-prev" href={path.resolve(page.url, page.previous)}>&larr; Prev</a>}
              {page.next && <a className="docs-next" href={path.resolve(page.url, page.next)}>Next &rarr;</a>}
            </div>
          </div>
        </section>
      </Site>
    );
  }
});

module.exports = CodeLayout;
