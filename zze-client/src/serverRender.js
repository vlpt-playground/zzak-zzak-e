import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import configure from './store/configure';

// Koa 의 ctx 객체를 params 로 받아옴
const serverRender = async ctx => {
  // path 는 경로 체크 용도, url 은 query 파라미터를 포함
  const { url, path } = ctx;
  const store = configure();

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  return {
    html,
    state: store.getState(),
  };
};

export default serverRender;
