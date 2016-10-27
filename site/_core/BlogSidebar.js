/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var path = require('path');
var React = require('react');

module.exports = ({ site, page }) =>
  <div className="nav-docs">
    <div className="nav-docs-section">
      <h3>Subscribe</h3>
      <a rel="home" type="application/rss+xml" href="/blog/rss.xml">RSS</a>
    </div>
    <div className="nav-docs-section">
      <h3>Recent Posts</h3>
      <ul>
        {site.files.blog
          .filter(file => !file.draft && path.extname(file.relPath) === '.md')
          .sort((a, b) => a.date < b.date)
          .map(post =>
            <li key={post.permalink}>
              {post === page ? post.title : <a href={post.url}>{post.title}</a>}
            </li>
        )}
      </ul>
    </div>
  </div>
