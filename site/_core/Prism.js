var React = require('react');
var DOM = require('react-dom-factories');

export default function PrismComponent(props) {
  const lines = [];
  if (props.line) {
    props.line.split(',').forEach(range => {
      const parts = range.split('-');
      if (parts.length === 1) {
        lines.push(parts[0].trim());
      } else {
        const start = parseInt(parts[0].trim(), 10);
        const end = parseInt(parts[1].trim(), 10);
        for (let ii = start; ii <= end; ii++) {
          lines.push(ii);
        }
      }
    });
  }

  const language = props.language;
  const grammar = _.languages[language] || _.languages['javascript'];
  return (
    <pre className={'prism language-' + language}>
      {Token.reactify(_.tokenize(props.children, grammar))}
      {lines.map(function(line, ii) {
        return (
          <div
            className="line-highlight"
            key={ii}
            style={{height: 21, top: 17 * (line - 1)}}
          />
        );
      })}
    </pre>
  );
}

/* http://prismjs.com/download.html?themes=prism */

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism;

// Private helper vars
var lang = /\blang(?:uage)?-(\w+)\b/i;
var uniqueId = 0;

var _ = Prism = {
  util: {
    encode: function (tokens) {
      if (tokens instanceof Token) {
        return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
      } else if (_.util.type(tokens) === 'Array') {
        return tokens.map(_.util.encode);
      } else {
        return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
      }
    },

    type: function (o) {
      return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
    },

    objId: function (obj) {
      if (!obj['__id']) {
        Object.defineProperty(obj, '__id', { value: ++uniqueId });
      }
      return obj['__id'];
    },

    // Deep clone a language definition (e.g. to extend it)
    clone: function (o) {
      var type = _.util.type(o);

      switch (type) {
        case 'Object':
          var clone = {};

          for (var key in o) {
            if (o.hasOwnProperty(key)) {
              clone[key] = _.util.clone(o[key]);
            }
          }

          return clone;

        case 'Array':
          // Check for existence for IE8
          return o.map && o.map(function(v) { return _.util.clone(v); });
      }

      return o;
    }
  },

  languages: {
    extend: function (id, redef) {
      var lang = _.util.clone(_.languages[id]);

      for (var key in redef) {
        lang[key] = redef[key];
      }

      return lang;
    },

    /**
     * Insert a token before another token in a language literal
     * As this needs to recreate the object (we cannot actually insert before keys in object literals),
     * we cannot just provide an object, we need anobject and a key.
     * @param inside The key (or language id) of the parent
     * @param before The key to insert before. If not provided, the function appends instead.
     * @param insert Object with the key/value pairs to insert
     * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
     */
    insertBefore: function (inside, before, insert, root) {
      root = root || _.languages;
      var grammar = root[inside];

      if (arguments.length == 2) {
        insert = arguments[1];

        for (var newToken in insert) {
          if (insert.hasOwnProperty(newToken)) {
            grammar[newToken] = insert[newToken];
          }
        }

        return grammar;
      }

      var ret = {};

      for (var token in grammar) {

        if (grammar.hasOwnProperty(token)) {

          if (token == before) {

            for (var newToken in insert) {

              if (insert.hasOwnProperty(newToken)) {
                ret[newToken] = insert[newToken];
              }
            }
          }

          ret[token] = grammar[token];
        }
      }

      // Update references in other language definitions
      _.languages.DFS(_.languages, function(key, value) {
        if (value === root[inside] && key != inside) {
          this[key] = ret;
        }
      });

      return root[inside] = ret;
    },

    // Traverse a language definition with Depth First Search
    DFS: function(o, callback, type, visited) {
      visited = visited || {};
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          callback.call(o, i, o[i], type || i);

          if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
            visited[_.util.objId(o[i])] = true;
            _.languages.DFS(o[i], callback, null, visited);
          }
          else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
            visited[_.util.objId(o[i])] = true;
            _.languages.DFS(o[i], callback, i, visited);
          }
        }
      }
    }
  },
  plugins: {},

  highlightAll: function(async, callback) {
    var env = {
      callback: callback,
      selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
    };

    _.hooks.run("before-highlightall", env);

    var elements = env.elements || document.querySelectorAll(env.selector);

    for (var i=0, element; element = elements[i++];) {
      _.highlightElement(element, async === true, env.callback);
    }
  },

  highlightElement: function(element, async, callback) {
    // Find language
    var language, grammar, parent = element;

    while (parent && !lang.test(parent.className)) {
      parent = parent.parentNode;
    }

    if (parent) {
      language = (parent.className.match(lang) || [,''])[1].toLowerCase();
      grammar = _.languages[language];
    }

    // Set language on the element, if not present
    element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

    // Set language on the parent, for styling
    parent = element.parentNode;

    if (/pre/i.test(parent.nodeName)) {
      parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
    }

    var code = element.textContent;

    var env = {
      element: element,
      language: language,
      grammar: grammar,
      code: code
    };

    _.hooks.run('before-sanity-check', env);

    if (!env.code || !env.grammar) {
      _.hooks.run('complete', env);
      return;
    }

    _.hooks.run('before-highlight', env);

    if (async && _self.Worker) {
      var worker = new Worker(_.filename);

      worker.onmessage = function(evt) {
        env.highlightedCode = evt.data;

        _.hooks.run('before-insert', env);

        env.element.innerHTML = env.highlightedCode;

        callback && callback.call(env.element);
        _.hooks.run('after-highlight', env);
        _.hooks.run('complete', env);
      };

      worker.postMessage(JSON.stringify({
        language: env.language,
        code: env.code,
        immediateClose: true
      }));
    }
    else {
      env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

      _.hooks.run('before-insert', env);

      env.element.innerHTML = env.highlightedCode;

      callback && callback.call(element);

      _.hooks.run('after-highlight', env);
      _.hooks.run('complete', env);
    }
  },

  highlight: function (text, grammar, language) {
    var tokens = _.tokenize(text, grammar);
    return Token.stringify(_.util.encode(tokens), language);
  },

  tokenize: function(text, grammar, language) {
    var Token = _.Token;

    var strarr = [text];

    var rest = grammar.rest;

    if (rest) {
      for (var token in rest) {
        grammar[token] = rest[token];
      }

      delete grammar.rest;
    }

    tokenloop: for (var token in grammar) {
      if(!grammar.hasOwnProperty(token) || !grammar[token]) {
        continue;
      }

      var patterns = grammar[token];
      patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

      for (var j = 0; j < patterns.length; ++j) {
        var pattern = patterns[j],
          inside = pattern.inside,
          lookbehind = !!pattern.lookbehind,
          greedy = !!pattern.greedy,
          lookbehindLength = 0,
          alias = pattern.alias;

        if (greedy && !pattern.pattern.global) {
          // Without the global flag, lastIndex won't work
          var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
          pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
        }

        pattern = pattern.pattern || pattern;

        // Don’t cache length as it changes during the loop
        for (var i=0, pos = 0; i<strarr.length; pos += (strarr[i].matchedStr || strarr[i]).length, ++i) {

          var str = strarr[i];

          if (strarr.length > text.length) {
            // Something went terribly wrong, ABORT, ABORT!
            break tokenloop;
          }

          if (str instanceof Token) {
            continue;
          }

          pattern.lastIndex = 0;

          var match = pattern.exec(str),
              delNum = 1;

          // Greedy patterns can override/remove up to two previously matched tokens
          if (!match && greedy && i != strarr.length - 1) {
            pattern.lastIndex = pos;
            match = pattern.exec(text);
            if (!match) {
              break;
            }

            var from = match.index + (lookbehind ? match[1].length : 0),
                to = match.index + match[0].length,
                k = i,
                p = pos;

            for (var len = strarr.length; k < len && p < to; ++k) {
              p += (strarr[k].matchedStr || strarr[k]).length;
              // Move the index i to the element in strarr that is closest to from
              if (from >= p) {
                ++i;
                pos = p;
              }
            }

            /*
             * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
             * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
             */
            if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
              continue;
            }

            // Number of tokens to delete and replace with the new match
            delNum = k - i;
            str = text.slice(pos, p);
            match.index -= pos;
          }

          if (!match) {
            continue;
          }

          if(lookbehind) {
            lookbehindLength = match[1].length;
          }

          var from = match.index + lookbehindLength,
              match = match[0].slice(lookbehindLength),
              to = from + match.length,
              before = str.slice(0, from),
              after = str.slice(to);

          var args = [i, delNum];

          if (before) {
            args.push(before);
          }

          var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

          args.push(wrapped);

          if (after) {
            args.push(after);
          }

          Array.prototype.splice.apply(strarr, args);
        }
      }
    }

    return strarr;
  },

  hooks: {
    all: {},

    add: function (name, callback) {
      var hooks = _.hooks.all;

      hooks[name] = hooks[name] || [];

      hooks[name].push(callback);
    },

    run: function (name, env) {
      var callbacks = _.hooks.all[name];

      if (!callbacks || !callbacks.length) {
        return;
      }

      for (var i=0, callback; callback = callbacks[i++];) {
        callback(env);
      }
    }
  }
};

