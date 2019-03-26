/* eslint-disable no-unused-vars */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(router = [
    [ 'get', '/' ],
    [ 'get', '/home' ],
  ]) {
    this.ctx.body = 'hi, ' + this.app.plugins.direct.name;
  }
}

module.exports = HomeController;
