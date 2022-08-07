const { createProxyMiddleware } = require('http-proxy-middleware');
const { COURSESAPIURL } = require('./constants');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/courses-api', {
      target: COURSESAPIURL.ADDRESS,
      changeOrigin: true,
      pathRewrite: {
        '^/courses-api': '',
      },
      headers: {
        Connection: 'keep-alive',
      },
    }),
  );
};
