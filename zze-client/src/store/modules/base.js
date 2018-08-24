import { createAction, handleActions } from 'redux-actions';

const HIDE_HEADER = 'base/HIDE_HEADER';
const SHOW_HEADER = 'base/SHOW_HEADER';

export const hideHeader = createAction(HIDE_HEADER);
export const showHeader = createAction(SHOW_HEADER);

const initialState = {
  header: true,
};

export default handleActions(
  {
    [HIDE_HEADER]: state => ({ ...state, header: false }),
    [SHOW_HEADER]: state => ({ ...state, header: true }),
  },
  initialState
);
