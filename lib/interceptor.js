'use strict';

const path = require('path');
const FileLoader = require('./egg-file-loader');
const util = require('./util');

class Interceptor {

  /**
   * @class - Mixed in with egg router.
   * @param {Object} app - Egg Application
   */
  constructor(app) {
    this.app = app;
  }

  /** Get the properties of all constructors. */
  intercept() {
    const { router, baseDir, controller } = this.app;
    const controllerBase = path.join(baseDir, '/app/controller');
    const items = new FileLoader({
      directory: controllerBase,
      target: {},
    }).loadPlain();
    items.forEach(i => {
      if (util.isConstructor(i.exports)) {
        this._mount({
          proto: i.exports.prototype,
          properties: i.properties,
          router,
          controller,
        });
      }
    });
  }

  /**
   * @description Mount all meta information using the router method.
   * @param {Object} opts - options
   * @param {Object} opts.proto - Egg.FileLoader.Exports.prototype
   * @param {Object} opts.properties - Egg.FileLoader.properties
   * @param {Object} opts.router - Egg.Application.router
   * @param {Object} opts.controller - Egg.Application.controller
   */
  _mount(opts) {
    const { proto, properties, router, controller } = opts;
    const keys = Object.getOwnPropertyNames(proto);
    const methdos = keys.map((m, i) => (typeof proto[m] === 'function' && i > 0 ? proto[m] : 0)).filter(i => !!i);
    methdos.forEach(fn => {
      const meta = util.getMethodRouter(fn);
      if (meta !== false) {
        const type = meta.router instanceof Array ? 'array' : 'object';
        if (type === 'array') {
          for (const params of meta.router) {
            if (params.length === 0) break;
            if (!params[0]) break;
            const routerMethod = params[0];
            params.shift();
            const _properties = properties.slice(0);
            _properties.push(meta.name);
            const methodFn = util.callStack(controller, _properties);
            params.push(methodFn);
            router[routerMethod](...params);
          }
        }
      }
    });
  }
}

module.exports = Interceptor;
