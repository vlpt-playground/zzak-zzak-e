import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configure from './store/configure';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configure();
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
