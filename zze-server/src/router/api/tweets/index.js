const Router = require('koa-router');
const tweetsCtrl = require('./tweets.ctrl');

const tweets = new Router();

tweets.post('/', tweetsCtrl.writeTweet);
tweets.get('/', tweetsCtrl.listTweets);

const tweet = new Router();
tweet.get('/', tweetsCtrl.readTweet);
tweet.delete('/', tweetsCtrl.removeTweet);

// tweet 라우트가 설정이 된 다음에 이 코드를 입력해주어야 잘 작동합니다.
tweets.use('/:id', tweetsCtrl.checkTweet, tweet.routes());

module.exports = tweets;
