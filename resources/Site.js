/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var fileWalker = require('./fileWalker');
var fs = require('fs');
var path = require('path');
var writer = require('./writer');
var yaml = require('js-yaml');
import { endsWith } from './util';

exports.readSite = readSite;
exports.buildSite = buildSite;

async function readSite(siteRoot) {
  var site = {
    root: path.resolve(siteRoot),
    files: []
  };

  await fileWalker(site.root, (absPath, stat) => {
    var relPath = path.relative(site.root, absPath);

    return readFileData(absPath, relPath, stat).then(data => {
      data = normalizeData(data);
      var dirName = path.dirname(relPath);
      var dirs = dirName === '.' ? [] : dirName.split(path.sep);
      // TODO: throw if a dirname is only a number or is called "length"
      // TODO: there must be a better data structure that doesn't hack Array
      var files = site.files;
      files.push(data);
      for (var i = 0; i < dirs.length; i++) {
        files = files[dirs[i]] || (files[dirs[i]] = []);
        files.push(data);
      }
    });
  });

  // Cross-link all prev/next pages
  var pageByUrl = Object.create(null);
  for (var i = 0; i < site.files.length; i++) {
    pageByUrl[path.resolve(site.files[i].url)] = site.files[i];
  }

  for (var i = 0; i < site.files.length; i++) {
    var page = site.files[i];
    if (page.next) {
      page.nextPage = pageByUrl[path.resolve(page.url, page.next)];
    }
  }

  return site;
}

function buildSite(buildRoot, site, filter) {
  return Promise.all(site.files
    .filter(file =>
      !filter ||
      (filter.test ? filter.test(file.absPath) : filter === file.absPath))
    .map(file => writer(buildRoot, file, site))
  );
}



var PAGEISH = [ '.html.js', '.xml.js', '.md', '.markdown' ];

function isPageish(filePath) {
  for (var i = 0; i < PAGEISH.length; i++) {
    if (endsWith(filePath, PAGEISH[i])) {
      return true;
    }
  }
  return false;
}

var FRONT_MATTER_RX =
  /^(---\s*\n(?:(?:[^\n]*\n)(?!---|\.\.\.))*[^\n]*\n)(?:---|\.\.\.)?(?:\s*\n)*/;

// Given some file information produce a data structure that can be used.
// If a file is page-like, front-matter will be looked for.
function readFileData(absPath, relPath, stat) {
  if (stat.size > 100000 || !isPageish(relPath)) {
    return Promise.resolve({ absPath, relPath, stat });
  }
  return readFile(absPath).then(content => {
    var frontMatter = FRONT_MATTER_RX.exec(content);

    if (!frontMatter) {
      return { absPath, relPath, stat, content };
    }
    return {
      ...yaml.load(frontMatter[1]),
      absPath,
      relPath,
      stat,
      content: content.slice(frontMatter[0].length)
    };
  });
}

// Normalize the file data
function normalizeData(file) {
  file.isPage = file.content && isPageish(file.relPath);
  file.url = urlToFile(file);
  var dirname = path.dirname(file.relPath);
  file.dir = dirname === '.' ? 'docs' : dirname.split('/')[0];
  file.date = file.date ?
    Date.parse(file.date) :
    (file.stat.birthtime || file.stat.ctime);
  return file;
}

// The URL with a leading slash to a file.
function urlToFile(file) {
  // Determine full url from permalink or the file path.
  var url;
  if (file.permalink) {
    url = file.permalink[0] === '/' ?
      file.permalink :
      '/' + path.join(path.dirname(file.relPath), file.permalink);
    // Ext-less permalinks should have trailing slashes
    if (!endsWith(url, '/') && path.extname(url) === '') {
      url += '/';
    }
  } else {
    url = '/' + file.relPath;

    if (endsWith(file.relPath, '.xml.js')) {
        url = url.slice(0, -'.js'.length);
    } else {
      for (var i = 0; i < PAGEISH.length; i++) {
        if (endsWith(url, PAGEISH[i])) {
          url = url.slice(0, -PAGEISH[i].length) + '.html';
        }
      }
    }
  }

  // Convert .less to .css
  if (path.extname(url) === '.less') {
    url = url.slice(0, -5) + '.css';
  }

  // Assume index.html stands for the parent directory
  if (path.basename(url) === 'index.html') {
    url = path.dirname(url);
    if (!endsWith(url, '/')) {
      url += '/';
    }
  }

  return url;
}

// Simple Promise wrapper around fs.readFile
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}
