const { createProxyMiddleware } = require('http-proxy-middleware');
const { COURSESAPIURL, LEARNERSAPIURL, CREDENTIALSAPIURL } = require('./constants');

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

  app.use(
    createProxyMiddleware('/learners-api', {
      target: LEARNERSAPIURL.ADDRESS,
      changeOrigin: true,
      pathRewrite: {
        '^/learners-api': '/',
      },
      headers: {
        Connection: 'keep-alive',
      },
    }),
  );

  app.use(
    createProxyMiddleware('/credentials-api', {
      target: CREDENTIALSAPIURL.ADDRESS,
      changeOrigin: true,
      pathRewrite: {
        '^/credentials-api': '/',
      },
      headers: {
        Connection: 'keep-alive',
      },
    }),
  );
};
