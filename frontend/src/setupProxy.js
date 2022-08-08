const { createProxyMiddleware } = require('http-proxy-middleware');
const { COURSESAPIURL } = require('./constants');

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/courses-api', {
      target: COURSESAPIURL.ADDRESS,
      changeOrigin: true,
      pathRewrite: {
        '^/courses-api': '/',
      },
      headers: {
        Connection: 'keep-alive',
      },
    }),
  );
};
