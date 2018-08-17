import { combineReducers } from 'redux';
import  { penderReducer } from 'redux-pender';
import tweets from './tweets';
import write from './write';

export default combineReducers({
  tweets,
  write,
  pender: penderReducer,
});
