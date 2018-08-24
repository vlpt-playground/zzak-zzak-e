import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import tweets from './tweets';
import write from './write';
import base from './base';
import user from './user';
import auth from './auth';

export default combineReducers({
  tweets,
  write,
  base,
  user,
  auth,
  pender: penderReducer,
});
