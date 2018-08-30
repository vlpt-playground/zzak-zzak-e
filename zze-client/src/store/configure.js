import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import modules from './modules';

const configure = initialState => {
  const devTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devTools || compose;

  const middlewares = [penderMiddleware()];

  const store = createStore(modules, initialState, composeEnhancers(applyMiddleware(...middlewares)));

  return store;
};

export default configure;
