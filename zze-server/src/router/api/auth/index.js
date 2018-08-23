const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/refresh-token', authCtrl.refreshToken);

module.exports = auth;
