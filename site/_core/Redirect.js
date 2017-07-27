/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

export default ({ to }) =>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="refresh" content={'1;url=' + to} />
      <script dangerouslySetInnerHTML={{__html: `
        window.location.href = "${to}"
      `}} />
      <title>GraphQL 页面重定向</title>
    </head>
    <body>
      如果您的页面没有自动跳转，<a href={to}>请点击这里</a>.
    </body>
  </html>
