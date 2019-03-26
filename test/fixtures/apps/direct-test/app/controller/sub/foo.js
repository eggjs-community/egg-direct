/* eslint-disable no-unused-vars */
'use strict';

const Controller = require('egg').Controller;

class FooController extends Controller {
  async index(router = [
    [ 'get', '/sub-foo' ],
    [ 'get', '/sub/foo' ],
  ]) {
    this.ctx.body = 'this is foo.';
  }
}

module.exports = FooController;
