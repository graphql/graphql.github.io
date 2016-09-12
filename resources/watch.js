/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var fs = require('fs');
var path = require('path');
var sane = require('sane');
var build = require('./build');

var pwd = process.env.PWD;
var sourceDir = process.env.npm_package_site_source || './';
var buildDir = process.env.npm_package_site_build || path.join(sourceDir, '_build');

var SITE_ROOT = path.resolve(pwd, sourceDir);
var BUILD_ROOT = path.resolve(pwd, buildDir);

var buildWithinSite = path.relative(SITE_ROOT, BUILD_ROOT);
if (buildWithinSite[0] === '.') {
  buildWithinSite = null;
} else if (buildWithinSite.indexOf('/') !== -1) {
  // Note: minimatch would not be able to safely ignore watching this directory
  // if nested deeply within source.
  throw new Error('Cannot watch safely. Build deeply within Source');
}

module.exports = watch;

function watch() {
  return build().then(() => {
    var globIgnore =
      'node_modules' + (buildWithinSite ? '|' + buildWithinSite : '');
    var watcher = sane(SITE_ROOT, {
      // Note: minimatch erroneously negates the entire pattern if the first
      // character is a !. This prefix should cause it to not match.
      // glob: ['?(%)!(' + globIgnore + ')/**/*', '?(%)!(' + globIgnore + ')'],
      // handle node v0.10 bug
      watchman: /^v0.10/.test(process.version)
    })
      .on('ready', startWatch)
      .on('add', changeFile)
      .on('delete', deleteFile)
      .on('change', changeFile);
  });
}

function startWatch() {
  console.log('watching...');
}

function changeFile(fileName) {
  enqueue(fileName);
}

function deleteFile(fileName) {
  enqueue(fileName);
}

const queue = [];

function enqueue(fileName) {
  queue.push(fileName);
  if (queue.length === 1) {
    rebuild();
  } else {
    console.log('queue', fileName);
  }
}

function rebuild() {
  const fileName = queue[0];
  const filter =
    /_core\//.test(fileName) ? /\.(js|md)$/ :
    /\.less$/.test(fileName) ? /\.less$/ :
    fileName ? SITE_ROOT + '/' + fileName :
    null;
  clearCache(fileName);
  return build(filter).then(
    () => {
      queue.shift();
      if (queue.length) {
        return rebuild();
      }
    },
    error => {
      console.error(error.stack || error);
      queue.shift();
      if (queue.length) {
        return rebuild();
      }
    }
  );
}

function clearCache(causeFileName) {
  if (path.extname(causeFileName) === '.js') {
    for (var fileName in require.cache) {
      if (fileName.indexOf('/node_modules/') === -1) {
        delete require.cache[fileName];
      }
    }
  }
}

if (require.main === module) {
  watch().catch(error => console.error(error.stack || error));
}
