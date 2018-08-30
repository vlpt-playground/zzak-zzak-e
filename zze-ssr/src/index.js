const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const path = require('path');
const render = require('./ssr').default;
const manifest = require('../../zze-client/build/asset-manifest.json');

const app = new Koa();

// SSR 로직을 백엔드 서버에서 분리하는 것을 권장하지만
// 만약에 백엔드 API 가 Node.js 로 있는 경우
// router 관련 코드를 맨 하단 fallback 이전에 등록해야함
const router = new Router();
router.get('/api/ping', ctx => {
  ctx.body = {
    message: 'pong',
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

// 그리고 static 파일 제공도 fallback 전에 등록
const publicPath = path.resolve('../zze-client/build');
// "/" 경로로 들어갔을 때 index.html 이 보여지지 않도록 설정
app.use(koaStatic(publicPath, { index: false }));

const buildHtml = (html, state) => {
  return `<!doctype html>
  <html lang="en">
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>React App</title>
    <link href="/${manifest['main.css']}" rel="stylesheet">
  </head>
  
  <body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root">${html}</div>
    <script>
        window.__PRELOADED_STATE__ = ${state ? JSON.stringify(state).replace(/</g, '\\u003c') : 'undefined'}
    </script>
    <script type="text/javascript"
      src="/${manifest['main.js']}"></script>
  </body>
  
  </html>`;
};

// fallback 함수 등록하기
app.use(async ctx => {
  // 이전 미들웨어에서 처리 할 수 없는경우, 이 fallback 함수가 가동됨
  if (ctx.status !== 404) return;
  ctx.status = 200;
  const result = await render(ctx);
  // 만약에 에러가 발생했으면 브라우저 위주 렌더링
  if (result.error) {
    ctx.body = buildHtml();
    return;
  }

  const html = buildHtml(result.html, result.state);
  ctx.body = html;
});

app.listen(5000, () => {
  console.log('Server is listening to port 5000');
});
