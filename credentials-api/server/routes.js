const express = require('express');
const passport = require('passport');

const santizeXss = require('./security/xss');

const { createUser } = require('./controllers/createUser');
const { login } = require('./controllers/login');
const { logout } = require('./controllers/logout');
const { validateWebToken } = require('./controllers/validateWebToken');

const authRouter = express.Router();
const router = express.Router();
authRouter.use(passport.authenticate('jwt', { session: false }), santizeXss);

router.post('/login', login);
router.post('/create-user', createUser);
authRouter.get('/validate-token', validateWebToken);
router.post('/logout', logout);

module.exports = { router, authRouter };