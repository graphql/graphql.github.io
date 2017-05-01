/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var path = require('path');
var Site = require('./Site');

module.exports = build;

process.on('unhandledRejection', (error, promise) => {
  console.error('Unhandled Promise Rejection:');
  console.error(error && error.stack || error);
  console.error(promise);
});

var pwd = process.env.PWD;
var sourceDir = process.env.npm_package_site_source || './';
var buildDir = process.env.npm_package_site_build || './_build';

var SITE_ROOT = path.resolve(pwd, sourceDir);
var BUILD_ROOT = path.resolve(pwd, buildDir);

async function build(filter) {
  console.log('building...');
  var site = await Site.readSite(SITE_ROOT);
  await Site.buildSite(BUILD_ROOT, site, filter);
  console.log('built');
}

if (require.main === module) {
  build().catch(error => {
    console.error(error.stack || error)
    process.exit(1);
  });
}
