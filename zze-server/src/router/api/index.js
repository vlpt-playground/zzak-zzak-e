const Router = require('koa-router');
const tweets = require('./tweets');

const api = new Router();

api.get('/ping', ctx => {
  ctx.body = 'pong';
  console.log(ctx.session);
});

api.use('/tweets', tweets.routes());

module.exports = api;
