/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

export function toSlug(string) {
  // var accents = "àáäâèéëêìíïîòóöôùúüûñç";
  var accents = "\u00e0\u00e1\u00e4\u00e2\u00e8" +
    "\u00e9\u00eb\u00ea\u00ec\u00ed\u00ef" +
    "\u00ee\u00f2\u00f3\u00f6\u00f4\u00f9" +
    "\u00fa\u00fc\u00fb\u00f1\u00e7";

  var without = "aaaaeeeeiiiioooouuuunc";

  return String(string)

    // Handle uppercase characters
    .toLowerCase()

    // Handle accentuated characters
    .replace(
      new RegExp('[' + accents + ']', 'g'),
      function (c) { return without.charAt(accents.indexOf(c)); })

    // Dash special characters
    .replace(/[^a-z0-9]/g, '-')

    // Compress multiple dash
    .replace(/-+/g, '-')

    // Trim dashes
    .replace(/^-|-$/g, '');
}

export default (props) => {
  var slug = toSlug(props.toSlug || props.children);
  var Heading = 'h' + props.level;
  var url = props.url || '';

  return (
    <Heading {...props}>
      <a className="anchor" name={slug}></a>
      {props.children}
      {' '}<a className="hash-link" href={url + '#' + slug}>#</a>
    </Heading>
  );
}