var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
  this.type = type;
  this.content = content;
  this.alias = alias;
  // Copy of the full string this token was created from
  this.matchedStr = matchedStr || null;
  this.greedy = !!greedy;
};

Token.stringify = function(o, language, parent) {
  if (typeof o == 'string') {
    return o;
  }

  if (_.util.type(o) === 'Array') {
    return o.map(function(element) {
      return Token.stringify(element, language, o);
    }).join('');
  }

  var env = {
    type: o.type,
    content: Token.stringify(o.content, language, parent),
    tag: 'span',
    classes: ['token', o.type],
    attributes: {},
    language: language,
    parent: parent
  };

  if (env.type == 'comment') {
    env.attributes['spellcheck'] = 'true';
  }

  if (o.alias) {
    var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
    Array.prototype.push.apply(env.classes, aliases);
  }

  _.hooks.run('wrap', env);

  var attributes = '';

  for (var name in env.attributes) {
    attributes += (attributes ? ' ' : '') + name + '="' + (env.attributes[name] || '') + '"';
  }

  return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

};

Token.reactify = function(o, language, parent, key) {
  if (typeof o == 'string') {
    return o;
  }

  if (_.util.type(o) === 'Array') {
    return o.map(function(element, i) {
      return Token.reactify(element, language, o, i);
    });
  }

  var env = {
    type: o.type,
    content: Token.reactify(o.content, language, parent),
    tag: 'span',
    classes: [o.type],
    attributes: {key: key},
    language: language,
    parent: parent
  };

  if (env.type == 'comment') {
    env.attributes.spellCheck = true;
  }

  if (o.alias) {
    var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
    Array.prototype.push.apply(env.classes, aliases);
  }

  _.hooks.run('wrap', env);

  env.attributes.className = env.classes.join(' ');

  return DOM[env.tag](env.attributes, env.content);
};

