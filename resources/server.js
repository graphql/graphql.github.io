/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var path = require('path');
var express = require('express');
var watch = require('./watch');

var pwd = process.env.PWD;
var buildDir = process.env.npm_package_site_build || './_build';

var FILE_SERVE_ROOT = path.resolve(pwd, buildDir);

var app = express().use(express.static(FILE_SERVE_ROOT))
app.listen(8444, () => {
  watch().then(() => {
    console.log('Open http://localhost:8444/');
  }).catch(error => console.error(error.stack || error));
});
