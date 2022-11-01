const xss = require('xss');

// santises body to stop/reduce xss injection
const santizeXss = (req, res, next) => {
  const { body } = req;
  // if body not empty
  if (Object.keys(body).length !== 0) {
    req.body = JSON.parse(xss(body));
  }
  next();
};

module.exports = santizeXss;