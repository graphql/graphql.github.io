/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

export default ({ to }) =>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="refresh" content={'1;url=' + to} />
      <script dangerouslySetInnerHTML={{__html: `
        window.location.href = "${to}"
      `}} />
      <title>GraphQL Page Redirection</title>
    </head>
    <body>
      If you are not redirected automatically, <a href={to}>follow this link</a>.
    </body>
  </html>
