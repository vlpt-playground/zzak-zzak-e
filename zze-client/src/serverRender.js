import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import configure from './store/configure';
import routeConfig from 'routeConfig';
import { hideHeader } from 'store/modules/base';

// Koa 의 ctx 객체를 params 로 받아옴
const serverRender = async ctx => {
  // path 는 경로 체크 용도, url 은 query 파라미터를 포함
  const { url, path } = ctx;
  const store = configure();

  const promises = []; // 기다릴 프로미스를 담을 배열
  let matched = false;
  routeConfig.forEach(route => {
    const match = matchPath(path, route);
    // preload  함수가 존재한다면
    if (match) {
      matched = true;
    }
    if (match && route.preload) {
      const p = route.preload(store, match.params, ctx);
      promises.push(p);
    }
  });

  let error = null;
  try {
    // 모든 프로미스가 끝날 때 까지 기다립니다.
    await Promise.all(promises);
  } catch (e) {
    error = e;
  }

  if (!matched) {
    // 일치하는게 하나도 없었다면
    // 404이니까
    store.dispatch(hideHeader());
  }

  const context = {};
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  if (context.code) {
    // Not Found 에서 code 값이 주어진다면
    // code 값 설정
    ctx.status = context.code;
  }

  return {
    html,
    state: store.getState(),
    error,
  };
};

export default serverRender;
