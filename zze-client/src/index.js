import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, matchPath } from 'react-router-dom';

import configure from 'store/configure';

import './index.css';
import App from './App';
import routeConfig from 'routeConfig';

const store = configure(window.__PRELOADED_STATE__);

const render = async () => {
  // 첫 렌더링 전에, 필요한 자바스크립트를 먼저 미리 불러옵니다.
  // 이 작업을 안하면 코드스플리팅을 하게 될 때 서버사이드 렌더링 후 깜박임 현상이 나타납니다.

  if (process.env.NODE_ENV === 'production') {
    const promises = []; // 기다릴 프로미스를 담을 배열
    routeConfig.forEach(route => {
      const match = matchPath(window.location.pathname, route);
      // preloadComponent  함수가 존재한다면
      if (match && route.component.preloadComponent) {
        const p = route.component.preloadComponent();
        promises.push(p);
      }
    });

    try {
      await Promise.all(promises);
    } catch (e) {
      console.log(e);
    }
  }

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
};

render();
