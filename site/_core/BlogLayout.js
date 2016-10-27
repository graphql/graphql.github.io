/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('./Site');
var BlogSidebar = require('./BlogSidebar');
var BlogPost = require('./BlogPost');

module.exports = ({ page, site }) =>
  <Site section="blog" title={page.title} page={page}>
    <section>
      <div className="documentationContent">
        <BlogPost post={page} isPermalink={true} />
        <BlogSidebar site={site} page={page} />
      </div>
    </section>
  </Site>
