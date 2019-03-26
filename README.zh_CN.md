# egg-direct

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-direct.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-direct
[travis-image]: https://img.shields.io/travis/eggjs/egg-direct.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-direct
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-direct.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-direct?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-direct.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-direct
[snyk-image]: https://snyk.io/test/npm/egg-direct/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-direct
[download-image]: https://img.shields.io/npm/dm/egg-direct.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-direct

eggjs 路由去中心化插件。

## 安装

```
$ npm install egg-direct --save
```

## 依赖说明

### 依赖的 egg 版本

egg-direct 版本 | egg 2.x | egg 1.x
--- | --- | ---
0.x | 😁 | ❌

### 依赖的插件

- egg-core（一般不需要单独安装）

## 开启插件

```js
// config/plugin.js
exports.direct = {
  enable: true,
  package: 'egg-direct',
};
```

## 使用场景

使用egg-direct插件，可以不需要装饰器也可以在控制器中定义路由配置。

在定义的方法的默认参数配置里定义一个router变量，例如：

```javascript
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
```
router 参数接收一个二维数组类型的值，子数组的第一个是router的方法名，对应调用``router[method](..argv)``，后面的值表示调用参数``(...argv)``，具体传入参数，可以查看官方文档[router说明](https://eggjs.org/zh-cn/basics/router.html)。

## 更多例子

[examples](/examples)

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 运行测试

```
$ npm run test
```

## 提问交流

请到 [egg-direct issues](https://github.com/lisniuse/egg-direct/issues) 异步交流。

## License

[MIT](LICENSE)
