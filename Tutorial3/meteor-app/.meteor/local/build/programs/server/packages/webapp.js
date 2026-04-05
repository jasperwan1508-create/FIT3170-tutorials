Package["core-runtime"].queue("webapp",function () {/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var EmitterPromise = Package.meteor.EmitterPromise;
var ECMAScript = Package.ecmascript.ECMAScript;
var Log = Package.logging.Log;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var Boilerplate = Package['boilerplate-generator'].Boilerplate;
var WebAppHashing = Package['webapp-hashing'].WebAppHashing;
var Hook = Package['callback-hook'].Hook;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var WebApp, WebAppInternals, main;

var require = meteorInstall({"node_modules":{"meteor":{"webapp":{"webapp_server.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/webapp/webapp_server.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!module.wrapAsync(async function (module, __reifyWaitForDeps__, __reifyAsyncResult__) {"use strict"; try {module.export({WebApp:()=>WebApp,WebAppInternals:()=>WebAppInternals,getGroupInfo:()=>getGroupInfo},true);let assert;module.link('assert',{default(v){assert=v}},0);let readFileSync,chmodSync,chownSync;module.link('fs',{readFileSync(v){readFileSync=v},chmodSync(v){chmodSync=v},chownSync(v){chownSync=v}},1);let createServer;module.link('http',{createServer(v){createServer=v}},2);let userInfo;module.link('os',{userInfo(v){userInfo=v}},3);let pathJoin,pathDirname;module.link('path',{join(v){pathJoin=v},dirname(v){pathDirname=v}},4);let parseUrl;module.link('url',{parse(v){parseUrl=v}},5);let createHash;module.link('crypto',{createHash(v){createHash=v}},6);let express;module.link('express',{default(v){express=v}},7);let compress;module.link('compression',{default(v){compress=v}},8);let cookieParser;module.link('cookie-parser',{default(v){cookieParser=v}},9);let qs;module.link('qs',{default(v){qs=v}},10);let parseRequest;module.link('parseurl',{default(v){parseRequest=v}},11);let lookupUserAgent;module.link('useragent-ng',{lookup(v){lookupUserAgent=v}},12);let isModern;module.link('meteor/modern-browsers',{isModern(v){isModern=v}},13);let send;module.link('send',{default(v){send=v}},14);let removeExistingSocketFile,registerSocketFileCleanup;module.link('./socket_file.js',{removeExistingSocketFile(v){removeExistingSocketFile=v},registerSocketFileCleanup(v){registerSocketFileCleanup=v}},15);let cluster;module.link('cluster',{default(v){cluster=v}},16);let execSync;module.link('child_process',{execSync(v){execSync=v}},17);let onMessage;module.link('meteor/inter-process-messaging',{onMessage(v){onMessage=v}},18);if (__reifyWaitForDeps__()) (await __reifyWaitForDeps__())();function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}


















var SHORT_SOCKET_TIMEOUT = 5 * 1000;
var LONG_SOCKET_TIMEOUT = 120 * 1000;
const createExpressApp = ()=>{
    const app = express();
    // Security and performace headers
    // these headers come from these docs: https://expressjs.com/en/api.html#app.settings.table
    app.set('x-powered-by', false);
    app.set('etag', false);
    app.set('query parser', qs.parse);
    return app;
};
const WebApp = {};
const WebAppInternals = {};
const hasOwn = Object.prototype.hasOwnProperty;
WebAppInternals.NpmModules = {
    express: {
        version: Npm.require('express/package.json').version,
        module: express
    }
};
// More of a convenience for the end user
WebApp.express = express;
// Though we might prefer to use web.browser (modern) as the default
// architecture, safety requires a more compatible defaultArch.
WebApp.defaultArch = 'web.browser.legacy';
// XXX maps archs to manifests
WebApp.clientPrograms = {};
// XXX maps archs to program path on filesystem
var archPath = {};
var bundledJsCssUrlRewriteHook = function(url) {
    var bundledPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';
    return bundledPrefix + url;
};
var sha1 = function(contents) {
    var hash = createHash('sha1');
    hash.update(contents);
    return hash.digest('hex');
};
function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compress.filter(req, res);
}
// #BrowserIdentification
//
// We have multiple places that want to identify the browser: the
// unsupported browser page, the appcache package, and, eventually
// delivering browser polyfills only as needed.
//
// To avoid detecting the browser in multiple places ad-hoc, we create a
// Meteor "browser" object. It uses but does not expose the npm
// useragent module (we could choose a different mechanism to identify
// the browser in the future if we wanted to).  The browser object
// contains
//
// * `name`: the name of the browser in camel case
// * `major`, `minor`, `patch`: integers describing the browser version
//
// Also here is an early version of a Meteor `request` object, intended
// to be a high-level description of the request without exposing
// details of Express's low-level `req`.  Currently it contains:
//
// * `browser`: browser identification object described above
// * `url`: parsed url, including parsed query params
//
// As a temporary hack there is a `categorizeRequest` function on WebApp which
// converts a Express `req` to a Meteor `request`. This can go away once smart
// packages such as appcache are being passed a `request` object directly when
// they serve content.
//
// This allows `request` to be used uniformly: it is passed to the html
// attributes hook, and the appcache package can use it when deciding
// whether to generate a 404 for the manifest.
//
// Real routing / server side rendering will probably refactor this
// heavily.
// e.g. "Mobile Safari" => "mobileSafari"
var camelCase = function(name) {
    var parts = name.split(' ');
    parts[0] = parts[0].toLowerCase();
    for(var i = 1; i < parts.length; ++i){
        parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
    }
    return parts.join('');
};
var identifyBrowser = function(userAgentString) {
    if (!userAgentString) {
        return {
            name: 'unknown',
            major: 0,
            minor: 0,
            patch: 0
        };
    }
    var userAgent = lookupUserAgent(userAgentString);
    return {
        name: camelCase(userAgent.family),
        major: +userAgent.major,
        minor: +userAgent.minor,
        patch: +userAgent.patch
    };
};
// XXX Refactor as part of implementing real routing.
WebAppInternals.identifyBrowser = identifyBrowser;
WebApp.categorizeRequest = function(req) {
    if (req.browser && req.arch && typeof req.modern === 'boolean') {
        // Already categorized.
        return req;
    }
    const browser = identifyBrowser(req.headers['user-agent']);
    const modern = isModern(browser);
    const path = typeof req.pathname === 'string' ? req.pathname : parseRequest(req).pathname;
    const categorized = {
        browser,
        modern,
        path,
        arch: WebApp.defaultArch,
        url: parseUrl(req.url, true),
        dynamicHead: req.dynamicHead,
        dynamicBody: req.dynamicBody,
        headers: req.headers,
        cookies: req.cookies
    };
    const pathParts = path.split('/');
    const archKey = pathParts[1];
    if (archKey.startsWith('__')) {
        const archCleaned = 'web.' + archKey.slice(2);
        if (hasOwn.call(WebApp.clientPrograms, archCleaned)) {
            pathParts.splice(1, 1); // Remove the archKey part.
            return Object.assign(categorized, {
                arch: archCleaned,
                path: pathParts.join('/')
            });
        }
    }
    // TODO Perhaps one day we could infer Cordova clients here, so that we
    // wouldn't have to use prefixed "/__cordova/..." URLs.
    const preferredArchOrder = isModern(browser) ? [
        'web.browser',
        'web.browser.legacy'
    ] : [
        'web.browser.legacy',
        'web.browser'
    ];
    for (const arch of preferredArchOrder){
        // If our preferred arch is not available, it's better to use another
        // client arch that is available than to guarantee the site won't work
        // by returning an unknown arch. For example, if web.browser.legacy is
        // excluded using the --exclude-archs command-line option, legacy
        // clients are better off receiving web.browser (which might actually
        // work) than receiving an HTTP 404 response. If none of the archs in
        // preferredArchOrder are defined, only then should we send a 404.
        if (hasOwn.call(WebApp.clientPrograms, arch)) {
            return Object.assign(categorized, {
                arch
            });
        }
    }
    return categorized;
};
// HTML attribute hooks: functions to be called to determine any attributes to
// be added to the '<html>' tag. Each function is passed a 'request' object (see
// #BrowserIdentification) and should return null or object.
var htmlAttributeHooks = [];
var getHtmlAttributes = function(request) {
    var combinedAttributes = {};
    (htmlAttributeHooks || []).forEach(function(hook) {
        var attributes = hook(request);
        if (attributes === null) return;
        if (typeof attributes !== 'object') throw Error('HTML attribute hook must return null or object');
        Object.assign(combinedAttributes, attributes);
    });
    return combinedAttributes;
};
WebApp.addHtmlAttributeHook = function(hook) {
    htmlAttributeHooks.push(hook);
};
// Serve app HTML for this URL?
var appUrl = function(url) {
    if (url === '/favicon.ico' || url === '/robots.txt') return false;
    // NOTE: app.manifest is not a web standard like favicon.ico and
    // robots.txt. It is a file name we have chosen to use for HTML5
    // appcache URLs. It is included here to prevent using an appcache
    // then removing it from poisoning an app permanently. Eventually,
    // once we have server side routing, this won't be needed as
    // unknown URLs with return a 404 automatically.
    if (url === '/app.manifest') return false;
    // Avoid serving app HTML for declared routes such as /sockjs/.
    if (RoutePolicy.classify(url)) return false;
    // we currently return app HTML on all URLs by default
    return true;
};
// We need to calculate the client hash after all packages have loaded
// to give them a chance to populate __meteor_runtime_config__.
//
// Calculating the hash during startup means that packages can only
// populate __meteor_runtime_config__ during load, not during startup.
//
// Calculating instead it at the beginning of main after all startup
// hooks had run would allow packages to also populate
// __meteor_runtime_config__ during startup, but that's too late for
// autoupdate because it needs to have the client hash at startup to
// insert the auto update version itself into
// __meteor_runtime_config__ to get it to the client.
//
// An alternative would be to give autoupdate a "post-start,
// pre-listen" hook to allow it to insert the auto update version at
// the right moment.
Meteor.startup(function() {
    function getter(key) {
        return function(arch) {
            arch = arch || WebApp.defaultArch;
            const program = WebApp.clientPrograms[arch];
            const value = program && program[key];
            // If this is the first time we have calculated this hash,
            // program[key] will be a thunk (lazy function with no parameters)
            // that we should call to do the actual computation.
            return typeof value === 'function' ? program[key] = value() : value;
        };
    }
    WebApp.calculateClientHash = WebApp.clientHash = getter('version');
    WebApp.calculateClientHashRefreshable = getter('versionRefreshable');
    WebApp.calculateClientHashNonRefreshable = getter('versionNonRefreshable');
    WebApp.calculateClientHashReplaceable = getter('versionReplaceable');
    WebApp.getRefreshableAssets = getter('refreshableAssets');
});
// When we have a request pending, we want the socket timeout to be long, to
// give ourselves a while to serve it, and to allow sockjs long polls to
// complete.  On the other hand, we want to close idle sockets relatively
// quickly, so that we can shut down relatively promptly but cleanly, without
// cutting off anyone's response.
WebApp._timeoutAdjustmentRequestCallback = function(req, res) {
    // this is really just req.socket.setTimeout(LONG_SOCKET_TIMEOUT);
    req.setTimeout(LONG_SOCKET_TIMEOUT);
    // Insert our new finish listener to run BEFORE the existing one which removes
    // the response from the socket.
    var finishListeners = res.listeners('finish');
    // XXX Apparently in Node 0.12 this event was called 'prefinish'.
    // https://github.com/joyent/node/commit/7c9b6070
    // But it has switched back to 'finish' in Node v4:
    // https://github.com/nodejs/node/pull/1411
    res.removeAllListeners('finish');
    res.on('finish', function() {
        res.setTimeout(SHORT_SOCKET_TIMEOUT);
    });
    Object.values(finishListeners).forEach(function(l) {
        res.on('finish', l);
    });
};
// Will be updated by main before we listen.
// Map from client arch to boilerplate object.
// Boilerplate object has:
//   - func: XXX
//   - baseData: XXX
var boilerplateByArch = {};
// Register a callback function that can selectively modify boilerplate
// data given arguments (request, data, arch). The key should be a unique
// identifier, to prevent accumulating duplicate callbacks from the same
// call site over time. Callbacks will be called in the order they were
// registered. A callback should return false if it did not make any
// changes affecting the boilerplate. Passing null deletes the callback.
// Any previous callback registered for this key will be returned.
const boilerplateDataCallbacks = Object.create(null);
WebAppInternals.registerBoilerplateDataCallback = function(key, callback) {
    const previousCallback = boilerplateDataCallbacks[key];
    if (typeof callback === 'function') {
        boilerplateDataCallbacks[key] = callback;
    } else {
        assert.strictEqual(callback, null);
        delete boilerplateDataCallbacks[key];
    }
    // Return the previous callback in case the new callback needs to call
    // it; for example, when the new callback is a wrapper for the old.
    return previousCallback || null;
};
// Given a request (as returned from `categorizeRequest`), return the
// boilerplate HTML to serve for that request.
//
// If a previous Express middleware has rendered content for the head or body,
// returns the boilerplate with that content patched in otherwise
// memoizes on HTML attributes (used by, eg, appcache) and whether inline
// scripts are currently allowed.
// XXX so far this function is always called with arch === 'web.browser'
function getBoilerplate(request, arch) {
    return getBoilerplateAsync(request, arch);
}
/**
 * @summary Takes a runtime configuration object and
 * returns an encoded runtime string.
 * @locus Server
 * @param {Object} rtimeConfig
 * @returns {String}
 */ WebApp.encodeRuntimeConfig = function(rtimeConfig) {
    return JSON.stringify(encodeURIComponent(JSON.stringify(rtimeConfig)));
};
/**
 * @summary Takes an encoded runtime string and returns
 * a runtime configuration object.
 * @locus Server
 * @param {String} rtimeConfigString
 * @returns {Object}
 */ WebApp.decodeRuntimeConfig = function(rtimeConfigStr) {
    return JSON.parse(decodeURIComponent(JSON.parse(rtimeConfigStr)));
};
const runtimeConfig = {
    // hooks will contain the callback functions
    // set by the caller to addRuntimeConfigHook
    hooks: new Hook(),
    // updateHooks will contain the callback functions
    // set by the caller to addUpdatedNotifyHook
    updateHooks: new Hook(),
    // isUpdatedByArch is an object containing fields for each arch
    // that this server supports.
    // - Each field will be true when the server updates the runtimeConfig for that arch.
    // - When the hook callback is called the update field in the callback object will be
    // set to isUpdatedByArch[arch].
    // = isUpdatedyByArch[arch] is reset to false after the callback.
    // This enables the caller to cache data efficiently so they do not need to
    // decode & update data on every callback when the runtimeConfig is not changing.
    isUpdatedByArch: {}
};
/**
 * @name addRuntimeConfigHookCallback(options)
 * @locus Server
 * @isprototype true
 * @summary Callback for `addRuntimeConfigHook`.
 *
 * If the handler returns a _falsy_ value the hook will not
 * modify the runtime configuration.
 *
 * If the handler returns a _String_ the hook will substitute
 * the string for the encoded configuration string.
 *
 * **Warning:** the hook does not check the return value at all it is
 * the responsibility of the caller to get the formatting correct using
 * the helper functions.
 *
 * `addRuntimeConfigHookCallback` takes only one `Object` argument
 * with the following fields:
 * @param {Object} options
 * @param {String} options.arch The architecture of the client
 * requesting a new runtime configuration. This can be one of
 * `web.browser`, `web.browser.legacy` or `web.cordova`.
 * @param {Object} options.request
 * A NodeJs [IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
 * https://nodejs.org/api/http.html#http_class_http_incomingmessage
 * `Object` that can be used to get information about the incoming request.
 * @param {String} options.encodedCurrentConfig The current configuration object
 * encoded as a string for inclusion in the root html.
 * @param {Boolean} options.updated `true` if the config for this architecture
 * has been updated since last called, otherwise `false`. This flag can be used
 * to cache the decoding/encoding for each architecture.
 */ /**
 * @summary Hook that calls back when the meteor runtime configuration,
 * `__meteor_runtime_config__` is being sent to any client.
 *
 * **returns**: <small>_Object_</small> `{ stop: function, callback: function }`
 * - `stop` <small>_Function_</small> Call `stop()` to stop getting callbacks.
 * - `callback` <small>_Function_</small> The passed in `callback`.
 * @locus Server
 * @param {addRuntimeConfigHookCallback} callback
 * See `addRuntimeConfigHookCallback` description.
 * @returns {Object} {{ stop: function, callback: function }}
 * Call the returned `stop()` to stop getting callbacks.
 * The passed in `callback` is returned also.
 */ WebApp.addRuntimeConfigHook = function(callback) {
    return runtimeConfig.hooks.register(callback);
};
function getBoilerplateAsync(request, arch, response) {
    return _async_to_generator(function*() {
        let boilerplate = boilerplateByArch[arch];
        yield runtimeConfig.hooks.forEachAsync((hook)=>_async_to_generator(function*() {
                const meteorRuntimeConfig = yield hook({
                    arch,
                    request,
                    encodedCurrentConfig: boilerplate.baseData.meteorRuntimeConfig,
                    updated: runtimeConfig.isUpdatedByArch[arch]
                });
                if (!meteorRuntimeConfig) return true;
                boilerplate.baseData = Object.assign({}, boilerplate.baseData, {
                    meteorRuntimeConfig
                });
                return true;
            })());
        runtimeConfig.isUpdatedByArch[arch] = false;
        const { dynamicHead, dynamicBody } = request;
        const data = Object.assign({}, boilerplate.baseData, {
            htmlAttributes: getHtmlAttributes(request)
        }, {
            dynamicHead,
            dynamicBody
        });
        let madeChanges = false;
        let promise = Promise.resolve();
        Object.keys(boilerplateDataCallbacks).forEach((key)=>{
            promise = promise.then(()=>{
                const callback = boilerplateDataCallbacks[key];
                return callback(request, data, arch, response);
            }).then((result)=>{
                // Callbacks should return false if they did not make any changes.
                if (result !== false) {
                    madeChanges = true;
                }
            });
        });
        return promise.then(()=>({
                stream: boilerplate.toHTMLStream(data),
                statusCode: data.statusCode,
                headers: data.headers
            }));
    })();
}
/**
 * @name addUpdatedNotifyHookCallback(options)
 * @summary callback handler for `addupdatedNotifyHook`
 * @isprototype true
 * @locus Server
 * @param {Object} options
 * @param {String} options.arch The architecture that is being updated.
 * This can be one of `web.browser`, `web.browser.legacy` or `web.cordova`.
 * @param {Object} options.manifest The new updated manifest object for
 * this `arch`.
 * @param {Object} options.runtimeConfig The new updated configuration
 * object for this `arch`.
 */ /**
 * @summary Hook that runs when the meteor runtime configuration
 * is updated.  Typically the configuration only changes during development mode.
 * @locus Server
 * @param {addUpdatedNotifyHookCallback} handler
 * The `handler` is called on every change to an `arch` runtime configuration.
 * See `addUpdatedNotifyHookCallback`.
 * @returns {Object} {{ stop: function, callback: function }}
 */ WebApp.addUpdatedNotifyHook = function(handler) {
    return runtimeConfig.updateHooks.register(handler);
};
WebAppInternals.generateBoilerplateInstance = function(arch, manifest, additionalOptions) {
    additionalOptions = additionalOptions || {};
    runtimeConfig.isUpdatedByArch[arch] = true;
    const rtimeConfig = _object_spread({}, __meteor_runtime_config__, additionalOptions.runtimeConfigOverrides || {});
    runtimeConfig.updateHooks.forEach((cb)=>{
        cb({
            arch,
            manifest,
            runtimeConfig: rtimeConfig
        });
        return true;
    });
    const meteorRuntimeConfig = JSON.stringify(encodeURIComponent(JSON.stringify(rtimeConfig)));
    return new Boilerplate(arch, manifest, Object.assign({
        pathMapper (itemPath) {
            return pathJoin(archPath[arch], itemPath);
        },
        baseDataExtension: {
            additionalStaticJs: (Object.entries(additionalStaticJs) || []).map(function([pathname, contents]) {
                return {
                    pathname: pathname,
                    contents: contents
                };
            }),
            // Convert to a JSON string, then get rid of most weird characters, then
            // wrap in double quotes. (The outermost JSON.stringify really ought to
            // just be "wrap in double quotes" but we use it to be safe.) This might
            // end up inside a <script> tag so we need to be careful to not include
            // "</script>", but normal {{spacebars}} escaping escapes too much! See
            // https://github.com/meteor/meteor/issues/3730
            meteorRuntimeConfig,
            meteorRuntimeHash: sha1(meteorRuntimeConfig),
            rootUrlPathPrefix: __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '',
            bundledJsCssUrlRewriteHook: bundledJsCssUrlRewriteHook,
            sriMode: sriMode,
            inlineScriptsAllowed: WebAppInternals.inlineScriptsAllowed(),
            inline: additionalOptions.inline
        }
    }, additionalOptions));
};
// A mapping from url path to architecture (e.g. "web.browser") to static
// file information with the following fields:
// - type: the type of file to be served
// - cacheable: optionally, whether the file should be cached or not
// - sourceMapUrl: optionally, the url of the source map
//
// Info also contains one of the following:
// - content: the stringified content that should be served at this path
// - absolutePath: the absolute path on disk to the file
// Serve static files from the manifest or added with
// `addStaticJs`. Exported for tests.
WebAppInternals.staticFilesMiddleware = function(staticFilesByArch, req, res, next) {
    return _async_to_generator(function*() {
        var _Meteor_settings_packages_webapp, _Meteor_settings_packages;
        var pathname = parseRequest(req).pathname;
        try {
            pathname = decodeURIComponent(pathname);
        } catch (e) {
            next();
            return;
        }
        var serveStaticJs = function(s) {
            var _Meteor_settings_packages_webapp, _Meteor_settings_packages;
            if (req.method === 'GET' || req.method === 'HEAD' || ((_Meteor_settings_packages = Meteor.settings.packages) === null || _Meteor_settings_packages === void 0 ? void 0 : (_Meteor_settings_packages_webapp = _Meteor_settings_packages.webapp) === null || _Meteor_settings_packages_webapp === void 0 ? void 0 : _Meteor_settings_packages_webapp.alwaysReturnContent)) {
                res.writeHead(200, {
                    'Content-type': 'application/javascript; charset=UTF-8',
                    'Content-Length': Buffer.byteLength(s)
                });
                res.write(s);
                res.end();
            } else {
                const status = req.method === 'OPTIONS' ? 200 : 405;
                res.writeHead(status, {
                    Allow: 'OPTIONS, GET, HEAD',
                    'Content-Length': '0'
                });
                res.end();
            }
        };
        if (pathname in additionalStaticJs && !WebAppInternals.inlineScriptsAllowed()) {
            serveStaticJs(additionalStaticJs[pathname]);
            return;
        }
        const { arch, path } = WebApp.categorizeRequest(req);
        if (!hasOwn.call(WebApp.clientPrograms, arch)) {
            // We could come here in case we run with some architectures excluded
            next();
            return;
        }
        // If pauseClient(arch) has been called, program.paused will be a
        // Promise that will be resolved when the program is unpaused.
        const program = WebApp.clientPrograms[arch];
        yield program.paused;
        if (path === '/meteor_runtime_config.js' && !WebAppInternals.inlineScriptsAllowed()) {
            serveStaticJs(`__meteor_runtime_config__ = ${program.meteorRuntimeConfig};`);
            return;
        }
        const info = getStaticFileInfo(staticFilesByArch, pathname, path, arch);
        if (!info) {
            next();
            return;
        }
        // "send" will handle HEAD & GET requests
        if (req.method !== 'HEAD' && req.method !== 'GET' && !((_Meteor_settings_packages = Meteor.settings.packages) === null || _Meteor_settings_packages === void 0 ? void 0 : (_Meteor_settings_packages_webapp = _Meteor_settings_packages.webapp) === null || _Meteor_settings_packages_webapp === void 0 ? void 0 : _Meteor_settings_packages_webapp.alwaysReturnContent)) {
            const status = req.method === 'OPTIONS' ? 200 : 405;
            res.writeHead(status, {
                Allow: 'OPTIONS, GET, HEAD',
                'Content-Length': '0'
            });
            res.end();
            return;
        }
        // We don't need to call pause because, unlike 'static', once we call into
        // 'send' and yield to the event loop, we never call another handler with
        // 'next'.
        // Cacheable files are files that should never change. Typically
        // named by their hash (eg meteor bundled js and css files).
        // We cache them ~forever (1yr).
        const maxAge = info.cacheable ? 1000 * 60 * 60 * 24 * 365 : 0;
        if (info.cacheable) {
            // Since we use req.headers["user-agent"] to determine whether the
            // client should receive modern or legacy resources, tell the client
            // to invalidate cached resources when/if its user agent string
            // changes in the future.
            res.setHeader('Vary', 'User-Agent');
        }
        // Set the X-SourceMap header, which current Chrome, FireFox, and Safari
        // understand.  (The SourceMap header is slightly more spec-correct but FF
        // doesn't understand it.)
        //
        // You may also need to enable source maps in Chrome: open dev tools, click
        // the gear in the bottom right corner, and select "enable source maps".
        if (info.sourceMapUrl) {
            res.setHeader('X-SourceMap', __meteor_runtime_config__.ROOT_URL_PATH_PREFIX + info.sourceMapUrl);
        }
        if (info.type === 'js' || info.type === 'dynamic js') {
            res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
        } else if (info.type === 'css') {
            res.setHeader('Content-Type', 'text/css; charset=UTF-8');
        } else if (info.type === 'json') {
            res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        }
        if (info.hash) {
            res.setHeader('ETag', '"' + info.hash + '"');
        }
        if (info.content) {
            res.setHeader('Content-Length', Buffer.byteLength(info.content));
            res.write(info.content);
            res.end();
        } else {
            send(req, info.absolutePath, {
                maxage: maxAge,
                dotfiles: 'allow',
                lastModified: false
            }).on('error', function(err) {
                Log.error('Error serving static file ' + err);
                res.writeHead(500);
                res.end();
            }).on('directory', function() {
                Log.error('Unexpected directory ' + info.absolutePath);
                res.writeHead(500);
                res.end();
            }).pipe(res);
        }
    })();
};
function getStaticFileInfo(staticFilesByArch, originalPath, path, arch) {
    if (!hasOwn.call(WebApp.clientPrograms, arch)) {
        return null;
    }
    // Get a list of all available static file architectures, with arch
    // first in the list if it exists.
    const staticArchList = Object.keys(staticFilesByArch);
    const archIndex = staticArchList.indexOf(arch);
    if (archIndex > 0) {
        staticArchList.unshift(staticArchList.splice(archIndex, 1)[0]);
    }
    let info = null;
    staticArchList.some((arch)=>{
        const staticFiles = staticFilesByArch[arch];
        function finalize(path) {
            info = staticFiles[path];
            // Sometimes we register a lazy function instead of actual data in
            // the staticFiles manifest.
            if (typeof info === 'function') {
                info = staticFiles[path] = info();
            }
            return info;
        }
        // If staticFiles contains originalPath with the arch inferred above,
        // use that information.
        if (hasOwn.call(staticFiles, originalPath)) {
            return finalize(originalPath);
        }
        // If categorizeRequest returned an alternate path, try that instead.
        if (path !== originalPath && hasOwn.call(staticFiles, path)) {
            return finalize(path);
        }
    });
    return info;
}
// Parse the passed in port value. Return the port as-is if it's a String
// (e.g. a Windows Server style named pipe), otherwise return the port as an
// integer.
//
// DEPRECATED: Direct use of this function is not recommended; it is no
// longer used internally, and will be removed in a future release.
WebAppInternals.parsePort = (port)=>{
    let parsedPort = parseInt(port);
    if (Number.isNaN(parsedPort)) {
        parsedPort = port;
    }
    return parsedPort;
};

onMessage('webapp-pause-client', ({ arch })=>_async_to_generator(function*() {
        yield WebAppInternals.pauseClient(arch);
    })());
onMessage('webapp-reload-client', ({ arch })=>_async_to_generator(function*() {
        yield WebAppInternals.generateClientProgram(arch);
    })());
function runWebAppServer() {
    return _async_to_generator(function*() {
        var shuttingDown = false;
        var syncQueue = new Meteor._AsynchronousQueue();
        var getItemPathname = function(itemUrl) {
            return decodeURIComponent(parseUrl(itemUrl).pathname);
        };
        WebAppInternals.reloadClientPrograms = function() {
            return _async_to_generator(function*() {
                yield syncQueue.runTask(function() {
                    const staticFilesByArch = Object.create(null);
                    const { configJson } = __meteor_bootstrap__;
                    const clientArchs = configJson.clientArchs || Object.keys(configJson.clientPaths);
                    try {
                        clientArchs.forEach((arch)=>{
                            generateClientProgram(arch, staticFilesByArch);
                        });
                        WebAppInternals.staticFilesByArch = staticFilesByArch;
                    } catch (e) {
                        Log.error('Error reloading the client program: ' + e.stack);
                        process.exit(1);
                    }
                });
            })();
        };
        // Pause any incoming requests and make them wait for the program to be
        // unpaused the next time generateClientProgram(arch) is called.
        WebAppInternals.pauseClient = function(arch) {
            return _async_to_generator(function*() {
                yield syncQueue.runTask(()=>{
                    const program = WebApp.clientPrograms[arch];
                    const { unpause } = program;
                    program.paused = new Promise((resolve)=>{
                        if (typeof unpause === 'function') {
                            // If there happens to be an existing program.unpause function,
                            // compose it with the resolve function.
                            program.unpause = function() {
                                unpause();
                                resolve();
                            };
                        } else {
                            program.unpause = resolve;
                        }
                    });
                });
            })();
        };
        WebAppInternals.generateClientProgram = function(arch) {
            return _async_to_generator(function*() {
                yield syncQueue.runTask(()=>generateClientProgram(arch));
            })();
        };
        function generateClientProgram(arch, staticFilesByArch = WebAppInternals.staticFilesByArch) {
            const clientDir = pathJoin(pathDirname(__meteor_bootstrap__.serverDir), arch);
            // read the control for the client we'll be serving up
            const programJsonPath = pathJoin(clientDir, 'program.json');
            let programJson;
            try {
                programJson = JSON.parse(readFileSync(programJsonPath));
            } catch (e) {
                if (e.code === 'ENOENT') return;
                throw e;
            }
            if (programJson.format !== 'web-program-pre1') {
                throw new Error('Unsupported format for client assets: ' + JSON.stringify(programJson.format));
            }
            if (!programJsonPath || !clientDir || !programJson) {
                throw new Error('Client config file not parsed.');
            }
            archPath[arch] = clientDir;
            const staticFiles = staticFilesByArch[arch] = Object.create(null);
            const { manifest } = programJson;
            manifest.forEach((item)=>{
                if (item.url && item.where === 'client') {
                    staticFiles[getItemPathname(item.url)] = {
                        absolutePath: pathJoin(clientDir, item.path),
                        cacheable: item.cacheable,
                        hash: item.hash,
                        // Link from source to its map
                        sourceMapUrl: item.sourceMapUrl,
                        type: item.type
                    };
                    if (item.sourceMap) {
                        // Serve the source map too, under the specified URL. We assume
                        // all source maps are cacheable.
                        staticFiles[getItemPathname(item.sourceMapUrl)] = {
                            absolutePath: pathJoin(clientDir, item.sourceMap),
                            cacheable: true
                        };
                    }
                }
            });
            const { PUBLIC_SETTINGS } = __meteor_runtime_config__;
            const configOverrides = {
                PUBLIC_SETTINGS
            };
            const oldProgram = WebApp.clientPrograms[arch];
            const newProgram = WebApp.clientPrograms[arch] = {
                format: 'web-program-pre1',
                manifest: manifest,
                // Use arrow functions so that these versions can be lazily
                // calculated later, and so that they will not be included in the
                // staticFiles[manifestUrl].content string below.
                //
                // Note: these version calculations must be kept in agreement with
                // CordovaBuilder#appendVersion in tools/cordova/builder.js, or hot
                // code push will reload Cordova apps unnecessarily.
                version: ()=>WebAppHashing.calculateClientHash(manifest, null, configOverrides),
                versionRefreshable: ()=>WebAppHashing.calculateClientHash(manifest, (type)=>type === 'css', configOverrides),
                versionNonRefreshable: ()=>WebAppHashing.calculateClientHash(manifest, (type, replaceable)=>type !== 'css' && !replaceable, configOverrides),
                versionReplaceable: ()=>WebAppHashing.calculateClientHash(manifest, (_type, replaceable)=>replaceable, configOverrides),
                cordovaCompatibilityVersions: programJson.cordovaCompatibilityVersions,
                PUBLIC_SETTINGS,
                hmrVersion: programJson.hmrVersion
            };
            // Expose program details as a string reachable via the following URL.
            const manifestUrlPrefix = '/__' + arch.replace(/^web\./, '');
            const manifestUrl = manifestUrlPrefix + getItemPathname('/manifest.json');
            staticFiles[manifestUrl] = ()=>{
                if (Package.autoupdate) {
                    const { AUTOUPDATE_VERSION = Package.autoupdate.Autoupdate.autoupdateVersion } = process.env;
                    if (AUTOUPDATE_VERSION) {
                        newProgram.version = AUTOUPDATE_VERSION;
                    }
                }
                if (typeof newProgram.version === 'function') {
                    newProgram.version = newProgram.version();
                }
                return {
                    content: JSON.stringify(newProgram),
                    cacheable: false,
                    hash: newProgram.version,
                    type: 'json'
                };
            };
            generateBoilerplateForArch(arch);
            // If there are any requests waiting on oldProgram.paused, let them
            // continue now (using the new program).
            if (oldProgram && oldProgram.paused) {
                oldProgram.unpause();
            }
        }
        const defaultOptionsForArch = {
            'web.cordova': {
                runtimeConfigOverrides: {
                    // XXX We use absoluteUrl() here so that we serve https://
                    // URLs to cordova clients if force-ssl is in use. If we were
                    // to use __meteor_runtime_config__.ROOT_URL instead of
                    // absoluteUrl(), then Cordova clients would immediately get a
                    // HCP setting their DDP_DEFAULT_CONNECTION_URL to
                    // http://example.meteor.com. This breaks the app, because
                    // force-ssl doesn't serve CORS headers on 302
                    // redirects. (Plus it's undesirable to have clients
                    // connecting to http://example.meteor.com when force-ssl is
                    // in use.)
                    DDP_DEFAULT_CONNECTION_URL: process.env.MOBILE_DDP_URL || Meteor.absoluteUrl(),
                    ROOT_URL: process.env.MOBILE_ROOT_URL || Meteor.absoluteUrl()
                }
            },
            'web.browser': {
                runtimeConfigOverrides: {
                    isModern: true
                }
            },
            'web.browser.legacy': {
                runtimeConfigOverrides: {
                    isModern: false
                }
            }
        };
        WebAppInternals.generateBoilerplate = function() {
            return _async_to_generator(function*() {
                // This boilerplate will be served to the mobile devices when used with
                // Meteor/Cordova for the Hot-Code Push and since the file will be served by
                // the device's server, it is important to set the DDP url to the actual
                // Meteor server accepting DDP connections and not the device's file server.
                yield syncQueue.runTask(function() {
                    Object.keys(WebApp.clientPrograms).forEach(generateBoilerplateForArch);
                });
            })();
        };
        function generateBoilerplateForArch(arch) {
            const program = WebApp.clientPrograms[arch];
            const additionalOptions = defaultOptionsForArch[arch] || {};
            const { baseData } = boilerplateByArch[arch] = WebAppInternals.generateBoilerplateInstance(arch, program.manifest, additionalOptions);
            // We need the runtime config with overrides for meteor_runtime_config.js:
            program.meteorRuntimeConfig = JSON.stringify(_object_spread({}, __meteor_runtime_config__, additionalOptions.runtimeConfigOverrides || null));
            program.refreshableAssets = baseData.css.map((file)=>({
                    url: bundledJsCssUrlRewriteHook(file.url)
                }));
        }
        yield WebAppInternals.reloadClientPrograms();
        // webserver
        var app = createExpressApp();
        // Packages and apps can add handlers that run before any other Meteor
        // handlers via WebApp.rawExpressHandlers.
        var rawExpressHandlers = createExpressApp();
        app.use(rawExpressHandlers);
        // Auto-compress any json, javascript, or text.
        app.use(compress({
            filter: shouldCompress
        }));
        // parse cookies into an object
        app.use(cookieParser());
        // We're not a proxy; reject (without crashing) attempts to treat us like
        // one. (See #1212.)
        app.use(function(req, res, next) {
            if (RoutePolicy.isValidUrl(req.url)) {
                next();
                return;
            }
            res.writeHead(400);
            res.write('Not a proxy');
            res.end();
        });
        function getPathParts(path) {
            const parts = path.split('/');
            while(parts[0] === '')parts.shift();
            return parts;
        }
        function isPrefixOf(prefix, array) {
            return prefix.length <= array.length && prefix.every((part, i)=>part === array[i]);
        }
        // Strip off the path prefix, if it exists.
        app.use(function(request, response, next) {
            const pathPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX;
            const { pathname, search } = parseUrl(request.url);
            // check if the path in the url starts with the path prefix
            if (pathPrefix) {
                const prefixParts = getPathParts(pathPrefix);
                const pathParts = getPathParts(pathname);
                if (isPrefixOf(prefixParts, pathParts)) {
                    request.url = '/' + pathParts.slice(prefixParts.length).join('/');
                    if (search) {
                        request.url += search;
                    }
                    return next();
                }
            }
            if (pathname === '/favicon.ico' || pathname === '/robots.txt') {
                return next();
            }
            if (pathPrefix) {
                response.writeHead(404);
                response.write('Unknown path');
                response.end();
                return;
            }
            next();
        });
        // Serve static files from the manifest.
        // This is inspired by the 'static' middleware.
        app.use(function(req, res, next) {
            // console.log(String(arguments.callee));
            WebAppInternals.staticFilesMiddleware(WebAppInternals.staticFilesByArch, req, res, next);
        });
        // Core Meteor packages like dynamic-import can add handlers before
        // other handlers added by package and application code.
        app.use(WebAppInternals.meteorInternalHandlers = createExpressApp());
        /**
   * @name expressHandlersCallback(req, res, next)
   * @locus Server
   * @isprototype true
   * @summary callback handler for `WebApp.expressHandlers`
   * @param {Object} req
   * a Node.js
   * [IncomingMessage](https://nodejs.org/api/http.html#class-httpincomingmessage)
   * object with some extra properties. This argument can be used
   *  to get information about the incoming request.
   * @param {Object} res
   * a Node.js
   * [ServerResponse](https://nodejs.org/api/http.html#class-httpserverresponse)
   * object. Use this to write data that should be sent in response to the
   * request, and call `res.end()` when you are done.
   * @param {Function} next
   * Calling this function will pass on the handling of
   * this request to the next relevant handler.
   *
   */ /**
   * @method handlers
   * @memberof WebApp
   * @locus Server
   * @summary Register a handler for all HTTP requests.
   * @param {String} [path]
   * This handler will only be called on paths that match
   * this string. The match has to border on a `/` or a `.`.
   *
   * For example, `/hello` will match `/hello/world` and
   * `/hello.world`, but not `/hello_world`.
   * @param {expressHandlersCallback} handler
   * A handler function that will be called on HTTP requests.
   * See `expressHandlersCallback`
   *
   */ // Packages and apps can add handlers to this via WebApp.expressHandlers.
        // They are inserted before our default handler.
        var packageAndAppHandlers = createExpressApp();
        app.use(packageAndAppHandlers);
        let suppressExpressErrors = false;
        // Express knows it is an error handler because it has 4 arguments instead of
        // 3. go figure.  (It is not smart enough to find such a thing if it's hidden
        // inside packageAndAppHandlers.)
        app.use(function(err, req, res, next) {
            if (!err || !suppressExpressErrors || !req.headers['x-suppress-error']) {
                next(err);
                return;
            }
            res.writeHead(err.status, {
                'Content-Type': 'text/plain'
            });
            res.end('An error message');
        });
        app.use(function(req, res, next) {
            return _async_to_generator(function*() {
                var _Meteor_settings_packages_webapp, _Meteor_settings_packages;
                if (!appUrl(req.url)) {
                    return next();
                } else if (req.method !== 'HEAD' && req.method !== 'GET' && !((_Meteor_settings_packages = Meteor.settings.packages) === null || _Meteor_settings_packages === void 0 ? void 0 : (_Meteor_settings_packages_webapp = _Meteor_settings_packages.webapp) === null || _Meteor_settings_packages_webapp === void 0 ? void 0 : _Meteor_settings_packages_webapp.alwaysReturnContent)) {
                    const status = req.method === 'OPTIONS' ? 200 : 405;
                    res.writeHead(status, {
                        Allow: 'OPTIONS, GET, HEAD',
                        'Content-Length': '0'
                    });
                    res.end();
                } else {
                    var headers = {
                        'Content-Type': 'text/html; charset=utf-8'
                    };
                    if (shuttingDown) {
                        headers['Connection'] = 'Close';
                    }
                    var request = WebApp.categorizeRequest(req);
                    var response = res;
                    if (request.url.query && request.url.query['meteor_css_resource']) {
                        // In this case, we're requesting a CSS resource in the meteor-specific
                        // way, but we don't have it.  Serve a static css file that indicates that
                        // we didn't have it, so we can detect that and refresh.  Make sure
                        // that any proxies or CDNs don't cache this error!  (Normally proxies
                        // or CDNs are smart enough not to cache error pages, but in order to
                        // make this hack work, we need to return the CSS file as a 200, which
                        // would otherwise be cached.)
                        headers['Content-Type'] = 'text/css; charset=utf-8';
                        headers['Cache-Control'] = 'no-cache';
                        res.writeHead(200, headers);
                        res.write('.meteor-css-not-found-error { width: 0px;}');
                        res.end();
                        return;
                    }
                    if (request.url.query && request.url.query['meteor_js_resource']) {
                        // Similarly, we're requesting a JS resource that we don't have.
                        // Serve an uncached 404. (We can't use the same hack we use for CSS,
                        // because actually acting on that hack requires us to have the JS
                        // already!)
                        headers['Cache-Control'] = 'no-cache';
                        res.writeHead(404, headers);
                        res.end('404 Not Found');
                        return;
                    }
                    if (request.url.query && request.url.query['meteor_dont_serve_index']) {
                        // When downloading files during a Cordova hot code push, we need
                        // to detect if a file is not available instead of inadvertently
                        // downloading the default index page.
                        // So similar to the situation above, we serve an uncached 404.
                        headers['Cache-Control'] = 'no-cache';
                        res.writeHead(404, headers);
                        res.end('404 Not Found');
                        return;
                    }
                    const { arch } = request;
                    assert.strictEqual(typeof arch, 'string', {
                        arch
                    });
                    if (!hasOwn.call(WebApp.clientPrograms, arch)) {
                        // We could come here in case we run with some architectures excluded
                        headers['Cache-Control'] = 'no-cache';
                        res.writeHead(404, headers);
                        if (Meteor.isDevelopment) {
                            res.end(`No client program found for the ${arch} architecture.`);
                        } else {
                            // Safety net, but this branch should not be possible.
                            res.end('404 Not Found');
                        }
                        return;
                    }
                    // If pauseClient(arch) has been called, program.paused will be a
                    // Promise that will be resolved when the program is unpaused.
                    yield WebApp.clientPrograms[arch].paused;
                    return getBoilerplateAsync(request, arch, response).then(({ stream, statusCode, headers: newHeaders })=>{
                        if (!statusCode) {
                            statusCode = res.statusCode ? res.statusCode : 200;
                        }
                        if (newHeaders) {
                            Object.assign(headers, newHeaders);
                        }
                        res.writeHead(statusCode, headers);
                        if (!disableBoilerplateResponse) {
                            stream.pipe(res, {
                                // End the response when the stream ends.
                                end: true
                            });
                        }
                    }).catch((error)=>{
                        Log.error('Error running template: ' + error.stack);
                        res.writeHead(500, headers);
                        res.end();
                    });
                }
            })();
        });
        // Return 404 by default, if no other handlers serve this URL.
        app.use(function(req, res) {
            res.writeHead(404);
            res.end();
        });
        var httpServer = createServer(app);
        var onListeningCallbacks = [];
        // After 5 seconds w/o data on a socket, kill it.  On the other hand, if
        // there's an outstanding request, give it a higher timeout instead (to avoid
        // killing long-polling requests)
        httpServer.setTimeout(SHORT_SOCKET_TIMEOUT);
        // Do this here, and then also in livedata/stream_server.js, because
        // stream_server.js kills all the current request handlers when installing its
        // own.
        httpServer.on('request', WebApp._timeoutAdjustmentRequestCallback);
        // If the client gave us a bad request, tell it instead of just closing the
        // socket. This lets load balancers in front of us differentiate between "a
        // server is randomly closing sockets for no reason" and "client sent a bad
        // request".
        //
        // This will only work on Node 6; Node 4 destroys the socket before calling
        // this event. See https://github.com/nodejs/node/pull/4557/ for details.
        httpServer.on('clientError', (err, socket)=>{
            // Pre-Node-6, do nothing.
            if (socket.destroyed) {
                return;
            }
            if (err.message === 'Parse Error') {
                socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
            } else {
                // For other errors, use the default behavior as if we had no clientError
                // handler.
                socket.destroy(err);
            }
        });
        const suppressErrors = function() {
            suppressExpressErrors = true;
        };
        let warnedAboutConnectUsage = false;
        // start up app
        Object.assign(WebApp, {
            connectHandlers: packageAndAppHandlers,
            handlers: packageAndAppHandlers,
            rawConnectHandlers: rawExpressHandlers,
            rawHandlers: rawExpressHandlers,
            httpServer: httpServer,
            expressApp: app,
            // For testing.
            suppressConnectErrors: ()=>{
                if (!warnedAboutConnectUsage) {
                    Meteor._debug("WebApp.suppressConnectErrors has been renamed to Meteor._suppressExpressErrors and it should be used only in tests.");
                    warnedAboutConnectUsage = true;
                }
                suppressErrors();
            },
            _suppressExpressErrors: suppressErrors,
            onListening: function(f) {
                if (onListeningCallbacks) onListeningCallbacks.push(f);
                else f();
            },
            // This can be overridden by users who want to modify how listening works
            // (eg, to run a proxy like Apollo Engine Proxy in front of the server).
            startListening: function(httpServer, listenOptions, cb) {
                httpServer.listen(listenOptions, cb);
            }
        });
        /**
   * @name main
   * @locus Server
   * @summary Starts the HTTP server.
   *  If `UNIX_SOCKET_PATH` is present Meteor's HTTP server will use that socket file for inter-process communication, instead of TCP.
   * If you choose to not include webapp package in your application this method still must be defined for your Meteor application to work.
   */ // Let the rest of the packages (and Meteor.startup hooks) insert Express
        // middlewares and update __meteor_runtime_config__, then keep going to set up
        // actually serving HTML.
        exports.main = (argv)=>_async_to_generator(function*() {
                yield WebAppInternals.generateBoilerplate();
                const startHttpServer = (listenOptions)=>{
                    WebApp.startListening((argv === null || argv === void 0 ? void 0 : argv.httpServer) || httpServer, listenOptions, Meteor.bindEnvironment(()=>{
                        if (process.env.METEOR_PRINT_ON_LISTEN) {
                            console.log('LISTENING');
                        }
                        const callbacks = onListeningCallbacks;
                        onListeningCallbacks = null;
                        callbacks === null || callbacks === void 0 ? void 0 : callbacks.forEach((callback)=>{
                            callback();
                        });
                    }, (e)=>{
                        console.error('Error listening:', e);
                        console.error(e && e.stack);
                    }));
                };
                let localPort = process.env.PORT || 0;
                let unixSocketPath = process.env.UNIX_SOCKET_PATH;
                if (unixSocketPath) {
                    if (cluster.isWorker) {
                        const workerName = cluster.worker.process.env.name || cluster.worker.id;
                        unixSocketPath += '.' + workerName + '.sock';
                    }
                    // Start the HTTP server using a socket file.
                    removeExistingSocketFile(unixSocketPath);
                    startHttpServer({
                        path: unixSocketPath
                    });
                    const unixSocketPermissions = (process.env.UNIX_SOCKET_PERMISSIONS || '').trim();
                    if (unixSocketPermissions) {
                        if (/^[0-7]{3}$/.test(unixSocketPermissions)) {
                            chmodSync(unixSocketPath, parseInt(unixSocketPermissions, 8));
                        } else {
                            throw new Error('Invalid UNIX_SOCKET_PERMISSIONS specified');
                        }
                    }
                    const unixSocketGroup = (process.env.UNIX_SOCKET_GROUP || '').trim();
                    if (unixSocketGroup) {
                        const unixSocketGroupInfo = getGroupInfo(unixSocketGroup);
                        if (unixSocketGroupInfo === null) {
                            throw new Error('Invalid UNIX_SOCKET_GROUP name specified');
                        }
                        chownSync(unixSocketPath, userInfo().uid, unixSocketGroupInfo.gid);
                    }
                    registerSocketFileCleanup(unixSocketPath);
                } else {
                    localPort = isNaN(Number(localPort)) ? localPort : Number(localPort);
                    if (/\\\\?.+\\pipe\\?.+/.test(localPort)) {
                        // Start the HTTP server using Windows Server style named pipe.
                        startHttpServer({
                            path: localPort
                        });
                    } else if (typeof localPort === 'number') {
                        // Start the HTTP server using TCP.
                        startHttpServer({
                            port: localPort,
                            host: process.env.BIND_IP || '0.0.0.0'
                        });
                    } else {
                        throw new Error('Invalid PORT specified');
                    }
                }
                return 'DAEMON';
            })();
    })();
}
const isGetentAvailable = ()=>{
    try {
        execSync('which getent');
        return true;
    } catch (e) {
        return false;
    }
};
const getGroupInfoUsingGetent = (groupName)=>{
    try {
        const stdout = execSync(`getent group ${groupName}`, {
            encoding: 'utf8'
        });
        if (!stdout) return null;
        const [name, , gid] = stdout.trim().split(':');
        if (name == null || gid == null) return null;
        return {
            name,
            gid: Number(gid)
        };
    } catch (error) {
        return null;
    }
};
const getGroupInfoFromFile = (groupName)=>{
    try {
        const data = readFileSync('/etc/group', 'utf8');
        const groupLine = data.trim().split('\n').find((line)=>line.startsWith(`${groupName}:`));
        if (!groupLine) return null;
        const [name, , gid] = groupLine.trim().split(':');
        if (name == null || gid == null) return null;
        return {
            name,
            gid: Number(gid)
        };
    } catch (error) {
        return null;
    }
};
const getGroupInfo = (groupName)=>{
    let groupInfo = getGroupInfoFromFile(groupName);
    if (!groupInfo && isGetentAvailable()) {
        groupInfo = getGroupInfoUsingGetent(groupName);
    }
    return groupInfo;
};
var inlineScriptsAllowed = true;
WebAppInternals.inlineScriptsAllowed = function() {
    return inlineScriptsAllowed;
};
WebAppInternals.setInlineScriptsAllowed = function(value) {
    return _async_to_generator(function*() {
        inlineScriptsAllowed = value;
        yield WebAppInternals.generateBoilerplate();
    })();
};
var sriMode;
WebAppInternals.enableSubresourceIntegrity = function(use_credentials = false) {
    return _async_to_generator(function*() {
        sriMode = use_credentials ? 'use-credentials' : 'anonymous';
        yield WebAppInternals.generateBoilerplate();
    })();
};
WebAppInternals.setBundledJsCssUrlRewriteHook = function(hookFn) {
    return _async_to_generator(function*() {
        bundledJsCssUrlRewriteHook = hookFn;
        yield WebAppInternals.generateBoilerplate();
    })();
};
WebAppInternals.setBundledJsCssPrefix = function(prefix) {
    return _async_to_generator(function*() {
        var self = this;
        yield self.setBundledJsCssUrlRewriteHook(function(url) {
            return prefix + url;
        });
    }).call(this);
};
// Packages can call `WebAppInternals.addStaticJs` to specify static
// JavaScript to be included in the app. This static JS will be inlined,
// unless inline scripts have been disabled, in which case it will be
// served under `/<sha1 of contents>`.
var additionalStaticJs = {};
WebAppInternals.addStaticJs = function(contents) {
    additionalStaticJs['/' + sha1(contents) + '.js'] = contents;
};
var disableBoilerplateResponse = false;
WebAppInternals.disableBoilerplateResponse = function() {
    disableBoilerplateResponse = true;
};
// Exported for tests
WebAppInternals.getBoilerplate = getBoilerplate;
WebAppInternals.additionalStaticJs = additionalStaticJs;
await runWebAppServer();
//*/
__reifyAsyncResult__();} catch (_reifyError) { __reifyAsyncResult__(_reifyError); }}, { self: this, async: true });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"socket_file.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/webapp/socket_file.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!module.wrapAsync(async function (module, __reifyWaitForDeps__, __reifyAsyncResult__) {"use strict"; try {module.export({removeExistingSocketFile:()=>removeExistingSocketFile,registerSocketFileCleanup:()=>registerSocketFileCleanup},true);let statSync,unlinkSync,existsSync;module.link('fs',{statSync(v){statSync=v},unlinkSync(v){unlinkSync=v},existsSync(v){existsSync=v}},0);if (__reifyWaitForDeps__()) (await __reifyWaitForDeps__())();
// Since a new socket file will be created when the HTTP server
// starts up, if found remove the existing file.
//
// WARNING:
// This will remove the configured socket file without warning. If
// the configured socket file is already in use by another application,
// it will still be removed. Node does not provide a reliable way to
// differentiate between a socket file that is already in use by
// another application or a stale socket file that has been
// left over after a SIGKILL. Since we have no reliable way to
// differentiate between these two scenarios, the best course of
// action during startup is to remove any existing socket file. This
// is not the safest course of action as removing the existing socket
// file could impact an application using it, but this approach helps
// ensure the HTTP server can startup without manual
// intervention (e.g. asking for the verification and cleanup of socket
// files before allowing the HTTP server to be started).
//
// The above being said, as long as the socket file path is
// configured carefully when the application is deployed (and extra
// care is taken to make sure the configured path is unique and doesn't
// conflict with another socket file path), then there should not be
// any issues with this approach.
const removeExistingSocketFile = (socketPath)=>{
    try {
        if (statSync(socketPath).isSocket()) {
            // Since a new socket file will be created, remove the existing
            // file.
            unlinkSync(socketPath);
        } else {
            throw new Error(`An existing file was found at "${socketPath}" and it is not ` + 'a socket file. Please confirm PORT is pointing to valid and ' + 'un-used socket file path.');
        }
    } catch (error) {
        // If there is no existing socket file to cleanup, great, we'll
        // continue normally. If the caught exception represents any other
        // issue, re-throw.
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
};
// Remove the socket file when done to avoid leaving behind a stale one.
// Note - a stale socket file is still left behind if the running node
// process is killed via signal 9 - SIGKILL.
const registerSocketFileCleanup = (socketPath, eventEmitter = process)=>{
    [
        'exit',
        'SIGINT',
        'SIGHUP',
        'SIGTERM'
    ].forEach((signal)=>{
        eventEmitter.on(signal, Meteor.bindEnvironment(()=>{
            if (existsSync(socketPath)) {
                unlinkSync(socketPath);
            }
        }));
    });
};
//*/
__reifyAsyncResult__();} catch (_reifyError) { __reifyAsyncResult__(_reifyError); }}, { self: this, async: false });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"express":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/express/package.json                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "express",
  "version": "5.1.0"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/express/index.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"compression":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/compression/package.json                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "compression",
  "version": "1.7.4"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/compression/index.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"cookie-parser":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/cookie-parser/package.json                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "cookie-parser",
  "version": "1.4.6"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/cookie-parser/index.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"qs":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/qs/package.json                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "qs",
  "version": "6.13.0",
  "main": "lib/index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/qs/lib/index.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"parseurl":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/parseurl/package.json                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "parseurl",
  "version": "1.3.3"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/parseurl/index.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"useragent-ng":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/useragent-ng/package.json                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "useragent-ng",
  "version": "2.4.4",
  "main": "./index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/useragent-ng/index.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"send":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/send/package.json                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "send",
  "version": "1.1.0"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/webapp/node_modules/send/index.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});


