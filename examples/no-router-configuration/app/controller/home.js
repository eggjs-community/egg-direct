'use strict';
/* eslint no-unused-vars: "off" */

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(router = [
    [ 'get', '/home' ],
  ]) {
    const { ctx } = this;
    ctx.body = '可以直接访问 /home';
  }
}

module.exports = HomeController;
