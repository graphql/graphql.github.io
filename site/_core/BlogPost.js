/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Marked = require('./Marked');

var BlogPost = React.createClass({
  render: function() {
    var post = this.props.post;
    var isPermalink = this.props.isPermalink;
    return (
      <div className="inner-content">
        <h1>{isPermalink ? post.title : <a href={post.url}>{post.title}</a>}</h1>
        <p>{new Date(post.date).toLocaleDateString()} by {post.byline}</p>
        {post.guestBio ? <hr /> : null}
        {post.guestBio && <p className="guestBio">{
          `This guest article contributed by ${post.byline}, ${post.guestBio}.`
        }</p>}
        <Marked>{post.content}</Marked>
      </div>
    );
  }
});

module.exports = BlogPost;
