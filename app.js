'use strict';

const Interceptor = require('./lib/interceptor');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // 挂载router
    const interceptor = new Interceptor(this.app);
    interceptor.intercept();
  }
}

module.exports = AppBootHook;
