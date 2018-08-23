const Router = require('koa-router');
const tweets = require('./tweets');
const auth = require('./auth');

const api = new Router();

api.get('/ping', ctx => {
  ctx.body = 'pong';
});

api.use('/tweets', tweets.routes());
api.use('/auth', auth.routes());

module.exports = api;
