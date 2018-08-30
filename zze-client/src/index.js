import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configure from 'store/configure';

import './index.css';
import App from './App';

const store = configure(window.__PRELOADED_STATE__);

// render 대신 hydrate 를 하면 서버사이드 렌더링을 했을 경우
// 새로운 DOM 을 만들지 않고, 기존의 DOM 에 이벤트만 설정해줍니다.
ReactDOM.hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
