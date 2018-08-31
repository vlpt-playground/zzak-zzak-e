import { TweetsPage, AuthPage } from 'pages';
import { getInitial } from 'store/modules/tweets';
import { hideHeader } from 'store/modules/base';
// 각 라우트에서 필요한 데이터를 미리 불러오는 로직을 여기서 구현
export default [
  {
    exact: true,
    path: '/',
    component: TweetsPage,
    preload: (store, params, ctx) => {
      // Promise 를 반환해야함
      return store.dispatch(getInitial());
    },
  },
  {
    exact: true,
    path: '/users/:username',
    component: TweetsPage,
    preload: (store, params, ctx) => {
      const { username } = params;
      return store.dispatch(getInitial({ username }));
    },
  },
  {
    exact: true,
    path: '/tags/:tag',
    component: TweetsPage,
    preload: (store, params, ctx) => {
      const { tag } = params;
      // 한글도 잘 인식하기 위하여 decodeURI 를 해줘야함.
      return store.dispatch(getInitial({ tag: decodeURI(tag) }));
      // 혹시나 query 를 사용해야 한다면, ctx.query 안에 들어있음.
    },
  },
  // preload 할 것이 없어도 코드스플리팅시 깜박임현상을 없애기 위해서 추가
  {
    path: '/:authType(login|register)',
    component: AuthPage,
    preload: async store => {
      // 헤더 숨기기)
      store.dispatch(hideHeader());
    },
  },
];
