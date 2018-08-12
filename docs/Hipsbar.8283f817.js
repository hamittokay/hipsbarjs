// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/scss/hipsbar.scss":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/lib/helpers.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ARROW_ICON = '<svg class="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="512px" height="512px"><g><path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" fill="#FFFFFF"/></g></svg>';

var createOverlay = exports.createOverlay = function createOverlay() {
  var overlay = document.querySelector('.hipsbar--overlay');

  if (!document.contains(overlay)) {
    var overlayNode = document.createElement('div');
    overlayNode.classList.add('hipsbar--overlay');

    document.body.appendChild(overlayNode);
  }
};

var createChildNodes = exports.createChildNodes = function createChildNodes(listItem, children) {
  listItem.classList.add('has--children');
  listItem.innerHTML += ARROW_ICON;

  var childParentNode = document.createElement('ul');
  childParentNode.classList.add('child--parent-item');

  children.forEach(function (child, i) {
    var childNode = document.createElement('li');
    var childNodeLink = document.createElement('a');

    childNodeLink.innerHTML = child.content;
    childNodeLink.setAttribute('href', child.url);

    childNode.appendChild(childNodeLink);
    childParentNode.appendChild(childNode);

    if (child.children) {
      createChildNodes(childNode, child.children);
    }
  });

  listItem.querySelectorAll('a')[0].addEventListener('click', function (e) {
    listItem.classList.toggle('is--active');
    e.preventDefault();
  });

  listItem.appendChild(childParentNode);
};
},{}],"src/lib/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

Object.keys(_helpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _helpers[key];
    }
  });
});
},{"./helpers":"src/lib/helpers.js"}],"src/Hipsbar.js":[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./scss/hipsbar.scss');

var _lib = require('./lib');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hipsbar = function () {
  function Hipsbar(options) {
    _classCallCheck(this, Hipsbar);

    var activator = options.activator,
        data = options.data,
        overlay = options.overlay,
        blur = options.blur,
        position = options.position,
        width = options.width;


    this.activator = activator;
    this.data = data || [];
    this.dataURL = dataURL || [];
    this.overlay = overlay || false;
    this.blur = blur || false;
    this.position = position || 'left';
    this.width = width || 360;

    this.hipsbar = null;
    this.activatorNode = document.querySelector(this.activator);

    this.initHipsbar();
  }

  _createClass(Hipsbar, [{
    key: 'initNodes',
    value: function initNodes(data) {
      var list = document.createElement('ul');

      data.forEach(function (_ref) {
        var content = _ref.content,
            url = _ref.url,
            children = _ref.children;

        var listItem = document.createElement('li');
        var listItemLink = document.createElement('a');

        listItemLink.innerHTML = content;
        listItemLink.setAttribute('href', url);

        listItem.appendChild(listItemLink);
        list.appendChild(listItem);

        if (children) {
          (0, _lib.createChildNodes)(listItem, children);
        }
      });

      this.hipsbar.setAttribute('data-hipsbar', this.activator);
      this.hipsbar.appendChild(list);
      document.body.appendChild(this.hipsbar);
    }
  }, {
    key: 'initData',
    value: function initData() {
      var _this = this;

      if (this.dataURL) {
        fetch(this.dataURL).then(function (res) {
          return res.json();
        }).then(function (data) {
          _this.initNodes(data);
        });
      } else {
        this.initNodes(this.data);
      }
    }
  }, {
    key: 'addActivatorListener',
    value: function addActivatorListener() {
      var _this2 = this;

      var el = this.activatorNode;
      el.setAttribute('data-hipsbar-activator', this.activator);
      el.addEventListener('click', function (e) {
        _this2.hipsbar.classList.toggle('is--active');
        setTimeout(function () {
          _this2.handleOverlay();
          _this2.addBlur();
        }, 0);
        e.preventDefault();
      });
    }
  }, {
    key: 'addCloseListener',
    value: function addCloseListener() {
      var _this3 = this;

      window.addEventListener('click', function (e) {
        _this3.closeHipsbar();
      });
      this.hipsbar.addEventListener('click', function (e) {
        e.stopPropagation();
      });
      this.activatorNode.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }
  }, {
    key: 'closeHipsbar',
    value: function closeHipsbar() {
      document.body.classList.remove('blurred--overlay');
      this.hipsbar.classList.remove('is--active');
      this.closeOverlay();
    }
  }, {
    key: 'addOverlay',
    value: function addOverlay() {
      if (this.overlay) {
        (0, _lib.createOverlay)();
      }
    }
  }, {
    key: 'closeOverlay',
    value: function closeOverlay() {
      if (this.overlay) {
        document.querySelector('.hipsbar--overlay').classList.remove('is--active');
      }
    }
  }, {
    key: 'addBlur',
    value: function addBlur() {
      if (this.blur) {
        document.body.classList.add('blurred--overlay');
      }
    }
  }, {
    key: 'handleOverlay',
    value: function handleOverlay() {
      if (this.overlay) {
        document.querySelector('.hipsbar--overlay').classList.add('is--active');
      }
    }
  }, {
    key: 'initStyles',
    value: function initStyles() {
      if (!this.isFullWidth) {
        this.hipsbar.style.width = this.width + 'px';
      }
    }
  }, {
    key: 'initHooks',
    value: function initHooks() {
      this.initData();
      this.initStyles();
      this.addOverlay();
      this.addActivatorListener();
      this.addCloseListener();
    }
  }, {
    key: 'initHipsbar',
    value: function initHipsbar() {
      var hipsbar = document.createElement('div');
      hipsbar.classList.add('hipsbar--wrapper', 'is--' + this.position);

      this.hipsbar = hipsbar;
      this.initHooks();
    }
  }, {
    key: 'isFullWidth',
    get: function get() {
      return this.position == 'bottom' || this.position == 'top';
    }
  }]);

  return Hipsbar;
}();

window.Hipsbar = Hipsbar;
},{"./scss/hipsbar.scss":"src/scss/hipsbar.scss","./lib":"src/lib/index.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59275' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/Hipsbar.js"], null)
//# sourceMappingURL=/Hipsbar.8283f817.map