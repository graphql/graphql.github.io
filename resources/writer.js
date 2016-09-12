/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var vm = require('vm');
var webpack = require('webpack');
var React = require('react');
var ReactDOM = require('react-dom/server')
var fs = require('fs');
var yaml = require('js-yaml');
var path = require('path');
var less = require('less');
var renderReactPage = require('./renderReactPage');
import { endsWith } from './util';


module.exports = writer;

async function writer(buildDir, file, site) {
  var writePath = getWritePath(buildDir, file);
  console.log('  writing', file.relPath);

  // Render Less file
  if (endsWith(file.absPath, '.less')) {
    const input = await readFile(file.absPath);
    const output = await less.render(input, { filename: file.absPath });
    return await writeFile(writePath, output.css);
  }

  // Non-modified content
  if (!file.content) {
    await promiseDirExists(path.dirname(writePath));
    await promisePipeEnds(
      fs.createReadStream(file.absPath).pipe(fs.createWriteStream(writePath))
    );
    return;
  }

  var data;

  // Render JS file
  if (endsWith(file.relPath, '.html.js') || endsWith(file.relPath, '.xml.js')) {
    data = renderReactPage({
      component: require(path.resolve(file.absPath)),
      props: { site, page: file }
    });
  } else if (endsWith(file.relPath, '.md') ||
             endsWith(file.relPath, '.markdown')) {
    var absLayoutPath = path.join(path.dirname(file.absPath), file.layout);
    data = renderReactPage({
      component: require(path.resolve(absLayoutPath)),
      props: { site, page: file }
    });
  } else {
    data = file.content;
  }

  data = await writeScript(writePath, file, data);

  await writeFile(writePath, data);
}

var SCRIPT_RX = /<script data-inline(?:="true")?>([^]+?)<\/script>/gm;

function writeScript(writePath, file, fileData) {
  return new Promise((resolve, reject) => {
    var renders;
    var id = 100;
    var script;
    var context;
    var renderHere;
    var relRequire;

    var withInitialRenders = fileData.replace(SCRIPT_RX, function (_, scriptData) {
      if (!script) {
        script = `var id = 100;
          function renderHere(element) {
            ReactDOM.render(element, document.getElementById('r' + (++id)));
          }`;
        renderHere = function (element) {
          renders += `<div id="r${++id}">${ReactDOM.renderToString(element)}</div>`;
        };
        relRequire = reqPath => require(
          reqPath[0] === '.' ?
            path.resolve(path.dirname(file.absPath), reqPath) :
            reqPath
        );
      }
      var es5 = require('babel-core').transform(scriptData).code;
      es5 = `(function () {\n${es5}\n}());\n`;
      script += es5;
      renders = '';
      var realRequire = require;
      global.require = relRequire;
      global.renderHere = renderHere;
      global.React = React;
      try {
        vm.runInThisContext(es5);
      } catch (e) {
        throw e;
      } finally {
        global.require = realRequire;
        delete global.renderHere;
        delete global.React;
      }
      return renders;
    });

    if (!script) {
      return resolve(withInitialRenders);
    }


    var tmpFile = path.join(path.dirname(file.absPath), '.tmp.js.' + path.basename(file.absPath));

    fs.writeFile(tmpFile, script, err => {
      if (err) {
        return reject(err);
      }

      var pack = webpack({
        bail: true,
        context: file.absPath,
        entry: tmpFile,
        output: {
          path: path.dirname(writePath),
          filename: path.basename(writePath) + '.[hash].js'
        },
        externals: {
          'react': 'var React'
        },
        resolveLoader: {
          root: path.join(__dirname, '../node_modules')
        },
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              query: {
                optional: [ 'runtime' ],
              }
            }
          ]
        }
      });

      pack.run(function (err, stats) {
        fs.unlink(tmpFile, () => {

          if (err) {
            return reject(err);
          }

          resolve(
            withInitialRenders.replace(
              '</body></html>',
              `<script src="/vendor/react-15.0.1.min.js"></script>` +
              `<script src="/vendor/react-dom-15.0.1.min.js"></script>` +
              `<script src="${path.basename(writePath)}.${stats.hash}.js"></script></body></html>`
            )
          );
        });
      });

    });

  });
}

function getWritePath(buildDir, file) {
  var writePath = file.url;
  if (endsWith(writePath, '/')) {
    writePath = path.join(writePath, 'index.html');
  }
  return path.join(buildDir, writePath.slice(1));
}

// Simple Promise wrapper around fs.writeFile
function readFile(filePath, fmt) {
  return new Promise((resolve, reject) =>
    fs.readFile(filePath, fmt || 'utf8', (err, results) =>
      err ? reject(err) : resolve(results))
  );
}

// Ensures directory exists, then writes file
async function writeFile(filePath, data) {
  await promiseDirExists(path.dirname(filePath));
  await _writeFile(filePath, data);
}

// Simple Promise wrapper around fs.writeFile
function _writeFile(filePath, data) {
  return new Promise((resolve, reject) =>
    fs.writeFile(filePath, data, err => err ? reject(err) : resolve())
  );
}

function promisePipeEnds(pipe) {
  return new Promise((resolve, reject) => {
    pipe.on('close', resolve).on('error', reject);
  });
}

function promiseDirExists(dir) {
  return new Promise((resolve, reject) => {
    mkdirp(dir, err => err ? reject(err) : resolve());
  });
}

function mkdirp(p, cb) {
  p = path.resolve(p);
  fs.mkdir(p, 511 ^ process.umask(), error => {
    if (error && error.code === 'EEXIST') {
      return cb();
    } else if (error && error.code === 'ENOENT') {
      mkdirp(path.dirname(p), error2 => {
        return error2 ? cb(error2) : mkdirp(p, cb);
      });
    } else {
      cb(error);
    }
  });
}
