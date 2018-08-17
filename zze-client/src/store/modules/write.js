import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender';
import { write } from 'lib/api';

const CHANGE_INPUT = 'write/CHANGE_INPUT';
const WRITE_TWEET = 'write/WRITE_TWEET';

export const changeInput = createAction(CHANGE_INPUT, ({ field, value }) => ({
  field,
  value,
}));
export const writeTweet = createAction(WRITE_TWEET, write);

const initialState = {
  fields: {
    name: '',
    password: '',
    text: '',
  },
};

const reducer = handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { field, value } = action.payload;
    return produce(state, draft => {
      draft.fields[field] = value;
    });
  },
}, initialState);

export default applyPenders(reducer, [
  {
    type: WRITE_TWEET,
  }
]);