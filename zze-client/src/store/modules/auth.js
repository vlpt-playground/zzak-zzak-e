import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender';
import * as api from 'lib/api';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE = 'auth/INITIALIZE';
const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';
const SET_ERROR = 'auth/SET_ERROR';

export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT, ({ field, value }) => ({
  field,
  value,
}));
export const login = createAction(LOGIN, api.login);
export const register = createAction(REGISTER, api.register);
export const setError = createAction(SET_ERROR, error => error);

const initialState = {
  fields: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  error: null,
};

const reducer = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_INPUT]: (state, { payload: { field, value } }) => {
      return produce(state, draft => {
        draft.fields[field] = value;
      });
    },
    [SET_ERROR]: (state, { payload: error }) => {
      return produce(state, draft => {
        draft.error = error;
      });
    },
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: REGISTER,
    onError: (state, action) => {
      return produce(state, draft => {
        const { response } = action.payload;
        if (!response || !response.data || !response.data.msg) {
          draft.error = '알 수 없는 에러 발생';
          return;
        }
        draft.error = response.data.msg;
      });
    },
  },
  {
    type: LOGIN,
    onError: (state, action) => {
      return produce(state, draft => {
        const { response } = action.payload;
        if (!response || !response.data || !response.data.msg) {
          draft.error = '알 수 없는 에러 발생';
          return;
        }
        draft.error = response.data.msg;
      });
    },
  },
]);
