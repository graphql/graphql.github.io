/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

const links = [
  { section: 'learn', text: 'Learn', href: '/learn/' },
  { section: 'code', text: 'Code', href: '/code/' },
  { section: 'community', text: 'Community', href: '/community/' },
  { section: 'blog', text: 'Blog', href: '/blog/' },
  { section: 'spec', text: 'Spec', href: 'http://facebook.github.io/graphql/' },
];

var HeaderLinks = React.createClass({
  render: function() {
    return <nav>
      {links.map(link =>
        <a
          key={link.section}
          href={link.href}
          target={link.href.slice(0, 4) === 'http' ? '_blank' : null}
          className={link.section === this.props.section ? 'active' : null}>
          {link.text}
        </a>
      )}
    </nav>;
  }
});

module.exports = HeaderLinks;
