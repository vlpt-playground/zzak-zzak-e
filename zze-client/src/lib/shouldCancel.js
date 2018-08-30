import { Component } from 'react';

// 서버사이드 렌더링 이후, 가장 첫 렌더링에서는 shouldCancel 이 true
// App 렌더링이 한번 마치고 나면, 그 다음부터는 false

let cancel = process.env.APP_ENV === 'browser' && !!window.__PRELOADED_STATE__;

const shouldCancel = () => {
  return cancel;
};

export class Rendered extends Component {
  componentDidMount() {
    cancel = false;
  }

  render() {
    return null;
  }
}

export default shouldCancel;