Prism.languages.markup = {
  'comment': /<!--[\w\W]*?-->/,
  'prolog': /<\?[\w\W]+?\?>/,
  'doctype': /<!DOCTYPE[\w\W]+?>/,
  'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
  'tag': {
    pattern: /<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/
        }
      },
      'attr-value': {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
        inside: {
          'punctuation': /[=>"']/
        }
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/
        }
      }

    }
  },
  'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});
;
Prism.languages.clike = {
  'comment': [
    {
      pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
      lookbehind: true
    },
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true
    }
  ],
  'string': /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
  'class-name': {
    pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
    lookbehind: true,
    inside: {
      punctuation: /(\.|\\)/
    }
  },
  'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  'boolean': /\b(true|false)\b/,
  'function': /[a-z0-9_]+(?=\()/i,
  'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
  'operator': /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,
  'punctuation': /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend('clike', {
  'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
  'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
  'function': /(?!\d)[a-z0-9_$]+(?=\()/i
});

Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
    lookbehind: true
  }
});

Prism.languages.insertBefore('javascript', 'class-name', {
  'template-string': {
    pattern: /`(?:\\`|\\?[^`])*`/,
    inside: {
      'interpolation': {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      'string': /[\s\S]+/
    }
  }
});

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'script': {
      pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/i,
      inside: {
        'tag': {
          pattern: /<script[\w\W]*?>|<\/script>/i,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.javascript
      },
      alias: 'language-javascript'
    }
  });
}
;
(function(Prism) {

var javascript = Prism.util.clone(Prism.languages.javascript);

Prism.languages.jsx = Prism.languages.extend('markup', javascript);
Prism.languages.jsx.tag.pattern= /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;

Prism.languages.jsx.tag.inside['attr-value'].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

Prism.languages.insertBefore('inside', 'attr-value',{
  'script': {
    pattern: /=(\{[\w\W]*?\})/i,
    inside: {
      'function' : Prism.languages.javascript.function,
      'punctuation': /[={}[\];(),.:]/,
      'keyword':  Prism.languages.javascript.keyword
    },
    'alias': 'language-javascript'
  }
}, Prism.languages.jsx.tag);

}(Prism));

var graphqlComment = {
  pattern: /#.*/,
  greedy: true
};

