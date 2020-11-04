/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var path = require('path');
var React = require('react');
var Site = require('../_core/Site');
var Marked = require('../_core/Marked');
var BlogSidebar = require('../_core/BlogSidebar');
var BlogPost = require('../_core/BlogPost');

export default ({ page, site }) =>
  <Site section="blog" title="Blog">
    <section>
      <div className="documentationContent">
        <div>
          {site.files.blog
            .filter(file => !file.draft && path.extname(file.relPath) === '.md')
            .sort((a, b) => a.date < b.date)
            .map(post =>
              <BlogPost post={post} isPermalink={false} key={post.permalink} />
          )}
        </div>
        <BlogSidebar site={site} />
      </div>
    </section>
  </Site>