/* Exports */
return {
  export: function () { return {
      WebApp: WebApp,
      WebAppInternals: WebAppInternals,
      main: main
    };},
  require: require,
  eagerModulePaths: [
    "/node_modules/meteor/webapp/webapp_server.js"
  ],
  mainModulePath: "/node_modules/meteor/webapp/webapp_server.js"
}});

//# sourceURL=meteor://💻app/packages/webapp.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvd2ViYXBwL3dlYmFwcF9zZXJ2ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3dlYmFwcC9zb2NrZXRfZmlsZS5qcyJdLCJuYW1lcyI6WyJTSE9SVF9TT0NLRVRfVElNRU9VVCIsIkxPTkdfU09DS0VUX1RJTUVPVVQiLCJjcmVhdGVFeHByZXNzQXBwIiwiYXBwIiwiZXhwcmVzcyIsInNldCIsInFzIiwicGFyc2UiLCJXZWJBcHAiLCJXZWJBcHBJbnRlcm5hbHMiLCJoYXNPd24iLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsIk5wbU1vZHVsZXMiLCJ2ZXJzaW9uIiwiTnBtIiwicmVxdWlyZSIsIm1vZHVsZSIsImRlZmF1bHRBcmNoIiwiY2xpZW50UHJvZ3JhbXMiLCJhcmNoUGF0aCIsImJ1bmRsZWRKc0Nzc1VybFJld3JpdGVIb29rIiwidXJsIiwiYnVuZGxlZFByZWZpeCIsIl9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18iLCJST09UX1VSTF9QQVRIX1BSRUZJWCIsInNoYTEiLCJjb250ZW50cyIsImhhc2giLCJjcmVhdGVIYXNoIiwidXBkYXRlIiwiZGlnZXN0Iiwic2hvdWxkQ29tcHJlc3MiLCJyZXEiLCJyZXMiLCJoZWFkZXJzIiwiY29tcHJlc3MiLCJmaWx0ZXIiLCJjYW1lbENhc2UiLCJuYW1lIiwicGFydHMiLCJzcGxpdCIsInRvTG93ZXJDYXNlIiwiaSIsImxlbmd0aCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyaW5nIiwiam9pbiIsImlkZW50aWZ5QnJvd3NlciIsInVzZXJBZ2VudFN0cmluZyIsIm1ham9yIiwibWlub3IiLCJwYXRjaCIsInVzZXJBZ2VudCIsImxvb2t1cFVzZXJBZ2VudCIsImZhbWlseSIsImNhdGVnb3JpemVSZXF1ZXN0IiwiYnJvd3NlciIsImFyY2giLCJtb2Rlcm4iLCJpc01vZGVybiIsInBhdGgiLCJwYXRobmFtZSIsInBhcnNlUmVxdWVzdCIsImNhdGVnb3JpemVkIiwicGFyc2VVcmwiLCJkeW5hbWljSGVhZCIsImR5bmFtaWNCb2R5IiwiY29va2llcyIsInBhdGhQYXJ0cyIsImFyY2hLZXkiLCJzdGFydHNXaXRoIiwiYXJjaENsZWFuZWQiLCJzbGljZSIsImNhbGwiLCJzcGxpY2UiLCJhc3NpZ24iLCJwcmVmZXJyZWRBcmNoT3JkZXIiLCJodG1sQXR0cmlidXRlSG9va3MiLCJnZXRIdG1sQXR0cmlidXRlcyIsInJlcXVlc3QiLCJjb21iaW5lZEF0dHJpYnV0ZXMiLCJmb3JFYWNoIiwiaG9vayIsImF0dHJpYnV0ZXMiLCJFcnJvciIsImFkZEh0bWxBdHRyaWJ1dGVIb29rIiwicHVzaCIsImFwcFVybCIsIlJvdXRlUG9saWN5IiwiY2xhc3NpZnkiLCJNZXRlb3IiLCJzdGFydHVwIiwiZ2V0dGVyIiwia2V5IiwicHJvZ3JhbSIsInZhbHVlIiwiY2FsY3VsYXRlQ2xpZW50SGFzaCIsImNsaWVudEhhc2giLCJjYWxjdWxhdGVDbGllbnRIYXNoUmVmcmVzaGFibGUiLCJjYWxjdWxhdGVDbGllbnRIYXNoTm9uUmVmcmVzaGFibGUiLCJjYWxjdWxhdGVDbGllbnRIYXNoUmVwbGFjZWFibGUiLCJnZXRSZWZyZXNoYWJsZUFzc2V0cyIsIl90aW1lb3V0QWRqdXN0bWVudFJlcXVlc3RDYWxsYmFjayIsInNldFRpbWVvdXQiLCJmaW5pc2hMaXN0ZW5lcnMiLCJsaXN0ZW5lcnMiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJvbiIsInZhbHVlcyIsImwiLCJib2lsZXJwbGF0ZUJ5QXJjaCIsImJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrcyIsImNyZWF0ZSIsInJlZ2lzdGVyQm9pbGVycGxhdGVEYXRhQ2FsbGJhY2siLCJjYWxsYmFjayIsInByZXZpb3VzQ2FsbGJhY2siLCJhc3NlcnQiLCJzdHJpY3RFcXVhbCIsImdldEJvaWxlcnBsYXRlIiwiZ2V0Qm9pbGVycGxhdGVBc3luYyIsImVuY29kZVJ1bnRpbWVDb25maWciLCJydGltZUNvbmZpZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJkZWNvZGVSdW50aW1lQ29uZmlnIiwicnRpbWVDb25maWdTdHIiLCJkZWNvZGVVUklDb21wb25lbnQiLCJydW50aW1lQ29uZmlnIiwiaG9va3MiLCJIb29rIiwidXBkYXRlSG9va3MiLCJpc1VwZGF0ZWRCeUFyY2giLCJhZGRSdW50aW1lQ29uZmlnSG9vayIsInJlZ2lzdGVyIiwicmVzcG9uc2UiLCJib2lsZXJwbGF0ZSIsImZvckVhY2hBc3luYyIsIm1ldGVvclJ1bnRpbWVDb25maWciLCJlbmNvZGVkQ3VycmVudENvbmZpZyIsImJhc2VEYXRhIiwidXBkYXRlZCIsImRhdGEiLCJodG1sQXR0cmlidXRlcyIsIm1hZGVDaGFuZ2VzIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwia2V5cyIsInRoZW4iLCJyZXN1bHQiLCJzdHJlYW0iLCJ0b0hUTUxTdHJlYW0iLCJzdGF0dXNDb2RlIiwiYWRkVXBkYXRlZE5vdGlmeUhvb2siLCJoYW5kbGVyIiwiZ2VuZXJhdGVCb2lsZXJwbGF0ZUluc3RhbmNlIiwibWFuaWZlc3QiLCJhZGRpdGlvbmFsT3B0aW9ucyIsInJ1bnRpbWVDb25maWdPdmVycmlkZXMiLCJjYiIsIkJvaWxlcnBsYXRlIiwicGF0aE1hcHBlciIsIml0ZW1QYXRoIiwicGF0aEpvaW4iLCJiYXNlRGF0YUV4dGVuc2lvbiIsImFkZGl0aW9uYWxTdGF0aWNKcyIsImVudHJpZXMiLCJtYXAiLCJtZXRlb3JSdW50aW1lSGFzaCIsInJvb3RVcmxQYXRoUHJlZml4Iiwic3JpTW9kZSIsImlubGluZVNjcmlwdHNBbGxvd2VkIiwiaW5saW5lIiwic3RhdGljRmlsZXNNaWRkbGV3YXJlIiwic3RhdGljRmlsZXNCeUFyY2giLCJuZXh0IiwiZSIsInNlcnZlU3RhdGljSnMiLCJzIiwibWV0aG9kIiwic2V0dGluZ3MiLCJwYWNrYWdlcyIsIndlYmFwcCIsImFsd2F5c1JldHVybkNvbnRlbnQiLCJ3cml0ZUhlYWQiLCJCdWZmZXIiLCJieXRlTGVuZ3RoIiwid3JpdGUiLCJlbmQiLCJzdGF0dXMiLCJBbGxvdyIsInBhdXNlZCIsImluZm8iLCJnZXRTdGF0aWNGaWxlSW5mbyIsIm1heEFnZSIsImNhY2hlYWJsZSIsInNldEhlYWRlciIsInNvdXJjZU1hcFVybCIsInR5cGUiLCJjb250ZW50Iiwic2VuZCIsImFic29sdXRlUGF0aCIsIm1heGFnZSIsImRvdGZpbGVzIiwibGFzdE1vZGlmaWVkIiwiZXJyIiwiTG9nIiwiZXJyb3IiLCJwaXBlIiwib3JpZ2luYWxQYXRoIiwic3RhdGljQXJjaExpc3QiLCJhcmNoSW5kZXgiLCJpbmRleE9mIiwidW5zaGlmdCIsInNvbWUiLCJzdGF0aWNGaWxlcyIsImZpbmFsaXplIiwicGFyc2VQb3J0IiwicG9ydCIsInBhcnNlZFBvcnQiLCJwYXJzZUludCIsIk51bWJlciIsImlzTmFOIiwib25NZXNzYWdlIiwicGF1c2VDbGllbnQiLCJnZW5lcmF0ZUNsaWVudFByb2dyYW0iLCJydW5XZWJBcHBTZXJ2ZXIiLCJzaHV0dGluZ0Rvd24iLCJzeW5jUXVldWUiLCJfQXN5bmNocm9ub3VzUXVldWUiLCJnZXRJdGVtUGF0aG5hbWUiLCJpdGVtVXJsIiwicmVsb2FkQ2xpZW50UHJvZ3JhbXMiLCJydW5UYXNrIiwiY29uZmlnSnNvbiIsIl9fbWV0ZW9yX2Jvb3RzdHJhcF9fIiwiY2xpZW50QXJjaHMiLCJjbGllbnRQYXRocyIsInN0YWNrIiwicHJvY2VzcyIsImV4aXQiLCJ1bnBhdXNlIiwiY2xpZW50RGlyIiwicGF0aERpcm5hbWUiLCJzZXJ2ZXJEaXIiLCJwcm9ncmFtSnNvblBhdGgiLCJwcm9ncmFtSnNvbiIsInJlYWRGaWxlU3luYyIsImNvZGUiLCJmb3JtYXQiLCJpdGVtIiwid2hlcmUiLCJzb3VyY2VNYXAiLCJQVUJMSUNfU0VUVElOR1MiLCJjb25maWdPdmVycmlkZXMiLCJvbGRQcm9ncmFtIiwibmV3UHJvZ3JhbSIsIldlYkFwcEhhc2hpbmciLCJ2ZXJzaW9uUmVmcmVzaGFibGUiLCJ2ZXJzaW9uTm9uUmVmcmVzaGFibGUiLCJyZXBsYWNlYWJsZSIsInZlcnNpb25SZXBsYWNlYWJsZSIsIl90eXBlIiwiY29yZG92YUNvbXBhdGliaWxpdHlWZXJzaW9ucyIsImhtclZlcnNpb24iLCJtYW5pZmVzdFVybFByZWZpeCIsInJlcGxhY2UiLCJtYW5pZmVzdFVybCIsIlBhY2thZ2UiLCJhdXRvdXBkYXRlIiwiQVVUT1VQREFURV9WRVJTSU9OIiwiQXV0b3VwZGF0ZSIsImF1dG91cGRhdGVWZXJzaW9uIiwiZW52IiwiZ2VuZXJhdGVCb2lsZXJwbGF0ZUZvckFyY2giLCJkZWZhdWx0T3B0aW9uc0ZvckFyY2giLCJERFBfREVGQVVMVF9DT05ORUNUSU9OX1VSTCIsIk1PQklMRV9ERFBfVVJMIiwiYWJzb2x1dGVVcmwiLCJST09UX1VSTCIsIk1PQklMRV9ST09UX1VSTCIsImdlbmVyYXRlQm9pbGVycGxhdGUiLCJyZWZyZXNoYWJsZUFzc2V0cyIsImNzcyIsImZpbGUiLCJyYXdFeHByZXNzSGFuZGxlcnMiLCJ1c2UiLCJjb29raWVQYXJzZXIiLCJpc1ZhbGlkVXJsIiwiZ2V0UGF0aFBhcnRzIiwic2hpZnQiLCJpc1ByZWZpeE9mIiwicHJlZml4IiwiYXJyYXkiLCJldmVyeSIsInBhcnQiLCJwYXRoUHJlZml4Iiwic2VhcmNoIiwicHJlZml4UGFydHMiLCJtZXRlb3JJbnRlcm5hbEhhbmRsZXJzIiwicGFja2FnZUFuZEFwcEhhbmRsZXJzIiwic3VwcHJlc3NFeHByZXNzRXJyb3JzIiwicXVlcnkiLCJpc0RldmVsb3BtZW50IiwibmV3SGVhZGVycyIsImRpc2FibGVCb2lsZXJwbGF0ZVJlc3BvbnNlIiwiY2F0Y2giLCJodHRwU2VydmVyIiwiY3JlYXRlU2VydmVyIiwib25MaXN0ZW5pbmdDYWxsYmFja3MiLCJzb2NrZXQiLCJkZXN0cm95ZWQiLCJtZXNzYWdlIiwiZGVzdHJveSIsInN1cHByZXNzRXJyb3JzIiwid2FybmVkQWJvdXRDb25uZWN0VXNhZ2UiLCJjb25uZWN0SGFuZGxlcnMiLCJoYW5kbGVycyIsInJhd0Nvbm5lY3RIYW5kbGVycyIsInJhd0hhbmRsZXJzIiwiZXhwcmVzc0FwcCIsInN1cHByZXNzQ29ubmVjdEVycm9ycyIsIl9kZWJ1ZyIsIl9zdXBwcmVzc0V4cHJlc3NFcnJvcnMiLCJvbkxpc3RlbmluZyIsImYiLCJzdGFydExpc3RlbmluZyIsImxpc3Rlbk9wdGlvbnMiLCJsaXN0ZW4iLCJleHBvcnRzIiwibWFpbiIsImFyZ3YiLCJzdGFydEh0dHBTZXJ2ZXIiLCJiaW5kRW52aXJvbm1lbnQiLCJNRVRFT1JfUFJJTlRfT05fTElTVEVOIiwiY29uc29sZSIsImxvZyIsImNhbGxiYWNrcyIsImxvY2FsUG9ydCIsIlBPUlQiLCJ1bml4U29ja2V0UGF0aCIsIlVOSVhfU09DS0VUX1BBVEgiLCJjbHVzdGVyIiwiaXNXb3JrZXIiLCJ3b3JrZXJOYW1lIiwid29ya2VyIiwiaWQiLCJyZW1vdmVFeGlzdGluZ1NvY2tldEZpbGUiLCJ1bml4U29ja2V0UGVybWlzc2lvbnMiLCJVTklYX1NPQ0tFVF9QRVJNSVNTSU9OUyIsInRyaW0iLCJ0ZXN0IiwiY2htb2RTeW5jIiwidW5peFNvY2tldEdyb3VwIiwiVU5JWF9TT0NLRVRfR1JPVVAiLCJ1bml4U29ja2V0R3JvdXBJbmZvIiwiZ2V0R3JvdXBJbmZvIiwiY2hvd25TeW5jIiwidXNlckluZm8iLCJ1aWQiLCJnaWQiLCJyZWdpc3RlclNvY2tldEZpbGVDbGVhbnVwIiwiaG9zdCIsIkJJTkRfSVAiLCJpc0dldGVudEF2YWlsYWJsZSIsImV4ZWNTeW5jIiwiZ2V0R3JvdXBJbmZvVXNpbmdHZXRlbnQiLCJncm91cE5hbWUiLCJzdGRvdXQiLCJlbmNvZGluZyIsImdldEdyb3VwSW5mb0Zyb21GaWxlIiwiZ3JvdXBMaW5lIiwiZmluZCIsImxpbmUiLCJncm91cEluZm8iLCJzZXRJbmxpbmVTY3JpcHRzQWxsb3dlZCIsImVuYWJsZVN1YnJlc291cmNlSW50ZWdyaXR5IiwidXNlX2NyZWRlbnRpYWxzIiwic2V0QnVuZGxlZEpzQ3NzVXJsUmV3cml0ZUhvb2siLCJob29rRm4iLCJzZXRCdW5kbGVkSnNDc3NQcmVmaXgiLCJzZWxmIiwiYWRkU3RhdGljSnMiLCJzdGF0U3luYyIsInVubGlua1N5bmMiLCJleGlzdHNTeW5jIiwic29ja2V0UGF0aCIsImlzU29ja2V0IiwiZXZlbnRFbWl0dGVyIiwic2lnbmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTRCO0FBQzRCO0FBQ3BCO0FBQ047QUFDa0M7QUFDeEI7QUFDSjtBQUNOO0FBQ0s7QUFDTTtBQUNyQjtBQUNnQjtBQUNxQjtBQUNQO0FBQzFCO0FBSUU7QUFDSTtBQUNXO0FBRXpDLElBQUlBLHVCQUF1QixJQUFJO0FBQy9CLElBQUlDLHNCQUFzQixNQUFNO0FBRWhDLE1BQU1DLG1CQUFtQjtJQUN2QixNQUFNQyxNQUFNQztJQUNaLGtDQUFrQztJQUNsQywyRkFBMkY7SUFDM0ZELElBQUlFLEdBQUcsQ0FBQyxnQkFBZ0I7SUFDeEJGLElBQUlFLEdBQUcsQ0FBQyxRQUFRO0lBQ2hCRixJQUFJRSxHQUFHLENBQUMsZ0JBQWdCQyxHQUFHQyxLQUFLO0lBQ2hDLE9BQU9KO0FBQ1Q7QUFDQSxPQUFPLE1BQU1LLEtBQVk7QUFDekIsT0FBTyxNQUFNQyxjQUFxQjtBQUVsQyxNQUFNQyxTQUFTQyxPQUFPQyxTQUFTLENBQUNDLGNBQWM7QUFHOUNKLGdCQUFnQkssVUFBVSxHQUFHO0lBQzNCVixTQUFVO1FBQ1JXLFNBQVNDLElBQUlDLE9BQU8sQ0FBQyx3QkFBd0JGLE9BQU87UUFDcERHLFFBQVFkO0lBQ1Y7QUFDRjtBQUVBLHlDQUF5QztBQUN6Q0ksT0FBT0osT0FBTyxHQUFHQTtBQUVqQixvRUFBb0U7QUFDcEUsK0RBQStEO0FBQy9ESSxPQUFPVyxXQUFXLEdBQUc7QUFFckIsOEJBQThCO0FBQzlCWCxPQUFPWSxjQUFjLEdBQUcsQ0FBQztBQUV6QiwrQ0FBK0M7QUFDL0MsSUFBSUMsV0FBVyxDQUFDO0FBRWhCLElB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aEUsb0VBQW9FO0FBQ3BFLHFFQUFxRTtBQUNyRSxxRUFBcUU7QUFDckUsb0RBQW9EO0FBQ3BELHVFQUF1RTtBQUN2RSx3REFBd0Q7QUFDeEQsRUFBRTtBQUNGLDJEQUEyRDtBQUMzRCxtRUFBbUU7QUFDbkUsdUVBQXVFO0FBQ3ZFLG9FQUFvRTtBQUNwRSxpQ0FBaUM7QUFDakMsT0FBTyxNQUFNdEMsMkJBQTJCLENBQUN1QztJQUN2QyxJQUFJO1FBQ0YsSUFBSUgsU0FBU0csWUFBWUMsUUFBUSxJQUFJO1lBQ25DLCtEQUErRDtZQUMvRCxRQUFRO1lBQ1JILFdBQVdFO1FBQ2IsT0FBTztZQUNMLE1BQU0sSUFBSS9TLE1BQ1IsQ0FBQywrQkFBK0IsRUFBRStTLFdBQVcsZ0JBQWdCLENBQUMsR0FDOUQsaUVBQ0E7UUFFSjtJQUNGLEVBQUUsT0FBT25MLE9BQU87UUFDZCwrREFBK0Q7UUFDL0Qsa0VBQWtFO1FBQ2xFLG1CQUFtQjtRQUNuQixJQUFJQSxNQUFNeUMsSUFBSSxLQUFLLFVBQVU7WUFDM0IsTUFBTXpDO1FBQ1I7SUFDRjtBQUNGLEVBQUU7QUFFRix3RUFBd0U7QUFDeEUsc0VBQXNFO0FBQ3RFLDRDQUE0QztBQUM1QyxPQUFPLE1BQU0wSiw0QkFDWCxDQUFDeUIsWUFBWUUsZUFBZXJKLElBQU87SUFDakM7UUFBQztRQUFRO1FBQVU7UUFBVTtLQUFVLENBQUMvSixPQUFPLENBQUNxVDtRQUM5Q0QsYUFBYTFSLEVBQUUsQ0FBQzJSLFFBQVE1UyxPQUFPb1AsZUFBZSxDQUFDO1lBQzdDLElBQUlvRCxXQUFXQyxhQUFhO2dCQUMxQkYsV0FBV0U7WUFDYjtRQUNGO0lBQ0Y7QUFDRixFQUFFIiwiZmlsZSI6Ii9wYWNrYWdlcy93ZWJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMsIGNobW9kU3luYywgY2hvd25TeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgY3JlYXRlU2VydmVyIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyB1c2VySW5mbyB9IGZyb20gJ29zJztcbmltcG9ydCB7IGpvaW4gYXMgcGF0aEpvaW4sIGRpcm5hbWUgYXMgcGF0aERpcm5hbWUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlVXJsIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IGNyZWF0ZUhhc2ggfSBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29tcHJlc3MgZnJvbSAnY29tcHJlc3Npb24nO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5pbXBvcnQgcGFyc2VSZXF1ZXN0IGZyb20gJ3BhcnNldXJsJztcbmltcG9ydCB7IGxvb2t1cCBhcyBsb29rdXBVc2VyQWdlbnQgfSBmcm9tICd1c2VyYWdlbnQtbmcnO1xuaW1wb3J0IHsgaXNNb2Rlcm4gfSBmcm9tICdtZXRlb3IvbW9kZXJuLWJyb3dzZXJzJztcbmltcG9ydCBzZW5kIGZyb20gJ3NlbmQnO1xuaW1wb3J0IHtcbiAgcmVtb3ZlRXhpc3RpbmdTb2NrZXRGaWxlLFxuICByZWdpc3RlclNvY2tldEZpbGVDbGVhbnVwLFxufSBmcm9tICcuL3NvY2tldF9maWxlLmpzJztcbmltcG9ydCBjbHVzdGVyIGZyb20gJ2NsdXN0ZXInO1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxudmFyIFNIT1JUX1NPQ0tFVF9USU1FT1VUID0gNSAqIDEwMDA7XG52YXIgTE9OR19TT0NLRVRfVElNRU9VVCA9IDEyMCAqIDEwMDA7XG5cbmNvbnN0IGNyZWF0ZUV4cHJlc3NBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgLy8gU2VjdXJpdHkgYW5kIHBlcmZvcm1hY2UgaGVhZGVyc1xuICAvLyB0aGVzZSBoZWFkZXJzIGNvbWUgZnJvbSB0aGVzZSBkb2NzOiBodHRwczovL2V4cHJlc3Nqcy5jb20vZW4vYXBpLmh0bWwjYXBwLnNldHRpbmdzLnRhYmxlXG4gIGFwcC5zZXQoJ3gtcG93ZXJlZC1ieScsIGZhbHNlKTtcbiAgYXBwLnNldCgnZXRhZycsIGZhbHNlKTtcbiAgYXBwLnNldCgncXVlcnkgcGFyc2VyJywgcXMucGFyc2UpO1xuICByZXR1cm4gYXBwO1xufVxuZXhwb3J0IGNvbnN0IFdlYkFwcCA9IHt9O1xuZXhwb3J0IGNvbnN0IFdlYkFwcEludGVybmFscyA9IHt9O1xuXG5jb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5cbldlYkFwcEludGVybmFscy5OcG1Nb2R1bGVzID0ge1xuICBleHByZXNzIDoge1xuICAgIHZlcnNpb246IE5wbS5yZXF1aXJlKCdleHByZXNzL3BhY2thZ2UuanNvbicpLnZlcnNpb24sXG4gICAgbW9kdWxlOiBleHByZXNzLFxuICB9XG59O1xuXG4vLyBNb3JlIG9mIGEgY29udmVuaWVuY2UgZm9yIHRoZSBlbmQgdXNlclxuV2ViQXBwLmV4cHJlc3MgPSBleHByZXNzO1xuXG4vLyBUaG91Z2ggd2UgbWlnaHQgcHJlZmVyIHRvIHVzZSB3ZWIuYnJvd3NlciAobW9kZXJuKSBhcyB0aGUgZGVmYXVsdFxuLy8gYXJjaGl0ZWN0dXJlLCBzYWZldHkgcmVxdWlyZXMgYSBtb3JlIGNvbXBhdGlibGUgZGVmYXVsdEFyY2guXG5XZWJBcHAuZGVmYXVsdEFyY2ggPSAnd2ViLmJyb3dzZXIubGVnYWN5JztcblxuLy8gWFhYIG1hcHMgYXJjaHMgdG8gbWFuaWZlc3RzXG5XZWJBcHAuY2xpZW50UHJvZ3JhbXMgPSB7fTtcblxuLy8gWFhYIG1hcHMgYXJjaHMgdG8gcHJvZ3JhbSBwYXRoIG9uIGZpbGVzeXN0ZW1cbnZhciBhcmNoUGF0aCA9IHt9O1xuXG52YXIgYnVuZGxlZEpzQ3NzVXJsUmV3cml0ZUhvb2sgPSBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIGJ1bmRsZWRQcmVmaXggPSBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fLlJPT1RfVVJMX1BBVEhfUFJFRklYIHx8ICcnO1xuICByZXR1cm4gYnVuZGxlZFByZWZpeCArIHVybDtcbn07XG5cbnZhciBzaGExID0gZnVuY3Rpb24oY29udGVudHMpIHtcbiAgdmFyIGhhc2ggPSBjcmVhdGVIYXNoKCdzaGExJyk7XG4gIGhhc2gudXBkYXRlKGNvbnRlbnRzKTtcbiAgcmV0dXJuIGhhc2guZGlnZXN0KCdoZXgnKTtcbn07XG5cbmZ1bmN0aW9uIHNob3VsZENvbXByZXNzKHJlcSwgcmVzKSB7XG4gIGlmIChyZXEuaGVhZGVyc1sneC1uby1jb21wcmVzc2lvbiddKSB7XG4gICAgLy8gZG9uJ3QgY29tcHJlc3MgcmVzcG9uc2VzIHdpdGggdGhpcyByZXF1ZXN0IGhlYWRlclxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGZhbGxiYWNrIHRvIHN0YW5kYXJkIGZpbHRlciBmdW5jdGlvblxuICByZXR1cm4gY29tcHJlc3MuZmlsdGVyKHJlcSwgcmVzKTtcbn1cblxuLy8gI0Jyb3dzZXJJZGVudGlmaWNhdGlvblxuLy9cbi8vIFdlIGhhdmUgbXVsdGlwbGUgcGxhY2VzIHRoYXQgd2FudCB0byBpZGVudGlmeSB0aGUgYnJvd3NlcjogdGhlXG4vLyB1bnN1cHBvcnRlZCBicm93c2VyIHBhZ2UsIHRoZSBhcHBjYWNoZSBwYWNrYWdlLCBhbmQsIGV2ZW50dWFsbHlcbi8vIGRlbGl2ZXJpbmcgYnJvd3NlciBwb2x5ZmlsbHMgb25seSBhcyBuZWVkZWQuXG4vL1xuLy8gVG8gYXZvaWQgZGV0ZWN0aW5nIHRoZSBicm93c2VyIGluIG11bHRpcGxlIHBsYWNlcyBhZC1ob2MsIHdlIGNyZWF0ZSBhXG4vLyBNZXRlb3IgXCJicm93c2VyXCIgb2JqZWN0LiBJdCB1c2VzIGJ1dCBkb2VzIG5vdCBleHBvc2UgdGhlIG5wbVxuLy8gdXNlcmFnZW50IG1vZHVsZSAod2UgY291bGQgY2hvb3NlIGEgZGlmZmVyZW50IG1lY2hhbmlzbSB0byBpZGVudGlmeVxuLy8gdGhlIGJyb3dzZXIgaW4gdGhlIGZ1dHVyZSBpZiB3ZSB3YW50ZWQgdG8pLiAgVGhlIGJyb3dzZXIgb2JqZWN0XG4vLyBjb250YWluc1xuLy9cbi8vICogYG5hbWVgOiB0aGUgbmFtZSBvZiB0aGUgYnJvd3NlciBpbiBjYW1lbCBjYXNlXG4vLyAqIGBtYWpvcmAsIGBtaW5vcmAsIGBwYXRjaGA6IGludGVnZXJzIGRlc2NyaWJpbmcgdGhlIGJyb3dzZXIgdmVyc2lvblxuLy9cbi8vIEFsc28gaGVyZSBpcyBhbiBlYXJseSB2ZXJzaW9uIG9mIGEgTWV0ZW9yIGByZXF1ZXN0YCBvYmplY3QsIGludGVuZGVkXG4vLyB0byBiZSBhIGhpZ2gtbGV2ZWwgZGVzY3JpcHRpb24gb2YgdGhlIHJlcXVlc3Qgd2l0aG91dCBleHBvc2luZ1xuLy8gZGV0YWlscyBvZiBFeHByZXNzJ3MgbG93LWxldmVsIGByZXFgLiAgQ3VycmVudGx5IGl0IGNvbnRhaW5zOlxuLy9cbi8vICogYGJyb3dzZXJgOiBicm93c2VyIGlkZW50aWZpY2F0aW9uIG9iamVjdCBkZXNjcmliZWQgYWJvdmVcbi8vICogYHVybGA6IHBhcnNlZCB1cmwsIGluY2x1ZGluZyBwYXJzZWQgcXVlcnkgcGFyYW1zXG4vL1xuLy8gQXMgYSB0ZW1wb3JhcnkgaGFjayB0aGVyZSBpcyBhIGBjYXRlZ29yaXplUmVxdWVzdGAgZnVuY3Rpb24gb24gV2ViQXBwIHdoaWNoXG4vLyBjb252ZXJ0cyBhIEV4cHJlc3MgYHJlcWAgdG8gYSBNZXRlb3IgYHJlcXVlc3RgLiBUaGlzIGNhbiBnbyBhd2F5IG9uY2Ugc21hcnRcbi8vIHBhY2thZ2VzIHN1Y2ggYXMgYXBwY2FjaGUgYXJlIGJlaW5nIHBhc3NlZCBhIGByZXF1ZXN0YCBvYmplY3QgZGlyZWN0bHkgd2hlblxuLy8gdGhleSBzZXJ2ZSBjb250ZW50LlxuLy9cbi8vIFRoaXMgYWxsb3dzIGByZXF1ZXN0YCB0byBiZSB1c2VkIHVuaWZvcm1seTogaXQgaXMgcGFzc2VkIHRvIHRoZSBodG1sXG4vLyBhdHRyaWJ1dGVzIGhvb2ssIGFuZCB0aGUgYXBwY2FjaGUgcGFja2FnZSBjYW4gdXNlIGl0IHdoZW4gZGVjaWRpbmdcbi8vIHdoZXRoZXIgdG8gZ2VuZXJhdGUgYSA0MDQgZm9yIHRoZSBtYW5pZmVzdC5cbi8vXG4vLyBSZWFsIHJvdXRpbmcgLyBzZXJ2ZXIgc2lkZSByZW5kZXJpbmcgd2lsbCBwcm9iYWJseSByZWZhY3RvciB0aGlzXG4vLyBoZWF2aWx5LlxuXG4vLyBlLmcuIFwiTW9iaWxlIFNhZmFyaVwiID0+IFwibW9iaWxlU2FmYXJpXCJcbnZhciBjYW1lbENhc2UgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBwYXJ0cyA9IG5hbWUuc3BsaXQoJyAnKTtcbiAgcGFydHNbMF0gPSBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgcGFydHNbaV0gPSBwYXJ0c1tpXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHBhcnRzW2ldLnN1YnN0cmluZygxKTtcbiAgfVxuICByZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuXG52YXIgaWRlbnRpZnlCcm93c2VyID0gZnVuY3Rpb24odXNlckFnZW50U3RyaW5nKSB7XG4gIGlmICghdXNlckFnZW50U3RyaW5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICd1bmtub3duJyxcbiAgICAgIG1ham9yOiAwLFxuICAgICAgbWlub3I6IDAsXG4gICAgICBwYXRjaDogMFxuICAgIH07XG4gIH1cbiAgdmFyIHVzZXJBZ2VudCA9IGxvb2t1cFVzZXJBZ2VudCh1c2VyQWdlbnRTdHJpbmcpO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IGNhbWVsQ2FzZSh1c2VyQWdlbnQuZmFtaWx5KSxcbiAgICBtYWpvcjogK3VzZXJBZ2VudC5tYWpvcixcbiAgICBtaW5vcjogK3VzZXJBZ2VudC5taW5vcixcbiAgICBwYXRjaDogK3VzZXJBZ2VudC5wYXRjaCxcbiAgfTtcbn07XG5cbi8vIFhYWCBSZWZhY3RvciBhcyBwYXJ0IG9mIGltcGxlbWVudGluZyByZWFsIHJvdXRpbmcuXG5XZWJBcHBJbnRlcm5hbHMuaWRlbnRpZnlCcm93c2VyID0gaWRlbnRpZnlCcm93c2VyO1xuXG5XZWJBcHAuY2F0ZWdvcml6ZVJlcXVlc3QgPSBmdW5jdGlvbihyZXEpIHtcbiAgaWYgKHJlcS5icm93c2VyICYmIHJlcS5hcmNoICYmIHR5cGVvZiByZXEubW9kZXJuID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbHJlYWR5IGNhdGVnb3JpemVkLlxuICAgIHJldHVybiByZXE7XG4gIH1cblxuICBjb25zdCBicm93c2VyID0gaWRlbnRpZnlCcm93c2VyKHJlcS5oZWFkZXJzWyd1c2VyLWFnZW50J10pO1xuICBjb25zdCBtb2Rlcm4gPSBpc01vZGVybihicm93c2VyKTtcbiAgY29uc3QgcGF0aCA9XG4gICAgdHlwZW9mIHJlcS5wYXRobmFtZSA9PT0gJ3N0cmluZydcbiAgICAgID8gcmVxLnBhdGhuYW1lXG4gICAgICA6IHBhcnNlUmVxdWVzdChyZXEpLnBhdGhuYW1lO1xuXG4gIGNvbnN0IGNhdGVnb3JpemVkID0ge1xuICAgIGJyb3dzZXIsXG4gICAgbW9kZXJuLFxuICAgIHBhdGgsXG4gICAgYXJjaDogV2ViQXBwLmRlZmF1bHRBcmNoLFxuICAgIHVybDogcGFyc2VVcmwocmVxLnVybCwgdHJ1ZSksXG4gICAgZHluYW1pY0hlYWQ6IHJlcS5keW5hbWljSGVhZCxcbiAgICBkeW5hbWljQm9keTogcmVxLmR5bmFtaWNCb2R5LFxuICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLFxuICAgIGNvb2tpZXM6IHJlcS5jb29raWVzLFxuICB9O1xuXG4gIGNvbnN0IHBhdGhQYXJ0cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgY29uc3QgYXJjaEtleSA9IHBhdGhQYXJ0c1sxXTtcblxuICBpZiAoYXJjaEtleS5zdGFydHNXaXRoKCdfXycpKSB7XG4gICAgY29uc3QgYXJjaENsZWFuZWQgPSAnd2ViLicgKyBhcmNoS2V5LnNsaWNlKDIpO1xuICAgIGlmIChoYXNPd24uY2FsbChXZWJBcHAuY2xpZW50UHJvZ3JhbXMsIGFyY2hDbGVhbmVkKSkge1xuICAgICAgcGF0aFBhcnRzLnNwbGljZSgxLCAxKTsgLy8gUmVtb3ZlIHRoZSBhcmNoS2V5IHBhcnQuXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjYXRlZ29yaXplZCwge1xuICAgICAgICBhcmNoOiBhcmNoQ2xlYW5lZCxcbiAgICAgICAgcGF0aDogcGF0aFBhcnRzLmpvaW4oJy8nKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8gUGVyaGFwcyBvbmUgZGF5IHdlIGNvdWxkIGluZmVyIENvcmRvdmEgY2xpZW50cyBoZXJlLCBzbyB0aGF0IHdlXG4gIC8vIHdvdWxkbid0IGhhdmUgdG8gdXNlIHByZWZpeGVkIFwiL19fY29yZG92YS8uLi5cIiBVUkxzLlxuICBjb25zdCBwcmVmZXJyZWRBcmNoT3JkZXIgPSBpc01vZGVybihicm93c2VyKVxuICAgID8gWyd3ZWIuYnJvd3NlcicsICd3ZWIuYnJvd3Nlci5sZWdhY3knXVxuICAgIDogWyd3ZWIuYnJvd3Nlci5sZWdhY3knLCAnd2ViLmJyb3dzZXInXTtcblxuICBmb3IgKGNvbnN0IGFyY2ggb2YgcHJlZmVycmVkQXJjaE9yZGVyKSB7XG4gICAgLy8gSWYgb3VyIHByZWZlcnJlZCBhcmNoIGlzIG5vdCBhdmFpbGFibGUsIGl0J3MgYmV0dGVyIHRvIHVzZSBhbm90aGVyXG4gICAgLy8gY2xpZW50IGFyY2ggdGhhdCBpcyBhdmFpbGFibGUgdGhhbiB0byBndWFyYW50ZWUgdGhlIHNpdGUgd29uJ3Qgd29ya1xuICAgIC8vIGJ5IHJldHVybmluZyBhbiB1bmtub3duIGFyY2guIEZvciBleGFtcGxlLCBpZiB3ZWIuYnJvd3Nlci5sZWdhY3kgaXNcbiAgICAvLyBleGNsdWRlZCB1c2luZyB0aGUgLS1leGNsdWRlLWFyY2hzIGNvbW1hbmQtbGluZSBvcHRpb24sIGxlZ2FjeVxuICAgIC8vIGNsaWVudHMgYXJlIGJldHRlciBvZmYgcmVjZWl2aW5nIHdlYi5icm93c2VyICh3aGljaCBtaWdodCBhY3R1YWxseVxuICAgIC8vIHdvcmspIHRoYW4gcmVjZWl2aW5nIGFuIEhUVFAgNDA0IHJlc3BvbnNlLiBJZiBub25lIG9mIHRoZSBhcmNocyBpblxuICAgIC8vIHByZWZlcnJlZEFyY2hPcmRlciBhcmUgZGVmaW5lZCwgb25seSB0aGVuIHNob3VsZCB3ZSBzZW5kIGEgNDA0LlxuICAgIGlmIChoYXNPd24uY2FsbChXZWJBcHAuY2xpZW50UHJvZ3JhbXMsIGFyY2gpKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjYXRlZ29yaXplZCwgeyBhcmNoIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjYXRlZ29yaXplZDtcbn07XG5cbi8vIEhUTUwgYXR0cmlidXRlIGhvb2tzOiBmdW5jdGlvbnMgdG8gYmUgY2FsbGVkIHRvIGRldGVybWluZSBhbnkgYXR0cmlidXRlcyB0b1xuLy8gYmUgYWRkZWQgdG8gdGhlICc8aHRtbD4nIHRhZy4gRWFjaCBmdW5jdGlvbiBpcyBwYXNzZWQgYSAncmVxdWVzdCcgb2JqZWN0IChzZWVcbi8vICNCcm93c2VySWRlbnRpZmljYXRpb24pIGFuZCBzaG91bGQgcmV0dXJuIG51bGwgb3Igb2JqZWN0LlxudmFyIGh0bWxBdHRyaWJ1dGVIb29rcyA9IFtdO1xudmFyIGdldEh0bWxBdHRyaWJ1dGVzID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuICB2YXIgY29tYmluZWRBdHRyaWJ1dGVzID0ge307XG4gIChodG1sQXR0cmlidXRlSG9va3MgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaG9vaykge1xuICAgIHZhciBhdHRyaWJ1dGVzID0gaG9vayhyZXF1ZXN0KTtcbiAgICBpZiAoYXR0cmlidXRlcyA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPT0gJ29iamVjdCcpXG4gICAgICB0aHJvdyBFcnJvcignSFRNTCBhdHRyaWJ1dGUgaG9vayBtdXN0IHJldHVybiBudWxsIG9yIG9iamVjdCcpO1xuICAgIE9iamVjdC5hc3NpZ24oY29tYmluZWRBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgfSk7XG4gIHJldHVybiBjb21iaW5lZEF0dHJpYnV0ZXM7XG59O1xuV2ViQXBwLmFkZEh0bWxBdHRyaWJ1dGVIb29rID0gZnVuY3Rpb24oaG9vaykge1xuICBodG1sQXR0cmlidXRlSG9va3MucHVzaChob29rKTtcbn07XG5cbi8vIFNlcnZlIGFwcCBIVE1MIGZvciB0aGlzIFVSTD9cbnZhciBhcHBVcmwgPSBmdW5jdGlvbih1cmwpIHtcbiAgaWYgKHVybCA9PT0gJy9mYXZpY29uLmljbycgfHwgdXJsID09PSAnL3JvYm90cy50eHQnKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gTk9URTogYXBwLm1hbmlmZXN0IGlzIG5vdCBhIHdlYiBzdGFuZGFyZCBsaWtlIGZhdmljb24uaWNvIGFuZFxuICAvLyByb2JvdHMudHh0LiBJdCBpcyBhIGZpbGUgbmFtZSB3ZSBoYXZlIGNob3NlbiB0byB1c2UgZm9yIEhUTUw1XG4gIC8vIGFwcGNhY2hlIFVSTHMuIEl0IGlzIGluY2x1ZGVkIGhlcmUgdG8gcHJldmVudCB1c2luZyBhbiBhcHBjYWNoZVxuICAvLyB0aGVuIHJlbW92aW5nIGl0IGZyb20gcG9pc29uaW5nIGFuIGFwcCBwZXJtYW5lbnRseS4gRXZlbnR1YWxseSxcbiAgLy8gb25jZSB3ZSBoYXZlIHNlcnZlciBzaWRlIHJvdXRpbmcsIHRoaXMgd29uJ3QgYmUgbmVlZGVkIGFzXG4gIC8vIHVua25vd24gVVJMcyB3aXRoIHJldHVybiBhIDQwNCBhdXRvbWF0aWNhbGx5LlxuICBpZiAodXJsID09PSAnL2FwcC5tYW5pZmVzdCcpIHJldHVybiBmYWxzZTtcblxuICAvLyBBdm9pZCBzZXJ2aW5nIGFwcCBIVE1MIGZvciBkZWNsYXJlZCByb3V0ZXMgc3VjaCBhcyAvc29ja2pzLy5cbiAgaWYgKFJvdXRlUG9saWN5LmNsYXNzaWZ5KHVybCkpIHJldHVybiBmYWxzZTtcblxuICAvLyB3ZSBjdXJyZW50bHkgcmV0dXJuIGFwcCBIVE1MIG9uIGFsbCBVUkxzIGJ5IGRlZmF1bHRcbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBXZSBuZWVkIHRvIGNhbGN1bGF0ZSB0aGUgY2xpZW50IGhhc2ggYWZ0ZXIgYWxsIHBhY2thZ2VzIGhhdmUgbG9hZGVkXG4vLyB0byBnaXZlIHRoZW0gYSBjaGFuY2UgdG8gcG9wdWxhdGUgX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5cbi8vXG4vLyBDYWxjdWxhdGluZyB0aGUgaGFzaCBkdXJpbmcgc3RhcnR1cCBtZWFucyB0aGF0IHBhY2thZ2VzIGNhbiBvbmx5XG4vLyBwb3B1bGF0ZSBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fIGR1cmluZyBsb2FkLCBub3QgZHVyaW5nIHN0YXJ0dXAuXG4vL1xuLy8gQ2FsY3VsYXRpbmcgaW5zdGVhZCBpdCBhdCB0aGUgYmVnaW5uaW5nIG9mIG1haW4gYWZ0ZXIgYWxsIHN0YXJ0dXBcbi8vIGhvb2tzIGhhZCBydW4gd291bGQgYWxsb3cgcGFja2FnZXMgdG8gYWxzbyBwb3B1bGF0ZVxuLy8gX19tZXRlb3JfcnVudGltZV9jb25maWdfXyBkdXJpbmcgc3RhcnR1cCwgYnV0IHRoYXQncyB0b28gbGF0ZSBmb3Jcbi8vIGF1dG91cGRhdGUgYmVjYXVzZSBpdCBuZWVkcyB0byBoYXZlIHRoZSBjbGllbnQgaGFzaCBhdCBzdGFydHVwIHRvXG4vLyBpbnNlcnQgdGhlIGF1dG8gdXBkYXRlIHZlcnNpb24gaXRzZWxmIGludG9cbi8vIF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18gdG8gZ2V0IGl0IHRvIHRoZSBjbGllbnQuXG4vL1xuLy8gQW4gYWx0ZXJuYXRpdmUgd291bGQgYmUgdG8gZ2l2ZSBhdXRvdXBkYXRlIGEgXCJwb3N0LXN0YXJ0LFxuLy8gcHJlLWxpc3RlblwiIGhvb2sgdG8gYWxsb3cgaXQgdG8gaW5zZXJ0IHRoZSBhdXRvIHVwZGF0ZSB2ZXJzaW9uIGF0XG4vLyB0aGUgcmlnaHQgbW9tZW50LlxuXG5NZXRlb3Iuc3RhcnR1cChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gZ2V0dGVyKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihhcmNoKSB7XG4gICAgICBhcmNoID0gYXJjaCB8fCBXZWJBcHAuZGVmYXVsdEFyY2g7XG4gICAgICBjb25zdCBwcm9ncmFtID0gV2ViQXBwLmNsaWVudFByb2dyYW1zW2FyY2hdO1xuICAgICAgY29uc3QgdmFsdWUgPSBwcm9ncmFtICYmIHByb2dyYW1ba2V5XTtcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgd2UgaGF2ZSBjYWxjdWxhdGVkIHRoaXMgaGFzaCxcbiAgICAgIC8vIHByb2dyYW1ba2V5XSB3aWxsIGJlIGEgdGh1bmsgKGxhenkgZnVuY3Rpb24gd2l0aCBubyBwYXJhbWV0ZXJzKVxuICAgICAgLy8gdGhhdCB3ZSBzaG91bGQgY2FsbCB0byBkbyB0aGUgYWN0dWFsIGNvbXB1dGF0aW9uLlxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IChwcm9ncmFtW2tleV0gPSB2YWx1ZSgpKSA6IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBXZWJBcHAuY2FsY3VsYXRlQ2xpZW50SGFzaCA9IFdlYkFwcC5jbGllbnRIYXNoID0gZ2V0dGVyKCd2ZXJzaW9uJyk7XG4gIFdlYkFwcC5jYWxjdWxhdGVDbGllbnRIYXNoUmVmcmVzaGFibGUgPSBnZXR0ZXIoJ3ZlcnNpb25SZWZyZXNoYWJsZScpO1xuICBXZWJBcHAuY2FsY3VsYXRlQ2xpZW50SGFzaE5vblJlZnJlc2hhYmxlID0gZ2V0dGVyKCd2ZXJzaW9uTm9uUmVmcmVzaGFibGUnKTtcbiAgV2ViQXBwLmNhbGN1bGF0ZUNsaWVudEhhc2hSZXBsYWNlYWJsZSA9IGdldHRlcigndmVyc2lvblJlcGxhY2VhYmxlJyk7XG4gIFdlYkFwcC5nZXRSZWZyZXNoYWJsZUFzc2V0cyA9IGdldHRlcigncmVmcmVzaGFibGVBc3NldHMnKTtcbn0pO1xuXG4vLyBXaGVuIHdlIGhhdmUgYSByZXF1ZXN0IHBlbmRpbmcsIHdlIHdhbnQgdGhlIHNvY2tldCB0aW1lb3V0IHRvIGJlIGxvbmcsIHRvXG4vLyBnaXZlIG91cnNlbHZlcyBhIHdoaWxlIHRvIHNlcnZlIGl0LCBhbmQgdG8gYWxsb3cgc29ja2pzIGxvbmcgcG9sbHMgdG9cbi8vIGNvbXBsZXRlLiAgT24gdGhlIG90aGVyIGhhbmQsIHdlIHdhbnQgdG8gY2xvc2UgaWRsZSBzb2NrZXRzIHJlbGF0aXZlbHlcbi8vIHF1aWNrbHksIHNvIHRoYXQgd2UgY2FuIHNodXQgZG93biByZWxhdGl2ZWx5IHByb21wdGx5IGJ1dCBjbGVhbmx5LCB3aXRob3V0XG4vLyBjdXR0aW5nIG9mZiBhbnlvbmUncyByZXNwb25zZS5cbldlYkFwcC5fdGltZW91dEFkanVzdG1lbnRSZXF1ZXN0Q2FsbGJhY2sgPSBmdW5jdGlvbihyZXEsIHJlcykge1xuICAvLyB0aGlzIGlzIHJlYWxseSBqdXN0IHJlcS5zb2NrZXQuc2V0VGltZW91dChMT05HX1NPQ0tFVF9USU1FT1VUKTtcbiAgcmVxLnNldFRpbWVvdXQoTE9OR19TT0NLRVRfVElNRU9VVCk7XG4gIC8vIEluc2VydCBvdXIgbmV3IGZpbmlzaCBsaXN0ZW5lciB0byBydW4gQkVGT1JFIHRoZSBleGlzdGluZyBvbmUgd2hpY2ggcmVtb3Zlc1xuICAvLyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc29ja2V0LlxuICB2YXIgZmluaXNoTGlzdGVuZXJzID0gcmVzLmxpc3RlbmVycygnZmluaXNoJyk7XG4gIC8vIFhYWCBBcHBhcmVudGx5IGluIE5vZGUgMC4xMiB0aGlzIGV2ZW50IHdhcyBjYWxsZWQgJ3ByZWZpbmlzaCcuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9jb21taXQvN2M5YjYwNzBcbiAgLy8gQnV0IGl0IGhhcyBzd2l0Y2hlZCBiYWNrIHRvICdmaW5pc2gnIGluIE5vZGUgdjQ6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9wdWxsLzE0MTFcbiAgcmVzLnJlbW92ZUFsbExpc3RlbmVycygnZmluaXNoJyk7XG4gIHJlcy5vbignZmluaXNoJywgZnVuY3Rpb24oKSB7XG4gICAgcmVzLnNldFRpbWVvdXQoU0hPUlRfU09DS0VUX1RJTUVPVVQpO1xuICB9KTtcbiAgT2JqZWN0LnZhbHVlcyhmaW5pc2hMaXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24obCkge1xuICAgIHJlcy5vbignZmluaXNoJywgbCk7XG4gIH0pO1xufTtcblxuLy8gV2lsbCBiZSB1cGRhdGVkIGJ5IG1haW4gYmVmb3JlIHdlIGxpc3Rlbi5cbi8vIE1hcCBmcm9tIGNsaWVudCBhcmNoIHRvIGJvaWxlcnBsYXRlIG9iamVjdC5cbi8vIEJvaWxlcnBsYXRlIG9iamVjdCBoYXM6XG4vLyAgIC0gZnVuYzogWFhYXG4vLyAgIC0gYmFzZURhdGE6IFhYWFxudmFyIGJvaWxlcnBsYXRlQnlBcmNoID0ge307XG5cbi8vIFJlZ2lzdGVyIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBjYW4gc2VsZWN0aXZlbHkgbW9kaWZ5IGJvaWxlcnBsYXRlXG4vLyBkYXRhIGdpdmVuIGFyZ3VtZW50cyAocmVxdWVzdCwgZGF0YSwgYXJjaCkuIFRoZSBrZXkgc2hvdWxkIGJlIGEgdW5pcXVlXG4vLyBpZGVudGlmaWVyLCB0byBwcmV2ZW50IGFjY3VtdWxhdGluZyBkdXBsaWNhdGUgY2FsbGJhY2tzIGZyb20gdGhlIHNhbWVcbi8vIGNhbGwgc2l0ZSBvdmVyIHRpbWUuIENhbGxiYWNrcyB3aWxsIGJlIGNhbGxlZCBpbiB0aGUgb3JkZXIgdGhleSB3ZXJlXG4vLyByZWdpc3RlcmVkLiBBIGNhbGxiYWNrIHNob3VsZCByZXR1cm4gZmFsc2UgaWYgaXQgZGlkIG5vdCBtYWtlIGFueVxuLy8gY2hhbmdlcyBhZmZlY3RpbmcgdGhlIGJvaWxlcnBsYXRlLiBQYXNzaW5nIG51bGwgZGVsZXRlcyB0aGUgY2FsbGJhY2suXG4vLyBBbnkgcHJldmlvdXMgY2FsbGJhY2sgcmVnaXN0ZXJlZCBmb3IgdGhpcyBrZXkgd2lsbCBiZSByZXR1cm5lZC5cbmNvbnN0IGJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5XZWJBcHBJbnRlcm5hbHMucmVnaXN0ZXJCb2lsZXJwbGF0ZURhdGFDYWxsYmFjayA9IGZ1bmN0aW9uKGtleSwgY2FsbGJhY2spIHtcbiAgY29uc3QgcHJldmlvdXNDYWxsYmFjayA9IGJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrc1trZXldO1xuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICBib2lsZXJwbGF0ZURhdGFDYWxsYmFja3Nba2V5XSA9IGNhbGxiYWNrO1xuICB9IGVsc2Uge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjYWxsYmFjaywgbnVsbCk7XG4gICAgZGVsZXRlIGJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrc1trZXldO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBwcmV2aW91cyBjYWxsYmFjayBpbiBjYXNlIHRoZSBuZXcgY2FsbGJhY2sgbmVlZHMgdG8gY2FsbFxuICAvLyBpdDsgZm9yIGV4YW1wbGUsIHdoZW4gdGhlIG5ldyBjYWxsYmFjayBpcyBhIHdyYXBwZXIgZm9yIHRoZSBvbGQuXG4gIHJldHVybiBwcmV2aW91c0NhbGxiYWNrIHx8IG51bGw7XG59O1xuXG4vLyBHaXZlbiBhIHJlcXVlc3QgKGFzIHJldHVybmVkIGZyb20gYGNhdGVnb3JpemVSZXF1ZXN0YCksIHJldHVybiB0aGVcbi8vIGJvaWxlcnBsYXRlIEhUTUwgdG8gc2VydmUgZm9yIHRoYXQgcmVxdWVzdC5cbi8vXG4vLyBJZiBhIHByZXZpb3VzIEV4cHJlc3MgbWlkZGxld2FyZSBoYXMgcmVuZGVyZWQgY29udGVudCBmb3IgdGhlIGhlYWQgb3IgYm9keSxcbi8vIHJldHVybnMgdGhlIGJvaWxlcnBsYXRlIHdpdGggdGhhdCBjb250ZW50IHBhdGNoZWQgaW4gb3RoZXJ3aXNlXG4vLyBtZW1vaXplcyBvbiBIVE1MIGF0dHJpYnV0ZXMgKHVzZWQgYnksIGVnLCBhcHBjYWNoZSkgYW5kIHdoZXRoZXIgaW5saW5lXG4vLyBzY3JpcHRzIGFyZSBjdXJyZW50bHkgYWxsb3dlZC5cbi8vIFhYWCBzbyBmYXIgdGhpcyBmdW5jdGlvbiBpcyBhbHdheXMgY2FsbGVkIHdpdGggYXJjaCA9PT0gJ3dlYi5icm93c2VyJ1xuZnVuY3Rpb24gZ2V0Qm9pbGVycGxhdGUocmVxdWVzdCwgYXJjaCkge1xuICByZXR1cm4gZ2V0Qm9pbGVycGxhdGVBc3luYyhyZXF1ZXN0LCBhcmNoKTtcbn1cblxuLyoqXG4gKiBAc3VtbWFyeSBUYWtlcyBhIHJ1bnRpbWUgY29uZmlndXJhdGlvbiBvYmplY3QgYW5kXG4gKiByZXR1cm5zIGFuIGVuY29kZWQgcnVudGltZSBzdHJpbmcuXG4gKiBAbG9jdXMgU2VydmVyXG4gKiBAcGFyYW0ge09iamVjdH0gcnRpbWVDb25maWdcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbldlYkFwcC5lbmNvZGVSdW50aW1lQ29uZmlnID0gZnVuY3Rpb24ocnRpbWVDb25maWcpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShydGltZUNvbmZpZykpKTtcbn07XG5cbi8qKlxuICogQHN1bW1hcnkgVGFrZXMgYW4gZW5jb2RlZCBydW50aW1lIHN0cmluZyBhbmQgcmV0dXJuc1xuICogYSBydW50aW1lIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICogQGxvY3VzIFNlcnZlclxuICogQHBhcmFtIHtTdHJpbmd9IHJ0aW1lQ29uZmlnU3RyaW5nXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5XZWJBcHAuZGVjb2RlUnVudGltZUNvbmZpZyA9IGZ1bmN0aW9uKHJ0aW1lQ29uZmlnU3RyKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChKU09OLnBhcnNlKHJ0aW1lQ29uZmlnU3RyKSkpO1xufTtcblxuY29uc3QgcnVudGltZUNvbmZpZyA9IHtcbiAgLy8gaG9va3Mgd2lsbCBjb250YWluIHRoZSBjYWxsYmFjayBmdW5jdGlvbnNcbiAgLy8gc2V0IGJ5IHRoZSBjYWxsZXIgdG8gYWRkUnVudGltZUNvbmZpZ0hvb2tcbiAgaG9va3M6IG5ldyBIb29rKCksXG4gIC8vIHVwZGF0ZUhvb2tzIHdpbGwgY29udGFpbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25zXG4gIC8vIHNldCBieSB0aGUgY2FsbGVyIHRvIGFkZFVwZGF0ZWROb3RpZnlIb29rXG4gIHVwZGF0ZUhvb2tzOiBuZXcgSG9vaygpLFxuICAvLyBpc1VwZGF0ZWRCeUFyY2ggaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgZmllbGRzIGZvciBlYWNoIGFyY2hcbiAgLy8gdGhhdCB0aGlzIHNlcnZlciBzdXBwb3J0cy5cbiAgLy8gLSBFYWNoIGZpZWxkIHdpbGwgYmUgdHJ1ZSB3aGVuIHRoZSBzZXJ2ZXIgdXBkYXRlcyB0aGUgcnVudGltZUNvbmZpZyBmb3IgdGhhdCBhcmNoLlxuICAvLyAtIFdoZW4gdGhlIGhvb2sgY2FsbGJhY2sgaXMgY2FsbGVkIHRoZSB1cGRhdGUgZmllbGQgaW4gdGhlIGNhbGxiYWNrIG9iamVjdCB3aWxsIGJlXG4gIC8vIHNldCB0byBpc1VwZGF0ZWRCeUFyY2hbYXJjaF0uXG4gIC8vID0gaXNVcGRhdGVkeUJ5QXJjaFthcmNoXSBpcyByZXNldCB0byBmYWxzZSBhZnRlciB0aGUgY2FsbGJhY2suXG4gIC8vIFRoaXMgZW5hYmxlcyB0aGUgY2FsbGVyIHRvIGNhY2hlIGRhdGEgZWZmaWNpZW50bHkgc28gdGhleSBkbyBub3QgbmVlZCB0b1xuICAvLyBkZWNvZGUgJiB1cGRhdGUgZGF0YSBvbiBldmVyeSBjYWxsYmFjayB3aGVuIHRoZSBydW50aW1lQ29uZmlnIGlzIG5vdCBjaGFuZ2luZy5cbiAgaXNVcGRhdGVkQnlBcmNoOiB7fSxcbn07XG5cbi8qKlxuICogQG5hbWUgYWRkUnVudGltZUNvbmZpZ0hvb2tDYWxsYmFjayhvcHRpb25zKVxuICogQGxvY3VzIFNlcnZlclxuICogQGlzcHJvdG90eXBlIHRydWVcbiAqIEBzdW1tYXJ5IENhbGxiYWNrIGZvciBgYWRkUnVudGltZUNvbmZpZ0hvb2tgLlxuICpcbiAqIElmIHRoZSBoYW5kbGVyIHJldHVybnMgYSBfZmFsc3lfIHZhbHVlIHRoZSBob29rIHdpbGwgbm90XG4gKiBtb2RpZnkgdGhlIHJ1bnRpbWUgY29uZmlndXJhdGlvbi5cbiAqXG4gKiBJZiB0aGUgaGFuZGxlciByZXR1cm5zIGEgX1N0cmluZ18gdGhlIGhvb2sgd2lsbCBzdWJzdGl0dXRlXG4gKiB0aGUgc3RyaW5nIGZvciB0aGUgZW5jb2RlZCBjb25maWd1cmF0aW9uIHN0cmluZy5cbiAqXG4gKiAqKldhcm5pbmc6KiogdGhlIGhvb2sgZG9lcyBub3QgY2hlY2sgdGhlIHJldHVybiB2YWx1ZSBhdCBhbGwgaXQgaXNcbiAqIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aGUgY2FsbGVyIHRvIGdldCB0aGUgZm9ybWF0dGluZyBjb3JyZWN0IHVzaW5nXG4gKiB0aGUgaGVscGVyIGZ1bmN0aW9ucy5cbiAqXG4gKiBgYWRkUnVudGltZUNvbmZpZ0hvb2tDYWxsYmFja2AgdGFrZXMgb25seSBvbmUgYE9iamVjdGAgYXJndW1lbnRcbiAqIHdpdGggdGhlIGZvbGxvd2luZyBmaWVsZHM6XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuYXJjaCBUaGUgYXJjaGl0ZWN0dXJlIG9mIHRoZSBjbGllbnRcbiAqIHJlcXVlc3RpbmcgYSBuZXcgcnVudGltZSBjb25maWd1cmF0aW9uLiBUaGlzIGNhbiBiZSBvbmUgb2ZcbiAqIGB3ZWIuYnJvd3NlcmAsIGB3ZWIuYnJvd3Nlci5sZWdhY3lgIG9yIGB3ZWIuY29yZG92YWAuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5yZXF1ZXN0XG4gKiBBIE5vZGVKcyBbSW5jb21pbmdNZXNzYWdlXShodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX2NsYXNzX2h0dHBfaW5jb21pbmdtZXNzYWdlKVxuICogaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9jbGFzc19odHRwX2luY29taW5nbWVzc2FnZVxuICogYE9iamVjdGAgdGhhdCBjYW4gYmUgdXNlZCB0byBnZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGluY29taW5nIHJlcXVlc3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5lbmNvZGVkQ3VycmVudENvbmZpZyBUaGUgY3VycmVudCBjb25maWd1cmF0aW9uIG9iamVjdFxuICogZW5jb2RlZCBhcyBhIHN0cmluZyBmb3IgaW5jbHVzaW9uIGluIHRoZSByb290IGh0bWwuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMudXBkYXRlZCBgdHJ1ZWAgaWYgdGhlIGNvbmZpZyBmb3IgdGhpcyBhcmNoaXRlY3R1cmVcbiAqIGhhcyBiZWVuIHVwZGF0ZWQgc2luY2UgbGFzdCBjYWxsZWQsIG90aGVyd2lzZSBgZmFsc2VgLiBUaGlzIGZsYWcgY2FuIGJlIHVzZWRcbiAqIHRvIGNhY2hlIHRoZSBkZWNvZGluZy9lbmNvZGluZyBmb3IgZWFjaCBhcmNoaXRlY3R1cmUuXG4gKi9cblxuLyoqXG4gKiBAc3VtbWFyeSBIb29rIHRoYXQgY2FsbHMgYmFjayB3aGVuIHRoZSBtZXRlb3IgcnVudGltZSBjb25maWd1cmF0aW9uLFxuICogYF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX19gIGlzIGJlaW5nIHNlbnQgdG8gYW55IGNsaWVudC5cbiAqXG4gKiAqKnJldHVybnMqKjogPHNtYWxsPl9PYmplY3RfPC9zbWFsbD4gYHsgc3RvcDogZnVuY3Rpb24sIGNhbGxiYWNrOiBmdW5jdGlvbiB9YFxuICogLSBgc3RvcGAgPHNtYWxsPl9GdW5jdGlvbl88L3NtYWxsPiBDYWxsIGBzdG9wKClgIHRvIHN0b3AgZ2V0dGluZyBjYWxsYmFja3MuXG4gKiAtIGBjYWxsYmFja2AgPHNtYWxsPl9GdW5jdGlvbl88L3NtYWxsPiBUaGUgcGFzc2VkIGluIGBjYWxsYmFja2AuXG4gKiBAbG9jdXMgU2VydmVyXG4gKiBAcGFyYW0ge2FkZFJ1bnRpbWVDb25maWdIb29rQ2FsbGJhY2t9IGNhbGxiYWNrXG4gKiBTZWUgYGFkZFJ1bnRpbWVDb25maWdIb29rQ2FsbGJhY2tgIGRlc2NyaXB0aW9uLlxuICogQHJldHVybnMge09iamVjdH0ge3sgc3RvcDogZnVuY3Rpb24sIGNhbGxiYWNrOiBmdW5jdGlvbiB9fVxuICogQ2FsbCB0aGUgcmV0dXJuZWQgYHN0b3AoKWAgdG8gc3RvcCBnZXR0aW5nIGNhbGxiYWNrcy5cbiAqIFRoZSBwYXNzZWQgaW4gYGNhbGxiYWNrYCBpcyByZXR1cm5lZCBhbHNvLlxuICovXG5XZWJBcHAuYWRkUnVudGltZUNvbmZpZ0hvb2sgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICByZXR1cm4gcnVudGltZUNvbmZpZy5ob29rcy5yZWdpc3RlcihjYWxsYmFjayk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBnZXRCb2lsZXJwbGF0ZUFzeW5jKHJlcXVlc3QsIGFyY2gsIHJlc3BvbnNlKSB7XG4gIGxldCBib2lsZXJwbGF0ZSA9IGJvaWxlcnBsYXRlQnlBcmNoW2FyY2hdO1xuICBhd2FpdCBydW50aW1lQ29uZmlnLmhvb2tzLmZvckVhY2hBc3luYyhhc3luYyBob29rID0+IHtcbiAgICBjb25zdCBtZXRlb3JSdW50aW1lQ29uZmlnID0gYXdhaXQgaG9vayh7XG4gICAgICBhcmNoLFxuICAgICAgcmVxdWVzdCxcbiAgICAgIGVuY29kZWRDdXJyZW50Q29uZmlnOiBib2lsZXJwbGF0ZS5iYXNlRGF0YS5tZXRlb3JSdW50aW1lQ29uZmlnLFxuICAgICAgdXBkYXRlZDogcnVudGltZUNvbmZpZy5pc1VwZGF0ZWRCeUFyY2hbYXJjaF0sXG4gICAgfSk7XG4gICAgaWYgKCFtZXRlb3JSdW50aW1lQ29uZmlnKSByZXR1cm4gdHJ1ZTtcbiAgICBib2lsZXJwbGF0ZS5iYXNlRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGJvaWxlcnBsYXRlLmJhc2VEYXRhLCB7XG4gICAgICBtZXRlb3JSdW50aW1lQ29uZmlnLFxuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbiAgcnVudGltZUNvbmZpZy5pc1VwZGF0ZWRCeUFyY2hbYXJjaF0gPSBmYWxzZTtcbiAgY29uc3QgeyBkeW5hbWljSGVhZCwgZHluYW1pY0JvZHkgfSA9IHJlcXVlc3Q7XG4gIGNvbnN0IGRhdGEgPSBPYmplY3QuYXNzaWduKFxuICAgIHt9LFxuICAgIGJvaWxlcnBsYXRlLmJhc2VEYXRhLFxuICAgIHtcbiAgICAgIGh0bWxBdHRyaWJ1dGVzOiBnZXRIdG1sQXR0cmlidXRlcyhyZXF1ZXN0KSxcbiAgICB9LFxuICAgIHsgZHluYW1pY0hlYWQsIGR5bmFtaWNCb2R5IH1cbiAgKTtcblxuICBsZXQgbWFkZUNoYW5nZXMgPSBmYWxzZTtcbiAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuICBPYmplY3Qua2V5cyhib2lsZXJwbGF0ZURhdGFDYWxsYmFja3MpLmZvckVhY2goa2V5ID0+IHtcbiAgICBwcm9taXNlID0gcHJvbWlzZVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IGJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrc1trZXldO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2socmVxdWVzdCwgZGF0YSwgYXJjaCwgcmVzcG9uc2UpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIC8vIENhbGxiYWNrcyBzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZXkgZGlkIG5vdCBtYWtlIGFueSBjaGFuZ2VzLlxuICAgICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgIG1hZGVDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBwcm9taXNlLnRoZW4oKCkgPT4gKHtcbiAgICBzdHJlYW06IGJvaWxlcnBsYXRlLnRvSFRNTFN0cmVhbShkYXRhKSxcbiAgICBzdGF0dXNDb2RlOiBkYXRhLnN0YXR1c0NvZGUsXG4gICAgaGVhZGVyczogZGF0YS5oZWFkZXJzLFxuICB9KSk7XG59XG5cbi8qKlxuICogQG5hbWUgYWRkVXBkYXRlZE5vdGlmeUhvb2tDYWxsYmFjayhvcHRpb25zKVxuICogQHN1bW1hcnkgY2FsbGJhY2sgaGFuZGxlciBmb3IgYGFkZHVwZGF0ZWROb3RpZnlIb29rYFxuICogQGlzcHJvdG90eXBlIHRydWVcbiAqIEBsb2N1cyBTZXJ2ZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5hcmNoIFRoZSBhcmNoaXRlY3R1cmUgdGhhdCBpcyBiZWluZyB1cGRhdGVkLlxuICogVGhpcyBjYW4gYmUgb25lIG9mIGB3ZWIuYnJvd3NlcmAsIGB3ZWIuYnJvd3Nlci5sZWdhY3lgIG9yIGB3ZWIuY29yZG92YWAuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5tYW5pZmVzdCBUaGUgbmV3IHVwZGF0ZWQgbWFuaWZlc3Qgb2JqZWN0IGZvclxuICogdGhpcyBgYXJjaGAuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5ydW50aW1lQ29uZmlnIFRoZSBuZXcgdXBkYXRlZCBjb25maWd1cmF0aW9uXG4gKiBvYmplY3QgZm9yIHRoaXMgYGFyY2hgLlxuICovXG5cbi8qKlxuICogQHN1bW1hcnkgSG9vayB0aGF0IHJ1bnMgd2hlbiB0aGUgbWV0ZW9yIHJ1bnRpbWUgY29uZmlndXJhdGlvblxuICogaXMgdXBkYXRlZC4gIFR5cGljYWxseSB0aGUgY29uZmlndXJhdGlvbiBvbmx5IGNoYW5nZXMgZHVyaW5nIGRldmVsb3BtZW50IG1vZGUuXG4gKiBAbG9jdXMgU2VydmVyXG4gKiBAcGFyYW0ge2FkZFVwZGF0ZWROb3RpZnlIb29rQ2FsbGJhY2t9IGhhbmRsZXJcbiAqIFRoZSBgaGFuZGxlcmAgaXMgY2FsbGVkIG9uIGV2ZXJ5IGNoYW5nZSB0byBhbiBgYXJjaGAgcnVudGltZSBjb25maWd1cmF0aW9uLlxuICogU2VlIGBhZGRVcGRhdGVkTm90aWZ5SG9va0NhbGxiYWNrYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IHt7IHN0b3A6IGZ1bmN0aW9uLCBjYWxsYmFjazogZnVuY3Rpb24gfX1cbiAqL1xuV2ViQXBwLmFkZFVwZGF0ZWROb3RpZnlIb29rID0gZnVuY3Rpb24oaGFuZGxlcikge1xuICByZXR1cm4gcnVudGltZUNvbmZpZy51cGRhdGVIb29rcy5yZWdpc3RlcihoYW5kbGVyKTtcbn07XG5cbldlYkFwcEludGVybmFscy5nZW5lcmF0ZUJvaWxlcnBsYXRlSW5zdGFuY2UgPSBmdW5jdGlvbihcbiAgYXJjaCxcbiAgbWFuaWZlc3QsXG4gIGFkZGl0aW9uYWxPcHRpb25zXG4pIHtcbiAgYWRkaXRpb25hbE9wdGlvbnMgPSBhZGRpdGlvbmFsT3B0aW9ucyB8fCB7fTtcblxuICBydW50aW1lQ29uZmlnLmlzVXBkYXRlZEJ5QXJjaFthcmNoXSA9IHRydWU7XG4gIGNvbnN0IHJ0aW1lQ29uZmlnID0ge1xuICAgIC4uLl9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18sXG4gICAgLi4uKGFkZGl0aW9uYWxPcHRpb25zLnJ1bnRpbWVDb25maWdPdmVycmlkZXMgfHwge30pLFxuICB9O1xuICBydW50aW1lQ29uZmlnLnVwZGF0ZUhvb2tzLmZvckVhY2goY2IgPT4ge1xuICAgIGNiKHsgYXJjaCwgbWFuaWZlc3QsIHJ1bnRpbWVDb25maWc6IHJ0aW1lQ29uZmlnIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICBjb25zdCBtZXRlb3JSdW50aW1lQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoXG4gICAgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHJ0aW1lQ29uZmlnKSlcbiAgKTtcblxuICByZXR1cm4gbmV3IEJvaWxlcnBsYXRlKFxuICAgIGFyY2gsXG4gICAgbWFuaWZlc3QsXG4gICAgT2JqZWN0LmFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgcGF0aE1hcHBlcihpdGVtUGF0aCkge1xuICAgICAgICAgIHJldHVybiBwYXRoSm9pbihhcmNoUGF0aFthcmNoXSwgaXRlbVBhdGgpO1xuICAgICAgICB9LFxuICAgICAgICBiYXNlRGF0YUV4dGVuc2lvbjoge1xuICAgICAgICAgIGFkZGl0aW9uYWxTdGF0aWNKczogKE9iamVjdC5lbnRyaWVzKGFkZGl0aW9uYWxTdGF0aWNKcykgfHwgW10pLm1hcChmdW5jdGlvbihcbiAgICAgICAgICAgIFtwYXRobmFtZSwgY29udGVudHNdXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgICAgICAgICAgIGNvbnRlbnRzOiBjb250ZW50cyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgICAgLy8gQ29udmVydCB0byBhIEpTT04gc3RyaW5nLCB0aGVuIGdldCByaWQgb2YgbW9zdCB3ZWlyZCBjaGFyYWN0ZXJzLCB0aGVuXG4gICAgICAgICAgLy8gd3JhcCBpbiBkb3VibGUgcXVvdGVzLiAoVGhlIG91dGVybW9zdCBKU09OLnN0cmluZ2lmeSByZWFsbHkgb3VnaHQgdG9cbiAgICAgICAgICAvLyBqdXN0IGJlIFwid3JhcCBpbiBkb3VibGUgcXVvdGVzXCIgYnV0IHdlIHVzZSBpdCB0byBiZSBzYWZlLikgVGhpcyBtaWdodFxuICAgICAgICAgIC8vIGVuZCB1cCBpbnNpZGUgYSA8c2NyaXB0PiB0YWcgc28gd2UgbmVlZCB0byBiZSBjYXJlZnVsIHRvIG5vdCBpbmNsdWRlXG4gICAgICAgICAgLy8gXCI8L3NjcmlwdD5cIiwgYnV0IG5vcm1hbCB7e3NwYWNlYmFyc319IGVzY2FwaW5nIGVzY2FwZXMgdG9vIG11Y2ghIFNlZVxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRlb3IvbWV0ZW9yL2lzc3Vlcy8zNzMwXG4gICAgICAgICAgbWV0ZW9yUnVudGltZUNvbmZpZyxcbiAgICAgICAgICBtZXRlb3JSdW50aW1lSGFzaDogc2hhMShtZXRlb3JSdW50aW1lQ29uZmlnKSxcbiAgICAgICAgICByb290VXJsUGF0aFByZWZpeDpcbiAgICAgICAgICAgIF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uUk9PVF9VUkxfUEFUSF9QUkVGSVggfHwgJycsXG4gICAgICAgICAgYnVuZGxlZEpzQ3NzVXJsUmV3cml0ZUhvb2s6IGJ1bmRsZWRKc0Nzc1VybFJld3JpdGVIb29rLFxuICAgICAgICAgIHNyaU1vZGU6IHNyaU1vZGUsXG4gICAgICAgICAgaW5saW5lU2NyaXB0c0FsbG93ZWQ6IFdlYkFwcEludGVybmFscy5pbmxpbmVTY3JpcHRzQWxsb3dlZCgpLFxuICAgICAgICAgIGlubGluZTogYWRkaXRpb25hbE9wdGlvbnMuaW5saW5lLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFkZGl0aW9uYWxPcHRpb25zXG4gICAgKVxuICApO1xufTtcblxuLy8gQSBtYXBwaW5nIGZyb20gdXJsIHBhdGggdG8gYXJjaGl0ZWN0dXJlIChlLmcuIFwid2ViLmJyb3dzZXJcIikgdG8gc3RhdGljXG4vLyBmaWxlIGluZm9ybWF0aW9uIHdpdGggdGhlIGZvbGxvd2luZyBmaWVsZHM6XG4vLyAtIHR5cGU6IHRoZSB0eXBlIG9mIGZpbGUgdG8gYmUgc2VydmVkXG4vLyAtIGNhY2hlYWJsZTogb3B0aW9uYWxseSwgd2hldGhlciB0aGUgZmlsZSBzaG91bGQgYmUgY2FjaGVkIG9yIG5vdFxuLy8gLSBzb3VyY2VNYXBVcmw6IG9wdGlvbmFsbHksIHRoZSB1cmwgb2YgdGhlIHNvdXJjZSBtYXBcbi8vXG4vLyBJbmZvIGFsc28gY29udGFpbnMgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4vLyAtIGNvbnRlbnQ6IHRoZSBzdHJpbmdpZmllZCBjb250ZW50IHRoYXQgc2hvdWxkIGJlIHNlcnZlZCBhdCB0aGlzIHBhdGhcbi8vIC0gYWJzb2x1dGVQYXRoOiB0aGUgYWJzb2x1dGUgcGF0aCBvbiBkaXNrIHRvIHRoZSBmaWxlXG5cbi8vIFNlcnZlIHN0YXRpYyBmaWxlcyBmcm9tIHRoZSBtYW5pZmVzdCBvciBhZGRlZCB3aXRoXG4vLyBgYWRkU3RhdGljSnNgLiBFeHBvcnRlZCBmb3IgdGVzdHMuXG5XZWJBcHBJbnRlcm5hbHMuc3RhdGljRmlsZXNNaWRkbGV3YXJlID0gYXN5bmMgZnVuY3Rpb24oXG4gIHN0YXRpY0ZpbGVzQnlBcmNoLFxuICByZXEsXG4gIHJlcyxcbiAgbmV4dFxuKSB7XG4gIHZhciBwYXRobmFtZSA9IHBhcnNlUmVxdWVzdChyZXEpLnBhdGhuYW1lO1xuICB0cnkge1xuICAgIHBhdGhuYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhdGhuYW1lKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIG5leHQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc2VydmVTdGF0aWNKcyA9IGZ1bmN0aW9uKHMpIHtcbiAgICBpZiAoXG4gICAgICByZXEubWV0aG9kID09PSAnR0VUJyB8fFxuICAgICAgcmVxLm1ldGhvZCA9PT0gJ0hFQUQnIHx8XG4gICAgICBNZXRlb3Iuc2V0dGluZ3MucGFja2FnZXM/LndlYmFwcD8uYWx3YXlzUmV0dXJuQ29udGVudFxuICAgICkge1xuICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHtcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0OyBjaGFyc2V0PVVURi04JyxcbiAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogQnVmZmVyLmJ5dGVMZW5ndGgocyksXG4gICAgICB9KTtcbiAgICAgIHJlcy53cml0ZShzKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3RhdHVzID0gcmVxLm1ldGhvZCA9PT0gJ09QVElPTlMnID8gMjAwIDogNDA1O1xuICAgICAgcmVzLndyaXRlSGVhZChzdGF0dXMsIHtcbiAgICAgICAgQWxsb3c6ICdPUFRJT05TLCBHRVQsIEhFQUQnLFxuICAgICAgICAnQ29udGVudC1MZW5ndGgnOiAnMCcsXG4gICAgICB9KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKFxuICAgIHBhdGhuYW1lIGluIGFkZGl0aW9uYWxTdGF0aWNKcyAmJlxuICAgICFXZWJBcHBJbnRlcm5hbHMuaW5saW5lU2NyaXB0c0FsbG93ZWQoKVxuICApIHtcbiAgICBzZXJ2ZVN0YXRpY0pzKGFkZGl0aW9uYWxTdGF0aWNKc1twYXRobmFtZV0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgYXJjaCwgcGF0aCB9ID0gV2ViQXBwLmNhdGVnb3JpemVSZXF1ZXN0KHJlcSk7XG5cbiAgaWYgKCFoYXNPd24uY2FsbChXZWJBcHAuY2xpZW50UHJvZ3JhbXMsIGFyY2gpKSB7XG4gICAgLy8gV2UgY291bGQgY29tZSBoZXJlIGluIGNhc2Ugd2UgcnVuIHdpdGggc29tZSBhcmNoaXRlY3R1cmVzIGV4Y2x1ZGVkXG4gICAgbmV4dCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIElmIHBhdXNlQ2xpZW50KGFyY2gpIGhhcyBiZWVuIGNhbGxlZCwgcHJvZ3JhbS5wYXVzZWQgd2lsbCBiZSBhXG4gIC8vIFByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdoZW4gdGhlIHByb2dyYW0gaXMgdW5wYXVzZWQuXG4gIGNvbnN0IHByb2dyYW0gPSBXZWJBcHAuY2xpZW50UHJvZ3JhbXNbYXJjaF07XG4gIGF3YWl0IHByb2dyYW0ucGF1c2VkO1xuXG4gIGlmIChcbiAgICBwYXRoID09PSAnL21ldGVvcl9ydW50aW1lX2NvbmZpZy5qcycgJiZcbiAgICAhV2ViQXBwSW50ZXJuYWxzLmlubGluZVNjcmlwdHNBbGxvd2VkKClcbiAgKSB7XG4gICAgc2VydmVTdGF0aWNKcyhcbiAgICAgIGBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fID0gJHtwcm9ncmFtLm1ldGVvclJ1bnRpbWVDb25maWd9O2BcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGluZm8gPSBnZXRTdGF0aWNGaWxlSW5mbyhzdGF0aWNGaWxlc0J5QXJjaCwgcGF0aG5hbWUsIHBhdGgsIGFyY2gpO1xuICBpZiAoIWluZm8pIHtcbiAgICBuZXh0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIFwic2VuZFwiIHdpbGwgaGFuZGxlIEhFQUQgJiBHRVQgcmVxdWVzdHNcbiAgaWYgKFxuICAgIHJlcS5tZXRob2QgIT09ICdIRUFEJyAmJlxuICAgIHJlcS5tZXRob2QgIT09ICdHRVQnICYmXG4gICAgIU1ldGVvci5zZXR0aW5ncy5wYWNrYWdlcz8ud2ViYXBwPy5hbHdheXNSZXR1cm5Db250ZW50XG4gICkge1xuICAgIGNvbnN0IHN0YXR1cyA9IHJlcS5tZXRob2QgPT09ICdPUFRJT05TJyA/IDIwMCA6IDQwNTtcbiAgICByZXMud3JpdGVIZWFkKHN0YXR1cywge1xuICAgICAgQWxsb3c6ICdPUFRJT05TLCBHRVQsIEhFQUQnLFxuICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogJzAnLFxuICAgIH0pO1xuICAgIHJlcy5lbmQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBXZSBkb24ndCBuZWVkIHRvIGNhbGwgcGF1c2UgYmVjYXVzZSwgdW5saWtlICdzdGF0aWMnLCBvbmNlIHdlIGNhbGwgaW50b1xuICAvLyAnc2VuZCcgYW5kIHlpZWxkIHRvIHRoZSBldmVudCBsb29wLCB3ZSBuZXZlciBjYWxsIGFub3RoZXIgaGFuZGxlciB3aXRoXG4gIC8vICduZXh0Jy5cblxuICAvLyBDYWNoZWFibGUgZmlsZXMgYXJlIGZpbGVzIHRoYXQgc2hvdWxkIG5ldmVyIGNoYW5nZS4gVHlwaWNhbGx5XG4gIC8vIG5hbWVkIGJ5IHRoZWlyIGhhc2ggKGVnIG1ldGVvciBidW5kbGVkIGpzIGFuZCBjc3MgZmlsZXMpLlxuICAvLyBXZSBjYWNoZSB0aGVtIH5mb3JldmVyICgxeXIpLlxuICBjb25zdCBtYXhBZ2UgPSBpbmZvLmNhY2hlYWJsZSA/IDEwMDAgKiA2MCAqIDYwICogMjQgKiAzNjUgOiAwO1xuXG4gIGlmIChpbmZvLmNhY2hlYWJsZSkge1xuICAgIC8vIFNpbmNlIHdlIHVzZSByZXEuaGVhZGVyc1tcInVzZXItYWdlbnRcIl0gdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlXG4gICAgLy8gY2xpZW50IHNob3VsZCByZWNlaXZlIG1vZGVybiBvciBsZWdhY3kgcmVzb3VyY2VzLCB0ZWxsIHRoZSBjbGllbnRcbiAgICAvLyB0byBpbnZhbGlkYXRlIGNhY2hlZCByZXNvdXJjZXMgd2hlbi9pZiBpdHMgdXNlciBhZ2VudCBzdHJpbmdcbiAgICAvLyBjaGFuZ2VzIGluIHRoZSBmdXR1cmUuXG4gICAgcmVzLnNldEhlYWRlcignVmFyeScsICdVc2VyLUFnZW50Jyk7XG4gIH1cblxuICAvLyBTZXQgdGhlIFgtU291cmNlTWFwIGhlYWRlciwgd2hpY2ggY3VycmVudCBDaHJvbWUsIEZpcmVGb3gsIGFuZCBTYWZhcmlcbiAgLy8gdW5kZXJzdGFuZC4gIChUaGUgU291cmNlTWFwIGhlYWRlciBpcyBzbGlnaHRseSBtb3JlIHNwZWMtY29ycmVjdCBidXQgRkZcbiAgLy8gZG9lc24ndCB1bmRlcnN0YW5kIGl0LilcbiAgLy9cbiAgLy8gWW91IG1heSBhbHNvIG5lZWQgdG8gZW5hYmxlIHNvdXJjZSBtYXBzIGluIENocm9tZTogb3BlbiBkZXYgdG9vbHMsIGNsaWNrXG4gIC8vIHRoZSBnZWFyIGluIHRoZSBib3R0b20gcmlnaHQgY29ybmVyLCBhbmQgc2VsZWN0IFwiZW5hYmxlIHNvdXJjZSBtYXBzXCIuXG4gIGlmIChpbmZvLnNvdXJjZU1hcFVybCkge1xuICAgIHJlcy5zZXRIZWFkZXIoXG4gICAgICAnWC1Tb3VyY2VNYXAnLFxuICAgICAgX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5ST09UX1VSTF9QQVRIX1BSRUZJWCArIGluZm8uc291cmNlTWFwVXJsXG4gICAgKTtcbiAgfVxuXG4gIGlmIChpbmZvLnR5cGUgPT09ICdqcycgfHwgaW5mby50eXBlID09PSAnZHluYW1pYyBqcycpIHtcbiAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vamF2YXNjcmlwdDsgY2hhcnNldD1VVEYtOCcpO1xuICB9IGVsc2UgaWYgKGluZm8udHlwZSA9PT0gJ2NzcycpIHtcbiAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9jc3M7IGNoYXJzZXQ9VVRGLTgnKTtcbiAgfSBlbHNlIGlmIChpbmZvLnR5cGUgPT09ICdqc29uJykge1xuICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04Jyk7XG4gIH1cblxuICBpZiAoaW5mby5oYXNoKSB7XG4gICAgcmVzLnNldEhlYWRlcignRVRhZycsICdcIicgKyBpbmZvLmhhc2ggKyAnXCInKTtcbiAgfVxuXG4gIGlmIChpbmZvLmNvbnRlbnQpIHtcbiAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LUxlbmd0aCcsIEJ1ZmZlci5ieXRlTGVuZ3RoKGluZm8uY29udGVudCkpO1xuICAgIHJlcy53cml0ZShpbmZvLmNvbnRlbnQpO1xuICAgIHJlcy5lbmQoKTtcbiAgfSBlbHNlIHtcbiAgICBzZW5kKHJlcSwgaW5mby5hYnNvbHV0ZVBhdGgsIHtcbiAgICAgIG1heGFnZTogbWF4QWdlLFxuICAgICAgZG90ZmlsZXM6ICdhbGxvdycsIC8vIGlmIHdlIHNwZWNpZmllZCBhIGRvdGZpbGUgaW4gdGhlIG1hbmlmZXN0LCBzZXJ2ZSBpdFxuICAgICAgbGFzdE1vZGlmaWVkOiBmYWxzZSwgLy8gZG9uJ3Qgc2V0IGxhc3QtbW9kaWZpZWQgYmFzZWQgb24gdGhlIGZpbGUgZGF0ZVxuICAgIH0pXG4gICAgICAub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIExvZy5lcnJvcignRXJyb3Igc2VydmluZyBzdGF0aWMgZmlsZSAnICsgZXJyKTtcbiAgICAgICAgcmVzLndyaXRlSGVhZCg1MDApO1xuICAgICAgICByZXMuZW5kKCk7XG4gICAgICB9KVxuICAgICAgLm9uKCdkaXJlY3RvcnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgTG9nLmVycm9yKCdVbmV4cGVjdGVkIGRpcmVjdG9yeSAnICsgaW5mby5hYnNvbHV0ZVBhdGgpO1xuICAgICAgICByZXMud3JpdGVIZWFkKDUwMCk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pXG4gICAgICAucGlwZShyZXMpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBnZXRTdGF0aWNGaWxlSW5mbyhzdGF0aWNGaWxlc0J5QXJjaCwgb3JpZ2luYWxQYXRoLCBwYXRoLCBhcmNoKSB7XG4gIGlmICghaGFzT3duLmNhbGwoV2ViQXBwLmNsaWVudFByb2dyYW1zLCBhcmNoKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gR2V0IGEgbGlzdCBvZiBhbGwgYXZhaWxhYmxlIHN0YXRpYyBmaWxlIGFyY2hpdGVjdHVyZXMsIHdpdGggYXJjaFxuICAvLyBmaXJzdCBpbiB0aGUgbGlzdCBpZiBpdCBleGlzdHMuXG4gIGNvbnN0IHN0YXRpY0FyY2hMaXN0ID0gT2JqZWN0LmtleXMoc3RhdGljRmlsZXNCeUFyY2gpO1xuICBjb25zdCBhcmNoSW5kZXggPSBzdGF0aWNBcmNoTGlzdC5pbmRleE9mKGFyY2gpO1xuICBpZiAoYXJjaEluZGV4ID4gMCkge1xuICAgIHN0YXRpY0FyY2hMaXN0LnVuc2hpZnQoc3RhdGljQXJjaExpc3Quc3BsaWNlKGFyY2hJbmRleCwgMSlbMF0pO1xuICB9XG5cbiAgbGV0IGluZm8gPSBudWxsO1xuXG4gIHN0YXRpY0FyY2hMaXN0LnNvbWUoYXJjaCA9PiB7XG4gICAgY29uc3Qgc3RhdGljRmlsZXMgPSBzdGF0aWNGaWxlc0J5QXJjaFthcmNoXTtcblxuICAgIGZ1bmN0aW9uIGZpbmFsaXplKHBhdGgpIHtcbiAgICAgIGluZm8gPSBzdGF0aWNGaWxlc1twYXRoXTtcbiAgICAgIC8vIFNvbWV0aW1lcyB3ZSByZWdpc3RlciBhIGxhenkgZnVuY3Rpb24gaW5zdGVhZCBvZiBhY3R1YWwgZGF0YSBpblxuICAgICAgLy8gdGhlIHN0YXRpY0ZpbGVzIG1hbmlmZXN0LlxuICAgICAgaWYgKHR5cGVvZiBpbmZvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGluZm8gPSBzdGF0aWNGaWxlc1twYXRoXSA9IGluZm8oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIElmIHN0YXRpY0ZpbGVzIGNvbnRhaW5zIG9yaWdpbmFsUGF0aCB3aXRoIHRoZSBhcmNoIGluZmVycmVkIGFib3ZlLFxuICAgIC8vIHVzZSB0aGF0IGluZm9ybWF0aW9uLlxuICAgIGlmIChoYXNPd24uY2FsbChzdGF0aWNGaWxlcywgb3JpZ2luYWxQYXRoKSkge1xuICAgICAgcmV0dXJuIGZpbmFsaXplKG9yaWdpbmFsUGF0aCk7XG4gICAgfVxuXG4gICAgLy8gSWYgY2F0ZWdvcml6ZVJlcXVlc3QgcmV0dXJuZWQgYW4gYWx0ZXJuYXRlIHBhdGgsIHRyeSB0aGF0IGluc3RlYWQuXG4gICAgaWYgKHBhdGggIT09IG9yaWdpbmFsUGF0aCAmJiBoYXNPd24uY2FsbChzdGF0aWNGaWxlcywgcGF0aCkpIHtcbiAgICAgIHJldHVybiBmaW5hbGl6ZShwYXRoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmZvO1xufVxuXG4vLyBQYXJzZSB0aGUgcGFzc2VkIGluIHBvcnQgdmFsdWUuIFJldHVybiB0aGUgcG9ydCBhcy1pcyBpZiBpdCdzIGEgU3RyaW5nXG4vLyAoZS5nLiBhIFdpbmRvd3MgU2VydmVyIHN0eWxlIG5hbWVkIHBpcGUpLCBvdGhlcndpc2UgcmV0dXJuIHRoZSBwb3J0IGFzIGFuXG4vLyBpbnRlZ2VyLlxuLy9cbi8vIERFUFJFQ0FURUQ6IERpcmVjdCB1c2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyBub3QgcmVjb21tZW5kZWQ7IGl0IGlzIG5vXG4vLyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5LCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2UuXG5XZWJBcHBJbnRlcm5hbHMucGFyc2VQb3J0ID0gcG9ydCA9PiB7XG4gIGxldCBwYXJzZWRQb3J0ID0gcGFyc2VJbnQocG9ydCk7XG4gIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VkUG9ydCkpIHtcbiAgICBwYXJzZWRQb3J0ID0gcG9ydDtcbiAgfVxuICByZXR1cm4gcGFyc2VkUG9ydDtcbn07XG5cbmltcG9ydCB7IG9uTWVzc2FnZSB9IGZyb20gJ21ldGVvci9pbnRlci1wcm9jZXNzLW1lc3NhZ2luZyc7XG5cbm9uTWVzc2FnZSgnd2ViYXBwLXBhdXNlLWNsaWVudCcsIGFzeW5jICh7IGFyY2ggfSkgPT4ge1xuICBhd2FpdCBXZWJBcHBJbnRlcm5hbHMucGF1c2VDbGllbnQoYXJjaCk7XG59KTtcblxub25NZXNzYWdlKCd3ZWJhcHAtcmVsb2FkLWNsaWVudCcsIGFzeW5jICh7IGFyY2ggfSkgPT4ge1xuICBhd2FpdCBXZWJBcHBJbnRlcm5hbHMuZ2VuZXJhdGVDbGllbnRQcm9ncmFtKGFyY2gpO1xufSk7XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bldlYkFwcFNlcnZlcigpIHtcbiAgdmFyIHNodXR0aW5nRG93biA9IGZhbHNlO1xuICB2YXIgc3luY1F1ZXVlID0gbmV3IE1ldGVvci5fQXN5bmNocm9ub3VzUXVldWUoKTtcblxuICB2YXIgZ2V0SXRlbVBhdGhuYW1lID0gZnVuY3Rpb24oaXRlbVVybCkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFyc2VVcmwoaXRlbVVybCkucGF0aG5hbWUpO1xuICB9O1xuXG4gIFdlYkFwcEludGVybmFscy5yZWxvYWRDbGllbnRQcm9ncmFtcyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGF3YWl0IHN5bmNRdWV1ZS5ydW5UYXNrKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3Qgc3RhdGljRmlsZXNCeUFyY2ggPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgICBjb25zdCB7IGNvbmZpZ0pzb24gfSA9IF9fbWV0ZW9yX2Jvb3RzdHJhcF9fO1xuICAgICAgY29uc3QgY2xpZW50QXJjaHMgPVxuICAgICAgICBjb25maWdKc29uLmNsaWVudEFyY2hzIHx8IE9iamVjdC5rZXlzKGNvbmZpZ0pzb24uY2xpZW50UGF0aHMpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjbGllbnRBcmNocy5mb3JFYWNoKGFyY2ggPT4ge1xuICAgICAgICAgIGdlbmVyYXRlQ2xpZW50UHJvZ3JhbShhcmNoLCBzdGF0aWNGaWxlc0J5QXJjaCk7XG4gICAgICAgIH0pO1xuICAgICAgICBXZWJBcHBJbnRlcm5hbHMuc3RhdGljRmlsZXNCeUFyY2ggPSBzdGF0aWNGaWxlc0J5QXJjaDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgTG9nLmVycm9yKCdFcnJvciByZWxvYWRpbmcgdGhlIGNsaWVudCBwcm9ncmFtOiAnICsgZS5zdGFjayk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvLyBQYXVzZSBhbnkgaW5jb21pbmcgcmVxdWVzdHMgYW5kIG1ha2UgdGhlbSB3YWl0IGZvciB0aGUgcHJvZ3JhbSB0byBiZVxuICAvLyB1bnBhdXNlZCB0aGUgbmV4dCB0aW1lIGdlbmVyYXRlQ2xpZW50UHJvZ3JhbShhcmNoKSBpcyBjYWxsZWQuXG4gIFdlYkFwcEludGVybmFscy5wYXVzZUNsaWVudCA9IGFzeW5jIGZ1bmN0aW9uKGFyY2gpIHtcbiAgICBhd2FpdCBzeW5jUXVldWUucnVuVGFzaygoKSA9PiB7XG4gICAgICBjb25zdCBwcm9ncmFtID0gV2ViQXBwLmNsaWVudFByb2dyYW1zW2FyY2hdO1xuICAgICAgY29uc3QgeyB1bnBhdXNlIH0gPSBwcm9ncmFtO1xuICAgICAgcHJvZ3JhbS5wYXVzZWQgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB1bnBhdXNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgLy8gSWYgdGhlcmUgaGFwcGVucyB0byBiZSBhbiBleGlzdGluZyBwcm9ncmFtLnVucGF1c2UgZnVuY3Rpb24sXG4gICAgICAgICAgLy8gY29tcG9zZSBpdCB3aXRoIHRoZSByZXNvbHZlIGZ1bmN0aW9uLlxuICAgICAgICAgIHByb2dyYW0udW5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdW5wYXVzZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvZ3JhbS51bnBhdXNlID0gcmVzb2x2ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgV2ViQXBwSW50ZXJuYWxzLmdlbmVyYXRlQ2xpZW50UHJvZ3JhbSA9IGFzeW5jIGZ1bmN0aW9uKGFyY2gpIHtcbiAgICBhd2FpdCBzeW5jUXVldWUucnVuVGFzaygoKSA9PiBnZW5lcmF0ZUNsaWVudFByb2dyYW0oYXJjaCkpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlQ2xpZW50UHJvZ3JhbShcbiAgICBhcmNoLFxuICAgIHN0YXRpY0ZpbGVzQnlBcmNoID0gV2ViQXBwSW50ZXJuYWxzLnN0YXRpY0ZpbGVzQnlBcmNoXG4gICkge1xuICAgIGNvbnN0IGNsaWVudERpciA9IHBhdGhKb2luKFxuICAgICAgcGF0aERpcm5hbWUoX19tZXRlb3JfYm9vdHN0cmFwX18uc2VydmVyRGlyKSxcbiAgICAgIGFyY2hcbiAgICApO1xuXG4gICAgLy8gcmVhZCB0aGUgY29udHJvbCBmb3IgdGhlIGNsaWVudCB3ZSdsbCBiZSBzZXJ2aW5nIHVwXG4gICAgY29uc3QgcHJvZ3JhbUpzb25QYXRoID0gcGF0aEpvaW4oY2xpZW50RGlyLCAncHJvZ3JhbS5qc29uJyk7XG5cbiAgICBsZXQgcHJvZ3JhbUpzb247XG4gICAgdHJ5IHtcbiAgICAgIHByb2dyYW1Kc29uID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMocHJvZ3JhbUpzb25QYXRoKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUuY29kZSA9PT0gJ0VOT0VOVCcpIHJldHVybjtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgaWYgKHByb2dyYW1Kc29uLmZvcm1hdCAhPT0gJ3dlYi1wcm9ncmFtLXByZTEnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdVbnN1cHBvcnRlZCBmb3JtYXQgZm9yIGNsaWVudCBhc3NldHM6ICcgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHByb2dyYW1Kc29uLmZvcm1hdClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFwcm9ncmFtSnNvblBhdGggfHwgIWNsaWVudERpciB8fCAhcHJvZ3JhbUpzb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2xpZW50IGNvbmZpZyBmaWxlIG5vdCBwYXJzZWQuJyk7XG4gICAgfVxuXG4gICAgYXJjaFBhdGhbYXJjaF0gPSBjbGllbnREaXI7XG4gICAgY29uc3Qgc3RhdGljRmlsZXMgPSAoc3RhdGljRmlsZXNCeUFyY2hbYXJjaF0gPSBPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuICAgIGNvbnN0IHsgbWFuaWZlc3QgfSA9IHByb2dyYW1Kc29uO1xuICAgIG1hbmlmZXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS51cmwgJiYgaXRlbS53aGVyZSA9PT0gJ2NsaWVudCcpIHtcbiAgICAgICAgc3RhdGljRmlsZXNbZ2V0SXRlbVBhdGhuYW1lKGl0ZW0udXJsKV0gPSB7XG4gICAgICAgICAgYWJzb2x1dGVQYXRoOiBwYXRoSm9pbihjbGllbnREaXIsIGl0ZW0ucGF0aCksXG4gICAgICAgICAgY2FjaGVhYmxlOiBpdGVtLmNhY2hlYWJsZSxcbiAgICAgICAgICBoYXNoOiBpdGVtLmhhc2gsXG4gICAgICAgICAgLy8gTGluayBmcm9tIHNvdXJjZSB0byBpdHMgbWFwXG4gICAgICAgICAgc291cmNlTWFwVXJsOiBpdGVtLnNvdXJjZU1hcFVybCxcbiAgICAgICAgICB0eXBlOiBpdGVtLnR5cGUsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGl0ZW0uc291cmNlTWFwKSB7XG4gICAgICAgICAgLy8gU2VydmUgdGhlIHNvdXJjZSBtYXAgdG9vLCB1bmRlciB0aGUgc3BlY2lmaWVkIFVSTC4gV2UgYXNzdW1lXG4gICAgICAgICAgLy8gYWxsIHNvdXJjZSBtYXBzIGFyZSBjYWNoZWFibGUuXG4gICAgICAgICAgc3RhdGljRmlsZXNbZ2V0SXRlbVBhdGhuYW1lKGl0ZW0uc291cmNlTWFwVXJsKV0gPSB7XG4gICAgICAgICAgICBhYnNvbHV0ZVBhdGg6IHBhdGhKb2luKGNsaWVudERpciwgaXRlbS5zb3VyY2VNYXApLFxuICAgICAgICAgICAgY2FjaGVhYmxlOiB0cnVlLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHsgUFVCTElDX1NFVFRJTkdTIH0gPSBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fO1xuICAgIGNvbnN0IGNvbmZpZ092ZXJyaWRlcyA9IHtcbiAgICAgIFBVQkxJQ19TRVRUSU5HUyxcbiAgICB9O1xuXG4gICAgY29uc3Qgb2xkUHJvZ3JhbSA9IFdlYkFwcC5jbGllbnRQcm9ncmFtc1thcmNoXTtcbiAgICBjb25zdCBuZXdQcm9ncmFtID0gKFdlYkFwcC5jbGllbnRQcm9ncmFtc1thcmNoXSA9IHtcbiAgICAgIGZvcm1hdDogJ3dlYi1wcm9ncmFtLXByZTEnLFxuICAgICAgbWFuaWZlc3Q6IG1hbmlmZXN0LFxuICAgICAgLy8gVXNlIGFycm93IGZ1bmN0aW9ucyBzbyB0aGF0IHRoZXNlIHZlcnNpb25zIGNhbiBiZSBsYXppbHlcbiAgICAgIC8vIGNhbGN1bGF0ZWQgbGF0ZXIsIGFuZCBzbyB0aGF0IHRoZXkgd2lsbCBub3QgYmUgaW5jbHVkZWQgaW4gdGhlXG4gICAgICAvLyBzdGF0aWNGaWxlc1ttYW5pZmVzdFVybF0uY29udGVudCBzdHJpbmcgYmVsb3cuXG4gICAgICAvL1xuICAgICAgLy8gTm90ZTogdGhlc2UgdmVyc2lvbiBjYWxjdWxhdGlvbnMgbXVzdCBiZSBrZXB0IGluIGFncmVlbWVudCB3aXRoXG4gICAgICAvLyBDb3Jkb3ZhQnVpbGRlciNhcHBlbmRWZXJzaW9uIGluIHRvb2xzL2NvcmRvdmEvYnVpbGRlci5qcywgb3IgaG90XG4gICAgICAvLyBjb2RlIHB1c2ggd2lsbCByZWxvYWQgQ29yZG92YSBhcHBzIHVubmVjZXNzYXJpbHkuXG4gICAgICB2ZXJzaW9uOiAoKSA9PlxuICAgICAgICBXZWJBcHBIYXNoaW5nLmNhbGN1bGF0ZUNsaWVudEhhc2gobWFuaWZlc3QsIG51bGwsIGNvbmZpZ092ZXJyaWRlcyksXG4gICAgICB2ZXJzaW9uUmVmcmVzaGFibGU6ICgpID0+XG4gICAgICAgIFdlYkFwcEhhc2hpbmcuY2FsY3VsYXRlQ2xpZW50SGFzaChcbiAgICAgICAgICBtYW5pZmVzdCxcbiAgICAgICAgICB0eXBlID0+IHR5cGUgPT09ICdjc3MnLFxuICAgICAgICAgIGNvbmZpZ092ZXJyaWRlc1xuICAgICAgICApLFxuICAgICAgdmVyc2lvbk5vblJlZnJlc2hhYmxlOiAoKSA9PlxuICAgICAgICBXZWJBcHBIYXNoaW5nLmNhbGN1bGF0ZUNsaWVudEhhc2goXG4gICAgICAgICAgbWFuaWZlc3QsXG4gICAgICAgICAgKHR5cGUsIHJlcGxhY2VhYmxlKSA9PiB0eXBlICE9PSAnY3NzJyAmJiAhcmVwbGFjZWFibGUsXG4gICAgICAgICAgY29uZmlnT3ZlcnJpZGVzXG4gICAgICAgICksXG4gICAgICB2ZXJzaW9uUmVwbGFjZWFibGU6ICgpID0+XG4gICAgICAgIFdlYkFwcEhhc2hpbmcuY2FsY3VsYXRlQ2xpZW50SGFzaChcbiAgICAgICAgICBtYW5pZmVzdCxcbiAgICAgICAgICAoX3R5cGUsIHJlcGxhY2VhYmxlKSA9PiByZXBsYWNlYWJsZSxcbiAgICAgICAgICBjb25maWdPdmVycmlkZXNcbiAgICAgICAgKSxcbiAgICAgIGNvcmRvdmFDb21wYXRpYmlsaXR5VmVyc2lvbnM6IHByb2dyYW1Kc29uLmNvcmRvdmFDb21wYXRpYmlsaXR5VmVyc2lvbnMsXG4gICAgICBQVUJMSUNfU0VUVElOR1MsXG4gICAgICBobXJWZXJzaW9uOiBwcm9ncmFtSnNvbi5obXJWZXJzaW9uLFxuICAgIH0pO1xuXG4gICAgLy8gRXhwb3NlIHByb2dyYW0gZGV0YWlscyBhcyBhIHN0cmluZyByZWFjaGFibGUgdmlhIHRoZSBmb2xsb3dpbmcgVVJMLlxuICAgIGNvbnN0IG1hbmlmZXN0VXJsUHJlZml4ID0gJy9fXycgKyBhcmNoLnJlcGxhY2UoL153ZWJcXC4vLCAnJyk7XG4gICAgY29uc3QgbWFuaWZlc3RVcmwgPSBtYW5pZmVzdFVybFByZWZpeCArIGdldEl0ZW1QYXRobmFtZSgnL21hbmlmZXN0Lmpzb24nKTtcblxuICAgIHN0YXRpY0ZpbGVzW21hbmlmZXN0VXJsXSA9ICgpID0+IHtcbiAgICAgIGlmIChQYWNrYWdlLmF1dG91cGRhdGUpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIEFVVE9VUERBVEVfVkVSU0lPTiA9IFBhY2thZ2UuYXV0b3VwZGF0ZS5BdXRvdXBkYXRlLmF1dG91cGRhdGVWZXJzaW9uLFxuICAgICAgICB9ID0gcHJvY2Vzcy5lbnY7XG5cbiAgICAgICAgaWYgKEFVVE9VUERBVEVfVkVSU0lPTikge1xuICAgICAgICAgIG5ld1Byb2dyYW0udmVyc2lvbiA9IEFVVE9VUERBVEVfVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG5ld1Byb2dyYW0udmVyc2lvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBuZXdQcm9ncmFtLnZlcnNpb24gPSBuZXdQcm9ncmFtLnZlcnNpb24oKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkobmV3UHJvZ3JhbSksXG4gICAgICAgIGNhY2hlYWJsZTogZmFsc2UsXG4gICAgICAgIGhhc2g6IG5ld1Byb2dyYW0udmVyc2lvbixcbiAgICAgICAgdHlwZTogJ2pzb24nLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZ2VuZXJhdGVCb2lsZXJwbGF0ZUZvckFyY2goYXJjaCk7XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgYW55IHJlcXVlc3RzIHdhaXRpbmcgb24gb2xkUHJvZ3JhbS5wYXVzZWQsIGxldCB0aGVtXG4gICAgLy8gY29udGludWUgbm93ICh1c2luZyB0aGUgbmV3IHByb2dyYW0pLlxuICAgIGlmIChvbGRQcm9ncmFtICYmIG9sZFByb2dyYW0ucGF1c2VkKSB7XG4gICAgICBvbGRQcm9ncmFtLnVucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWZhdWx0T3B0aW9uc0ZvckFyY2ggPSB7XG4gICAgJ3dlYi5jb3Jkb3ZhJzoge1xuICAgICAgcnVudGltZUNvbmZpZ092ZXJyaWRlczoge1xuICAgICAgICAvLyBYWFggV2UgdXNlIGFic29sdXRlVXJsKCkgaGVyZSBzbyB0aGF0IHdlIHNlcnZlIGh0dHBzOi8vXG4gICAgICAgIC8vIFVSTHMgdG8gY29yZG92YSBjbGllbnRzIGlmIGZvcmNlLXNzbCBpcyBpbiB1c2UuIElmIHdlIHdlcmVcbiAgICAgICAgLy8gdG8gdXNlIF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uUk9PVF9VUkwgaW5zdGVhZCBvZlxuICAgICAgICAvLyBhYnNvbHV0ZVVybCgpLCB0aGVuIENvcmRvdmEgY2xpZW50cyB3b3VsZCBpbW1lZGlhdGVseSBnZXQgYVxuICAgICAgICAvLyBIQ1Agc2V0dGluZyB0aGVpciBERFBfREVGQVVMVF9DT05ORUNUSU9OX1VSTCB0b1xuICAgICAgICAvLyBodHRwOi8vZXhhbXBsZS5tZXRlb3IuY29tLiBUaGlzIGJyZWFrcyB0aGUgYXBwLCBiZWNhdXNlXG4gICAgICAgIC8vIGZvcmNlLXNzbCBkb2Vzbid0IHNlcnZlIENPUlMgaGVhZGVycyBvbiAzMDJcbiAgICAgICAgLy8gcmVkaXJlY3RzLiAoUGx1cyBpdCdzIHVuZGVzaXJhYmxlIHRvIGhhdmUgY2xpZW50c1xuICAgICAgICAvLyBjb25uZWN0aW5nIHRvIGh0dHA6Ly9leGFtcGxlLm1ldGVvci5jb20gd2hlbiBmb3JjZS1zc2wgaXNcbiAgICAgICAgLy8gaW4gdXNlLilcbiAgICAgICAgRERQX0RFRkFVTFRfQ09OTkVDVElPTl9VUkw6XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTU9CSUxFX0REUF9VUkwgfHwgTWV0ZW9yLmFic29sdXRlVXJsKCksXG4gICAgICAgIFJPT1RfVVJMOiBwcm9jZXNzLmVudi5NT0JJTEVfUk9PVF9VUkwgfHwgTWV0ZW9yLmFic29sdXRlVXJsKCksXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAnd2ViLmJyb3dzZXInOiB7XG4gICAgICBydW50aW1lQ29uZmlnT3ZlcnJpZGVzOiB7XG4gICAgICAgIGlzTW9kZXJuOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgJ3dlYi5icm93c2VyLmxlZ2FjeSc6IHtcbiAgICAgIHJ1bnRpbWVDb25maWdPdmVycmlkZXM6IHtcbiAgICAgICAgaXNNb2Rlcm46IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIFdlYkFwcEludGVybmFscy5nZW5lcmF0ZUJvaWxlcnBsYXRlID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgLy8gVGhpcyBib2lsZXJwbGF0ZSB3aWxsIGJlIHNlcnZlZCB0byB0aGUgbW9iaWxlIGRldmljZXMgd2hlbiB1c2VkIHdpdGhcbiAgICAvLyBNZXRlb3IvQ29yZG92YSBmb3IgdGhlIEhvdC1Db2RlIFB1c2ggYW5kIHNpbmNlIHRoZSBmaWxlIHdpbGwgYmUgc2VydmVkIGJ5XG4gICAgLy8gdGhlIGRldmljZSdzIHNlcnZlciwgaXQgaXMgaW1wb3J0YW50IHRvIHNldCB0aGUgRERQIHVybCB0byB0aGUgYWN0dWFsXG4gICAgLy8gTWV0ZW9yIHNlcnZlciBhY2NlcHRpbmcgRERQIGNvbm5lY3Rpb25zIGFuZCBub3QgdGhlIGRldmljZSdzIGZpbGUgc2VydmVyLlxuICAgIGF3YWl0IHN5bmNRdWV1ZS5ydW5UYXNrKGZ1bmN0aW9uKCkge1xuICAgICAgT2JqZWN0LmtleXMoV2ViQXBwLmNsaWVudFByb2dyYW1zKS5mb3JFYWNoKGdlbmVyYXRlQm9pbGVycGxhdGVGb3JBcmNoKTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBnZW5lcmF0ZUJvaWxlcnBsYXRlRm9yQXJjaChhcmNoKSB7XG4gICAgY29uc3QgcHJvZ3JhbSA9IFdlYkFwcC5jbGllbnRQcm9ncmFtc1thcmNoXTtcbiAgICBjb25zdCBhZGRpdGlvbmFsT3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zRm9yQXJjaFthcmNoXSB8fCB7fTtcbiAgICBjb25zdCB7IGJhc2VEYXRhIH0gPSAoYm9pbGVycGxhdGVCeUFyY2hbXG4gICAgICBhcmNoXG4gICAgXSA9IFdlYkFwcEludGVybmFscy5nZW5lcmF0ZUJvaWxlcnBsYXRlSW5zdGFuY2UoXG4gICAgICBhcmNoLFxuICAgICAgcHJvZ3JhbS5tYW5pZmVzdCxcbiAgICAgIGFkZGl0aW9uYWxPcHRpb25zXG4gICAgKSk7XG4gICAgLy8gV2UgbmVlZCB0aGUgcnVudGltZSBjb25maWcgd2l0aCBvdmVycmlkZXMgZm9yIG1ldGVvcl9ydW50aW1lX2NvbmZpZy5qczpcbiAgICBwcm9ncmFtLm1ldGVvclJ1bnRpbWVDb25maWcgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAuLi5fX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fLFxuICAgICAgLi4uKGFkZGl0aW9uYWxPcHRpb25zLnJ1bnRpbWVDb25maWdPdmVycmlkZXMgfHwgbnVsbCksXG4gICAgfSk7XG4gICAgcHJvZ3JhbS5yZWZyZXNoYWJsZUFzc2V0cyA9IGJhc2VEYXRhLmNzcy5tYXAoZmlsZSA9PiAoe1xuICAgICAgdXJsOiBidW5kbGVkSnNDc3NVcmxSZXdyaXRlSG9vayhmaWxlLnVybCksXG4gICAgfSkpO1xuICB9XG5cbiAgYXdhaXQgV2ViQXBwSW50ZXJuYWxzLnJlbG9hZENsaWVudFByb2dyYW1zKCk7XG5cbiAgLy8gd2Vic2VydmVyXG4gIHZhciBhcHAgPSBjcmVhdGVFeHByZXNzQXBwKClcblxuICAvLyBQYWNrYWdlcyBhbmQgYXBwcyBjYW4gYWRkIGhhbmRsZXJzIHRoYXQgcnVuIGJlZm9yZSBhbnkgb3RoZXIgTWV0ZW9yXG4gIC8vIGhhbmRsZXJzIHZpYSBXZWJBcHAucmF3RXhwcmVzc0hhbmRsZXJzLlxuICB2YXIgcmF3RXhwcmVzc0hhbmRsZXJzID0gY3JlYXRlRXhwcmVzc0FwcCgpXG4gIGFwcC51c2UocmF3RXhwcmVzc0hhbmRsZXJzKTtcblxuICAvLyBBdXRvLWNvbXByZXNzIGFueSBqc29uLCBqYXZhc2NyaXB0LCBvciB0ZXh0LlxuICBhcHAudXNlKGNvbXByZXNzKHsgZmlsdGVyOiBzaG91bGRDb21wcmVzcyB9KSk7XG5cbiAgLy8gcGFyc2UgY29va2llcyBpbnRvIGFuIG9iamVjdFxuICBhcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcblxuICAvLyBXZSdyZSBub3QgYSBwcm94eTsgcmVqZWN0ICh3aXRob3V0IGNyYXNoaW5nKSBhdHRlbXB0cyB0byB0cmVhdCB1cyBsaWtlXG4gIC8vIG9uZS4gKFNlZSAjMTIxMi4pXG4gIGFwcC51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgICBpZiAoUm91dGVQb2xpY3kuaXNWYWxpZFVybChyZXEudXJsKSkge1xuICAgICAgbmV4dCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXMud3JpdGVIZWFkKDQwMCk7XG4gICAgcmVzLndyaXRlKCdOb3QgYSBwcm94eScpO1xuICAgIHJlcy5lbmQoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZ2V0UGF0aFBhcnRzKHBhdGgpIHtcbiAgICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICB3aGlsZSAocGFydHNbMF0gPT09ICcnKSBwYXJ0cy5zaGlmdCgpO1xuICAgIHJldHVybiBwYXJ0cztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzUHJlZml4T2YocHJlZml4LCBhcnJheSkge1xuICAgIHJldHVybiAoXG4gICAgICBwcmVmaXgubGVuZ3RoIDw9IGFycmF5Lmxlbmd0aCAmJlxuICAgICAgcHJlZml4LmV2ZXJ5KChwYXJ0LCBpKSA9PiBwYXJ0ID09PSBhcnJheVtpXSlcbiAgICApO1xuICB9XG5cbiAgLy8gU3RyaXAgb2ZmIHRoZSBwYXRoIHByZWZpeCwgaWYgaXQgZXhpc3RzLlxuICBhcHAudXNlKGZ1bmN0aW9uKHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSB7XG4gICAgY29uc3QgcGF0aFByZWZpeCA9IF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uUk9PVF9VUkxfUEFUSF9QUkVGSVg7XG4gICAgY29uc3QgeyBwYXRobmFtZSwgc2VhcmNoIH0gPSBwYXJzZVVybChyZXF1ZXN0LnVybCk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGUgcGF0aCBpbiB0aGUgdXJsIHN0YXJ0cyB3aXRoIHRoZSBwYXRoIHByZWZpeFxuICAgIGlmIChwYXRoUHJlZml4KSB7XG4gICAgICBjb25zdCBwcmVmaXhQYXJ0cyA9IGdldFBhdGhQYXJ0cyhwYXRoUHJlZml4KTtcbiAgICAgIGNvbnN0IHBhdGhQYXJ0cyA9IGdldFBhdGhQYXJ0cyhwYXRobmFtZSk7XG4gICAgICBpZiAoaXNQcmVmaXhPZihwcmVmaXhQYXJ0cywgcGF0aFBhcnRzKSkge1xuICAgICAgICByZXF1ZXN0LnVybCA9ICcvJyArIHBhdGhQYXJ0cy5zbGljZShwcmVmaXhQYXJ0cy5sZW5ndGgpLmpvaW4oJy8nKTtcbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgIHJlcXVlc3QudXJsICs9IHNlYXJjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwYXRobmFtZSA9PT0gJy9mYXZpY29uLmljbycgfHwgcGF0aG5hbWUgPT09ICcvcm9ib3RzLnR4dCcpIHtcbiAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfVxuXG4gICAgaWYgKHBhdGhQcmVmaXgpIHtcbiAgICAgIHJlc3BvbnNlLndyaXRlSGVhZCg0MDQpO1xuICAgICAgcmVzcG9uc2Uud3JpdGUoJ1Vua25vd24gcGF0aCcpO1xuICAgICAgcmVzcG9uc2UuZW5kKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmV4dCgpO1xuICB9KTtcblxuICAvLyBTZXJ2ZSBzdGF0aWMgZmlsZXMgZnJvbSB0aGUgbWFuaWZlc3QuXG4gIC8vIFRoaXMgaXMgaW5zcGlyZWQgYnkgdGhlICdzdGF0aWMnIG1pZGRsZXdhcmUuXG4gIGFwcC51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhTdHJpbmcoYXJndW1lbnRzLmNhbGxlZSkpO1xuICAgIFdlYkFwcEludGVybmFscy5zdGF0aWNGaWxlc01pZGRsZXdhcmUoXG4gICAgICBXZWJBcHBJbnRlcm5hbHMuc3RhdGljRmlsZXNCeUFyY2gsXG4gICAgICByZXEsXG4gICAgICByZXMsXG4gICAgICBuZXh0XG4gICAgKTtcbiAgfSk7XG5cbiAgLy8gQ29yZSBNZXRlb3IgcGFja2FnZXMgbGlrZSBkeW5hbWljLWltcG9ydCBjYW4gYWRkIGhhbmRsZXJzIGJlZm9yZVxuICAvLyBvdGhlciBoYW5kbGVycyBhZGRlZCBieSBwYWNrYWdlIGFuZCBhcHBsaWNhdGlvbiBjb2RlLlxuICBhcHAudXNlKChXZWJBcHBJbnRlcm5hbHMubWV0ZW9ySW50ZXJuYWxIYW5kbGVycyA9IGNyZWF0ZUV4cHJlc3NBcHAoKSkpO1xuXG4gIC8qKlxuICAgKiBAbmFtZSBleHByZXNzSGFuZGxlcnNDYWxsYmFjayhyZXEsIHJlcywgbmV4dClcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAaXNwcm90b3R5cGUgdHJ1ZVxuICAgKiBAc3VtbWFyeSBjYWxsYmFjayBoYW5kbGVyIGZvciBgV2ViQXBwLmV4cHJlc3NIYW5kbGVyc2BcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcVxuICAgKiBhIE5vZGUuanNcbiAgICogW0luY29taW5nTWVzc2FnZV0oaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjY2xhc3MtaHR0cGluY29taW5nbWVzc2FnZSlcbiAgICogb2JqZWN0IHdpdGggc29tZSBleHRyYSBwcm9wZXJ0aWVzLiBUaGlzIGFyZ3VtZW50IGNhbiBiZSB1c2VkXG4gICAqICB0byBnZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGluY29taW5nIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNcbiAgICogYSBOb2RlLmpzXG4gICAqIFtTZXJ2ZXJSZXNwb25zZV0oaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjY2xhc3MtaHR0cHNlcnZlcnJlc3BvbnNlKVxuICAgKiBvYmplY3QuIFVzZSB0aGlzIHRvIHdyaXRlIGRhdGEgdGhhdCBzaG91bGQgYmUgc2VudCBpbiByZXNwb25zZSB0byB0aGVcbiAgICogcmVxdWVzdCwgYW5kIGNhbGwgYHJlcy5lbmQoKWAgd2hlbiB5b3UgYXJlIGRvbmUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRcbiAgICogQ2FsbGluZyB0aGlzIGZ1bmN0aW9uIHdpbGwgcGFzcyBvbiB0aGUgaGFuZGxpbmcgb2ZcbiAgICogdGhpcyByZXF1ZXN0IHRvIHRoZSBuZXh0IHJlbGV2YW50IGhhbmRsZXIuXG4gICAqXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGhhbmRsZXJzXG4gICAqIEBtZW1iZXJvZiBXZWJBcHBcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAc3VtbWFyeSBSZWdpc3RlciBhIGhhbmRsZXIgZm9yIGFsbCBIVFRQIHJlcXVlc3RzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3BhdGhdXG4gICAqIFRoaXMgaGFuZGxlciB3aWxsIG9ubHkgYmUgY2FsbGVkIG9uIHBhdGhzIHRoYXQgbWF0Y2hcbiAgICogdGhpcyBzdHJpbmcuIFRoZSBtYXRjaCBoYXMgdG8gYm9yZGVyIG9uIGEgYC9gIG9yIGEgYC5gLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgYC9oZWxsb2Agd2lsbCBtYXRjaCBgL2hlbGxvL3dvcmxkYCBhbmRcbiAgICogYC9oZWxsby53b3JsZGAsIGJ1dCBub3QgYC9oZWxsb193b3JsZGAuXG4gICAqIEBwYXJhbSB7ZXhwcmVzc0hhbmRsZXJzQ2FsbGJhY2t9IGhhbmRsZXJcbiAgICogQSBoYW5kbGVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgb24gSFRUUCByZXF1ZXN0cy5cbiAgICogU2VlIGBleHByZXNzSGFuZGxlcnNDYWxsYmFja2BcbiAgICpcbiAgICovXG4gIC8vIFBhY2thZ2VzIGFuZCBhcHBzIGNhbiBhZGQgaGFuZGxlcnMgdG8gdGhpcyB2aWEgV2ViQXBwLmV4cHJlc3NIYW5kbGVycy5cbiAgLy8gVGhleSBhcmUgaW5zZXJ0ZWQgYmVmb3JlIG91ciBkZWZhdWx0IGhhbmRsZXIuXG4gIHZhciBwYWNrYWdlQW5kQXBwSGFuZGxlcnMgPSBjcmVhdGVFeHByZXNzQXBwKClcbiAgYXBwLnVzZShwYWNrYWdlQW5kQXBwSGFuZGxlcnMpO1xuXG4gIGxldCBzdXBwcmVzc0V4cHJlc3NFcnJvcnMgPSBmYWxzZTtcbiAgLy8gRXhwcmVzcyBrbm93cyBpdCBpcyBhbiBlcnJvciBoYW5kbGVyIGJlY2F1c2UgaXQgaGFzIDQgYXJndW1lbnRzIGluc3RlYWQgb2ZcbiAgLy8gMy4gZ28gZmlndXJlLiAgKEl0IGlzIG5vdCBzbWFydCBlbm91Z2ggdG8gZmluZCBzdWNoIGEgdGhpbmcgaWYgaXQncyBoaWRkZW5cbiAgLy8gaW5zaWRlIHBhY2thZ2VBbmRBcHBIYW5kbGVycy4pXG4gIGFwcC51c2UoZnVuY3Rpb24oZXJyLCByZXEsIHJlcywgbmV4dCkge1xuICAgIGlmICghZXJyIHx8ICFzdXBwcmVzc0V4cHJlc3NFcnJvcnMgfHwgIXJlcS5oZWFkZXJzWyd4LXN1cHByZXNzLWVycm9yJ10pIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVzLndyaXRlSGVhZChlcnIuc3RhdHVzLCB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbicgfSk7XG4gICAgcmVzLmVuZCgnQW4gZXJyb3IgbWVzc2FnZScpO1xuICB9KTtcblxuICBhcHAudXNlKGFzeW5jIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgaWYgKCFhcHBVcmwocmVxLnVybCkpIHtcbiAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHJlcS5tZXRob2QgIT09ICdIRUFEJyAmJlxuICAgICAgcmVxLm1ldGhvZCAhPT0gJ0dFVCcgJiZcbiAgICAgICFNZXRlb3Iuc2V0dGluZ3MucGFja2FnZXM/LndlYmFwcD8uYWx3YXlzUmV0dXJuQ29udGVudFxuICAgICkge1xuICAgICAgY29uc3Qgc3RhdHVzID0gcmVxLm1ldGhvZCA9PT0gJ09QVElPTlMnID8gMjAwIDogNDA1O1xuICAgICAgcmVzLndyaXRlSGVhZChzdGF0dXMsIHtcbiAgICAgICAgQWxsb3c6ICdPUFRJT05TLCBHRVQsIEhFQUQnLFxuICAgICAgICAnQ29udGVudC1MZW5ndGgnOiAnMCcsXG4gICAgICB9KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGhlYWRlcnMgPSB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgIH07XG5cbiAgICAgIGlmIChzaHV0dGluZ0Rvd24pIHtcbiAgICAgICAgaGVhZGVyc1snQ29ubmVjdGlvbiddID0gJ0Nsb3NlJztcbiAgICAgIH1cblxuICAgICAgdmFyIHJlcXVlc3QgPSBXZWJBcHAuY2F0ZWdvcml6ZVJlcXVlc3QocmVxKTtcbiAgICAgIHZhciByZXNwb25zZSA9IHJlcztcblxuICAgICAgaWYgKHJlcXVlc3QudXJsLnF1ZXJ5ICYmIHJlcXVlc3QudXJsLnF1ZXJ5WydtZXRlb3JfY3NzX3Jlc291cmNlJ10pIHtcbiAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSdyZSByZXF1ZXN0aW5nIGEgQ1NTIHJlc291cmNlIGluIHRoZSBtZXRlb3Itc3BlY2lmaWNcbiAgICAgICAgLy8gd2F5LCBidXQgd2UgZG9uJ3QgaGF2ZSBpdC4gIFNlcnZlIGEgc3RhdGljIGNzcyBmaWxlIHRoYXQgaW5kaWNhdGVzIHRoYXRcbiAgICAgICAgLy8gd2UgZGlkbid0IGhhdmUgaXQsIHNvIHdlIGNhbiBkZXRlY3QgdGhhdCBhbmQgcmVmcmVzaC4gIE1ha2Ugc3VyZVxuICAgICAgICAvLyB0aGF0IGFueSBwcm94aWVzIG9yIENETnMgZG9uJ3QgY2FjaGUgdGhpcyBlcnJvciEgIChOb3JtYWxseSBwcm94aWVzXG4gICAgICAgIC8vIG9yIENETnMgYXJlIHNtYXJ0IGVub3VnaCBub3QgdG8gY2FjaGUgZXJyb3IgcGFnZXMsIGJ1dCBpbiBvcmRlciB0b1xuICAgICAgICAvLyBtYWtlIHRoaXMgaGFjayB3b3JrLCB3ZSBuZWVkIHRvIHJldHVybiB0aGUgQ1NTIGZpbGUgYXMgYSAyMDAsIHdoaWNoXG4gICAgICAgIC8vIHdvdWxkIG90aGVyd2lzZSBiZSBjYWNoZWQuKVxuICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICd0ZXh0L2NzczsgY2hhcnNldD11dGYtOCc7XG4gICAgICAgIGhlYWRlcnNbJ0NhY2hlLUNvbnRyb2wnXSA9ICduby1jYWNoZSc7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCBoZWFkZXJzKTtcbiAgICAgICAgcmVzLndyaXRlKCcubWV0ZW9yLWNzcy1ub3QtZm91bmQtZXJyb3IgeyB3aWR0aDogMHB4O30nKTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXF1ZXN0LnVybC5xdWVyeSAmJiByZXF1ZXN0LnVybC5xdWVyeVsnbWV0ZW9yX2pzX3Jlc291cmNlJ10pIHtcbiAgICAgICAgLy8gU2ltaWxhcmx5LCB3ZSdyZSByZXF1ZXN0aW5nIGEgSlMgcmVzb3VyY2UgdGhhdCB3ZSBkb24ndCBoYXZlLlxuICAgICAgICAvLyBTZXJ2ZSBhbiB1bmNhY2hlZCA0MDQuIChXZSBjYW4ndCB1c2UgdGhlIHNhbWUgaGFjayB3ZSB1c2UgZm9yIENTUyxcbiAgICAgICAgLy8gYmVjYXVzZSBhY3R1YWxseSBhY3Rpbmcgb24gdGhhdCBoYWNrIHJlcXVpcmVzIHVzIHRvIGhhdmUgdGhlIEpTXG4gICAgICAgIC8vIGFscmVhZHkhKVxuICAgICAgICBoZWFkZXJzWydDYWNoZS1Db250cm9sJ10gPSAnbm8tY2FjaGUnO1xuICAgICAgICByZXMud3JpdGVIZWFkKDQwNCwgaGVhZGVycyk7XG4gICAgICAgIHJlcy5lbmQoJzQwNCBOb3QgRm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVxdWVzdC51cmwucXVlcnkgJiYgcmVxdWVzdC51cmwucXVlcnlbJ21ldGVvcl9kb250X3NlcnZlX2luZGV4J10pIHtcbiAgICAgICAgLy8gV2hlbiBkb3dubG9hZGluZyBmaWxlcyBkdXJpbmcgYSBDb3Jkb3ZhIGhvdCBjb2RlIHB1c2gsIHdlIG5lZWRcbiAgICAgICAgLy8gdG8gZGV0ZWN0IGlmIGEgZmlsZSBpcyBub3QgYXZhaWxhYmxlIGluc3RlYWQgb2YgaW5hZHZlcnRlbnRseVxuICAgICAgICAvLyBkb3dubG9hZGluZyB0aGUgZGVmYXVsdCBpbmRleCBwYWdlLlxuICAgICAgICAvLyBTbyBzaW1pbGFyIHRvIHRoZSBzaXR1YXRpb24gYWJvdmUsIHdlIHNlcnZlIGFuIHVuY2FjaGVkIDQwNC5cbiAgICAgICAgaGVhZGVyc1snQ2FjaGUtQ29udHJvbCddID0gJ25vLWNhY2hlJztcbiAgICAgICAgcmVzLndyaXRlSGVhZCg0MDQsIGhlYWRlcnMpO1xuICAgICAgICByZXMuZW5kKCc0MDQgTm90IEZvdW5kJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBhcmNoIH0gPSByZXF1ZXN0O1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHR5cGVvZiBhcmNoLCAnc3RyaW5nJywgeyBhcmNoIH0pO1xuXG4gICAgICBpZiAoIWhhc093bi5jYWxsKFdlYkFwcC5jbGllbnRQcm9ncmFtcywgYXJjaCkpIHtcbiAgICAgICAgLy8gV2UgY291bGQgY29tZSBoZXJlIGluIGNhc2Ugd2UgcnVuIHdpdGggc29tZSBhcmNoaXRlY3R1cmVzIGV4Y2x1ZGVkXG4gICAgICAgIGhlYWRlcnNbJ0NhY2hlLUNvbnRyb2wnXSA9ICduby1jYWNoZSc7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoNDA0LCBoZWFkZXJzKTtcbiAgICAgICAgaWYgKE1ldGVvci5pc0RldmVsb3BtZW50KSB7XG4gICAgICAgICAgcmVzLmVuZChgTm8gY2xpZW50IHByb2dyYW0gZm91bmQgZm9yIHRoZSAke2FyY2h9IGFyY2hpdGVjdHVyZS5gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTYWZldHkgbmV0LCBidXQgdGhpcyBicmFuY2ggc2hvdWxkIG5vdCBiZSBwb3NzaWJsZS5cbiAgICAgICAgICByZXMuZW5kKCc0MDQgTm90IEZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBwYXVzZUNsaWVudChhcmNoKSBoYXMgYmVlbiBjYWxsZWQsIHByb2dyYW0ucGF1c2VkIHdpbGwgYmUgYVxuICAgICAgLy8gUHJvbWlzZSB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2hlbiB0aGUgcHJvZ3JhbSBpcyB1bnBhdXNlZC5cbiAgICAgIGF3YWl0IFdlYkFwcC5jbGllbnRQcm9ncmFtc1thcmNoXS5wYXVzZWQ7XG5cbiAgICAgIHJldHVybiBnZXRCb2lsZXJwbGF0ZUFzeW5jKHJlcXVlc3QsIGFyY2gsIHJlc3BvbnNlKVxuICAgICAgICAudGhlbigoeyBzdHJlYW0sIHN0YXR1c0NvZGUsIGhlYWRlcnM6IG5ld0hlYWRlcnMgfSkgPT4ge1xuICAgICAgICAgIGlmICghc3RhdHVzQ29kZSkge1xuICAgICAgICAgICAgc3RhdHVzQ29kZSA9IHJlcy5zdGF0dXNDb2RlID8gcmVzLnN0YXR1c0NvZGUgOiAyMDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5ld0hlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaGVhZGVycywgbmV3SGVhZGVycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzLndyaXRlSGVhZChzdGF0dXNDb2RlLCBoZWFkZXJzKTtcblxuICAgICAgICAgIGlmICghZGlzYWJsZUJvaWxlcnBsYXRlUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHN0cmVhbS5waXBlKHJlcywge1xuICAgICAgICAgICAgICAvLyBFbmQgdGhlIHJlc3BvbnNlIHdoZW4gdGhlIHN0cmVhbSBlbmRzLlxuICAgICAgICAgICAgICBlbmQ6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgTG9nLmVycm9yKCdFcnJvciBydW5uaW5nIHRlbXBsYXRlOiAnICsgZXJyb3Iuc3RhY2spO1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoNTAwLCBoZWFkZXJzKTtcbiAgICAgICAgICByZXMuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gUmV0dXJuIDQwNCBieSBkZWZhdWx0LCBpZiBubyBvdGhlciBoYW5kbGVycyBzZXJ2ZSB0aGlzIFVSTC5cbiAgYXBwLnVzZShmdW5jdGlvbihyZXEsIHJlcykge1xuICAgIHJlcy53cml0ZUhlYWQoNDA0KTtcbiAgICByZXMuZW5kKCk7XG4gIH0pO1xuXG4gIHZhciBodHRwU2VydmVyID0gY3JlYXRlU2VydmVyKGFwcCk7XG4gIHZhciBvbkxpc3RlbmluZ0NhbGxiYWNrcyA9IFtdO1xuXG4gIC8vIEFmdGVyIDUgc2Vjb25kcyB3L28gZGF0YSBvbiBhIHNvY2tldCwga2lsbCBpdC4gIE9uIHRoZSBvdGhlciBoYW5kLCBpZlxuICAvLyB0aGVyZSdzIGFuIG91dHN0YW5kaW5nIHJlcXVlc3QsIGdpdmUgaXQgYSBoaWdoZXIgdGltZW91dCBpbnN0ZWFkICh0byBhdm9pZFxuICAvLyBraWxsaW5nIGxvbmctcG9sbGluZyByZXF1ZXN0cylcbiAgaHR0cFNlcnZlci5zZXRUaW1lb3V0KFNIT1JUX1NPQ0tFVF9USU1FT1VUKTtcblxuICAvLyBEbyB0aGlzIGhlcmUsIGFuZCB0aGVuIGFsc28gaW4gbGl2ZWRhdGEvc3RyZWFtX3NlcnZlci5qcywgYmVjYXVzZVxuICAvLyBzdHJlYW1fc2VydmVyLmpzIGtpbGxzIGFsbCB0aGUgY3VycmVudCByZXF1ZXN0IGhhbmRsZXJzIHdoZW4gaW5zdGFsbGluZyBpdHNcbiAgLy8gb3duLlxuICBodHRwU2VydmVyLm9uKCdyZXF1ZXN0JywgV2ViQXBwLl90aW1lb3V0QWRqdXN0bWVudFJlcXVlc3RDYWxsYmFjayk7XG5cbiAgLy8gSWYgdGhlIGNsaWVudCBnYXZlIHVzIGEgYmFkIHJlcXVlc3QsIHRlbGwgaXQgaW5zdGVhZCBvZiBqdXN0IGNsb3NpbmcgdGhlXG4gIC8vIHNvY2tldC4gVGhpcyBsZXRzIGxvYWQgYmFsYW5jZXJzIGluIGZyb250IG9mIHVzIGRpZmZlcmVudGlhdGUgYmV0d2VlbiBcImFcbiAgLy8gc2VydmVyIGlzIHJhbmRvbWx5IGNsb3Npbmcgc29ja2V0cyBmb3Igbm8gcmVhc29uXCIgYW5kIFwiY2xpZW50IHNlbnQgYSBiYWRcbiAgLy8gcmVxdWVzdFwiLlxuICAvL1xuICAvLyBUaGlzIHdpbGwgb25seSB3b3JrIG9uIE5vZGUgNjsgTm9kZSA0IGRlc3Ryb3lzIHRoZSBzb2NrZXQgYmVmb3JlIGNhbGxpbmdcbiAgLy8gdGhpcyBldmVudC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9wdWxsLzQ1NTcvIGZvciBkZXRhaWxzLlxuICBodHRwU2VydmVyLm9uKCdjbGllbnRFcnJvcicsIChlcnIsIHNvY2tldCkgPT4ge1xuICAgIC8vIFByZS1Ob2RlLTYsIGRvIG5vdGhpbmcuXG4gICAgaWYgKHNvY2tldC5kZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXJyLm1lc3NhZ2UgPT09ICdQYXJzZSBFcnJvcicpIHtcbiAgICAgIHNvY2tldC5lbmQoJ0hUVFAvMS4xIDQwMCBCYWQgUmVxdWVzdFxcclxcblxcclxcbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGb3Igb3RoZXIgZXJyb3JzLCB1c2UgdGhlIGRlZmF1bHQgYmVoYXZpb3IgYXMgaWYgd2UgaGFkIG5vIGNsaWVudEVycm9yXG4gICAgICAvLyBoYW5kbGVyLlxuICAgICAgc29ja2V0LmRlc3Ryb3koZXJyKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHN1cHByZXNzRXJyb3JzID0gZnVuY3Rpb24oKSB7XG4gICAgc3VwcHJlc3NFeHByZXNzRXJyb3JzID0gdHJ1ZTtcbiAgfTtcblxuICBsZXQgd2FybmVkQWJvdXRDb25uZWN0VXNhZ2UgPSBmYWxzZTtcblxuICAvLyBzdGFydCB1cCBhcHBcbiAgT2JqZWN0LmFzc2lnbihXZWJBcHAsIHtcbiAgICBjb25uZWN0SGFuZGxlcnM6IHBhY2thZ2VBbmRBcHBIYW5kbGVycyxcbiAgICBoYW5kbGVyczogcGFja2FnZUFuZEFwcEhhbmRsZXJzLFxuICAgIHJhd0Nvbm5lY3RIYW5kbGVyczogcmF3RXhwcmVzc0hhbmRsZXJzLFxuICAgIHJhd0hhbmRsZXJzOiByYXdFeHByZXNzSGFuZGxlcnMsXG4gICAgaHR0cFNlcnZlcjogaHR0cFNlcnZlcixcbiAgICBleHByZXNzQXBwOiBhcHAsXG4gICAgLy8gRm9yIHRlc3RpbmcuXG4gICAgc3VwcHJlc3NDb25uZWN0RXJyb3JzOiAoKSA9PiB7XG4gICAgICBpZiAoISB3YXJuZWRBYm91dENvbm5lY3RVc2FnZSkge1xuICAgICAgICBNZXRlb3IuX2RlYnVnKFwiV2ViQXBwLnN1cHByZXNzQ29ubmVjdEVycm9ycyBoYXMgYmVlbiByZW5hbWVkIHRvIE1ldGVvci5fc3VwcHJlc3NFeHByZXNzRXJyb3JzIGFuZCBpdCBzaG91bGQgYmUgdXNlZCBvbmx5IGluIHRlc3RzLlwiKTtcbiAgICAgICAgd2FybmVkQWJvdXRDb25uZWN0VXNhZ2UgPSB0cnVlO1xuICAgICAgfVxuICAgICAgc3VwcHJlc3NFcnJvcnMoKTtcbiAgICB9LFxuICAgIF9zdXBwcmVzc0V4cHJlc3NFcnJvcnM6IHN1cHByZXNzRXJyb3JzLFxuICAgIG9uTGlzdGVuaW5nOiBmdW5jdGlvbihmKSB7XG4gICAgICBpZiAob25MaXN0ZW5pbmdDYWxsYmFja3MpIG9uTGlzdGVuaW5nQ2FsbGJhY2tzLnB1c2goZik7XG4gICAgICBlbHNlIGYoKTtcbiAgICB9LFxuICAgIC8vIFRoaXMgY2FuIGJlIG92ZXJyaWRkZW4gYnkgdXNlcnMgd2hvIHdhbnQgdG8gbW9kaWZ5IGhvdyBsaXN0ZW5pbmcgd29ya3NcbiAgICAvLyAoZWcsIHRvIHJ1biBhIHByb3h5IGxpa2UgQXBvbGxvIEVuZ2luZSBQcm94eSBpbiBmcm9udCBvZiB0aGUgc2VydmVyKS5cbiAgICBzdGFydExpc3RlbmluZzogZnVuY3Rpb24oaHR0cFNlcnZlciwgbGlzdGVuT3B0aW9ucywgY2IpIHtcbiAgICAgIGh0dHBTZXJ2ZXIubGlzdGVuKGxpc3Rlbk9wdGlvbnMsIGNiKTtcbiAgICB9LFxuICB9KTtcblxuICAgIC8qKlxuICAgKiBAbmFtZSBtYWluXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQHN1bW1hcnkgU3RhcnRzIHRoZSBIVFRQIHNlcnZlci5cbiAgICogIElmIGBVTklYX1NPQ0tFVF9QQVRIYCBpcyBwcmVzZW50IE1ldGVvcidzIEhUVFAgc2VydmVyIHdpbGwgdXNlIHRoYXQgc29ja2V0IGZpbGUgZm9yIGludGVyLXByb2Nlc3MgY29tbXVuaWNhdGlvbiwgaW5zdGVhZCBvZiBUQ1AuXG4gICAqIElmIHlvdSBjaG9vc2UgdG8gbm90IGluY2x1ZGUgd2ViYXBwIHBhY2thZ2UgaW4geW91ciBhcHBsaWNhdGlvbiB0aGlzIG1ldGhvZCBzdGlsbCBtdXN0IGJlIGRlZmluZWQgZm9yIHlvdXIgTWV0ZW9yIGFwcGxpY2F0aW9uIHRvIHdvcmsuXG4gICAqL1xuICAvLyBMZXQgdGhlIHJlc3Qgb2YgdGhlIHBhY2thZ2VzIChhbmQgTWV0ZW9yLnN0YXJ0dXAgaG9va3MpIGluc2VydCBFeHByZXNzXG4gIC8vIG1pZGRsZXdhcmVzIGFuZCB1cGRhdGUgX19tZXRlb3JfcnVudGltZV9jb25maWdfXywgdGhlbiBrZWVwIGdvaW5nIHRvIHNldCB1cFxuICAvLyBhY3R1YWxseSBzZXJ2aW5nIEhUTUwuXG4gIGV4cG9ydHMubWFpbiA9IGFzeW5jIGFyZ3YgPT4ge1xuICAgIGF3YWl0IFdlYkFwcEludGVybmFscy5nZW5lcmF0ZUJvaWxlcnBsYXRlKCk7XG5cbiAgICBjb25zdCBzdGFydEh0dHBTZXJ2ZXIgPSBsaXN0ZW5PcHRpb25zID0+IHtcbiAgICAgIFdlYkFwcC5zdGFydExpc3RlbmluZyhcbiAgICAgICAgYXJndj8uaHR0cFNlcnZlciB8fCBodHRwU2VydmVyLFxuICAgICAgICBsaXN0ZW5PcHRpb25zLFxuICAgICAgICBNZXRlb3IuYmluZEVudmlyb25tZW50KFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5NRVRFT1JfUFJJTlRfT05fTElTVEVOKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMSVNURU5JTkcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IG9uTGlzdGVuaW5nQ2FsbGJhY2tzO1xuICAgICAgICAgICAgb25MaXN0ZW5pbmdDYWxsYmFja3MgPSBudWxsO1xuICAgICAgICAgICAgY2FsbGJhY2tzPy5mb3JFYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsaXN0ZW5pbmc6JywgZSk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUgJiYgZS5zdGFjayk7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH07XG5cbiAgICBsZXQgbG9jYWxQb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAwO1xuICAgIGxldCB1bml4U29ja2V0UGF0aCA9IHByb2Nlc3MuZW52LlVOSVhfU09DS0VUX1BBVEg7XG5cbiAgICBpZiAodW5peFNvY2tldFBhdGgpIHtcbiAgICAgIGlmIChjbHVzdGVyLmlzV29ya2VyKSB7XG4gICAgICAgIGNvbnN0IHdvcmtlck5hbWUgPSBjbHVzdGVyLndvcmtlci5wcm9jZXNzLmVudi5uYW1lIHx8IGNsdXN0ZXIud29ya2VyLmlkO1xuICAgICAgICB1bml4U29ja2V0UGF0aCArPSAnLicgKyB3b3JrZXJOYW1lICsgJy5zb2NrJztcbiAgICAgIH1cbiAgICAgIC8vIFN0YXJ0IHRoZSBIVFRQIHNlcnZlciB1c2luZyBhIHNvY2tldCBmaWxlLlxuICAgICAgcmVtb3ZlRXhpc3RpbmdTb2NrZXRGaWxlKHVuaXhTb2NrZXRQYXRoKTtcbiAgICAgIHN0YXJ0SHR0cFNlcnZlcih7IHBhdGg6IHVuaXhTb2NrZXRQYXRoIH0pO1xuXG4gICAgICBjb25zdCB1bml4U29ja2V0UGVybWlzc2lvbnMgPSAoXG4gICAgICAgIHByb2Nlc3MuZW52LlVOSVhfU09DS0VUX1BFUk1JU1NJT05TIHx8ICcnXG4gICAgICApLnRyaW0oKTtcbiAgICAgIGlmICh1bml4U29ja2V0UGVybWlzc2lvbnMpIHtcbiAgICAgICAgaWYgKC9eWzAtN117M30kLy50ZXN0KHVuaXhTb2NrZXRQZXJtaXNzaW9ucykpIHtcbiAgICAgICAgICBjaG1vZFN5bmModW5peFNvY2tldFBhdGgsIHBhcnNlSW50KHVuaXhTb2NrZXRQZXJtaXNzaW9ucywgOCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBVTklYX1NPQ0tFVF9QRVJNSVNTSU9OUyBzcGVjaWZpZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB1bml4U29ja2V0R3JvdXAgPSAocHJvY2Vzcy5lbnYuVU5JWF9TT0NLRVRfR1JPVVAgfHwgJycpLnRyaW0oKTtcbiAgICAgIGlmICh1bml4U29ja2V0R3JvdXApIHtcbiAgICAgICAgY29uc3QgdW5peFNvY2tldEdyb3VwSW5mbyA9IGdldEdyb3VwSW5mbyh1bml4U29ja2V0R3JvdXApO1xuICAgICAgICBpZiAodW5peFNvY2tldEdyb3VwSW5mbyA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBVTklYX1NPQ0tFVF9HUk9VUCBuYW1lIHNwZWNpZmllZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNob3duU3luYyh1bml4U29ja2V0UGF0aCwgdXNlckluZm8oKS51aWQsIHVuaXhTb2NrZXRHcm91cEluZm8uZ2lkKTtcbiAgICAgIH1cblxuICAgICAgcmVnaXN0ZXJTb2NrZXRGaWxlQ2xlYW51cCh1bml4U29ja2V0UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsUG9ydCA9IGlzTmFOKE51bWJlcihsb2NhbFBvcnQpKSA/IGxvY2FsUG9ydCA6IE51bWJlcihsb2NhbFBvcnQpO1xuICAgICAgaWYgKC9cXFxcXFxcXD8uK1xcXFxwaXBlXFxcXD8uKy8udGVzdChsb2NhbFBvcnQpKSB7XG4gICAgICAgIC8vIFN0YXJ0IHRoZSBIVFRQIHNlcnZlciB1c2luZyBXaW5kb3dzIFNlcnZlciBzdHlsZSBuYW1lZCBwaXBlLlxuICAgICAgICBzdGFydEh0dHBTZXJ2ZXIoeyBwYXRoOiBsb2NhbFBvcnQgfSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsb2NhbFBvcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIC8vIFN0YXJ0IHRoZSBIVFRQIHNlcnZlciB1c2luZyBUQ1AuXG4gICAgICAgIHN0YXJ0SHR0cFNlcnZlcih7XG4gICAgICAgICAgcG9ydDogbG9jYWxQb3J0LFxuICAgICAgICAgIGhvc3Q6IHByb2Nlc3MuZW52LkJJTkRfSVAgfHwgJzAuMC4wLjAnLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBQT1JUIHNwZWNpZmllZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnREFFTU9OJztcbiAgfTtcbn1cblxuY29uc3QgaXNHZXRlbnRBdmFpbGFibGUgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgZXhlY1N5bmMoJ3doaWNoIGdldGVudCcpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGdldEdyb3VwSW5mb1VzaW5nR2V0ZW50ID0gKGdyb3VwTmFtZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHN0ZG91dCA9IGV4ZWNTeW5jKGBnZXRlbnQgZ3JvdXAgJHtncm91cE5hbWV9YCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgIGlmICghc3Rkb3V0KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBbbmFtZSwgLCBnaWRdID0gc3Rkb3V0LnRyaW0oKS5zcGxpdCgnOicpO1xuICAgIGlmIChuYW1lID09IG51bGwgfHwgZ2lkID09IG51bGwpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7IG5hbWUsIGdpZDogTnVtYmVyKGdpZCkgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgZ2V0R3JvdXBJbmZvRnJvbUZpbGUgPSAoZ3JvdXBOYW1lKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IHJlYWRGaWxlU3luYygnL2V0Yy9ncm91cCcsICd1dGY4Jyk7XG4gICAgY29uc3QgZ3JvdXBMaW5lID0gZGF0YS50cmltKCkuc3BsaXQoJ1xcbicpLmZpbmQobGluZSA9PiBsaW5lLnN0YXJ0c1dpdGgoYCR7Z3JvdXBOYW1lfTpgKSk7XG4gICAgaWYgKCFncm91cExpbmUpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IFtuYW1lLCAsIGdpZF0gPSBncm91cExpbmUudHJpbSgpLnNwbGl0KCc6Jyk7XG4gICAgaWYgKG5hbWUgPT0gbnVsbCB8fCBnaWQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHsgbmFtZSwgZ2lkOiBOdW1iZXIoZ2lkKSB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0R3JvdXBJbmZvID0gKGdyb3VwTmFtZSkgPT4ge1xuICBsZXQgZ3JvdXBJbmZvID0gZ2V0R3JvdXBJbmZvRnJvbUZpbGUoZ3JvdXBOYW1lKTtcbiAgaWYgKCFncm91cEluZm8gJiYgaXNHZXRlbnRBdmFpbGFibGUoKSkge1xuICAgIGdyb3VwSW5mbyA9IGdldEdyb3VwSW5mb1VzaW5nR2V0ZW50KGdyb3VwTmFtZSk7XG4gIH1cbiAgcmV0dXJuIGdyb3VwSW5mbztcbn07XG5cbnZhciBpbmxpbmVTY3JpcHRzQWxsb3dlZCA9IHRydWU7XG5cbldlYkFwcEludGVybmFscy5pbmxpbmVTY3JpcHRzQWxsb3dlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gaW5saW5lU2NyaXB0c0FsbG93ZWQ7XG59O1xuXG5XZWJBcHBJbnRlcm5hbHMuc2V0SW5saW5lU2NyaXB0c0FsbG93ZWQgPSBhc3luYyBmdW5jdGlvbih2YWx1ZSkge1xuICBpbmxpbmVTY3JpcHRzQWxsb3dlZCA9IHZhbHVlO1xuICBhd2FpdCBXZWJBcHBJbnRlcm5hbHMuZ2VuZXJhdGVCb2lsZXJwbGF0ZSgpO1xufTtcblxudmFyIHNyaU1vZGU7XG5cbldlYkFwcEludGVybmFscy5lbmFibGVTdWJyZXNvdXJjZUludGVncml0eSA9IGFzeW5jIGZ1bmN0aW9uKHVzZV9jcmVkZW50aWFscyA9IGZhbHNlKSB7XG4gIHNyaU1vZGUgPSB1c2VfY3JlZGVudGlhbHMgPyAndXNlLWNyZWRlbnRpYWxzJyA6ICdhbm9ueW1vdXMnO1xuICBhd2FpdCBXZWJBcHBJbnRlcm5hbHMuZ2VuZXJhdGVCb2lsZXJwbGF0ZSgpO1xufTtcblxuV2ViQXBwSW50ZXJuYWxzLnNldEJ1bmRsZWRKc0Nzc1VybFJld3JpdGVIb29rID0gYXN5bmMgZnVuY3Rpb24oaG9va0ZuKSB7XG4gIGJ1bmRsZWRKc0Nzc1VybFJld3JpdGVIb29rID0gaG9va0ZuO1xuICBhd2FpdCBXZWJBcHBJbnRlcm5hbHMuZ2VuZXJhdGVCb2lsZXJwbGF0ZSgpO1xufTtcblxuV2ViQXBwSW50ZXJuYWxzLnNldEJ1bmRsZWRKc0Nzc1ByZWZpeCA9IGFzeW5jIGZ1bmN0aW9uKHByZWZpeCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGF3YWl0IHNlbGYuc2V0QnVuZGxlZEpzQ3NzVXJsUmV3cml0ZUhvb2soZnVuY3Rpb24odXJsKSB7XG4gICAgcmV0dXJuIHByZWZpeCArIHVybDtcbiAgfSk7XG59O1xuXG4vLyBQYWNrYWdlcyBjYW4gY2FsbCBgV2ViQXBwSW50ZXJuYWxzLmFkZFN0YXRpY0pzYCB0byBzcGVjaWZ5IHN0YXRpY1xuLy8gSmF2YVNjcmlwdCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgYXBwLiBUaGlzIHN0YXRpYyBKUyB3aWxsIGJlIGlubGluZWQsXG4vLyB1bmxlc3MgaW5saW5lIHNjcmlwdHMgaGF2ZSBiZWVuIGRpc2FibGVkLCBpbiB3aGljaCBjYXNlIGl0IHdpbGwgYmVcbi8vIHNlcnZlZCB1bmRlciBgLzxzaGExIG9mIGNvbnRlbnRzPmAuXG52YXIgYWRkaXRpb25hbFN0YXRpY0pzID0ge307XG5XZWJBcHBJbnRlcm5hbHMuYWRkU3RhdGljSnMgPSBmdW5jdGlvbihjb250ZW50cykge1xuICBhZGRpdGlvbmFsU3RhdGljSnNbJy8nICsgc2hhMShjb250ZW50cykgKyAnLmpzJ10gPSBjb250ZW50cztcbn07XG5cbnZhciBkaXNhYmxlQm9pbGVycGxhdGVSZXNwb25zZSA9IGZhbHNlO1xuV2ViQXBwSW50ZXJuYWxzLmRpc2FibGVCb2lsZXJwbGF0ZVJlc3BvbnNlID0gZnVuY3Rpb24oKSB7XG4gIGRpc2FibGVCb2lsZXJwbGF0ZVJlc3BvbnNlID0gdHJ1ZTtcbn1cblxuLy8gRXhwb3J0ZWQgZm9yIHRlc3RzXG5XZWJBcHBJbnRlcm5hbHMuZ2V0Qm9pbGVycGxhdGUgPSBnZXRCb2lsZXJwbGF0ZTtcbldlYkFwcEludGVybmFscy5hZGRpdGlvbmFsU3RhdGljSnMgPSBhZGRpdGlvbmFsU3RhdGljSnM7XG5cbmF3YWl0IHJ1bldlYkFwcFNlcnZlcigpO1xuIiwiaW1wb3J0IHsgc3RhdFN5bmMsIHVubGlua1N5bmMsIGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XG5cbi8vIFNpbmNlIGEgbmV3IHNvY2tldCBmaWxlIHdpbGwgYmUgY3JlYXRlZCB3aGVuIHRoZSBIVFRQIHNlcnZlclxuLy8gc3RhcnRzIHVwLCBpZiBmb3VuZCByZW1vdmUgdGhlIGV4aXN0aW5nIGZpbGUuXG4vL1xuLy8gV0FSTklORzpcbi8vIFRoaXMgd2lsbCByZW1vdmUgdGhlIGNvbmZpZ3VyZWQgc29ja2V0IGZpbGUgd2l0aG91dCB3YXJuaW5nLiBJZlxuLy8gdGhlIGNvbmZpZ3VyZWQgc29ja2V0IGZpbGUgaXMgYWxyZWFkeSBpbiB1c2UgYnkgYW5vdGhlciBhcHBsaWNhdGlvbixcbi8vIGl0IHdpbGwgc3RpbGwgYmUgcmVtb3ZlZC4gTm9kZSBkb2VzIG5vdCBwcm92aWRlIGEgcmVsaWFibGUgd2F5IHRvXG4vLyBkaWZmZXJlbnRpYXRlIGJldHdlZW4gYSBzb2NrZXQgZmlsZSB0aGF0IGlzIGFscmVhZHkgaW4gdXNlIGJ5XG4vLyBhbm90aGVyIGFwcGxpY2F0aW9uIG9yIGEgc3RhbGUgc29ja2V0IGZpbGUgdGhhdCBoYXMgYmVlblxuLy8gbGVmdCBvdmVyIGFmdGVyIGEgU0lHS0lMTC4gU2luY2Ugd2UgaGF2ZSBubyByZWxpYWJsZSB3YXkgdG9cbi8vIGRpZmZlcmVudGlhdGUgYmV0d2VlbiB0aGVzZSB0d28gc2NlbmFyaW9zLCB0aGUgYmVzdCBjb3Vyc2Ugb2Zcbi8vIGFjdGlvbiBkdXJpbmcgc3RhcnR1cCBpcyB0byByZW1vdmUgYW55IGV4aXN0aW5nIHNvY2tldCBmaWxlLiBUaGlzXG4vLyBpcyBub3QgdGhlIHNhZmVzdCBjb3Vyc2Ugb2YgYWN0aW9uIGFzIHJlbW92aW5nIHRoZSBleGlzdGluZyBzb2NrZXRcbi8vIGZpbGUgY291bGQgaW1wYWN0IGFuIGFwcGxpY2F0aW9uIHVzaW5nIGl0LCBidXQgdGhpcyBhcHByb2FjaCBoZWxwc1xuLy8gZW5zdXJlIHRoZSBIVFRQIHNlcnZlciBjYW4gc3RhcnR1cCB3aXRob3V0IG1hbnVhbFxuLy8gaW50ZXJ2ZW50aW9uIChlLmcuIGFza2luZyBmb3IgdGhlIHZlcmlmaWNhdGlvbiBhbmQgY2xlYW51cCBvZiBzb2NrZXRcbi8vIGZpbGVzIGJlZm9yZSBhbGxvd2luZyB0aGUgSFRUUCBzZXJ2ZXIgdG8gYmUgc3RhcnRlZCkuXG4vL1xuLy8gVGhlIGFib3ZlIGJlaW5nIHNhaWQsIGFzIGxvbmcgYXMgdGhlIHNvY2tldCBmaWxlIHBhdGggaXNcbi8vIGNvbmZpZ3VyZWQgY2FyZWZ1bGx5IHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzIGRlcGxveWVkIChhbmQgZXh0cmFcbi8vIGNhcmUgaXMgdGFrZW4gdG8gbWFrZSBzdXJlIHRoZSBjb25maWd1cmVkIHBhdGggaXMgdW5pcXVlIGFuZCBkb2Vzbid0XG4vLyBjb25mbGljdCB3aXRoIGFub3RoZXIgc29ja2V0IGZpbGUgcGF0aCksIHRoZW4gdGhlcmUgc2hvdWxkIG5vdCBiZVxuLy8gYW55IGlzc3VlcyB3aXRoIHRoaXMgYXBwcm9hY2guXG5leHBvcnQgY29uc3QgcmVtb3ZlRXhpc3RpbmdTb2NrZXRGaWxlID0gKHNvY2tldFBhdGgpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoc3RhdFN5bmMoc29ja2V0UGF0aCkuaXNTb2NrZXQoKSkge1xuICAgICAgLy8gU2luY2UgYSBuZXcgc29ja2V0IGZpbGUgd2lsbCBiZSBjcmVhdGVkLCByZW1vdmUgdGhlIGV4aXN0aW5nXG4gICAgICAvLyBmaWxlLlxuICAgICAgdW5saW5rU3luYyhzb2NrZXRQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgQW4gZXhpc3RpbmcgZmlsZSB3YXMgZm91bmQgYXQgXCIke3NvY2tldFBhdGh9XCIgYW5kIGl0IGlzIG5vdCBgICtcbiAgICAgICAgJ2Egc29ja2V0IGZpbGUuIFBsZWFzZSBjb25maXJtIFBPUlQgaXMgcG9pbnRpbmcgdG8gdmFsaWQgYW5kICcgK1xuICAgICAgICAndW4tdXNlZCBzb2NrZXQgZmlsZSBwYXRoLidcbiAgICAgICk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIElmIHRoZXJlIGlzIG5vIGV4aXN0aW5nIHNvY2tldCBmaWxlIHRvIGNsZWFudXAsIGdyZWF0LCB3ZSdsbFxuICAgIC8vIGNvbnRpbnVlIG5vcm1hbGx5LiBJZiB0aGUgY2F1Z2h0IGV4Y2VwdGlvbiByZXByZXNlbnRzIGFueSBvdGhlclxuICAgIC8vIGlzc3VlLCByZS10aHJvdy5cbiAgICBpZiAoZXJyb3IuY29kZSAhPT0gJ0VOT0VOVCcpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufTtcblxuLy8gUmVtb3ZlIHRoZSBzb2NrZXQgZmlsZSB3aGVuIGRvbmUgdG8gYXZvaWQgbGVhdmluZyBiZWhpbmQgYSBzdGFsZSBvbmUuXG4vLyBOb3RlIC0gYSBzdGFsZSBzb2NrZXQgZmlsZSBpcyBzdGlsbCBsZWZ0IGJlaGluZCBpZiB0aGUgcnVubmluZyBub2RlXG4vLyBwcm9jZXNzIGlzIGtpbGxlZCB2aWEgc2lnbmFsIDkgLSBTSUdLSUxMLlxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU29ja2V0RmlsZUNsZWFudXAgPVxuICAoc29ja2V0UGF0aCwgZXZlbnRFbWl0dGVyID0gcHJvY2VzcykgPT4ge1xuICAgIFsnZXhpdCcsICdTSUdJTlQnLCAnU0lHSFVQJywgJ1NJR1RFUk0nXS5mb3JFYWNoKHNpZ25hbCA9PiB7XG4gICAgICBldmVudEVtaXR0ZXIub24oc2lnbmFsLCBNZXRlb3IuYmluZEVudmlyb25tZW50KCgpID0+IHtcbiAgICAgICAgaWYgKGV4aXN0c1N5bmMoc29ja2V0UGF0aCkpIHtcbiAgICAgICAgICB1bmxpbmtTeW5jKHNvY2tldFBhdGgpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG4iXX0=
