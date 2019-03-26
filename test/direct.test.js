'use strict';

const mock = require('egg-mock');

describe('test/direct.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/direct-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, direct')
      .expect(200);
  });

  it('should GET /home', () => {
    return app.httpRequest()
      .get('/home')
      .expect('hi, direct')
      .expect(200);
  });

  it('should GET /sub-foo', () => {
    return app.httpRequest()
      .get('/sub-foo')
      .expect('this is foo.')
      .expect(200);
  });

  it('should GET /sub/foo', () => {
    return app.httpRequest()
      .get('/sub/foo')
      .expect('this is foo.')
      .expect(200);
  });
});
