import { createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import * as api from 'lib/api';
import produce from 'immer';

const GET_INITIAL = 'tweets/GET_INITIAL';
const GET_RECENT = 'tweets/GET_RECENT';
const GET_NEXT = 'tweets/GET_NEXT';
const OPEN_REMOVE_MODAL = 'tweets/OPEN_REMOVE_MODAL';
const CLOSE_REMOVE_MODAL = 'tweets/CLOSE_REMOVE_MODAL';
const REMOVE = 'tweets/REMOVE';

export const getInitial = createAction(GET_INITIAL, api.getList);
export const getRecent = createAction(GET_RECENT, api.getList);
export const getNext = createAction(GET_NEXT, api.getList);
export const openRemoveModal = createAction(OPEN_REMOVE_MODAL, id => id);
export const closeRemoveModal = createAction(CLOSE_REMOVE_MODAL);
export const remove = createAction(REMOVE, api.remove, meta => meta);

const initialState = {
  list: null,
  end: false,
  removeModal: {
    open: false,
    id: null,
    error: null,
  },
};

const reducer = handleActions(
  {
    [OPEN_REMOVE_MODAL]: (state, action) => {
      return produce(state, draft => {
        draft.removeModal.open = true;
        draft.removeModal.id = action.payload;
        draft.removeModal.error = null;
      });
    },
    [CLOSE_REMOVE_MODAL]: (state, action) => {
      return produce(state, draft => {
        draft.removeModal.open = false;
      });
    },
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: GET_INITIAL,
    onSuccess: (state, action) => {
      return {
        ...state,
        list: action.payload.data,
        end: action.payload.data.length < 10,
      };
    },
  },
  {
    type: GET_RECENT,
    onSuccess: (state, action) => {
      return {
        ...state,
        list: action.payload.data.concat(state.list),
      };
    },
  },
  {
    type: GET_NEXT,
    onSuccess: (state, action) => {
      return {
        ...state,
        list: state.list.concat(action.payload.data),
        end: action.payload.data.length < 10,
      };
    },
  },
  {
    type: REMOVE,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.list = draft.list.filter(
          item => item._id !== action.meta.id
        );
      });
    },
    onError: (state, action) => {
      if (!action.payload) return state;
      const { status } = action.payload.response;
      return produce(state, draft => {
        if (status === 403) {
          draft.removeModal.error = '잘못된 비밀번호입니다.';
        } else {
          draft.removeModal.error = '알 수 없는 에러 발생!';
        }
      });
    },
  },
]);