var graphqlCommon = {
  string: {
    pattern: /"(?:\\.|[^\\"])*"/,
    greedy: true
  },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  boolean: /\b(?:true|false)\b/,
  variable: {
    pattern: /\$[a-z_]\w*/i,
    greedy: true
  },
  operator: /!|=|\.{3}/,
  punctuation: /[!(){|}[\]:=,]/
};

var graphqlDirective = {
  pattern: /@[a-z_]\w*(\([\w\W]*?\))?/i,
  inside: {
    function: /@[a-z_]\w*/i,
    args: {
      pattern: /\([\w\W]*?\)/,
      inside: {
        arg: /[a-z_]\w*(?=\s*:)/i,
        ...graphqlCommon
      }
    }
  }
};

Prism.languages.graphql = {
  comment: graphqlComment,
  'schema-def': {
    pattern: /\bschema\b[^{]*{[^{}]*}/,
    inside: {
      comment: graphqlComment,
      keyword: /\bschema\b|[a-zA-Z_]\w*(?=\s*:)/,
      'type-name': {
        pattern: /(:[\s\[]*)[a-z_]\w*/i,
        lookbehind: true
      },
      directive: graphqlDirective,
      punctuation: graphqlCommon.punctuation
    }
  },
  'union-def': {
    pattern: /\bunion\b[^=]+=\s*[a-zA-Z_]\w*(?:\s*\|\s*[a-zA-Z_]\w*)*/,
    inside: {
      comment: graphqlComment,
      keyword: /\bunion\b/,
      'type-name': {
        pattern: /([=|]\s*)[a-z_]\w*/i,
        lookbehind: true
      },
      directive: graphqlDirective,
      punctuation: graphqlCommon.punctuation
    }
  },
  'type-def': {
    pattern: /\b(?:type|interface|input|enum)\b[\w\W]+?{(?:[^{}]*|[^{}]*{[^{}]*}[^{}]*|[^{}]*{[^{}]*[^{}]*{[^{}]*}[^{}]*}[^{}]*)}/,
    inside: {
      comment: graphqlComment,
      fields: {
        pattern: /{(?:[^{}]*|[^{}]*{[^{}]*}[^{}]*|[^{}]*{[^{}]*[^{}]*{[^{}]*}[^{}]*}[^{}]*)}/,
        inside: {
          comment: graphqlComment,
          argDefs: {
            pattern: /\([\w\W]*?\)/,
            inside: {
              comment: graphqlComment,
              'attr-name': /[a-z_]\w*(?=\s*:)/i,
              'type-name': {
                pattern: /(:[\s\[]*)[a-z_]\w*/i,
                lookbehind: true
              },
              directive: graphqlDirective,
              ...graphqlCommon
            }
          },
          directive: graphqlDirective,
          'attr-name': {
            pattern: /[a-z_]\w*(?=\s*[:\(])/i,
            greedy: true,
          },
          'type-name': {
            pattern: /(:[\s\[]*)[a-z_]\w*/i,
            lookbehind: true
          },
          punctuation: /[!{}\[\]:=,]/,
        }
      },
      keyword: /\b(?:type|interface|implements|input|enum)\b/,
      directive: graphqlDirective,
      ...graphqlCommon,

      // 'type-name': /[a-z_]\w*/i,
    }
  },
  // string: /"(?:\\.|[^\\"])*"/,
  // number: /(?:\B-|\b)\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  // boolean: /\b(?:true|false)\b/,
  // variable: /\$[a-z_]\w*/i,
  // directive: {
  //   pattern: /@[a-z_]\w*/i,
  //   alias: 'function'
  // },
  directive: graphqlDirective,
  'attr-name': /[a-z_]\w*(?=\s*:)/i,
  'keyword': [
    {
      pattern: /(fragment\s+(?!on)[a-z_]\w*\s+|\.\.\.\s*)on\b/,
      lookbehind: true
    },
    /\b(?:query|mutation|subscription|fragment|extend|scalar)\b/
  ],
  ...graphqlCommon,
  // 'operator': /!|=|\.{3}/,
  // 'punctuation': /[!(){}\[\]:=,]/,
  // comment: /#.*/,
  // 'enum': /[a-z_]\w*/i
};

Prism.languages.json = {
  'attr-name': {
    pattern: /"(?:\\.|[^\\"])*"(?=\s*:)/i,
    greedy: true
  },
  string: {
    pattern: /"(?:\\.|[^\\"])*"/,
    greedy: true
  },
  boolean: /\b(?:true|false)\b/,
  keyword: /\bnull\b/,
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  punctuation: /[{}[\],:]/,
};
